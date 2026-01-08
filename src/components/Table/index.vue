<template>
  <div class="data-table-container">
    <el-table
      :data="tableData"
      @sort-change="onSortChange"
      border
      stripe
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      height="800"
      class="data-table"
      @expand-change="handleExpandChange"
    >
      <!-- Expandable Column -->
      <el-table-column type="expand">
        <template #default="props">
          <div v-loading="loading" class="expanded-content">
            <template v-if="datasetDetails[props.row.accession.id]">
              <div class="dataset-details">
                <h3 class="detail-title">{{ datasetDetails[props.row.accession.id].title }}</h3>
                
                <div class="detail-section">
                  <h4>Abstract</h4>
                  <p>{{ datasetDetails[props.row.accession.id].description }}</p>
                </div>

                <div class="detail-section">
                  <h4>Publication</h4>
                  <div v-if="props.row.title.pubmedId" class="publication-links">
                    <a 
                      v-for="pub in props.row.title.pubmedId" 
                      :key="pub.id"
                      :href="pub.path"
                      target="_blank"
                      class="publication-link"
                    >
                      PubMed ID: {{ pub.id }}
                    </a>
                  </div>
                  <div v-if="datasetDetails[props.row.accession.id].references" class="reference-details">
                    <p v-for="ref in datasetDetails[props.row.accession.id].references" :key="ref.pubmedID" class="reference-text">
                      {{ ref.referenceLine }}
                    </p>
                  </div>
                </div>

                <div class="detail-section">
                  <h4>Lab Information</h4>
                  <div v-if="datasetDetails[props.row.accession.id].labPIs?.length" class="lab-info">
                    <h5>Principal Investigators:</h5>
                    <div v-for="pi in datasetDetails[props.row.accession.id].labPIs" :key="pi.id" class="person-info">
                      <p>
                        <strong>Name:</strong> {{ pi.title }} {{ pi.firstName }} {{ pi.lastName }}<br>
                        <strong>Affiliation:</strong> {{ pi.affiliation }}<br>
                        <strong>ORCID:</strong> {{ pi.orcid || 'Not specified' }}
                      </p>
                    </div>
                  </div>
                  <div v-if="datasetDetails[props.row.accession.id].submitters?.length" class="lab-info">
                    <h5>Submitters:</h5>
                    <div v-for="submitter in datasetDetails[props.row.accession.id].submitters" :key="submitter.id" class="person-info">
                      <p>
                        <strong>Name:</strong> {{ submitter.title }} {{ submitter.firstName }} {{ submitter.lastName }}<br>
                        <strong>Affiliation:</strong> {{ submitter.affiliation }}<br>
                        <strong>ORCID:</strong> {{ submitter.orcid || 'Not specified' }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="detail-section" v-if="datasetDetails[props.row.accession.id].keywords?.length">
                  <h4>Keywords</h4>
                  <div class="keywords">
                    <el-tag
                      v-for="keyword in datasetDetails[props.row.accession.id].keywords"
                      :key="keyword"
                      class="keyword-tag"
                      size="small"
                    >
                      {{ keyword }}
                    </el-tag>
                  </div>
                </div>

                <div class="detail-section metadata">
                  <h4>Additional Information</h4>
                  <p>
                    <strong>Submission Date:</strong> {{ formatDate(datasetDetails[props.row.accession.id].submissionDate) }}<br>
                    <strong>Publication Date:</strong> {{ formatDate(datasetDetails[props.row.accession.id].publicationDate) }}<br>
                    <strong>DOI:</strong> {{ datasetDetails[props.row.accession.id].doi || 'Not specified' }}
                  </p>
                </div>
              </div>
            </template>
            <el-empty v-else description="No additional details available" />
          </div>
        </template>
      </el-table-column>
      
      <!-- Accession Column -->
      <el-table-column label="Accession" width="110">
        <template #default="scope">
          <div class="d-flex align-center">
            <el-link
              :href="scope.row.accession.path"
              type="primary"
              class="accession-link"
            >
              {{ scope.row.accession.id }}
            </el-link>
          </div>
        </template>
      </el-table-column>
      
      <!-- Category Column -->
      <el-table-column
        prop="category"
        label="Category"
        width="180"
      />
      
      <!-- Samples Column -->
      <el-table-column
        prop="samples"
        label="Samples"
        width="120"
        sortable="custom"
      />
      
      <!-- Msruns Column -->
      <el-table-column
        prop="msruns"
        label="Msruns"
        width="120"
        sortable="custom"
      />
      
      <!-- Peptides Column -->
      <el-table-column
        prop="peptides"
        label="Peptides"
        min-width="100"
        sortable="custom"
      >
        <template #default="scope">
          <el-tooltip
            effect="light"
            :content="scope.row.peptides.toString()"
            :offset="-50"
            placement="right-start"
          >
            <el-progress
              :percentage="calculatePercentage(scope.row.peptides, maxPeptides)"
              :stroke-width="12"
              :show-text="false"
              class="data-progress"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      
      <!-- Proteins Column -->
      <el-table-column
        prop="proteins"
        label="Proteins"
        min-width="100"
        sortable="custom"
      >
        <template #default="scope">
          <el-tooltip
            effect="light"
            :content="scope.row.proteins.toString()"
            :offset="-50"
            placement="right-start"
          >
            <el-progress
              :percentage="calculatePercentage(scope.row.proteins, maxProteins)"
              :stroke-width="12"
              :show-text="false"
              class="data-progress"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      
      <!-- Reanalysis Column -->
      <el-table-column
        label="Reanalysis"
        min-width="140"
      >
        <template #default="scope">
          <div
            v-for="item in scope.row.reanalysis"
            :key="item.id"
            class="reanalysis-item"
          >
            <div v-if="item.id === 1">
              <el-link
                :href="item.path"
                type="primary"
                class="reanalysis-link"
              >
                {{ item.title }}
              </el-link>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- Pagination -->
    <el-pagination
      class="table-pagination"
      layout="pager,total"
      background
      :page-size="limit"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { getPrideDatasetDetails, getProxiDatasetDetails } from "@/api/getTable";
import { formatDate } from '@/utils/date';

// Reactive state
const maxPeptides = ref(0);
const maxProteins = ref(0);
const currentPage = ref(1);
const sortedData = ref([]);

// Table styling
const headerCellStyle = {
  backgroundColor: 'white',
  color: '#000',
  fontSize: '16px',
  fontWeight: '600'
};

const cellStyle = {
  fontSize: '14px'
};

// Props definition
const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 25,
  },
});

