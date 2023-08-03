<template>
  <div class="page">
    <div class="card-box">
      <div 
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid rgb(229, 231, 235);
          margin-bottom: 1rem;
        "
      >
        <div style="font-size: 1.5rem; color: rgb(75, 85, 99)"> Datasets Reanalyzed </div>
        <el-input
          v-model="search1"
          size="large"
          style="width: 30%; margin: 1.5rem 0"
          placeholder="Search"
          :suffix-icon="Search"
        />
      </div>
      <Table
        :modelValue="fullTable" @update:modelValue="fullTable = $event"
      ></Table>
    </div>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
import Table from "@/components/Table/index.vue";
import { ref, onMounted } from "vue";
import {
  getAbsolueExpression,
  getDifferentialExpression,
} from "@/api/getTable";
const tableDataAE = ref([]);
const tableDataDE = ref([]);
const fullTable = ref([]);
const initTable = async () => {
  const AE = await getAbsolueExpression();
  tableDataAE.value = AE.data;
  const DE = await getDifferentialExpression();
  tableDataDE.value = DE.data;
  fullTable.value = [...AE.data, ...DE.data];
};

const search1 = ref();
// const search2 = ref();

onMounted(() => {
  initTable();
});
</script>
<style lang="scss" scoped>
.title {
  font-size: 32px;
  font-style: italic;
  font-family: "Times New Roman", Times, serif;
}
.page {
  // width: 95%;
  // margin: 12px auto;
}

.card-box{
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem
}
.body-title {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.body-content {
  font-family: "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  text-align: left;
  margin-top: 14px;
}
</style>
