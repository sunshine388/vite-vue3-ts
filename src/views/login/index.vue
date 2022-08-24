<template>
  <div class="login">
    <div class="login-form">
      <h2 class="login-title">登录</h2>
      <el-form :model="form" :rules="rules" ref="loginFom">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onSubmit(loginFom)" :loading="loading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref<Boolean>(false)
const loginFom = ref<FormInstance>()
const form = reactive({
  username: '',
  password: ''
})
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: '长度在3-8之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在6-20之间', trigger: 'blur' }
  ]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      sessionStorage.setItem('user', JSON.stringify({ username: form.username }))
      setTimeout(() => {
        loading.value = false
        ElMessage.success('登录成功！')
        router.push('/')
      }, 1000)
    }
  })
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  background: url('@/assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 500px;
    height: 300px;
    background: #fff;
    box-shadow: 0 3px 20px 1pxrgba (0, 0, 0, 0.0901961);
    border-radius: 4px 4px 4px 4px;
    .login-title {
      text-align: center;
      line-height: 70px;
      border-bottom: 1px solid #ccc;
      color: #3187ca;
    }
    .el-form {
      padding: 40px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
