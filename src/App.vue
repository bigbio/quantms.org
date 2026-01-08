<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
// App root component
</script>

<style lang="scss">
// App-specific styles
#app {
  width: 100%;
  height: 100%;
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
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

// Navigation styles
nav {
  padding: $spacing-xl;

  a {
    font-weight: bold;
    color: $text-color;
    margin: 0 $spacing-sm;

    &.router-link-exact-active {
      color: $primary-color;
    }
  }
}
</style>
