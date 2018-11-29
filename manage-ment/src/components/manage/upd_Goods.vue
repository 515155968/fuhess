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
            <el-form-item label="商品编号:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsId"></el-input>
            </el-form-item>
            <el-form-item label="商品名称:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="产品分类:">
              <el-input style="width: 200px;" v-model="findAll_Add.classifyId"></el-input>
            </el-form-item>
            <el-form-item label="商品品牌id:">
              <el-input style="width: 200px;" v-model="findAll_Add.brandId"></el-input>
            </el-form-item>
            <el-form-item label="商品规格id:">
              <el-input style="width: 200px;" v-model="findAll_Add.specifId"></el-input>
            </el-form-item>
            <el-form-item label="商品属性id:">
              <el-input style="width: 200px;" v-model="findAll_Add.attributeId"></el-input>
            </el-form-item>
            <el-form-item label="商品类型id:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsTypeId"></el-input>
            </el-form-item>
            <el-form-item label="市场价格:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsMarket"></el-input>
            </el-form-item>
            <el-form-item label="会员价格:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsMembers"></el-input>
            </el-form-item>

          </div>
          <div>
            <el-form-item label="代理商价格:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsAgent"></el-input>
            </el-form-item>
            <el-form-item label="是否精品:">
              <el-switch
                v-model="findAll_Add.isBest"
                active-color="#63a35c"
                inactive-color="#cccccc"
                :active-value="0"
                :inactive-value="1"
                @change="JingPing"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="是否新品: ">
              <el-switch
                v-model="findAll_Add.isNew"
                active-color="#63a35c"
                inactive-color="#cccccc"
                :active-value="0"
                :inactive-value="1"
                @change="XinPing"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="是否热销:">
              <el-switch
                v-model="findAll_Add.isHot"
                active-color="#63a35c"
                inactive-color="#cccccc"
                :active-value="0"
                :inactive-value="1"
                @change="rexiao"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="商品详情:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsDesc"></el-input>
            </el-form-item>
            <el-form-item label="赠送积分:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsIntegral"></el-input>
            </el-form-item>
            <el-form-item label="赠送积分:">
              <el-input style="width: 200px;" v-model="user_imgUrl"></el-input>
            </el-form-item>
            <div style="margin-left: 25px;display: flex;align-items: center">
              <div style="width: 100px;height: 100px;border: 1px solid #cccccc">
                <img :src="user_imgUrl" alt="" style="width: 100%;height: 100%;">
              </div>
              <input class="file" name="uploadPic" type="file"  @change="update"/>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: "upd_Goods",
    data() {
      return {
        labelPosition: 'right',
        value:true,
        findAll_Add: {
          goodsId:'',
          goodsName: '',
          classifyId: '',
          brandId: '',
          specifId: '',
          attributeId: '',
          goodsTypeId: '',
          goodsMarket: '',
          goodsMembers: '',
          goodsAgent: '',
          isBest: '',
          isNew: '',
          isHot: '',
          goodsImg: '',
          goodsDesc: '',
          goodsIntegral: '',
          goodsTime: '',

        },
        upd_id: '',
        user_imgUrl:''
      }
    },
    methods: {
      /*上传图片没写*/
      /*取消操作 返回上一级*/
      cancel() {
        this.$router.push("/cancel");
      },
      /*保存信息事件  操作*/
      save() {
        this.axios.post("/api/FuhessApp_goodsModule/goods/update.do",this.qs.stringify({
          goodsId:this.upd_id,
          goodsName:this.findAll_Add.goodsName,
          classifyId:this.findAll_Add.classifyId,
          brandId:this.findAll_Add.brandId,
          specifId:this.findAll_Add.specifId,
          attributeId:this.findAll_Add.attributeId,
          goodsTypeId:this.findAll_Add.goodsTypeId,
          goodsMarket:this.findAll_Add.goodsMarket,
          goodsMembers:this.findAll_Add.goodsMembers,
          goodsAgent:this.findAll_Add.goodsAgent,
          isBest:this.findAll_Add.isBest,
          isNew:this.findAll_Add.isNew,
          isHot:this.findAll_Add.isHot,
          goodsDesc:this.findAll_Add.goodsDesc,
          goodsIntegral:this.findAll_Add.goodsIntegral,
          isDelete:this.findAll_Add.isDelete,
          goodsImg:this.user_imgUrl
        })).then((data) =>{
          console.log("修改成功！")
          console.log(data)
        }).catch((err) =>{
          console.log(err)
        })
      },
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
            this.user_imgUrl = data.data.data
          })
      },
      /*选择器*/
      JingPing(val){
        this.findAll_Add.isBest =val
      },
      XinPing(val){
        this.findAll_Add.isNew =val
      },
      rexiao(val){
        this.findAll_Add.isHot =val
      },
    },
    created() {
      this.upd_id = this.$route.query.upd_Id
      this.axios.post("/api/FuhessApp_goodsModule/goods/findOne.do", this.qs.stringify( {
        goodsId:this.upd_id
      })).then((data) =>{
        this.findAll_Add = data.data
      })
    }
  }
</script>

<style scoped>

</style>
