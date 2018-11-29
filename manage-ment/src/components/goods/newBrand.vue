<template>
  <div class="box">
    <!--商品品牌 页面-->
    <div class="title title2"><span>商品品牌</span></div>
    <div class="content">
      <ul>
        <li><span>名称:</span><input type="brand_name" v-model="brandName"></li>
        <li>
          <span>品牌LOGO:</span>
          <div style="margin-left: 12px;display: flex;align-items: center">
            <div style="width: 100px;height: 100px;border: 1px solid #cccccc">
              <img :src="imgUrl" alt="" style="width: 100%;height: 100%;">
            </div>
            <input class="file" name="uploadPic" type="file"  @change="update"/>
          </div>
        </li>
        <li><span>品牌网址:</span><input type="brand_url" v-model="brandUrl"></li>
        <li><span>品牌描述:</span>
          <el-input
            type="textarea"
            :rows="1"
            placeholder="请输入内容"
            style="width: 160px;margin-left: 10px"
            v-model="brandDescribe"
          >
          </el-input>
        </li>
        <li>
          <span>是否显示:</span>
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus"
            class="switch"
          >
          </el-switch>
        </li>
      </ul>
      <el-button @click="save()">保存</el-button>
      <router-link to="/cancelNewBrand">
        <el-button>取消</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "newBrand",
      data(){
          return{
            brandName:"",/*品牌名称*/
            brandLogo:"",/*品牌LOGO*/
            brandUrl:"",/*品牌网址*/
            brandDescribe:'',
            brandIsshow:"",/*是否显示  0：不显示 1：显示*/
            myCroppa: null,/*默认为空*/
            imgUrl: '',/*图片路径*/
            value:true
          }
      },
      methods:{
          /*添加品牌操作*/
        save(){
          this.axios.post('/api/FuhessApp_goodsModule/brand/add.do',this.qs.stringify({
            brandName:this.brandName,
            brandUrl:this.brandUrl,
            brandDescribe:this.brandDescribe,
            brandIsshow:this.brandIsshow,
            brandLogo:this.imgUrl
          })).then((data) =>{
            this.$router.push('/brand')
          }).catch((err) =>{
            alert("what??????");
            console.error(err)
          })

        },
        /*swith开关*/
        changeStatus(value){
          this.brandIsshow = value
        },
        /*上传头像操作*/
        update(e){
          let uploadPic = e.target.files[0];
          let param = new FormData(); //创建form对象
          param.append('uploadPic',uploadPic,uploadPic.name,);//通过append向form对象添加数据
          // param.append('gId',66);//添加form表单中其他数据
          console.log(param.get('uploadPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };  //添加请求头333
          // this.axios.post('/api/FuhessApp_AdminUserModule/user/updetaPic.do',param,config,this.qs.stringify({
          //   userId:62
          // }))
          this.axios.post('/api/FuhessApp_goodsModule/goods/upload.do',param,config)
            .then((data) =>{
              this.imgUrl = data.data.data
              console.log(data.data.data)
            })
        },
      }
    }
</script>

<style scoped>
  .file{
    border: none;
  }
  .box {
  }

  .title {
    text-align: center;
  }

  .content {
    padding-left: 33%;
  }

  .content ul li {
    padding-top: 10px;
  }

  .content span {
    display: inline-block;
    width: 120px;
    text-align: right;
  }

  .content button {
    height: 40px;
    margin-left: 8.2%;
    margin-top: 20px;
  }

  .title span {
    font-size: 20px;
    font-weight: bold;
  }

  li {
    display: flex;
    align-items: center;
  }

  input {
    height: 30px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    /*padding-left: 15px;*/
    margin-left: 10px;
    padding-left: 15px;
  }

  input:active {
    border: 1px solid #cccccc;
    border-radius: 5px;
  }

  .brand_show .brand_show_ul {
    width: 95%;
    margin: 15px auto;
  }

  .brand_show .brand_show_ul ul {
    display: flex;
    flex-wrap:wrap;
  }
  .brand_show .brand_show_ul ul li{
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    font-size: 14px;
    /*color: red;*/
  }
  .title2{
    padding-top: 5%;
  }
  croppa{
    border: 1px solid red;
  }

  .userImg {
    width: 100px;
    height: 100px;
    border: 1px solid #cccccc;
    border-radius: 5%;
  }

  .switch {
      margin-left: 10px;
  }
</style>
