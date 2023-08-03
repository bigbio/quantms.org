<template>
  <div class="display-box">
    <div class="search-box">
      <div style="color: rgb(75, 85, 99); font-weight: bold; font-size: 2rem">
        Protein Search
      </div>

      <div style="
          margin-top: 1rem;
          padding: 1rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        ">
        <div style="">
          <el-select v-model="sapiens" class="left" size="large" placeholder="Select organism" style="width: 140px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="input" placeholder="protein name" size="large" clearable @keyup.enter.native="onEnter"
            class="input" :suffix-icon="Search" />
        </div>
      </div>
      <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 1.5rem;
        ">
        <el-button type="primary" round @click="onSearch('LRBA_HUMAN')">LRBA_HUMAN</el-button>
        <el-button type="primary" round @click="onSearch('PGAM5_HUMAN')">PGAM5_HUMAN</el-button>
        <el-button type="primary" round @click="onSearch('LRP8_HUMAN')">LRP8_HUMAN</el-button>
      </div>
    </div>
    <!-- <p>
      Find the iBAQ distribution for your protein of interest, e.g. ABCD4_HUMAN
    </p> -->
    <!--  Image  -->
    <div style="
        margin-top: 1rem;
        background-color: white;
        border-radius: 1rem;
        min-height: 10rem;
        padding: 1rem;
      ">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
const router = useRouter();
// sapiens
const sapiens = ref("");
// select_menus
const options = [
  {
    value: "Homo sapiens",
    label: "Homo sapiens",
  },
];

const input = ref("");

const onEnter = () => {
  onSearch(input.value);
  if (!input.value) {
    return;
  }
  router.push({ path: "/ae/tissues", query: { protein: input.value } });
};

const onSearch = (val) => {
  if (!val) {
    return;
  }
  input.value = val;
  router.push({ path: "/ae/tissues", query: { protein: val } });
};
</script>
<style lang="scss" scoped>
::v-deep {
  .left .el-input__wrapper {
    border-right-width: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-width: 0 !important;
    border: 1px solid rgb(220, 223, 230);
    box-shadow: none;
  }

  .input .el-input__wrapper {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left-width: 0;
    border: 1px solid rgb(220, 223, 230);
    box-shadow: none;
  }
}

.display-box {
  // margin: 0 20px;
}

.search-box {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.introduction-msg {
  font-family: "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  text-align: left;
  border: 1px solid red;
  margin-bottom: 20px;
}

.input {
  width: 400px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: aqua;
  display: flex;
  align-items: center;
}

h1 {
  text-align: left;
}

.search-box {
  display: flex;
  margin-bottom: 2px;
}

.display-box p {
  text-align: left;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 32px;
  margin-left: 2px;
}

.title {
  font-size: 40px;
  // font-style: italic;
  font-family: "Times New Roman", Times, serif;
}

.link {
  text-decoration: none;
}
</style>
