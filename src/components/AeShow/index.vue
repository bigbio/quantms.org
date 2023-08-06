<template>
  <div>
    <div class="info">
      <div class="info-content">
        <h1>Organism: <span>Homo sapiens</span></h1>
        <!--
        <h1>
          Protein: <span>{{ protein }}</span>
        </h1>
        -->
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
            <h5>{{ item.proteinName.join() }}</h5>
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
// image height
let imgH = 600
// database
let proteinTable = []
// data history 
const dataHistory = ref([])
// query protein
const protein = ref([])
// sorted tags 
const sortTags = ref([])
// tags
const proteinTags = ref([])
// tags color
const tagsColor = ["#8DD3C7", "#EDBC63", "#BEBADA", "#FB8072", "#80B1D3"]
// map html
const chart = ref()
// history
const imgs = ref([])
// image object
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
protein.value = Array.isArray(router.currentRoute.value.query.protein) ? router.currentRoute.value.query.protein : [router.currentRoute.value.query.protein]
// get proteins
const getProteinTable = async () => {
  const res = await getProteins()
  const byteArray = new Uint8Array(res.data)
  const data = inflate(byteArray, { to: 'string' })
  proteinTable = JSON.parse(data)
  queryProtein(protein)
}
// delete tag
const handleClose = (tag) => {
  dataHistory.value.splice(proteinTags.value.indexOf(tag), 1)
  proteinTags.value.splice(proteinTags.value.indexOf(tag), 1)
  router.push({ path: "/ae/tissues", query: { protein: proteinTags.value } })
  // console.log(dataHistory.value)
  // init()
}
// qeury
const queryProtein = (input) => {
  if (typeof(input.value[0]) === "undefined") {
    init()
    return
  }
  // console.log(input.value)
  let proteins = proteinTable
  input.value.map((protein) => {
    const output = proteins.find((item) => {
      return item.name === protein.trim()
    })
    if (!output) {
      alert('Please enter a legal protein name')
      return
    }
    if (!proteinTags.value.includes(protein.trim())) {
      if (proteinTags.value.length === 5) {
        proteinTags.value.shift()
        proteinTags.value.push(protein.trim())
        dataHistory.value.shift()
        dataHistory.value.push(output)
      } else {
        proteinTags.value.push(protein.trim())
        dataHistory.value.push(output)
      }
    }
    // console.log(output)
    // init()
  //} //else {
    //alert('Please enter a legal protein name')
  //}
  })
  // console.log("111",proteinTags.value)
  // console.log("222",input.value)
  if (proteinTags.value.length != input.value.length) {
    router.push({ path: "/ae/tissues", query: { protein: proteinTags.value } })
  } else {
    init()
  }
}
// watch route

onBeforeRouteUpdate((to) => { 
  // console.log(to.query.proteins)
  protein.value = to.query.protein
  // console.log(protein.value)
  queryProtein(protein)
})

// load update
onMounted(() => {
  // console.log(protein.value)
  getProteinTable()
})


// init data
const initData = (data) => {
  if (data.tags.length < 18) {
    tagsTotal.map((item) => {
      if (!data.tags.includes(item)) {
        data.tags.push(item)
        data.data.push([])
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
  // backgroundColor: '#f4f5f2',
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
  // color: tagsColor,
  legend: {
    show: true,
    orient: 'vertical',
    right: 10,
    top: 60,
    data: []
    // bottom: 20,
    },
  grid: {
      left: '10%',
      right: '10%',
      bottom: '7%'
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
      nameGap: 40,
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
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
// init image
const init = () => {
  if (dataHistory.value.length === 1) {
    options.dataset = []
    options.series = []
    options.title = []
    options.legend.show = false
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
          borderColor: '#030609',
          borderColor0: '#030609'
        },
      })
  } else {
    sortTags.value = sortTags.value.length ===0 ? tagsTotal : sortTags.value
    imgH = dataHistory.value.length != 0 ? dataHistory.value.length * 400 : 600
    dataHistory.value.length === 0 ? options.title = [] : options.title.splice(0,1,{
      text: 'Comparison of protein expression in different tissues',
      left: 'center'
    })
    dataHistory.value.length === 0 ? options.legend.show = false : options.legend.show = true
    let datas = []
    dataHistory.value.map((item) => {
      let data = []
      sortTags.value.forEach((tissue) => {
        if (!item.tags.includes(tissue)) {
          data.push([])
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
    options.legend.data = []
    datas.forEach((item,index) => {
      options.dataset.push({
        source: item
      })
      options.series.push({
        name: proteinTags.value[index],
        type: 'boxplot',
        datasetIndex: datas.length + index,
        itemStyle: {
          color: tagsColor[index],
          color0: '#FA0000',
          borderColor: '#030609',
          borderColor0: '#030609'
        },
      })
      options.legend.data.push({
        name: proteinTags.value[index],
        itemStyle: {
          color: tagsColor[index],
          borderColor: tagsColor[index]
        }
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
  myChart = echarts.init(chart.value,'macarons')
  myChart.clear()
  myChart.resize({
    height: imgH
  })
  myChart.setOption(options)
  setTimeout(() => {
    if (protein.value.length !== 0) {
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
    }
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