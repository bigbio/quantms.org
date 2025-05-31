<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <Menu />
    </el-header>
    <el-main class="layout-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
    <el-footer class="layout-footer">
      <Footer />
    </el-footer>
  </el-container>
</template>

<script setup>
import Menu from "./Menu";
import Footer from "./Footer";
</script>

<style lang="scss" scoped>
.layout-container {
  margin: 0 auto;
  max-width: $container-max-width;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  position: sticky;
  width: 100%;
  background-color: $background-color;
  top: 0;
  z-index: $z-index-header;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.layout-main {
  flex: 1;
  padding: $spacing-lg $spacing-md;
  
  @media (max-width: $breakpoint-sm) {
    padding: $spacing-md $spacing-sm;
  }
}

.layout-footer {
  border-top: 1px solid $border-color;
  padding: $spacing-md 0;
}

// Page transition animations
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
