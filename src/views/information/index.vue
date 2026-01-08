<template>
  <div class="datasets-page">
    <section class="datasets-section">
      <h1 class="section-title">Datasets Reanalyzed</h1>
      
      <div class="card container">
        <div class="datasets-header">
          <div class="search-container">
            <el-input
              v-model="searchProject"
              size="large"
              placeholder="Search by Accession or Category"
              :suffix-icon="Search"
              class="search-input"
            />
          </div>
        </div>
        
        <div class="datasets-tabs">
          <el-tabs type="border-card">
            <el-tab-pane label="Absolute Expression">
              <div class="datasets-table">
                <Table
                  :modelValue="filterAbsoluteTable"
                  @update:modelValue="tableDataAE = $event"
                ></Table>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="Differential Expression">
              <div class="datasets-table">
                <Table
                  :modelValue="filterDifferentialTable"
                  @update:modelValue="tableDataDE = $event"
                ></Table>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="Single Cell">
              <div class="datasets-table">
                <Table
                  :modelValue="filterSingleCellTable"
                  @update:modelValue="tableDataSingleCell = $event"
                ></Table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import Table from "@/components/Table/index.vue";
import { ref, onMounted, computed } from "vue";
import {
  getAbsolueExpression,
  getDifferentialExpression,
  getSingleCellExpression,
} from "@/api/getTable";

const tableDataAE = ref([]);
const tableDataDE = ref([]);
const tableDataSingleCell = ref([]);
const searchProject = ref('');

const initTable = async () => {
  const AE = await getAbsolueExpression();
  tableDataAE.value = AE.data;
  const DE = await getDifferentialExpression();
  tableDataDE.value = DE.data;
  const SingleCell = await getSingleCellExpression();
  tableDataSingleCell.value = SingleCell.data;
};

const filterAbsoluteTable = computed(() =>
  tableDataAE.value.filter(
    (data) =>
      !searchProject.value ||
      data.accession.id.toLowerCase().includes(searchProject.value.toLowerCase()) ||
      data.category.toLowerCase().includes(searchProject.value.toLowerCase())
  )
);

const filterDifferentialTable = computed(() =>
  tableDataDE.value.filter(
    (data) =>
      !searchProject.value ||
      data.accession.id.toLowerCase().includes(searchProject.value.toLowerCase()) ||
      data.category.toLowerCase().includes(searchProject.value.toLowerCase())
  )
);

const filterSingleCellTable = computed(() =>
  tableDataSingleCell.value.filter(
    (data) =>
      !searchProject.value ||
      data.accession.id.toLowerCase().includes(searchProject.value.toLowerCase()) ||
      data.category.toLowerCase().includes(searchProject.value.toLowerCase())
  )
);

onMounted(() => {
  initTable();
});
</script>

<style lang="scss" scoped>
.datasets-page {
  padding: $spacing-md 0;
  width: 100%;
}

.datasets-section {
  margin: $spacing-xl 0;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 100%;
}

.section-title {
  font-size: $font-size-2xl;
  color: $text-color;
  margin-bottom: $spacing-lg;
  text-align: center;
}

.datasets-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: $spacing-lg;
  border-bottom: 2px solid $border-color;
  padding-bottom: $spacing-md;
}

.search-container {
  width: 30%;
  
  @media (max-width: $breakpoint-md) {
    width: 50%;
  }
  
  @media (max-width: $breakpoint-sm) {
    width: 100%;
  }
}

.search-input {
  width: 100%;
}

.datasets-table {
  margin-top: $spacing-md;
}

.datasets-tabs {
  :deep(.el-tabs__content) {
    padding: $spacing-md;
  }
}
</style>
