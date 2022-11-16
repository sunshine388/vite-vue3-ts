<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :default-active="currentPath"
    background-color="#303a4a"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <template v-for="item in menu" :key="item.path">
      <el-sub-menu v-if="item.children" :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.label }}</span>
        </template>
        <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
          <el-icon><component :is="subItem.meta.icon"></component></el-icon>
          <template #title>{{ subItem.meta.label }}</template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <template #title>{{ item.meta.label }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { subRoutes } from '@/router';

const props = defineProps({
  isCollapse: {
    type: Boolean,
    required: true
  }
});
const route = useRoute();
const currentPath = computed(() => {
  return route.path;
});
const menu = computed(() => {
  return filtterRoutes(subRoutes, '/');
});

const filtterRoutes = (routes: Array, path: String) => {
  let result = [];
  routes.forEach((item, index) => {
    item.path = path + item.path;
    if (item.children && item.children.length > 0) {
      const children = filtterRoutes(item.children, item.path + '/');
      const currentRoutes = { ...item };
      currentRoutes.children = children;
      result.push(currentRoutes);
    } else if (!item.meta.isNotMenu) {
      result.push(item);
    }
  });
  return result;
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
</style>
