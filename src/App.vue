<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <navigation-bar />
  <div id="content">
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>loading...</template>
    </Suspense>
  </div>
  <footer-bar />
</template>

<style scoped lang="scss">
#content {
  margin: 60px 0;
}
</style>
