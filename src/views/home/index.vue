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
        <img :src="logo" alt="img" style="width: 5rem; height: auto" />
        <div
          style="
            font-size: 1.5rem;
            color: rgb(107 114 128);
            margin-top: 1.25rem;
          "
        >
          quantms
        </div>
      </div>
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
        <img :src="logo" alt="img" style="width: 5rem; height: auto" />
        <div
          style="
            font-size: 1.5rem;
            color: rgb(107 114 128);
            margin-top: 1.25rem;
          "
        >
          datasets
        </div>
      </div>
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
        <img :src="logo" alt="img" style="width: 5rem; height: auto" />
        <div
          style="
            font-size: 1.5rem;
            color: rgb(107 114 128);
            margin-top: 1.25rem;
          "
        >
          absolute expression
        </div>
      </div>
    </div>

    <div class="card-box">
      <a href="https://nf-co.re/quantms">
        <img :src="quantMsLogo" class="logo" />
      </a>
      <div class="body-box">
        <p class="body-title">Introduction</p>
        <p class="body-content">
          nf-core/quantms is a bioinformatics best-practice analysis pipeline
          for Quantitative Mass Spectrometry (MS). Currently, the workflow
          supports three major MS-based analytical methods: (i) Data dependant
          acquisition (DDA) label-free and Isobaric quantitation (e.g. TMT,
          iTRAQ); (ii) Data independent acquisition (DIA) label-free
          quantification (for details see our in-depth documentation on
          <a href="https://quantms.readthedocs.io/en/latest/">quantms</a>).
        </p>
        <img :src="quantMs" class="body-flow" />
        <p class="body-content">
          The pipeline is built using
          <a href="https://www.nextflow.io/">Nextflow</a>, a workflow tool to
          run tasks across multiple compute infrastructures in a very portable
          manner. It uses Docker/Singularity containers making installation
          trivial and results highly reproducible. The
          <a href="https://www.nextflow.io/docs/latest/dsl2.html"
            >Nextflow DSL2</a
          >
          implementation of this pipeline uses one container per process which
          makes it much easier to maintain and update software dependencies.
          Where possible, these processes have been submitted to and installed
          from
          <a href="https://github.com/nf-core/modules">nf-core/modules</a> in
          order to make them available to all nf-core pipelines, and to everyone
          within the Nextflow community!
        </p>
        <p class="body-content">
          On release, automated continuous integration tests run the pipeline on
          a full-sized dataset on the AWS cloud infrastructure. This ensures
          that the pipeline runs on AWS, has sensible resource allocation
          defaults set to run on real-world datasets, and permits the persistent
          storage of results to benchmark between pipeline releases and other
          analysis sources. The results obtained from the full-sized test can be
          viewed on the
          <a href="https://nf-co.re/quantms/results">nf-core website</a>. This
          gives you a hint on which reports and file types are produced by the
          pipeline in a standard run. The automatic continuous integration tests
          evaluate different workflows, including the peptide identification,
          quantification for LFQ, LFQ-DIA, and TMT test datasets.
        </p>
        <p class="body-title">Pipeline summary</p>
        <p class="body-content">
          A graphical overview of suggested routes through the pipeline
          depending on context can be seen below.
        </p>
        <img :src="quantMsMetro" class="body-metro" />
        <p class="body-title">Citations</p>
        <p class="body-content">
          If you use nf-core/quantms for your analysis, please cite it using the
          following:<br />
        </p>
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
import quantMsLogo from "@/assets/images/nf-core-quantms_logo_light.png";
import quantMsMetro from "@/assets/images/quantms_metro.png";
import quantMs from "@/assets/images/quantms.png";
import { Search } from "@element-plus/icons-vue";
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
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  text-align: left;
  padding-left: 20px;
  border-left: 2px solid #000;
}
</style>
