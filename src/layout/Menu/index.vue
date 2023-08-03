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
      <router-link class="navBar" to="/datasets">Datasets</router-link>
      <router-link class="navBar" to="/ae">Absolute</router-link>
    </div>
  </div>
</template>

<script setup>
import logo from "@/assets/images/nf-core-quantms_logo_light.png";
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
