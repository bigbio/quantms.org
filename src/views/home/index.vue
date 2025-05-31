<template>
  <div class="home-page">
    <!-- Feature Cards Section -->
    <section class="feature-section">
      <div class="grid grid-4">
        <div class="feature-card workflow-card">
          <a href="https://docs.quantms.org/en/latest/" class="feature-link">
            <el-icon size="60px" class="workflow-icon"><Tools /></el-icon>
            <h2 class="feature-title">Workflow</h2>
            <p class="feature-description">
              Explore the quantMS workflow documentation
            </p>
          </a>
        </div>

        <div class="feature-card datasets-card">
          <router-link to="/datasets" class="feature-link">
            <el-icon size="60px" class="datasets-icon"><DocumentCopy /></el-icon>
            <h2 class="feature-title">Datasets</h2>
            <p class="feature-description">
              Browse available datasets and resources
            </p>
          </router-link>
        </div>

        <div class="feature-card baseline-card">
          <router-link to="/baseline" class="feature-link">
            <el-icon size="60px" class="baseline-icon"><Histogram /></el-icon>
            <h2 class="feature-title">Baseline</h2>
            <p class="feature-description">
              View baseline analysis and results
            </p>
          </router-link>
        </div>

        <div class="feature-card publications-card">
          <router-link to="/publications" class="feature-link">
            <el-icon size="60px" class="publications-icon"><Document /></el-icon>
            <h2 class="feature-title">Publications</h2>
            <p class="feature-description">
              View scientific publications related to quantMS
            </p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="intro-section card">
      <div class="intro-content">
        <h1 class="section-title">Introduction</h1>
        <p class="intro-text">
          <a href="https://quantms.readthedocs.io/en/latest/" class="text-primary">quantms</a>
          is a bioinformatics best-practice analysis pipeline for Quantitative Mass Spectrometry (MS),
          including: DDA-LFQ, plexDDA (e.g. TMT, iTRAQ), and DIA.
        </p>

        <div class="pipeline-image-container">
          <img :src="pipeline" alt="QuantMS Pipeline" class="pipeline-image" />
        </div>

        <h2 class="citation-title">Citing quantms</h2>
        <blockquote class="citation-block">
          Dai C, Pfeuffer J, Wang H, Zheng P, Käll L, Sachsenberg T, Demichev V, Bai M, Kohlbacher O, Perez-Riverol Y.
          quantms: a cloud-based pipeline for quantitative proteomics enables the reanalysis of public proteomics data.
          Nat Methods. 2024 Sep;21(9):1603-1607. doi: 10.1038/s41592-024-02343-1. Epub 2024 Jul 4.
          PMID: 38965444; PMCID: PMC11399091.
          <a href="https://doi.org/10.1038/s41592-024-02343-1" class="citation-link">
            [https://doi.org/10.1038/s41592-024-02343-1]
          </a>
        </blockquote>
      </div>
    </section>

    <!-- Visualization Section -->
    <section class="visualization-section">
      <div class="grid grid-3">
        <div class="visualization-card">
          <h3 class="chart-title">Proteins per Project</h3>
          <div ref="proteinsPerProjectChart" class="chart-container"></div>
        </div>

        <div class="visualization-card">
          <h3 class="chart-title">Peptides per Project</h3>
          <div ref="peptidesPerProjectChart" class="chart-container"></div>
        </div>

        <div class="visualization-card">
          <h3 class="chart-title">Proteins per Tissue</h3>
          <div ref="proteinsPerTissueChart" class="chart-container"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import pipeline from "@/assets/images/pipeline.png";
import { Tools, DocumentCopy, Histogram, Document } from "@element-plus/icons-vue";
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { getAbsolueExpression, getDifferentialExpression, getSingleCellExpression } from "@/api/getTable";
import axios from 'axios';
import pako from 'pako';

// Chart references
const proteinsPerProjectChart = ref(null);
const peptidesPerProjectChart = ref(null);
const proteinsPerTissueChart = ref(null);

// Chart instances
let proteinsPerProjectInstance = null;
let peptidesPerProjectInstance = null;
let proteinsPerTissueInstance = null;

// Data storage
const aeData = ref([]);
const deData = ref([]);
const singleCellData = ref([]);
const tissueData = ref([]);

// Fetch all data
const fetchData = async () => {
  try {
    // Fetch AE, DE, and single cell data
    const [aeResponse, deResponse, singleCellResponse] = await Promise.all([
      getAbsolueExpression(),
      getDifferentialExpression(),
      getSingleCellExpression()
    ]);

    aeData.value = aeResponse.data;
    deData.value = deResponse.data;
    singleCellData.value = singleCellResponse.data;

    // Fetch tissue data (compressed)
    try {
      const tissueResponse = await axios.get('/data/tissueJson.json.gz', { responseType: 'arraybuffer' });
      const decompressed = pako.inflate(new Uint8Array(tissueResponse.data), { to: 'string' });
      tissueData.value = JSON.parse(decompressed);
      console.log('Tissue data loaded:', tissueData.value.length, 'proteins');
    } catch (error) {
      console.error('Error loading tissue data:', error);
      // Fallback to a simple array if tissue data can't be loaded
      tissueData.value = [
        {
          name: "Protein1",
          tags: ["brain", "heart", "liver", "kidney", "lung"],
          data: [[5.5], [5.6], [5.7], [5.8], [5.9]]
        },
        {
          name: "Protein2",
          tags: ["brain", "heart", "liver", "kidney"],
          data: [[5.5], [5.6], [5.7], [5.8]]
        },
        {
          name: "Protein3",
          tags: ["brain", "heart", "liver"],
          data: [[5.5], [5.6], [5.7]]
        },
        {
          name: "Protein4",
          tags: ["brain", "heart"],
          data: [[5.5], [5.6]]
        },
        {
          name: "Protein5",
          tags: ["brain"],
          data: [[5.5]]
        }
      ];
    }

    // Initialize charts
    initCharts();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Initialize all charts
const initCharts = () => {
  if (proteinsPerProjectChart.value) {
    proteinsPerProjectInstance = echarts.init(proteinsPerProjectChart.value);
    initProteinsPerProjectChart();
  }
  
  if (peptidesPerProjectChart.value) {
    peptidesPerProjectInstance = echarts.init(peptidesPerProjectChart.value);
    initPeptidesPerProjectChart();
  }
  
  if (proteinsPerTissueChart.value) {
    proteinsPerTissueInstance = echarts.init(proteinsPerTissueChart.value);
    initProteinsPerTissueChart();
  }
};

// Initialize proteins per project chart
const initProteinsPerProjectChart = () => {
  if (!proteinsPerProjectInstance) return;

  // Combine all datasets
  const allData = [...aeData.value, ...deData.value, ...singleCellData.value];
  const proteinCounts = allData.map(item => item.proteins);

  // Create bins for histogram
  const bins = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 15000];
  const counts = Array(bins.length).fill(0);

  proteinCounts.forEach(count => {
    for (let i = 0; i < bins.length; i++) {
      if (i === bins.length - 1 || (count >= bins[i] && count < bins[i + 1])) {
        counts[i]++;
        break;
      }
    }
  });

  // Format bin labels with K for thousands
  const binLabels = bins.map((bin, index) => {
    const formatNumber = (num) => num >= 1000 ? `${num/1000}K` : num;
    if (index === bins.length - 1) return `${formatNumber(bin)}+`;
    return `${formatNumber(bin)}-${formatNumber(bins[index + 1])}`;
  });

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} projects',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#ccc',
      borderWidth: 1,
      textStyle: {
        color: '#666'
      }
    },
    grid: {
      left: '12%',
      right: '8%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: binLabels,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ddd'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        rotate: 45,
        fontSize: 11,
        margin: 12,
        color: '#666',
        formatter: (value) => value.replace('-', ' - ')
      }
    },
    yAxis: {
      type: 'value',
      name: 'Projects',
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#666'
      },
      axisLabel: {
        fontSize: 11,
        color: '#666'
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#eee'
        }
      }
    },
    series: [
      {
        data: counts,
        type: 'bar',
        itemStyle: {
          color: '#389a99',
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '60%',
        emphasis: {
          itemStyle: {
            color: '#2a7372'
          }
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 11,
          color: '#666'
        }
      }
    ]
  };

  proteinsPerProjectInstance.setOption(option);
};

