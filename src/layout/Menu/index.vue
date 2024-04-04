<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 3.5rem;
      background-color: white;
    "
  >
    <el-image
      style=" height: 60px; margin: 0 0"
      :src="logo"
      fit="fill"
    />
    <div>
      <router-link class="navBar" to="/home">Home</router-link>
      <router-link class="navBar" to="/datasets">Datasets</router-link>
      <router-link class="navBar" to="/baseline">Baseline</router-link>
    </div>
  </div>
</template>

<script setup>
import logo from "@/assets/images/logo_complete.png";
// import logo from "@/assets/logo.png";
// import logo from "@/assets/icons/ebi.jpg";
</script>

<style lang="scss" scoped>

.navBar {
  padding: 0 1.25rem;
  color: black;
  text-decoration: none;
}

.navBar:hover {
  color: rgb(37, 99, 235);

}

</style>
