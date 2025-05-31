<template>
  <div v-show="showImg" class="ae-visualization">
    <div class="visualization-header">
      <div class="organism-info">
        <h1 class="organism-title">Organism: <span class="organism-name">Homo sapiens</span></h1>
        
        <div class="visualization-controls">
          <el-switch
            v-model="showBar"
            class="visualization-switch"
            inline-prompt
            active-text="Bar"
            inactive-text="Box"
            @change="changeShowBar"
          />
          
          <el-switch
            v-model="showLabel"
            class="visualization-switch label-switch"
            inline-prompt
            v-show="showBar"
            active-text="Show label"
            inactive-text="Off label"
            @change="changeShowLabel"
          />
        </div>
      </div>
      
      <!-- Protein Tags -->
      <div class="protein-tags">
        <el-tag
          v-for="(item, index) in proteinTags"
          :key="index"
          round
          closable
          :color="tagsColor[index]"
          @close="handleClose(item)"
          class="protein-tag"
        >
          {{ item }}
        </el-tag>
      </div>
      
      <!-- History Drawer -->
      <div class="history-section">
        <el-text class="history-button" type="info" @click="drawer = true">
          History
        </el-text>
        
        <el-drawer v-model="drawer" title="Visualization History" size="50%">
          <div class="history-content">
            <div v-for="(item, index) in imgs" :key="index" class="history-item">
              <h5 class="history-item-title">{{ item.proteinName.join(', ') }}</h5>
              <el-image
                class="history-image"
                :src="item.url"
                fit="contain"
                :preview-src-list="[item.url]"
              />
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
    
    <div class="visualization-card">
      <div
        ref="chart"
        class="chart-container"
        :style="{height: imgH + 'px'}"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { getProteins,getCellLineProteins } from '@/api/search'
import { inflate } from 'pako'
import * as echarts from 'echarts'
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import { ref, onMounted, nextTick,computed } from 'vue'
import {getBoxTooltips,options} from './option'
const router = useRouter();
const drawer = ref(false)
const emit = defineEmits(['changeLoading'])
// image height
let imgH = 500
// database
let proteinTable = []
const showBar = ref(false)
const showLabel = ref(false)
// component show
const showImg = ref(false)
// data history 
const dataHistory = ref([])
// current router name
const routerName = ref('')
// query protein
const protein = ref([])
// sorted tags 
const sortTags = ref([])
// tags
const proteinTags = ref([])
const tags = computed(() => {
  return proteinTags.value.map((item)=>item.split('(')[0])
})
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
                //"skin",
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
                //"uterus",
                "prostate",
                "colon",
                "esophagus",
                "placenta",
]
protein.value = Array.isArray(router.currentRoute.value.query.protein) ? router.currentRoute.value.query.protein : [router.currentRoute.value.query.protein]
routerName.value = router.currentRoute.value.name
// get proteins
const getProteinTable = async () => {
  emit('changeLoading')
  const res = routerName.value ==='tissues' ? await getProteins() : await getCellLineProteins()
  const byteArray = new Uint8Array(res.data)
  const data = inflate(byteArray, { to: 'string' })
  proteinTable = JSON.parse(data)
  emit('changeLoading')
  queryProtein(protein)
}
// delete tag
const handleClose = (tag) => {
  dataHistory.value.splice(proteinTags.value.indexOf(tag), 1)
  proteinTags.value.splice(proteinTags.value.indexOf(tag), 1)
  routerName.value ==='tissues' ? router.push({ path: "/baseline/tissues", query: { protein: tags.value } }) : router.push({ path: "/baseline/cellline", query: { protein: tags.value} })
}
// qeury
const queryProtein = (input) => {
  if (typeof(input.value[0]) === "undefined") {
    // init()
    showImg.value = false
    myChart ? myChart.dispose() : myChart
    return
  }
  let proteins = proteinTable
  input.value.map((protein) => {
    const output = proteins.find((item) => {
      return item.name === protein.trim() || item.gene_name === protein.trim()
    })
    if (!output) {
      alert('Please enter a legal protein name')
      return
    }
    let tag = `${output.name}(${output.gene_name})`
    if (!proteinTags.value.includes(tag.trim())) {
      if (proteinTags.value.length === 5) {
        proteinTags.value.shift()
        proteinTags.value.push(tag)
        dataHistory.value.shift()
        dataHistory.value.push(output)
      } else {
        proteinTags.value.push(tag)
        dataHistory.value.push(output)
      }
    }
  })
  if (proteinTags.value.length != input.value.length) {
    routerName.value ==='tissues' ? router.push({ path: "/baseline/tissues", query: { protein: tags.value } }) : router.push({ path: "/baseline/cellline", query: { protein: tags.value } })
    //router.push({ path: "/ae/tissues", query: { protein: proteinTags.value } })
  } else {
    showImg.value = true
    imgH = dataHistory.value.length > 1 ? dataHistory.value.length * 400 : 500
    nextTick(() => {
      init()
    })
  }
}
// watch route
onBeforeRouteUpdate((to) => { 
  protein.value = to.query.protein
  queryProtein(protein)
})