// Initialize peptides per project chart
const initPeptidesPerProjectChart = () => {
  if (!peptidesPerProjectInstance) return;

  // Combine all datasets
  const allData = [...aeData.value, ...deData.value, ...singleCellData.value];
  const peptideCounts = allData.map(item => item.peptides);

  // Create bins for histogram
  const bins = [0, 10000, 20000, 50000, 100000, 150000, 200000, 250000, 300000, 500000];
  const counts = Array(bins.length).fill(0);

  peptideCounts.forEach(count => {
    for (let i = 0; i < bins.length; i++) {
      if (i === bins.length - 1 || (count >= bins[i] && count < bins[i + 1])) {
        counts[i]++;
        break;
      }
    }
  });

  // Format bin labels with K for thousands
  const binLabels = bins.map((bin, index) => {
    const formatNumber = (num) => num >= 1000 ? `${num/1000}K` : num;
    if (index === bins.length - 1) return `${formatNumber(bin)}+`;
    return `${formatNumber(bin)}-${formatNumber(bins[index + 1])}`;
  });

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} projects',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#ccc',
      borderWidth: 1,
      textStyle: {
        color: '#666'
      }
    },
    grid: {
      left: '12%',
      right: '8%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: binLabels,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ddd'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        rotate: 45,
        fontSize: 11,
        margin: 12,
        color: '#666',
        formatter: (value) => value.replace('-', ' - ')
      }
    },
    yAxis: {
      type: 'value',
      name: 'Projects',
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#666'
      },
      axisLabel: {
        fontSize: 11,
        color: '#666'
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#eee'
        }
      }
    },
    series: [
      {
        data: counts,
        type: 'bar',
        itemStyle: {
          color: '#2563eb',
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '60%',
        emphasis: {
          itemStyle: {
            color: '#1d4ed8'
          }
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 11,
          color: '#666'
        }
      }
    ]
  };

  peptidesPerProjectInstance.setOption(option);
};

