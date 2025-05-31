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
    >
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
        width="100"
      />
      
      <!-- Msruns Column -->
      <el-table-column
        prop="msruns"
        label="Msruns"
        width="100"
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
.data-table-container {
  width: 100%;
  margin-bottom: $spacing-lg;
}

.data-table {
  width: 100%;
  border-radius: $border-radius;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
</style>
