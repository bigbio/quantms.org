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
      <h2 class="section-title">Data Visualizations</h2>
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
import { ref, onMounted } from 'vue';
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
  initProteinsPerProjectChart();
  initPeptidesPerProjectChart();
  initProteinsPerTissueChart();
};

// Initialize proteins per project chart
const initProteinsPerProjectChart = () => {
  if (!proteinsPerProjectChart.value) return;

  // Combine all datasets
  const allData = [...aeData.value, ...deData.value, ...singleCellData.value];

  // Process data for histogram
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

  // Format bin labels
  const binLabels = bins.map((bin, index) => {
    if (index === bins.length - 1) return `${bin}+`;
    return `${bin}-${bins[index + 1]}`;
  });

  // Initialize chart
  proteinsPerProjectInstance = echarts.init(proteinsPerProjectChart.value);

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} projects'
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '10%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: binLabels,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        rotate: 45,
        fontSize: 10,
        margin: 8
      }
    },
    yAxis: {
      type: 'value',
      name: 'Projects',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        fontSize: 10
      },
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          opacity: 0.3
        }
      }
    },
    series: [
      {
        data: counts,
        type: 'bar',
        itemStyle: {
          color: '#389a99'
        },
        barWidth: '60%'
      }
    ]
  };

  proteinsPerProjectInstance.setOption(option);
};

// Initialize peptides per project chart
const initPeptidesPerProjectChart = () => {
  if (!peptidesPerProjectChart.value) return;

  // Combine all datasets
  const allData = [...aeData.value, ...deData.value, ...singleCellData.value];

  // Process data for histogram
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

  // Format bin labels
  const binLabels = bins.map((bin, index) => {
    if (index === bins.length - 1) return `${bin}+`;
    return `${bin}-${bins[index + 1]}`;
  });

  // Initialize chart
  peptidesPerProjectInstance = echarts.init(peptidesPerProjectChart.value);

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} projects'
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '10%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: binLabels,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        rotate: 45,
        fontSize: 10,
        margin: 8
      }
    },
    yAxis: {
      type: 'value',
      name: 'Number of Projects',
      nameLocation: 'middle',
      nameGap: 40,
      axisLabel: {
        fontSize: 10
      },
      nameTextStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        data: counts,
        type: 'bar',
        itemStyle: {
          color: '#2563eb'
        },
        barWidth: '60%'
      }
    ]
  };

  peptidesPerProjectInstance.setOption(option);
};

// Initialize proteins per tissue chart
const initProteinsPerTissueChart = () => {
  if (!proteinsPerTissueChart.value || !tissueData.value || !tissueData.value.length) return;

  // Process tissue data - count proteins per tissue
  const tissueProteins = {};

  // Count proteins for each tissue
  tissueData.value.forEach(protein => {
    if (protein.tags && Array.isArray(protein.tags)) {
      protein.tags.forEach(tissue => {
        if (!tissueProteins[tissue]) {
          tissueProteins[tissue] = 1;
        } else {
          tissueProteins[tissue]++;
        }
      });
    }
  });

  // Convert to array and sort by protein count
  const processedTissueData = Object.entries(tissueProteins)
    .map(([tissue, count]) => ({ tissue, proteins: count }))
    .sort((a, b) => b.proteins - a.proteins)
    .slice(0, 15); // Take top 15 tissues

  // Initialize chart
  proteinsPerTissueInstance = echarts.init(proteinsPerTissueChart.value);

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} proteins'
    },
    grid: {
      left: '15%',
      right: '5%',
      bottom: '5%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 10,
        margin: 8
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          opacity: 0.3
        }
      }
    },
    yAxis: {
      type: 'category',
      data: processedTissueData.map(item => item.tissue),
      axisLabel: {
        fontSize: 10,
        margin: 8
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        data: processedTissueData.map(item => item.proteins),
        type: 'bar',
        itemStyle: {
          color: '#4b8f73'
        },
        barWidth: '60%',
        label: {
          show: true,
          position: 'right',
          fontSize: 10,
          color: '#666'
        }
      }
    ]
  };

  proteinsPerTissueInstance.setOption(option);
};

// Handle window resize
const handleResize = () => {
  proteinsPerProjectInstance?.resize();
  peptidesPerProjectInstance?.resize();
  proteinsPerTissueInstance?.resize();
};

// Lifecycle hooks
onMounted(() => {
  fetchData();
  window.addEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
.home-page {
  padding: $spacing-md 0;
}

// Feature Cards
.feature-section {
  margin: $spacing-xl 0;
}

.grid-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: $transition-base;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 220px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

// Workflow card - primary teal color
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
  font-size: $font-size-large;
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
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.visualization-card {
  background-color: $white;
  border-radius: $border-radius-lg;
  padding: $spacing-md;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.chart-title {
  font-size: $font-size-base;
  font-weight: 600;
  color: $text-color;
  margin-bottom: $spacing-md;
  text-align: center;
}

.chart-container {
  width: 100%;
  height: 300px;
  border-radius: $border-radius;
}
</style>