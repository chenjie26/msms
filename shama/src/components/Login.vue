<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="email">
      <el-input type="text" v-model="ruleForm2.email" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        loginUrl:'http://shama.jcjever.com/user/login',
        profileUrl:'http://shama.jcjever.com/user/profile',
        ruleForm2: {
          email: '',
          password: ''
        },
        rules2: {
          email: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this=this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.login(function(){
                _this.saveProfile();
                _this.$router.replace('/member');
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      saveProfile: function(){
        this.$http.get(this.profileUrl).then((response) => {
          localStorage.setItem('name', response.body.user.name);
          localStorage.setItem('email', response.body.user.email);
        }).catch(this.requestError);
      },
      login:function(success_handel){
        this.$http.post(this.loginUrl, this.ruleForm2)
          .then((response) => {
              localStorage.setItem('token', response.body.token);
              success_handel();
          }).catch(this.requestError)
      },
      requestError:function(response) {
          this.$notify.error({
            title: '提示',
            message: response.body.message
          });
      }
    }
  }
</script>

<style scoped>
  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 120px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .loginform {
    width: 350px;
    padding: 35px 35px 15px 35px;
  }
</style>
