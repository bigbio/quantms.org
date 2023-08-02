<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :header-cell-style="{
        backgroundColor: 'white',
        color: '#000',
        fontSize: '16px',
      }"
      :cell-style="{}"
      height="1000"
    >
      <el-table-column label="Accession" min-width="110">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-link :href="scope.row.accession.path" type="primary">{{
              scope.row.accession.id
            }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="samples" label="Samples" min-width="100" />
      <el-table-column prop="msruns" label="Msruns" min-width="100" />
      <el-table-column prop="peptides" label="Peptides" min-width="100" />
      <el-table-column prop="proteins" label="Proteins" min-width="100" />
      <el-table-column label="Title" min-width="400">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            {{ scope.row.title.title }}
          </div>
          PubmedID:
          <span v-for="pubmed in scope.row.title.pubmedId" :key="pubmed.id">
            <text></text>
            <el-link :href="pubmed.path" type="primary">
              {{ pubmed.id }}
            </el-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Reanalysis" min-width="140">
        <template #default="scope">
          <div
            style="display: flex; align-items: center"
            v-for="item in scope.row.reanalysis"
            :key="item.id"
          >
            <el-link :href="item.path" type="primary"
              >{{ item.title }};<br
            /></el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      layout="pager,total"
      background
      :page-size="limit"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
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
    default: 10,
  },
});

const total = computed(() => {
  return props.modelValue.length;
});

const currentPage = ref(1);

const tableData = computed(() => {
  const start = (currentPage.value - 1) * props.limit;
  const end = currentPage.value * props.limit;
  return props.modelValue.slice(start, end);
});

const handleCurrentChange = (val) => {
  console.log(val);
  currentPage.value = val;
};
</script>
<style lang="scss" scoped>
::v-deep {
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background-color: white; // 进行修改未选中背景和字体
    padding: 0 1rem;
    color: black;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).is-active {
    background-color: rgb(229, 231, 235); // 进行修改选中项背景和字体
    padding: 0 1rem;
    border-radius: 0.25rem;
  }

  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #389a99;
  }
}
</style>
