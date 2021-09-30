<template>
  <div class="login">
    <div class="login-panel">
      <div class="title">Hello,欢迎登录后台</div>
      <div class="desc">WELCOME TO THE SYSTEM</div>
      <el-form
        :model="user"
        label-width="0px"
        ref="loginFormRef"
        :rules="rules"
        style="margin-top: 50px"
        @keydown.enter="login"
      >
        <el-form-item prop="account">
          <el-input
            class="input"
            v-model="user.account"
            placeholder="请输入后台账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="user.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
      <div class="loginBtn" @click="login">登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { reactive, ref, unref } from 'vue'
import { defineComponent } from 'vue'
import { rules } from './user-config'
import sha256 from 'sha256'
import { useStore } from '@/store'
import Vcode from '@/components/vcode'
export default defineComponent({
  components: {
    Vcode
  },
  setup() {
    const store = useStore()
    // store.state.login.userInfo
    const user = reactive({
      account: 'admin',
      password: ''
    })
    const loginFormRef = ref<InstanceType<typeof ElForm>>()

    const login = () => {
      unref(loginFormRef)?.validate((valid) => {
        if (valid) {
          onShow()
        }
      })
    }

    const isShow = ref(false)

    const onShow = () => {
      isShow.value = true
    }
    const onClose = () => {
      isShow.value = false
    }
    const onSuccess = () => {
      const data = { ...user }
      data.password = sha256(data.password)
      store.dispatch('login/accountLoginAction', data)
      onClose() // 验证成功，需要手动关闭模态框
    }
    return {
      rules,
      user,
      loginFormRef,
      login,
      isShow,
      onShow,
      onClose,
      onSuccess
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('~@/assets/img/loginBg.png');
  background-size: 100% 100%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  .login-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 300px;
    top: 238px;
    width: 300px;
    // background: #000;
    .title {
      color: #3cadfd;
      font-family: Adobe Heiti Std;
      font-size: 30px;
    }
    .desc {
      margin-top: 10px;
      color: #b4b4b4;
      font-size: 14px;
    }
  }
  .login-panel /deep/ .el-input__inner {
    background: #f6f7fb;
    outline: none;
    height: 40px;
    border-radius: 20px;
    width: 300px;
    border: none;
  }
  .loginBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    width: 300px;
    height: 40px;
    background: linear-gradient(0deg, #2f81ed, #2ee9d8);
    box-shadow: 2px 8px 9px 0px rgba(138, 138, 138, 0.12);
    border-radius: 32px;
  }
}
</style>
