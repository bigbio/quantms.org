<template>
  <div>
  <div class="display-box">
    <div class="search-box">
      <div style="color: rgb(75, 85, 99); font-weight: bold; font-size: 2rem">
        Protein Search
      </div>

      <div
        style="
          margin-top: 1rem;
          padding: 1rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          /* border-bottom: 2px solid rgb(229, 231, 235); */
        "
      >
        <div style="">
          <el-select
            v-model="sapiens"
            class="left"
            size="large"
            placeholder="Select organism"
            style="width: 140px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="input"
            placeholder="protein name"
            size="large"
            clearable
            @keyup.enter.native="onEnter"
            class="input"
            :suffix-icon="Search"
          />
        </div>
      </div>
      <div class="select-box">
          <span>select type:</span>
          <el-check-tag :checked="checkedTissue" @change="onChangeTissue" style="margin-right: 8px; font-size: 10px; border-radius: 6px;">tissue</el-check-tag>
          <el-check-tag :checked="checkedCellLine" @change="onChangeCellLine" style="font-size: 10px; border-radius: 6px;" >cell line</el-check-tag>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 0.1rem;
        "
      > 
      <el-text>Examples:
        <span @click="onSearch('P50851')"
          >P50851, </span
        >
        <span @click="onSearch('Q96HS1')"
          >Q96HS1, </span>
        <span @click="onSearch('Q14114')"
          >Q14114</span
        >
        &nbsp;&nbsp;Help:<span>&nbsp;<a  href="https://github.com/bigbio/ibaqpy">iBAQLog</a></span>
      </el-text>
      </div>
    </div>
    <!--  Image  -->
    <div
      style="
        margin-top: 1rem;
        background-color: white;
        border-radius: 1rem;
        min-height: 10rem;
        padding: 1rem;
      "
      v-loading="loading"
      element-loading-text="loading"
    >
      <router-view :key="key" @changeLoading="changeLoading" ></router-view>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref,computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
const router = useRouter();
const loading = ref(false)
// sapiens
const sapiens = ref("");
// select_menus
const options = [
  {
    value: "Homo sapiens",
    label: "Homo sapiens",
  },
];
const checkedTissue = ref(true)
const checkedCellLine = ref(false)
const key = computed(() => router.currentRoute.value.name == 'tissues' ? 'tissues' : 'cellline')
onMounted(() => {
  let status = router.currentRoute.value.name == 'cellline' ? true : false
  checkedTissue.value = !status
  checkedCellLine.value = status
})
const input = ref("");

const onEnter = () => {
  onSearch(input.value);
  if (!input.value) {
    return;
  }
  if (checkedTissue.value) {
    router.push({ path: "/baseline/tissues", query: { protein: [input.value] } });
  } else {
    router.push({ path: "/baseline/cellline", query: { protein: [input.value] } });
  }
  
};
// change tag status
const onChangeTissue = (status) => {
  checkedTissue.value = status
  checkedCellLine.value = !status
}
const onChangeCellLine = (status) => {
  checkedCellLine.value = status
  checkedTissue.value = !status
}

const onSearch = (val) => {
  if (!val) {
    return;
  }
  input.value = val;
  if (checkedTissue.value) {
    router.push({ path: "/baseline/tissues", query: { protein: [val] } });  
  } else {
    router.push({ path: "/baseline/cellline", query: { protein: [val] } }); 
  }
  
};
const changeLoading = () => {
  loading.value = !loading.value;
}
</script>
<style lang="scss" scoped>
::v-deep {
  .left .el-input__wrapper {
    border-right-width: 0; 
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-width: 0 !important;
    border:1px solid rgb(220, 223, 230);
    box-shadow: none;
  }

  .input .el-input__wrapper{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left-width: 0;
    border:1px solid rgb(220, 223, 230);
    box-shadow: none;
  }
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
.button-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  //width: 100%;
  margin-top:1.5rem;
}
.el-text span:hover{
  color:#84c7d0;
  cursor: pointer;
}
.el-text span a {
  text-decoration: none;
}

.el-text span a:hover{
  color:#84c7d0;
  cursor: pointer;
}
.select-box {
    margin: 0.5rem 0;
    > span {
      margin-right: 1rem;
      font-size: 18px;
      font-weight: 700;
    }
}
.el-check-tag {
  font-size: 10px;
}
</style>