// Initialize proteins per tissue chart
const initProteinsPerTissueChart = () => {
  if (!proteinsPerTissueInstance || !tissueData.value || !tissueData.value.length) return;

  // Process tissue data - count unique proteins per tissue
  const tissueProteins = {};
  const proteinTissueMap = new Map(); // Map to track which tissues each protein appears in

  // First pass: build the protein to tissue mapping
  tissueData.value.forEach(protein => {
    if (protein.tags && Array.isArray(protein.tags)) {
      // Create an entry for this protein with its tissues
      proteinTissueMap.set(protein.name, new Set(protein.tags));
    }
  });

  // Second pass: count unique proteins for each tissue
  proteinTissueMap.forEach((tissues) => {
    if (tissues.size === 1) { // If protein appears in only one tissue
      const tissue = Array.from(tissues)[0];
      tissueProteins[tissue] = (tissueProteins[tissue] || 0) + 1;
    }
  });

  // Convert to array and sort by protein count
  const processedTissueData = Object.entries(tissueProteins)
    .map(([tissue, count]) => ({ tissue, proteins: count }))
    .sort((a, b) => b.proteins - a.proteins);

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const value = params.value >= 1000 ? `${(params.value/1000).toFixed(1)}K` : params.value;
        const name = params.name.charAt(0).toUpperCase() + params.name.slice(1);
        return `${name}: ${value} unique proteins (${params.percent.toFixed(1)}%)`;
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#ccc',
      borderWidth: 1,
      padding: [8, 12],
      textStyle: {
        color: '#666',
        fontSize: 13
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}',
          fontSize: 12,
          color: '#666'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 10,
          smooth: true
        },
        data: processedTissueData.map(item => ({
          name: item.tissue,
          value: item.proteins
        }))
      }
    ]
  };

  proteinsPerTissueInstance.setOption(option);
};

// Handle window resize
const handleResize = () => {
  if (proteinsPerProjectInstance) {
    proteinsPerProjectInstance.resize();
  }
  if (peptidesPerProjectInstance) {
    peptidesPerProjectInstance.resize();
  }
  if (proteinsPerTissueInstance) {
    proteinsPerTissueInstance.resize();
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchData();
  window.addEventListener('resize', handleResize);
});

