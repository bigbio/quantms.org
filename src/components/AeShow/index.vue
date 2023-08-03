<template>
  <div>
    <div class="info">
      <div class="info-content">
        <h1>Organism: <span>Homo sapiens</span></h1>
        <h1>
          Protein: <span>{{ protein }}</span>
        </h1>
      </div>
      <!--tags-->
      <div class="button-tag">
          <el-tag v-for="(item,index) in proteinTags" :key="index" round closable :color="tagsColor[index]" @close="handleClose(item)">{{ item }}</el-tag>
      </div>
      <!--history-->
      <div class="history">
        <el-text style="margin-right: 16px;" class="history-info" type="info" @click="drawer = true">
          history
        </el-text>
        <el-drawer v-model="drawer" title="I am the title" :with-header="false">
          <el-tabs tab-position="right" style="height: 300px" class="demo-tabs" v-for="(item,index) in imgs" :key="index">
            <h5>{{ item.proteinName }}</h5>
            <el-image style="width: 100%;" :src="item.url" fit="fill" :preview-src-list="[item.url]" />
          </el-tabs>
        </el-drawer>
      </div>
    </div>

    <div class="card">
      <div ref="chart" v-bind:style="{width: 100 + '%', height: imgH + 'px'}"></div>
    </div>

  </div>
</template>
<script setup>
import { getProteins } from '@/api/search'
import { inflate } from 'pako'
import * as echarts from 'echarts'
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import { ref, onMounted } from 'vue'
const router = useRouter();
const drawer = ref(false)
let imgH = 450
let proteinTable = []
// get proteins
const getProteinTable = async () => {
  const res = await getProteins()
  const byteArray = new Uint8Array(res.data)
  const data = inflate(byteArray, { to: 'string' })
  proteinTable = JSON.parse(data)
  queryProtein(protein)
}
// tags
const proteinTags = ref([])
const handleClose = (tag) => {
  dataHistory.value.splice(proteinTags.value.indexOf(tag), 1)
  proteinTags.value.splice(proteinTags.value.indexOf(tag), 1)
  // console.log(dataHistory.value)
  init()
}
const dataHistory = ref([])
const protein = ref("")
// qeury
const queryProtein = (input) => {
  let proteins = proteinTable
  const output = proteins.find((item) => {
    return item.name === input.value.trim()
  })
  if (output) {
    if (!proteinTags.value.includes(input.value.trim())) {
      if (proteinTags.value.length === 5) {
        proteinTags.value.shift()
        proteinTags.value.push(input.value.trim())
        dataHistory.value.shift()
        dataHistory.value.push(output)
      } else {
        proteinTags.value.push(input.value.trim())
        dataHistory.value.push(output)
      }
    }
    // console.log(output)
    init()
  } else {
    alert('Please enter a legal protein name')
  }
}
protein.value = router.currentRoute.value.query.protein
onBeforeRouteUpdate((to) => {
  protein.value = to.query.protein
  queryProtein(protein)
})
// loda update
onMounted(() => {
  getProteinTable()
})

const chart = ref()
// history
const imgs = ref([])
// delet_tag




let myChart
// tagstotal
const tagsTotal = [
                "heart",
                "stomach",
                "skin",
                "blood plasma",
                "brain",
                "kidney",
                "liver",
                "lung",
                "pancreas",
                "spleen",
                "adrenal gland",
                "testis",
                "ovary",
                "uterus",
                "prostate",
                "colon",
                "esophagus",
                "placenta",
  ]

