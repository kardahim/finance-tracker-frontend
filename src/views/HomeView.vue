<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
console.log(authStore.user)
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
