<template>
  <div><el-button @click="goBack">返回</el-button></div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped></style>