// init data
const initData = (data) => {
  if (data.tags.length < 18) {
    tagsTotal.map((item) => {
      if (!data.tags.includes(item)) {
        data.tags.push(item)
        data.data.push([0])
      }
    })
  }
  let dataSort = []
  for (let i = 0; i < data.tags.length; i++) {
    let obj = {}
    obj['name'] = data.tags[i]
    obj['data'] = data.data[i].filter(value=>value<=7)
    dataSort.push(obj)
  }
  // sort data
  dataSort.sort((obja,objb) => {
    obja.data.sort((a, b) => { return a - b })
    objb.data.sort((a, b) => { return a - b })
    const lena = obja.data.length
    const lenb = objb.data.length
    const mida = obja.data[Math.floor(lena / 2)]
    const midb = objb.data[Math.floor(lenb / 2)]
    return mida - midb
  })
  // get sort column
  let neatData = []
  let tags = []
  dataSort.map((item) => {
    neatData.push(item.data)
    tags.push(item.name)
  })
  return {
    neatData,
    tags
  }
}
// option
const options = {
    title: [
    ],
    dataset: [
    ],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {},
      formatter: function (param) {
        return [
          "<div style='margin-bottom:5px;width:100%;border-radius:3px;text-align:center;family'><p>" +
            param.data[0] +
            ' </p></div>',
          '<hr size=1 style="margin: 3px 0">',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Max:</span>" +
            parseFloat(param.data[5]).toFixed(2) +
            '<br/>',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Q3:</span>" +
            parseFloat(param.data[4]).toFixed(2) +
            '<br/>',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Median:</span>" +
            parseFloat(param.data[3]).toFixed(2) +
            '<br/>',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Q1:</span>" +
            parseFloat(param.data[2]).toFixed(2) +
            '<br/>',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Min:</span>" +
            parseFloat(param.data[1]).toFixed(2) +
            '<br/>'
        ].join('')
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    yAxis: {
      type: 'category',
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    xAxis: {
      type: 'value',
      name: 'riBAQ',
      nameLocation: 'center',
      nameGap: 30,
      splitArea: {
        show: true
      },
      min: 1,
      max: 10
    },
    toolbox: {
      feature: {
        saveAsImage: {
          type: 'png',
          title: 'save as .png'
        }
      }
    },
    series: [
    ]
}

// tags 
const sortTags = ref([])
// tags color
const tagsColor = ["#8DD3C7","#FFFFB3","#BEBADA","#FB8072","#80B1D3"]
const init = () => {
  if (dataHistory.value.length === 1) {
    options.dataset = []
    options.series = []
    let { neatData, tags } = initData(dataHistory.value[0])
    sortTags.value = tags
    options.title.push({
      text: dataHistory.value[0].title,
      left: 'center'
    })
    options.dataset.push({
      source: neatData
    })
    options.dataset.push({
        fromDatasetIndex: 0,
        transform: {
          type: 'boxplot',
          config: {
            itemNameFormatter: function (params) {
              return tags[params.value]
            }
          }
        }
    })
    options.series.push({
        name: 'category0',
        type: 'boxplot',
        datasetIndex: 1,
        itemStyle: {
          color: tagsColor[0],
          color0: '#FA0000',
          borderColor: null,
          borderColor0: null
        },
      })
  } else {
    imgH = dataHistory.value.length * 450 - 100

    let datas = []
    dataHistory.value.map((item) => {
      let data = []
      sortTags.value.forEach((tissue) => {
        if (!item.tags.includes(tissue)) {
          data.push([0])
        } else {
          let index = item.tags.indexOf(tissue)
          let rowArr = item.data[index]
          data.push(rowArr)
        }
      })
      datas.push(data)
    })
    options.dataset = []
    options.series = []
    options.title = []
    options.title.push({
      text: 'Contrast of protein expression in different tissues',
      left: 'center'
    })
    datas.forEach((item,index) => {
      options.dataset.push({
        source: item
      })
      options.series.push({
        name: 'category' + index,
        type: 'boxplot',
        datasetIndex: datas.length + index,
        itemStyle: {
          color: tagsColor[index],
          color0: '#FA0000',
          borderColor: null,
          borderColor0: null
        },
      })
    })
    datas.forEach((item, index) => {
      options.dataset.push({
        fromDatasetIndex: index,
        transform: {
          type: 'boxplot',
          config: {
            itemNameFormatter: function (params) {
              return sortTags.value[params.value]
            }
          }
        }
      })
    })
  }
  if (myChart != null && myChart !== '' && myChart !== undefined) {
    myChart.dispose() // discard
  }
  myChart = echarts.init(chart.value)
  myChart.clear()
  myChart.resize({
    height: imgH
  })
  myChart.setOption(options)
  setTimeout(() => {
    let imgDataUrl = myChart.getDataURL({
    type: 'svg',
    pixelRatio: 2,
    backgroundColor: '#fff',
    excludeComponents: ['toolbox']
    })
    let urlFile = {
      proteinName: protein.value,
      url: imgDataUrl
    }
    imgs.value.unshift(urlFile)
  },2000)
}
</script>
<style scoped>
.info {
  text-align: left;
  margin: 20px 0;
  margin-left: 2px;
  display: flex;
  justify-content: space-between;
}
.info h1 {
  font-size: 14px;
  margin: 5px 0;
  font-weight: inherit;
  font-weight: 500;
}
.info span {
  font-weight: 700;
}
.history-info:hover {
  color: black;
  cursor: pointer;
}
</style>