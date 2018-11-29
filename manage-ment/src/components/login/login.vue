<template>
  <div class="box">
    <div>
      <p class="title">Hello, Welcome back</p>
      <p class="manageMent">后台管理中心</p>
      <div class="divMax">
        <div class="strata">
          <p>
            <i class="icon iconfont icon-zhanghao"></i>
            <el-input v-model="name" type="name" placeholder="请输入账号" class="account" align="center"></el-input>
          </p>

          <p>
            <i class="icon iconfont icon-mima"></i>
            <el-input v-model="password" type="password" placeholder="请输入密码" class="password"></el-input>
          </p>
          <el-button type="primary" class="btn" @click="login()">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return{
        name:'',
        password:'',
        state:'',
      }
    },
    methods:{
      login(){
        this.axios.post('/api/FuhessApp_AdminUserModule/user/dologin.do',this.qs.stringify({
          adminUserName:this.name,
          adminPassword:this.password
        })).then((data) =>{
          if (data.data == 1){
            this.$message("登录成功！");
            this.$router.push('/brand')
          }else{
            this.$message("登录失败！");
          }
        }).catch((err) =>{
          console.log(err)
        })
      }
    },
    created(){
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/bg.png');
    background-size: 100% 100%;
  }

  .title {
    font-size: 30px;
    color: #cccccc;
    text-align: center;
    padding-top: 5%;
  }

  .manageMent {
    font-size: 25px;
    color: #cccccc;
    text-align: center;
    padding-top: 80px;
  }

  .strata {
    width: 512px;
    height: 350px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    text-align: center;
  }

  .strata .account {
    width: 416px;
    height: 47px;
    margin: 0 auto;
  }

  .divMax {
    padding-top: 20px;
  }

  .strata .account,
  .strata .password {
    width: 416px;
    height: 34px;
    margin: 0 auto;
  }

  .strata .account {
    margin-top: 70px;
  }

  .strata .password {
    margin-top: 50px;
  }

  .strata .btn {
    width: 416px;
    height: 40px;
    margin-top: 50px;
    margin-left: 32px;
  }

  i {
    font-size: 25px;
    color: #cccccc;
    position: relative;
    top: 2px;
    padding-right: 5px;
  }
  .icon-mima{

  }
</style>