// Lifecycle hooks
onMounted(() => {
  // Initialize component
});

// Watch for changes in data
watch(
  () => props.modelValue,
  (val) => {
    if (val && val.length > 0) {
      maxPeptides.value = Math.max(...val.map((o) => o.peptides));
      maxProteins.value = Math.max(...val.map((o) => o.proteins));
      sortedData.value = [...val];
    } else {
      sortedData.value = [];
    }
  },
  { immediate: true }
);

// Computed properties
const total = computed(() => {
  return props.modelValue?.length || 0;
});

const tableData = computed(() => {
  const start = (currentPage.value - 1) * props.limit;
  const end = currentPage.value * props.limit;
  return sortedData.value.slice(start, end);
});

// Dataset details state
const datasetDetails = ref({});
const loading = ref(false);

// Handle row expansion
const handleExpandChange = async (row, expandedRows) => {
  if (expandedRows.length > 0 && !datasetDetails.value[row.accession.id]) {
    loading.value = true;
    try {
      let details;
      if (row.accession.id.startsWith('PXD')) {
        const response = await getPrideDatasetDetails(row.accession.id);
        details = {
          title: response.data.title,
          description: response.data.projectDescription,
          labPIs: response.data.labPIs,
          submitters: response.data.submitters,
          keywords: response.data.keywords,
          references: response.data.references,
          submissionDate: response.data.submissionDate,
          publicationDate: response.data.publicationDate,
          doi: response.data.doi
        };
      } else {
        const response = await getProxiDatasetDetails(row.accession.id);
        details = {
          title: response.data.title,
          description: response.data.description,
          labHead: response.data.principal_investigator,
          submitter: response.data.submitter
        };
      }
      datasetDetails.value[row.accession.id] = details;
    } catch (error) {
      console.error('Error fetching dataset details:', error);
    } finally {
      loading.value = false;
    }
  }
};

