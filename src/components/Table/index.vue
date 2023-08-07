<template>
  <div>
    <el-table :data="tableData" @sort-change="onSortChange" border stripe style="width: 100%" :header-cell-style="{
      backgroundColor: 'white',
      color: '#000',
      fontSize: '16px',
    }" :cell-style="{}" height="1000">
      <el-table-column label="Accession" width="110">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-link :href="scope.row.accession.path" type="primary">{{
              scope.row.accession.id
            }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="Category" width="180" />
      <el-table-column prop="samples" label="Samples" width="100" />
      <el-table-column prop="msruns" label="Msruns" width="100" />
      <el-table-column prop="peptides" label="Peptides" min-width="100" sortable="custom">
        <template #default="scope">
          <el-tooltip effect="light" :content="scope.row.peptides" :offset="-50" placement="right-start">
            <el-progress :percentage="(100 * scope.row.peptides) / maxPeptides" :stroke-width="12" :show-text="false" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="proteins" label="Proteins" min-width="100" sortable="custom">
        <template #default="scope">
          <el-tooltip effect="light" :content="scope.row.proteins" :offset="-50" placement="right-start">
            <el-progress :percentage="(100 * scope.row.proteins) / maxProteins" :stroke-width="12" :show-text="false" />
          </el-tooltip>
        </template>
      </el-table-column>
      <!--      <el-table-column label="Title" min-width="400">-->
      <!--        <template #default="scope">-->
      <!--          <div style="display: flex; align-items: center">-->
      <!--            {{ scope.row.title.title }}-->
      <!--          </div>-->
      <!--          PubmedID:-->
      <!--          <span v-for="pubmed in scope.row.title.pubmedId" :key="pubmed.id">-->
      <!--            <text></text>-->
      <!--            <el-link :href="pubmed.path" type="primary">-->
      <!--              {{ pubmed.id }}-->
      <!--            </el-link>-->
      <!--          </span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="Reanalysis" min-width="140">
        <template #default="scope">
          <div style="display: flex; align-items: center" v-for="item in scope.row.reanalysis" :key="item.id">
            <div v-if="item.id === 1">
              <el-link :href="item.path" type="primary">{{ item.title }}<br /></el-link>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 10px" layout="pager,total" background :page-size="limit" :total="total"
      @current-change="handleCurrentChange" />
  </div>
</template>
<script setup>
import { computed, ref, onMounted, watch } from "vue";

const maxPeptides = ref(0);
const maxProteins = ref(0);
const currentPage = ref(1);
const sortedData = ref([]);

const props = defineProps({
  modelValue: {
    type: Array,
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

onMounted(() => { });

watch(
  () => props.modelValue,
  (val) => {
    maxPeptides.value = Math.max(...val.map((o) => o.peptides));
    maxProteins.value = Math.max(...val.map((o) => o.proteins));
    sortedData.value = [...val];
    console.log(maxPeptides.value, maxProteins.value);
  }
);

const total = computed(() => {
  return props.modelValue.length;
});

const tableData = computed(() => {
  const start = (currentPage.value - 1) * props.limit;
  const end = currentPage.value * props.limit;
  return sortedData.value.slice(start, end);
});

const handleCurrentChange = (val) => {
  currentPage.value = val;
};

const onSortChange = ({ prop, order }) => {
  let sortOrder = order == "ascending" ? 1 : -1;
  sortedData.value.sort((a, b) => {
    let v1 = a[prop];
    let v2 = b[prop];
    if (v1 < v2) return -1 * sortOrder;
    if (v1 > v2) return 1 * sortOrder;
    return 0;
  });
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background-color: white; //
    padding: 0 1rem;
    color: black;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).is-active {
    background-color: rgb(229, 231, 235); //
    padding: 0 1rem;
    border-radius: 0.25rem;
  }

  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #389a99;
  }
}
</style>
