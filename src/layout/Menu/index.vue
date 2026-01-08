<template>
  <nav class="main-nav">
    <div class="nav-container">
      <div class="nav-logo">
        <router-link to="/">
          <el-image :src="logo" fit="contain" class="logo-image" alt="quantms Logo" />
        </router-link>
      </div>

      <div class="nav-links">
        <router-link class="nav-link" to="/home">Home</router-link>
        
        <!-- Data Dropdown -->
        <el-dropdown trigger="hover" class="nav-dropdown" :tabindex="-1">
          <span class="nav-link" tabindex="-1">
            Data <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link class="dropdown-link" to="/datasets">Datasets</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link class="dropdown-link" to="/baseline">Baseline</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- Workflow Dropdown -->
        <el-dropdown trigger="hover" class="nav-dropdown" :tabindex="-1">
          <span class="nav-link" tabindex="-1">
            Workflow <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <a href="https://quantms.readthedocs.io/" target="_blank" class="dropdown-link">quantms</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link class="dropdown-link" to="/tools">Tools & Libraries</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <router-link class="nav-link" to="/publications">Publications</router-link>
        <router-link class="nav-link" to="/about">About Us</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
import logo from "@/assets/images/logo_complete.png";
</script>

<style lang="scss" scoped>
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-index-header;
  background-color: $white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  gap: $spacing-lg;

  @media (max-width: $breakpoint-sm) {
    gap: $spacing-sm;
  }
}

.nav-dropdown {
  :deep(.el-dropdown-menu__item) {
    padding: 0;
  }

  :deep(.el-dropdown__popper) {
    border: none;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  :deep(.el-popper__arrow) {
    display: none;
  }

  :deep(.el-dropdown-menu) {
    border: none;
    padding: 0;
  }

  :deep(.el-dropdown) {
    outline: none;
  }

  :deep(.el-dropdown:focus-visible) {
    outline: none;
  }

  :deep(.el-focus-trap) {
    outline: none !important;
  }

  :deep(.el-dropdown__popper .el-popper__arrow) {
    display: none !important;
  }
}

.nav-link {
  color: $text-color;
  text-decoration: none;
  font-weight: 500;
  transition: $transition-base;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: $spacing-sm 0;
  outline: none !important;
  font-size: 16px;

  &:hover, &:focus {
    color: $link-color;
    outline: none;
  }

  &:focus-visible {
    outline: none;
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

  .el-icon {
    margin-left: 4px;
    font-size: 12px;
    transition: $transition-base;
  }
}

.dropdown-link {
  display: block;
  padding: $spacing-sm $spacing-lg;
  color: $text-color;
  text-decoration: none;
  transition: $transition-base;
  width: 100%;
  font-size: 14px;

  &:hover {
    color: $primary-color;
    background-color: rgba($primary-color, 0.05);
  }

  &.router-link-active {
    color: $primary-color;
    background-color: rgba($primary-color, 0.05);
  }
}
</style>