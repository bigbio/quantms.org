<template>
  <el-container class="container">
    <el-header class="header">
      <Menu />
    </el-header>
    <!-- <el-container> -->
    <el-main class="main">
      <router-view />
    </el-main>
    <el-footer class="footer">
      <Footer />
    </el-footer>
    <!-- </el-container> -->
  </el-container>
</template>
<script setup>
import Menu from "./Menu";
import Footer from "./Footer";
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1152px;
  position: relative;
}

.header {
  position: sticky;
  width: 100%;
  background-color: rgb(249 250 251);
  top: 0;
  // margin: 0 auto;
  z-index: 100;
}

.main {
  // margin-top: 3.5rem;
  // background-color: white;
}

.aside {
  margin-left: 10px;
  // height: 2500px;
  background-color: #4b8f73;
}
.footer {
  border-top: 1px solid #ebecee;
}
</style>
