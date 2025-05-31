<template>
  <nav class="main-nav">
    <div class="nav-container">
      <div class="nav-logo">
        <router-link to="/">
          <el-image :src="logo" fit="contain" class="logo-image" alt="QuantMS Logo" />
        </router-link>
      </div>

      <div class="nav-links">
        <router-link class="nav-link" to="/home">Home</router-link>
        <router-link class="nav-link" to="/datasets">Datasets</router-link>
        <router-link class="nav-link" to="/baseline">Baseline</router-link>
        <router-link class="nav-link" to="/publications">Publications</router-link>
        <router-link class="nav-link" to="/about">About Us</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import logo from "@/assets/images/logo_complete.png";
</script>

<style lang="scss" scoped>
.main-nav {
  width: 100%;
  background-color: $white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;
  padding: 0 $spacing-md;
  max-width: $container-max-width;
  margin: 0 auto;
}

.nav-logo {
  display: flex;
  align-items: center;

  .logo-image {
    height: 60px;
    transition: $transition-base;

    &:hover {
      opacity: 0.9;
    }
  }
}

.nav-links {
  display: flex;
  align-items: center;

  @media (max-width: $breakpoint-sm) {
    gap: $spacing-sm;
  }
}

.nav-link {
  padding: 0 $spacing-lg;
  color: $text-color;
  text-decoration: none;
  font-weight: 500;
  transition: $transition-base;
  position: relative;

  @media (max-width: $breakpoint-sm) {
    padding: 0 $spacing-sm;
  }

  &:hover {
    color: $link-color;
  }

  &.router-link-active {
    color: $primary-color;

    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background-color: $primary-color;
    }
  }
}
</style>