// Methods
const handleCurrentChange = (val) => {
  currentPage.value = val;
};

const onSortChange = ({ prop, order }) => {
  const sortOrder = order === "ascending" ? 1 : -1;
  sortedData.value.sort((a, b) => {
    const v1 = a[prop];
    const v2 = b[prop];
    if (v1 < v2) return -1 * sortOrder;
    if (v1 > v2) return 1 * sortOrder;
    return 0;
  });
};

const calculatePercentage = (value, max) => {
  if (!max) return 0;
  return (100 * value) / max;
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.data-table-container {
  width: 100%;
  margin-bottom: $spacing-lg;
}

.data-table {
  width: 100%;
  border-radius: $border-radius;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  :deep(.el-table__header) {
    th {
      .cell {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 24px !important;
        
        .caret-wrapper {
          margin-left: $spacing-sm;
          position: absolute;
          right: 8px;
        }
      }
    }
  }
}

.accession-link,
.reanalysis-link {
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
}

.reanalysis-item {
  margin-bottom: $spacing-xs;
}

.data-progress {
  :deep(.el-progress-bar__inner) {
    background-color: $primary-color;
  }
}

.table-pagination {
  margin-top: $spacing-md;
  display: flex;
  justify-content: center;
  
  :deep(.el-pagination.is-background .el-pager li:not(.disabled)) {
    background-color: $white;
    padding: 0 $spacing-md;
    color: $text-color;
  }

  :deep(.el-pagination.is-background .el-pager li:not(.disabled).is-active) {
    background-color: $primary-color;
    color: $white;
    padding: 0 $spacing-md;
    border-radius: $border-radius;
  }

  :deep(.el-pagination.is-background .el-pager li:not(.disabled):hover) {
    color: $primary-color;
  }
}

.expanded-content {
  padding: $spacing-lg;
  background-color: rgba($primary-color, 0.05);
}

.dataset-details {
  max-width: 800px;
  margin: 0 auto;
}

.detail-title {
  font-size: $font-size-lg;
  color: $text-color;
  margin-bottom: $spacing-md;
  font-weight: 600;
}

.detail-section {
  margin-bottom: $spacing-lg;

  h4 {
    font-size: $font-size-base;
    color: $text-color;
    margin-bottom: $spacing-sm;
    font-weight: 500;
  }

  p {
    color: $text-light-color;
    line-height: 1.6;
    margin: 0;
  }
}

.publication-links {
  display: flex;
  gap: $spacing-md;
  flex-wrap: wrap;
}

.publication-link {
  color: $link-color;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.reference-text {
  font-style: italic;
  margin-bottom: $spacing-sm;
}

.lab-info {
  margin-bottom: $spacing-md;

  h5 {
    font-size: $font-size-base;
    color: $text-color;
    margin-bottom: $spacing-xs;
  }
}

.person-info {
  padding: $spacing-sm;
  background-color: rgba($white, 0.5);
  border-radius: $border-radius-sm;
  margin-bottom: $spacing-sm;

  p {
    margin: 0;
  }
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
}

.keyword-tag {
  background-color: rgba($primary-color, 0.1);
  color: $text-color;
  border: 1px solid rgba($primary-color, 0.2);
}

.metadata {
  background-color: rgba($white, 0.5);
  padding: $spacing-md;
  border-radius: $border-radius;
}
</style>