// load update
onMounted(() => {
  getProteinTable()
})


// init data
const initData = (data) => {
  if (routerName.value === 'tissues') {
    if (data.tags.length < 18) {
    tagsTotal.map((item) => {
      if (!data.tags.includes(item)) {
        data.tags.push(item)
        data.data.push([])
      }
    })
  }
  }
  let dataSort = []
  for (let i = 0; i < data.tags.length; i++) {
    let obj = {}
    obj['name'] = data.tags[i]
    obj['data'] = data.data[i].filter(value=>value>=1)
    dataSort.push(obj)
  }
  if (routerName.value !== 'tissues') {
    dataSort.sort((obja, objb) => {
    const lena = obja.data.length
    const lenb = objb.data.length
    return lenb - lena
    })
    dataSort = dataSort.slice(0, 20);
  }
  // sort data
  dataSort.sort((obja,objb) => {
    /*  
    objb.data.sort((a, b) => { return a - b })
    const lena = obja.data.length
    const lenb = objb.data.length
    const mida = obja.data[Math.floor(lena / 2)]
    const midb = objb.data[Math.floor(lenb / 2)] 
    */
    const mida = obja.data.length > 0 ? obja.data.reduce((a, b) => a + b) / obja.data.length : 0
    const midb = obja.data.length > 0 ? objb.data.reduce((a, b) => a + b) / objb.data.length : 0
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
    let { samples,data } = countSingleValue(neatData,2)
    if (showBar.value) {
      options.series.push(
        {
          name: proteinTags.value[0],
          type: 'bar',
          data: data,
          itemStyle: {
              color: tagsColor[0],
              color0: '#FA0000',
              borderColor: '#030609',
              borderColor0: '#030609',
          },
          label: {
            show: showLabel.value,
            position: 'right',
            formatter: function () {
              return `samples: ${samples.shift()}`
            }
          }
        }
      )
      options.tooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      }
      options.yAxis.data = sortTags.value
    } else {
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
            borderColor0: '#030609',
          },
      })
      options.tooltip = getBoxTooltips(samples)
    }
  } else {
    if (routerName.value === 'tissues') {
      sortTags.value = sortTags.value.length ===0 ? initData(dataHistory.value[0]).tags : sortTags.value
    } else {
      sortTags.value = sortTags.value.length ===0 ? initData(dataHistory.value[0]).tags : sortTags.value
    }
    dataHistory.value.length === 0 ? options.title = [] : options.title.splice(0,1,{
      text: `Comparison of protein expression in different ${routerName.value}`,
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
          let rowArr = item.data[index].filter(v=>v>=1)
          data.push(rowArr)
        }
      })
      datas.push(data)
    })
    let { samples,data } = countSingleValue(datas, 3)
    if (showBar.value) {
      datas = data
      options.dataset = []
      options.series = []
      options.legend.data = []
      datas.forEach((item, index) => {
        options.series.push(
        {
          name: proteinTags.value[index],
          type: 'bar',
          data: item,
          itemStyle: {
              color: tagsColor[index],
              color0: '#FA0000',
              borderColor: '#030609',
              borderColor0: '#030609',
            },
          label: {
            show: showLabel.value,
            position: 'right',
            formatter: function () {
              return `samples: ${samples[index].shift()}`
            }
          }
          })
        options.legend.data.push({
          name: proteinTags.value[index],
          itemStyle: {
            color: tagsColor[index],
            borderColor: tagsColor[index]
          }
        })
      })
      options.tooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      }
      options.yAxis.data = sortTags.value
    } else {
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
            borderColor0: '#030609',
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
      options.tooltip = getBoxTooltips(samples)
    }
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
  nextTick(() => {
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
  })
}
// count single value
const countSingleValue = (data, dimension) => {
  if (dimension === 2) {
    /*
    let singleNum = data.filter((arr) => arr.length == 1).length
    if (singleNum >= 10) {
      data = data.map((arr) => Number((arr.reduce((a, b)=>a+b)/arr.length).toFixed(2)))
    }
    return { singleNum, data } 
    */
    let samples = data.map((arr) => arr.length)
    data = data.map((arr) => arr.length > 0 ? Number((arr.reduce((a, b) => a + b) / arr.length).toFixed(2)) : 0)
    return { samples,data }
  } else {
    /*
    let singleNum = data[0].filter((arr) => arr.length == 1).length
    if (singleNum >= 10) {
      data = data.map((res) => res.map((arr) => arr.length > 0 ? Number((arr.reduce((a, b)=>a+b)/arr.length).toFixed(2)) : 0))
    }
    return { singleNum, data } 
    */
    let samples = data.map((res) => res.map((arr) => arr.length))
    data = data.map((res) => res.map((arr) => arr.length > 0 ? Number((arr.reduce((a, b) => a + b) / arr.length).toFixed(2)) : 0))
    return { samples,data }
  }
}

