<template>
  <div>
    <div class="card-box" style="padding: 3.5rem 0">
      <el-input
        v-model="search"
        size="large"
        style="width: 50%; margin: 1.5rem 0"
        placeholder="Search"
        :suffix-icon="Search"
      />
    </div>
    <div
      style="
        padding: 1.5rem 0;
        margin-top: 1.5rem;
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      "
    >
      <div
        class="card-box"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 1.5rem;
        "
      >
      <router-link to="/home">
        <el-icon size="50px"><Tools /></el-icon>
        <div style=" font-size: 1.5rem; color: rgb(107 114 128); margin-top: 1.25rem;">
          quantms
        </div>
      </router-link>
      </div>
      <div class="card-box" style=" display: flex; flex-direction: column; align-items: center; justify-content: space-around; padding: 1.5rem;">
      <router-link to="/information" >
        <el-icon size="50px"><DocumentCopy /></el-icon>
        <div style=" font-size: 1.5rem; color: rgb(107 114 128); margin-top: 1.25rem;">
          datasets
        </div>
      </router-link>  
      </div>
      <div class="card-box" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around; padding: 1.5rem;">
      <router-link to="/ae">
        <el-icon size="50px"><Histogram /></el-icon>
        <div
          style="
            font-size: 1.5rem;
            color: rgb(107 114 128);
            margin-top: 1.25rem;
          "
        >
          absolute expression
        </div>
      </router-link>
      </div>
    </div>

    <div class="card-box">
<!--      <a href="https://nf-co.re/quantms">-->
<!--        <img :src="quantMsLogo" class="logo" />-->
<!--      </a>-->
      <div class="body-box">
<!--        <p class="body-title">Introduction</p>-->
        <p class="body-content">
          <a href="https://quantms.readthedocs.io/en/latest/">quantms</a> is a bioinformatics best-practice analysis pipeline
          for Quantitative Mass Spectrometry (MS), including: DDA-LFQ, plexDDA (e.g. TMT, iTRAQ), and DIA.
        </p>
        <img :src="pipeline" style="height: 150px; width: 800px"/>
        <p class="body-title" style="font-size: 16px">Citing quantms</p>
        <p class="cite-content">
          Chengxin Dai, Julianus Pfeuffer, Hong Wang et al. quantms: A
          cloud-based pipeline for proteomics reanalysis enables the
          quantification of 17521 proteins in 9,502 human samples., 01 June
          2023, PREPRINT (Version 1) available at Research Square
          <a href="https://doi.org/10.21203/rs.3.rs-3002027/v1"
            >[https://doi.org/10.21203/rs.3.rs-3002027/v1]</a
          >.
        </p>
      </div>
    </div>

    <div
      style="
        padding: 1.5rem 0;
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      "
    >
      <div
        class="card-box"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
        "
      >
        <img :src="logo" alt="img" style="width: 5rem; height: auto" />
      </div>
      <div
        class="card-box"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
        "
      >
        <img :src="logo" alt="img" style="width: 5rem; height: auto" />
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
// import quantMsLogo from "@/assets/images/nf-core-quantms_logo_light.png";
// import quantMsMetro from "@/assets/images/quantms_metro.png";
// import quantMs from "@/assets/images/quantms.png";
import pipeline from "@/assets/images/pipeline.png";
import {Tools, DocumentCopy, Histogram, Search} from "@element-plus/icons-vue";
// import logo from "@/assets/logo.png";
import logo from "@/assets/images/nf-core-quantms_logo_light.png";
const search = ref();
</script>
<style lang="scss" scoped>
.card-box {
  background-color: white;
  border-radius: 1rem;
}

.logo {
  height: 300px;
}
.body-box {
  // width: 80%;
  padding: 1.5rem;
  // margin: 10px auto;
}
.body-title {
  font-size: 1.5rem;
  font-weight: normal;
  text-align: left;
  color: rgb(75, 85, 99);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  margin-bottom: 10px;
  border-bottom: 2px solid rgb(229, 231, 235);
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
.body-flow {
  height: 709px;
  width: 498px;
}
.body-metro {
  height: 350px;
  width: 800px;
}
a {
  text-decoration: none;
}
.cite-content {
  font-family: "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  text-align: left;
  padding-left: 20px;
  border-left: 2px solid #000;
}
</style>
