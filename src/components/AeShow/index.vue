<template>
  <div>
    <div class="info">
      <h1>Organism: <span>Homo sapiens</span></h1>
      <h1>
        Protein: <span>{{ protein }}</span>
      </h1>
    </div>
    <div class="card">
      <div ref="chart" style="width: 100%; height: 600px"></div>
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

let proteinTable = []
// get proteins
const getProteinTable = async () => {
  const res = await getProteins()
  const byteArray = new Uint8Array(res.data)
  const data = inflate(byteArray, { to: 'string' })
  proteinTable = JSON.parse(data)
  queryProtein(protein)
}

const protein = ref("")
// qeury
const queryProtein = (input) => {
  let proteins = proteinTable
  const output = proteins.find((item) => {
    return item.name === input.value.trim()
  })
  if (output) {
    init(output)
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
let myChart

const init = (data) => {
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
  if (myChart != null && myChart !== '' && myChart !== undefined) {
    myChart.dispose() // discard
  }
  myChart = echarts.init(chart.value)
  const option = {
    title: [
      {
        text: data.title,
        left: 'center'
      }
    ],
    dataset: [
      {
        source: neatData
      },
      {
        transform: {
          type: 'boxplot',
          config: {
            itemNameFormatter: function (params) {
              return tags[params.value]
            }
          }
        }
      },
      {
        fromDatasetIndex: 1,
        fromTransformResult: 1
      }
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
      max: 7
    },
    dataZoom: [
      {
        type: 'inside'
      },
      {
        type: 'slider',
        height: 10
      }
    ],
    toolbox: {
      feature: {
        saveAsImage: {
          type: 'png',
          title: 'save as .png'
        }
      }
    },
    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        datasetIndex: 1,
        itemStyle: {
          color: '#06B800',
          color0: '#FA0000',
          borderColor: null,
          borderColor0: null
        }
      },
      {
        name: 'outlier',
        type: 'scatter',
        encode: { x: 1, y: 0 },
        datasetIndex: 2
      }
    ]
  }
  myChart.setOption(option)
}
</script>
<style scoped>
.info {
  text-align: left;
  margin: 20px 0;
  margin-left: 2px;
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
</style>