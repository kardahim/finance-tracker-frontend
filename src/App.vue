<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <navigation-bar />
  <div id="content">
    <router-view></router-view>
  </div>
  <footer-bar />
</template>

<style scoped lang="scss">
#content {
  margin: 60px 0;
}
</style>
