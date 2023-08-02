<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 3.5rem;
    "
  >
    <el-image
      style=" height: 40px; margin: 0 0"
      :src="logo"
      fit="fill"
    />
    <div>
      <router-link class="navBar" to="/home">Quantms</router-link>
      <router-link class="navBar" to="/information">Datasets</router-link>
      <router-link class="navBar" to="/ae">Absolute</router-link>
    </div>
    <!-- <el-menu
      active-text-color="#ffd04b"
      background-color="#4B8F73"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#fff"
      router
      unique-opened
    >
      <el-menu-item index="/home">
        <span>Introduction</span>
      </el-menu-item>
      <el-menu-item index="/information">
        <span>Datasets</span>
      </el-menu-item>
      <el-menu-item index="/ae">
        <span>Visualization</span>
      </el-menu-item>
    </el-menu> -->
  </div>
</template>

<script setup>
import logo from "@/assets/images/nf-core-quantms_logo_light.png";
// import logo from "@/assets/logo.png";
// import logo from "@/assets/icons/ebi.jpg";
</script>

<style lang="scss" scoped>
// .el-menu-item {
//   width: 200px;
// }
// .el-menu-item span {
//   text-align: center;
//   font-size: 16px;
//   color: #11202c;
//   margin-left: 20px;
// }
.navBar {
  padding: 0 1.25rem;
  color: black;
  text-decoration: none;
}

.navBar:hover {
  color: rgb(37, 99, 235);

}


</style>
