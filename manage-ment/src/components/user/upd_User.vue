<template>
  <!--新建模块-->
  <div class="box">
    <p class="btn">
      <el-button type="success" @click="save">保存信息</el-button>
      <el-button type="primary" @click="cancel()">取消操作</el-button>
    </p>
    <div class="content">

      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="100px" :model="findAll_Add">
        <div style="display: flex">
          <div>
            <el-form-item label="用户ID:">
              <el-input style="width: 50px;" v-model="findAll_Add.userId"
                        :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱:">
              <el-input style="width: 200px;" v-model="findAll_Add.email"></el-input>
            </el-form-item>
            <el-form-item label="昵称:">
              <el-input style="width: 200px;" v-model="findAll_Add.alias"></el-input>
            </el-form-item>
            <el-form-item label="用户头像:">
              <el-input style="width: 200px;" v-model="findAll_Add.userImg"></el-input>
            </el-form-item>
            <el-form-item label="用户手机号:">
              <el-input style="width: 200px;" v-model="findAll_Add.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="用户密码:">
              <el-input style="width: 200px;" v-model="findAll_Add.password"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名:">
              <el-input style="width: 200px;" v-model="findAll_Add.userName"></el-input>
            </el-form-item>
            <el-form-item label="家庭地址:">
              <el-input style="width: 200px;" v-model="findAll_Add.homeAddress"></el-input>
            </el-form-item>

          </div>
          <div>
            <el-form-item label="身份证号:">
              <el-input style="width: 200px;" v-model="findAll_Add.identityCard"></el-input>
            </el-form-item>
            <el-form-item label="性别:">
              <el-input style="width: 200px;" v-model="findAll_Add.sex"></el-input>
            </el-form-item>
            <el-form-item label="出生日期:">
              <el-col :span="11">
                <el-input style="width: 200px;" v-model="findAll_Add.birthday"></el-input>
                <el-date-picker
                  type="datetime"
                  placeholder="出生日期"
                  v-model="findAll_Add.birthday"
                  style="width: 200px;"></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="推广码:">
              <el-input style="width: 200px;" v-model="findAll_Add.generalize"></el-input>
            </el-form-item>
            <el-form-item label="被推荐码: ">
              <el-input style="width: 200px;" v-model="findAll_Add.byGeneralize"></el-input>
            </el-form-item>
            <el-form-item label="用户积分:">
              <el-input style="width: 200px;" v-model="findAll_Add.integral"></el-input>
            </el-form-item>
            <el-form-item label="注册时间:">
              <el-col :span="11">
                <el-input style="width: 200px;" v-model="findAll_Add.regTime"></el-input>

              </el-col>
            </el-form-item>
            <el-form-item label="配送地址id:">
              <el-input style="width: 200px;" v-model="findAll_Add.addressId"></el-input>
            </el-form-item>
          </div>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
  /*导入 quillEditor*/
  import {quillEditor} from 'vue-quill-editor'

  export default {
    name: "add_User",
    data() {
      return {
        labelPosition: 'right',
        findAll_Add: {
          userId: '',
          email:'',
          alias:'',
          userImg:'',
          userPhone:'',
          password:'',
          userName:'',
          homeAddress:'',
          identityCard:'',
          sex:'',
          birthday:'',
          generalize:'',
          byGeneralize:'',
          integral:'',
          regTime:'',
          addressId:'',
        },
        upd_UserId:'',
        input:''
      }
    },
    methods: {
      /*上传图片没写*/
      /*取消操作 返回上一级*/
      cancel() {
        this.$router.push("/users");
      },
      /*保存信息事件  操作*/
      save() {
        this.axios.post('/api/FuhessApp_AdminUserModule/user/updateUser.do', this.qs.stringify({
          userId:this.upd_UserId,
          email: this.findAll_Add.email,/*邮箱*/
          alias: this.findAll_Add.alias,/*昵称*/
          userImg: this.findAll_Add.userImg,/*头像*/
          userPhone: this.findAll_Add.userPhone,/*手机号*/
          password: this.findAll_Add.password,/*密码*/
          userName: this.findAll_Add.userName,/*姓名*/
          homeAddress: this.findAll_Add.homeAddress,/*家庭地址*/
          identityCard: this.findAll_Add.identityCard,/*身份证号*/
          sex: this.findAll_Add.sex,/*性别*/
          birthday: this.findAll_Add.birthday,/*出生日期*/
          generalize: this.findAll_Add.generalize,/*推广码*/
          byGeneralize: this.findAll_Add.byGeneralize,/*被推荐码*/
          integral: this.findAll_Add.integral,/*用户积分*/
          regTime: this.findAll_Add.regTime,/*注册时间*/
          addressId: this.findAll_Add.addressId,/*配送地址id*/

        })).then((data) => {
          this.$message("保存成功")
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    /*页面加载 执行*/
    created() {
      /*获取到 用户的userId*/
      this.upd_UserId = this.$route.query.birthday
      this.axios.post("/api/FuhessApp_AdminUserModule/user/selectOne.do", this.qs.stringify({
        userId:this.upd_UserId
      })).then((data) => {
        this.findAll_Add = data.data.map.user
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>
  .box .btn {
    padding-left: 10px;
    padding-top: 10px;
  }

  .el-tabs {
    padding-top: 5px;
  }

  table tr td {
    padding-left: 10px;
    padding-top: 10px;
  }

  span {
    width: 80px;
    text-align: right;
    display: inline-block;
    padding-left: 40%;
  }

  .content {
    text-align: left;
  }

  .describe {
    text-align: center;
  }

  li {
    display: flex;
    align-items: center;
    padding-top: 10px;
  }

  li input,
  li select {
    margin-left: 8px;
  }

  li input {
    border: 1px solid #cccccc;
    border-radius: 5px;
    height: 28px;
    text-align: center;
    display: flex;
    align-items: center;
  }

  input {
    width: 200px;
  }
</style>