// Clean up on component unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  proteinsPerProjectInstance?.dispose();
  peptidesPerProjectInstance?.dispose();
  proteinsPerTissueInstance?.dispose();
});
</script>

<style lang="scss" scoped>
.home-page {
  padding: $spacing-md 0;
}

// Feature Cards
.feature-section {
  padding: $spacing-xl 0;
  margin: 0 auto;
  max-width: $container-max-width;
  width: 100%;

  .grid {
    display: grid;
    gap: $spacing-lg;
  }

  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
    
    @media (max-width: $breakpoint-lg) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: $breakpoint-sm) {
      grid-template-columns: 1fr;
    }
  }
}

.feature-card {
  background-color: $white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  transition: $transition-base;
  height: 100%;
  
  &:hover {
    transform: translateY(-2px);
  }
}

// Workflow card - primary color
.workflow-card {
  background-color: rgba($primary-color, 0.15);
  border-left: 4px solid $primary-color;

  .workflow-icon {
    color: $primary-color;
  }

  &:hover {
    background-color: rgba($primary-color, 0.25);
  }
}

// Datasets card - blue color
.datasets-card {
  background-color: rgba($link-color, 0.15);
  border-left: 4px solid $link-color;

  .datasets-icon {
    color: $link-color;
  }

  &:hover {
    background-color: rgba($link-color, 0.25);
  }
}

// Baseline card - green color
.baseline-card {
  background-color: rgba($secondary-color, 0.15);
  border-left: 4px solid $secondary-color;

  .baseline-icon {
    color: $secondary-color;
  }

  &:hover {
    background-color: rgba($secondary-color, 0.25);
  }
}

// Publications card - red accent
.publications-card {
  background-color: rgba($error-color, 0.15);
  border-left: 4px solid $error-color;

  .publications-icon {
    color: $error-color;
  }

  &:hover {
    background-color: rgba($error-color, 0.25);
  }
}

.feature-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.feature-title {
  font-size: $font-size-xl;
  color: $text-color;
  margin-top: $spacing-md;
  font-weight: 500;
}

.feature-description {
  margin-top: $spacing-sm;
  color: $text-light-color;
  font-size: $font-size-base;
}

// Introduction Section
.intro-section {
  margin: $spacing-xl 0;
  background-color: $white;
}

.intro-content {
  padding: $spacing-lg;
}

.section-title {
  font-size: $font-size-xlarge;
  color: $text-color;
  margin-bottom: $spacing-md;
  text-align: left;
}

.intro-text {
  font-size: $font-size-base;
  line-height: 1.6;
  text-align: left;
  margin-bottom: $spacing-lg;
}

.pipeline-image-container {
  margin: $spacing-lg 0;
  text-align: center;
}

.pipeline-image {
  max-width: 100%;
  height: auto;
  border-radius: $border-radius;
}

.citation-title {
  font-size: $font-size-base;
  font-weight: 600;
  text-align: left;
  color: $text-color;
  margin-top: $spacing-lg;
  margin-bottom: $spacing-md;
}

.citation-block {
  font-size: $font-size-small;
  line-height: 1.6;
  text-align: left;
  padding-left: $spacing-md;
  border-left: 2px solid $text-color;
  margin: 0;
  color: $text-light-color;
}

.citation-link {
  color: $link-color;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

// Visualization Section
.visualization-section {
  margin: $spacing-xl 0;
  padding: 0 $spacing-md;
  max-width: $container-max-width;
  width: 100%;
  margin: 0 auto;

  .grid {
    display: grid;
    gap: $spacing-xl;
    margin-top: $spacing-xl;
  }
}

.visualization-card {
  background-color: $white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: $transition-base;
  height: 100%;
  min-height: 400px;
  width: 100%;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

.chart-title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $text-color;
  margin-bottom: $spacing-lg;
  text-align: center;
}

.chart-container {
  width: 100%;
  height: 350px;
  position: relative;
}

.toggle-chart-btn {
  padding: $spacing-sm $spacing-md;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  font-size: $font-size-small;
  transition: $transition-base;
  display: block;
  margin: 0 auto $spacing-sm;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
</style>