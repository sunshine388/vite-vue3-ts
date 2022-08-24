<template>
  <div>
    page1-1
    <el-button @click="jumpDetail">跳转详情</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const jumpDetail = () => {
  router.push('/page1/detail')
}
</script>

<style lang="scss" scoped></style>
