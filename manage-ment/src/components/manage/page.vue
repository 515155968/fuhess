<template>
  <!--导航模块 主体-->
  <div style="width: 100%;height: 100%;">
    <div id="box">
      <!--左侧-->
      <div class="right">
        <!--头像/用户名/状态-->
        <div class="user">
          <!--头像-->
          <div class="photograph">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541654947&di=32d88212580e19fb71dfa2d0a3bc8e61&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fapp%2Ficon%2F20151223%2F1450845014244358.jpg"
              alt="">
          </div>
          <!--用户名/状态-->
          <div class="datum">
            <ul>
              <li>admin</li>
              <li>在线</li>
            </ul>
          </div>
        </div>
        <div>
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#222d32"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-printer"></i>
                    <span>商品模块</span>
                  </template>
                  <router-link to="/brand">
                    <el-menu-item index="1-1-1">商品品牌</el-menu-item>
                  </router-link>
                  <router-link to="/specifications">
                    <el-menu-item index="1-1-2">商品规格</el-menu-item>
                  </router-link>
                  <router-link to="/classification">
                    <el-menu-item index="1-1-3">商品分类</el-menu-item>
                  </router-link>
                  <router-link to="/cancel">
                    <el-menu-item index="1-1-4">商品</el-menu-item>
                  </router-link>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>订单模块</span>
                  </template>
                  <router-link to="/audit_Order">
                    <el-menu-item index="2-1-1">待审核订单</el-menu-item>
                  </router-link>
                  <router-link to="/cancel_Order">
                    <el-menu-item index="2-1-2">取消订单</el-menu-item>
                  </router-link>
                  <router-link to="/confirm_Order">
                    <el-menu-item index="2-1-3">已完成订单</el-menu-item>
                  </router-link>
                  <router-link to="/confirm_Goods">
                    <el-menu-item index="2-1-4">待收货</el-menu-item>
                  </router-link>
                  <router-link to="/details">
                    <el-menu-item index="2-1-5">订单详情</el-menu-item>
                  </router-link>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>App用户模块</span>
                  </template>
                  <router-link to="/users">
                    <el-menu-item index="3-1-1">用户基本信息</el-menu-item>
                  </router-link>
                  <router-link to="/statistical">
                    <el-menu-item index="3-1-2">用户统计</el-menu-item>
                  </router-link>
               <!--   <router-link to="/user_integral">
                    <el-menu-item index="3-1-3">用户积分</el-menu-item>
                  </router-link>-->
                  <router-link to="/user_package">
                    <el-menu-item index="3-1-4">套餐</el-menu-item>
                  </router-link>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>报错</span>
                  </template>
                  <router-link to="/err_404">
                    <el-menu-item index="4-1-1">404</el-menu-item>
                  </router-link>
                  <router-link to="/err_500">
                    <el-menu-item index="4-1-2">500</el-menu-item>
                  </router-link>
                  <router-link to="/Err_Refused">
                    <el-menu-item index="4-1-3">拒绝访问</el-menu-item>
                  </router-link>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>

        </div>
      </div>
      <!--右侧-->
      <div class="left">
        <router-view></router-view>
      </div>
    </div>
   <!-- <h1>{{text}}</h1>
    <el-button @click="btn()">点击请求</el-button>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ""
      };
    },
    methods: {
      btn() {
        // alert('213')
        // this.$router.push('/aa')
        this.axios.post('/api/FuhessApp_goodsModule/classify/findAll.action').then((data) => {
          this.text = data.data;
        }).catch((err) => {
          console.error(err)
        })
      }
    }

  };
</script>

<style scoped>
  #box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  }

  .right {
    width: 20%;
    height: 100%;
    background-color: #222d32;
  }

  .left {
    width: 77%;
    background-color: #ffffff;
    border: 1px solid #cccccc;
  }

  .user {
    display: flex;
    height: 65px;
    justify-content: center;
    padding-top: 15px;
  }

  .user .photograph {
    width: 20%;
  }

  .user .datum {
    width: 70%;
    display: flex;
    align-items: center;
  }

  .user .photograph img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .user .datum ul {
    padding-left: 20px;
  }

  .user .datum ul li {
    color: white;
    font-size: 18px;
    line-height: 40px;
    font-weight: bold;
    font-family: 仿宋;
    letter-spacing: 2px;
  }

  .el-menu-vertical-demo {
    width: 100%;
  }

  input {
    height: 30px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    /*padding-left: 15px;*/
    text-align: center;
  }

  input:active {
    border-radius: 5px;
    border: 1px solid #cccccc;
  }
</style>
