<template>
  <div class="page">
    <!-- <h1 class="title">quantms reanalysis</h1>
    <p class="body-content">
      A total of 118 datasets were reanalyzed using quantms version 1.1, UniProt
      protein sequence database (version 10.20222), only the SwissProt (reviewed
      proteins) without isoforms information. All datasets have been deposited
      in
      <a
        href="http://ftp.pride.ebi.ac.uk/pub/databases/pride/resources/proteomes/"
        >PRIDE Archive public FTP</a
      >. All datasets were filtered at a 1% false discovery rate (FDR) at PSM
      and protein levels for all datasets. All parameters including the
      posttranslational modifications, precursor and fragment tolerances can be
      found for each dataset in the corresponding SDRF. Following 2 tables show
      the list of AE and DE datasets reanalyzed including the number of samples,
      ms runs, unique peptides and unique proteins for each dataset, as well as
      reanalysis results and publication information.
    </p> -->
    <div class="card-box">
      <!-- <p class="body-title">absolute-expression</p> -->
      <div 
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid rgb(229, 231, 235);
          margin-bottom: 1rem;
        "
      >
        <div style="font-size: 1.5rem; color: rgb(75, 85, 99)">
          absolute-expression
        </div>
        <el-input
          v-model="search1"
          size="large"
          style="width: 30%; margin: 1.5rem 0"
          placeholder="Search"
          :suffix-icon="Search"
        />
      </div>
      <Table
        :modelValue="tableDataAE"
        @update:modelValue="tableDataAE = $event"
      ></Table>
    </div>

    <div class="card-box" style="margin-top:3rem;">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid rgb(229, 231, 235);
          margin-bottom: 1rem;
        "
      >
        <div style="font-size: 1.5rem; color: rgb(75, 85, 99)">
          differential-expression
        </div>
        <el-input
          v-model="search2"
          size="large"
          style="width: 30%; margin: 1.5rem 0"
          placeholder="Search"
          :suffix-icon="Search"
        />
      </div>

      <!-- <p class="body-title">differential-expression</p> -->
      <Table
        :modelValue="tableDataDE"
        @update:modelValue="tableDataDE = $event"
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
const initTable = async () => {
  const AE = await getAbsolueExpression();
  tableDataAE.value = AE.data;
  const DE = await getDifferentialExpression();
  tableDataDE.value = DE.data;
};

const search1 = ref();
const search2 = ref();

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
