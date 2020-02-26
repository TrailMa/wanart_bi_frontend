<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from 'qs'
import md5 from 'js-md5'
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let url = '/api/login'
          let params = {
            userName: this.ruleForm.username,
            password: md5(this.ruleForm.password)
          }
          let result = await this.$axios.post(url, qs.stringify(params))

          // console.log(result);
          if (result.result == 1) {
            // setCookie('username')
            this.$store.dispatch('setProjectList', result.projectList)
            this.$store.dispatch('setCurProjectId', result.curProjectId)
            //this.$router.push('/queryEvent')
            // this.$router.push('/queryFunnel')
            this.$router.push('/queryRetention')
          } else {
            this.$message(result.msg)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>