//
const changeShowBar = () => {
  init()
}
const changeShowLabel = () => {
  init()
}
</script>
<style lang="scss" scoped>
.ae-visualization {
  width: 100%;
}

.visualization-header {
  text-align: left;
  margin: $spacing-md 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: $spacing-md;
  
  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.organism-info {
  position: relative;
  padding-right: 12rem;
  
  @media (max-width: $breakpoint-sm) {
    padding-right: 0;
    margin-bottom: $spacing-md;
  }
}

.organism-title {
  font-size: $font-size-base;
  margin: $spacing-xs 0;
  font-weight: 500;
}

.organism-name {
  font-weight: 700;
}

.visualization-controls {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: $spacing-md;
  
  @media (max-width: $breakpoint-sm) {
    position: static;
    margin-top: $spacing-sm;
  }
}

.visualization-switch {
  --el-switch-on-color: #{$success-color};
  --el-switch-off-color: #{$error-color};
}

.label-switch {
  margin-left: $spacing-lg;
}

.protein-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
}

.protein-tag {
  margin-right: $spacing-xs;
}

.history-section {
  display: flex;
  align-items: center;
}

.history-button {
  cursor: pointer;
  margin-right: $spacing-md;
  transition: $transition-base;
  
  &:hover {
    color: $primary-color;
  }
}

.history-content {
  padding: $spacing-md;
}

.history-item {
  margin-bottom: $spacing-lg;
  border-bottom: 1px solid $border-color;
  padding-bottom: $spacing-md;
}

.history-item-title {
  font-size: $font-size-base;
  margin-bottom: $spacing-sm;
  font-weight: 500;
}

.history-image {
  width: 100%;
  border-radius: $border-radius;
}

.visualization-card {
  background-color: $white;
  border-radius: $border-radius-lg;
  padding: $spacing-md;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: $spacing-lg;
}

.chart-container {
  width: 100%;
  min-height: 400px;
}

.history-info {
  cursor: pointer;
  transition: $transition-base;
  
  &:hover {
    color: $text-color;
  }
}
</style>