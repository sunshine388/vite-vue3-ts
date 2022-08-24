<template>
  <el-container>
    <el-aside :width="isCollapse ? '63px' : '200px'">
      <div class="logo">
        <img src="../assets/vue.svg" />
      </div>
      <div class="icon">
        <el-icon :class="{ active: isCollapse }" color="#fff" @click="changeIsCollapse">
          <DArrowLeft />
        </el-icon>
      </div>
      <AsideMenu :isCollapse="isCollapse"></AsideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <p>后台管理系统模板</p>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout" :icon="Right">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AsideMenu from './AsideMenu.vue'
import { ref, onMounted } from 'vue'
import { Right } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref<String>('')
const isCollapse = ref<Boolean>(false)

const changeIsCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'logout':
      sessionStorage.clear()
      router.push('/login')
      break
    default:
      break
  }
}
onMounted(() => {
  if (sessionStorage.getItem('user')) {
    const user = JSON.parse(sessionStorage.getItem('user'))
    username.value = user.username
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background: #303a4a;
  transition: 0.3s ease-in;
  .logo {
    text-align: center;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .icon {
    text-align: center;
    padding: 8px 0;
    background: #343442;
    .el-icon {
      cursor: pointer;
      transition: transform 0.3s;

      &.active {
        transform: rotate(180deg);
      }
    }
  }
  &::-webkit-scrollbar {
    width: 0px;
  }
}
.el-header {
  text-align: center;
  font-size: 20px;
  line-height: 60px;
  position: relative;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  .el-dropdown {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.el-main {
  background: #f4f5f5;
}
</style>
