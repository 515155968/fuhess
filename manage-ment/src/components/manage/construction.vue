<template>
  <!--新建模块-->
  <div class="box">
    <p class="btn">
      <el-button style="width: 90px;height: 45px;" type="success" @click="save">保存信息</el-button>
      <el-button style="width: 90px;height: 45px;" type="primary" @click="cancel()">取消操作</el-button>
    </p>
    <div class="content">
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="100px" :model="findAll_Add">
        <div style="display: flex">
          <div>
            <el-form-item label="商品名称:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsName"></el-input>
            </el-form-item>
            <el-form-item class="el_form" label="产品分类:">
              <div class="box">
                <div class="nav">
                  <div @click="FengLei" @mouseleave="likai">
                    <el-input v-model="contentText" style="width:200px;"></el-input>
                    <ul v-show="XianShi" class="nav_Max_ul">
                      <ul class="nav_Max_ul_one">
                        <li
                          v-for="(item,index) in findAll"
                          @mouseenter="Level_One(index)"
                          @click="According(index)"
                          ref="text_innerText"
                          style="margin-left: 0"
                        >
                          <span>{{item.classifyName}}</span>
                          <i class="el-icon-arrow-right right"></i>
                        </li>
                      </ul>
                      <ul class="nav_Max_ul_two">
                        <ul>
                          <li
                            v-for="(item,index) in level_TowFindAll"
                            @mouseenter="Level_Tow(index)"
                            @click="According2(index)"
                            ref="text_innerText2">
                            <span>{{item.classifyName}}<!--<i class="el-icon-arrow-right right"></i>--></span>
                          </li>
                        </ul>
                    <!--    <ul class="nav_Max_ul_two_ul">
                          <li
                            v-for="(item,index) in level_ThreeFindAll"
                            @mouseenter="Level_Three(index)"
                            @click="According3(index)"
                            ref="text_innerText3">
                            <span>{{item.classifyName}}</span>
                          </li>
                        </ul>-->
                      </ul>
                    </ul>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item class="el_form" label="商品品牌:">
              <template slot-scope="scope">
                <el-select v-model="findAll_Add.brandId"
                           placeholder="请选择商品品牌ID"
                           style="width: 200px;"
                           @change="brand"
                >
                  <el-option
                    v-for="item in brandName"
                    :key="item.brandId"
                    :label="item.brandName"
                    :value="item.brandId"
                    class="el-option"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
          <!--  <el-form-item class="el_form" label="商品规格:">
              <el-select v-model="findAll_Add.specifId"
                         placeholder="请选择商品规格id"
                         @change="specif"
                         style="width: 200px;">
                <el-option
                  v-for="item in specifName"
                  :key="item.specifId"
                  :label="item.specifDetails"
                  :value="item.specifId"
                  class="el-option"
                >
                </el-option>
              </el-select>
            </el-form-item>-->
          <!--  <el-form-item class="el_form" label="商品属性id:">
              <el-input style="width: 200px;" v-model="findAll_Add.attributeId"></el-input>
            </el-form-item>-->
          <!--  <el-form-item class="el_form" label="商品类型id:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsTypeId"></el-input>
            </el-form-item>-->
            <el-form-item class="el_form" label="市场价格:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsMarket"></el-input>
            </el-form-item>
            <el-form-item class="el_form" label="会员价格:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsMembers"></el-input>
            </el-form-item>
            <el-form-item class="el_form" label="国家:">
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="countries"
                :fetch-suggestions="querySearch"
                placeholder="请输入国家"
              >
                <i
                  class="el-icon-edit el-input__icon"
                  slot="suffix"
                >
                </i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">{{ item.address }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item class="el_form" label="颜色:">
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="goodsColor"
                :fetch-suggestions="querySearchColor"
                placeholder="请输入内容"
              >
                <i
                  class="el-icon-edit el-input__icon"
                  slot="suffix"
                >
                </i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">{{ item.address }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="代理商价格:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsAgent"></el-input>
            </el-form-item>
            <el-form-item class="el_form" label="是否精品:">
              <el-switch
                v-model="findAll_Add.isBest"
                active-color="#63a35c"
                inactive-color="#cccccc"
                :active-value="1"
                :inactive-value="0"
                @change="JingPing"
              >
              </el-switch>
              <!--<el-input style="width: 200px;" v-model="findAll_Add.isBest"></el-input>-->
            </el-form-item>
            <el-form-item class="el_form" label="是否新品:">
              <el-switch
                v-model="findAll_Add.isNew"
                active-color="#63a35c"
                inactive-color="#cccccc"
                :active-value="1"
                :inactive-value="0"
                @change="XinPing"
              >
              </el-switch>
            </el-form-item>
            <el-form-item class="el_form" label="是否热销:">
              <el-switch
                v-model="findAll_Add.isHot"
                active-color="#63a35c"
                inactive-color="#cccccc"
                :active-value="1"
                :inactive-value="0"
                @change="rexiao"
              >
              </el-switch>
            </el-form-item>
            <el-form-item class="el_form" label="赠送积分:">
              <el-input style="width: 200px;" v-model="findAll_Add.goodsDesc"></el-input>
            </el-form-item>
            <el-form-item class="el_form" label="商品图片:">
              <form @submit.prevent="submit($event)" enctype="multipart/form-data" target="rfFrame">
                <input type="file" name="myFileNames"/>
                <input type="file" name="myFileNames"/>
                <input type="file" name="myFileNames"/>
                <br>
                <button type="submit"
                        style="width: 90px;height: 30px;display: flex;align-items: center;justify-content: center"
                        ref="submit"><span>提交图片</span></button>
              </form>
            </el-form-item>
            <el-form-item class="el_form" label="详情图片:">
              <div style="display: flex;align-items: center">
                <div style="">
                  <img :src="details_ImgUrl" alt="" style="width: 100%;height: 100%;">
                </div>
                <input class="file" name="uploadPic" type="file" @change="detailsImg"/>
              </div>
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
    name: "construction",
    data() {
      return {
        details_ImgUrl: '', /*详情图片*/
        ImgUrl: '', /*商品图片*/
        labelPosition: 'right',
        value2: true,
        findAll_Add: {
          goodsName: '',
          classifyId: '',
          brandId: '',
          specifId: '1',
          attributeId: '1',
          goodsTypeId: '1',
          goodsMarket: '',
          goodsMembers: '',
          goodsAgent: '',
          isBest: '',
          isNew: '',
          isHot: '',
          goodsDesc: '',
          goodsIntegral: '',
          isDelete: '',
        },
        classifyId: '', /*下拉菜单  父类ID*/
        brandifyId: '', /*select 下拉框 获取当前行品牌id*/
        specifName: '', /*商品规格id*/
        brandName: [], /* select下拉框获取到所有的品牌*/
        aaa: [],
        bbb: '',
        /*产品分类*/
        XianShi: false,
        findAll: [], /*查询所有分类*/
        Level_OneId: '', /*父列*/
        level_TowFindAll: [], /*子列*/
        Level_TowId: '', /*子列id*/
        level_ThreeFindAll: [], /*三级列*/
        Level_ThreeId: '', /*三级列id*/
        contentText: ''/*input 框显示的内容*/,
        /*国家*/
        restaurants: [], /*全部国家*/
        countries: '', /*获取单个国家*/
        /*颜色*/
        restaurantsColor: [], /*全部颜色*/
        goodsColor: ''/*获取单个颜色*/
      }
    },
    methods: {
      /*获取到品牌的名称  然后找到当前行的id*/
      brand(brandId) {
        var bId = {};
        bId = this.brandName.find((item) => {
          return item.brandId === brandId;
        })
        this.findAll_Add.brandId = bId.brandId
      },
      /*获取到规格名称  然后找当当前行的id*/
      specif(specifId) {
        var sId = {};
        sId = this.specifName.find((item) => {
          return item.specifId === specifId;
        })
        this.findAll_Add.classifyId = sId.specifId
      },
      /*上传图片没写*/
      /*取消操作 返回上一级*/
      cancel() {
        this.$router.push("/cancel");
      },
      /*多长图上传*/
      submit(event) {
        var formData = new FormData(event.target);
        this.axios.post('/api/FuhessApp_goodsModule/qiniu/upload.do', formData).then((data) => {
          this.aaa = data.data;
          this.$message("多张图片插入成功!")
        }).catch((err) => {
          this.$message("插入失败?试试多张图片插入")
        })
      },
      /*保存信息事件  操作*/
      save() {
        var formData = new FormData(event.target)
        // /api/FuhessApp_goodsModule/qiniu/upload.do
        /*
        * 判断输入框是否为空
        * */
        if (this.findAll_Add.goodsName == '') {
          this.$message("商品名称不能为空!")
        } else if (this.findAll_Add.classifyId == '') {
          this.$message("产品分类不能为空!")
        } else if (this.findAll_Add.brandId == '') {
          this.$message("商品品牌不能为空!")
        } else if (this.findAll_Add.specifId == '') {
          this.$message("商品规格不能为空!")
        } else if (this.findAll_Add.attributeId == '') {
          this.$message("商品属性不能为空!")
        } else if (this.findAll_Add.goodsTypeId == '') {
          this.$message("商品类型不能为空!")
        } else if (this.findAll_Add.goodsMarket == '') {
          this.$message("市场价格不能为空!")
        } else if (this.findAll_Add.goodsMembers == '') {
          this.$message("会员价格不能为空!")
        } else if (this.countries == '') {
          this.$message("国家不能为空!")
        } else if (this.goodsColor == '') {
          this.$message("颜色不能为空!")
        } else if (this.findAll_Add.goodsAgent == '') {
          this.$message("代理商价格不能为空!")
        } else if (this.findAll_Add.isBest == '') {
          this.$message("是否精品?添加不成功再点一次?")
        } else if (this.findAll_Add.isHot == '') {
          this.$message("是否热销?添加不成功再点一次?")
        } else if (this.findAll_Add.goodsDesc == '') {
          this.$message("赠送积分不能为空!")
        } else {
          this.axios.post("/api/FuhessApp_goodsModule/goods/add.do", this.qs.stringify({
            goodsName: this.findAll_Add.goodsName,
            classifyId: this.findAll_Add.classifyId,
            brandId: this.findAll_Add.brandId,
            specifId: this.findAll_Add.specifId,
            attributeId: this.findAll_Add.attributeId,
            goodsTypeId: this.findAll_Add.goodsTypeId,
            goodsMarket: this.findAll_Add.goodsMarket,
            goodsMembers: this.findAll_Add.goodsMembers,
            goodsAgent: this.findAll_Add.goodsAgent,
            isBest: this.findAll_Add.isBest,
            isNew: this.findAll_Add.isNew,
            isHot: this.findAll_Add.isHot,
            goodsIntegral: this.findAll_Add.goodsIntegral,
            isDelete: this.findAll_Add.isDelete,
            goodsImg: this.aaa,
            goodsDesc: this.details_ImgUrl,
            goodsColor: this.goodsColor,
            goodsLocation: this.countries,
            isCollect: 0
          })).then((data) => {
            this.$message("添加成功！")
            this.$router.push('/cancel')
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      /*img*/
      update(e) {
        let uploadPic = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('uploadPic', uploadPic, uploadPic.name,);//通过append向form对象添加数据
        // param.append('gId',66);//添加form表单中其他数据
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        this.axios.post('/api/FuhessApp_goodsModule/goods/upload.do', param, config)
          .then((data) => {
            this.ImgUrl = data.data.data
          })
      },
      detailsImg(e) {
        let uploadPic = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('uploadPic', uploadPic, uploadPic.name,);//通过append向form对象添加数据
        // param.append('gId',66);//添加form表单中其他数据
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        this.axios.post('/api/FuhessApp_goodsModule/goods/upload.do', param, config)
          .then((data) => {
            this.details_ImgUrl = data.data
          })
      },
      /*选择器*/
      JingPing(val) {
        this.findAll_Add.isBest = val
      },
      XinPing(val) {
        this.findAll_Add.isNew = val
      },
      rexiao(val) {
        this.findAll_Add.isHot = val
      },
      /*父列*/
      Level_One(index) {
        for (let i = 0; i < this.findAll.length; i++) {
          this.Level_OneId = this.findAll[i, index].classifyId;
        }
        this.axios.post("/api/FuhessApp_goodsModule/classify/nextClassify.do", this.qs.stringify({
          cId: this.Level_OneId
        })).then((data) => {
          this.level_TowFindAll = data.data
        })
      },
      /*子列*/
      Level_Tow(index) {
        for (let i = 0; i < this.level_TowFindAll.length; i++) {
          this.Level_TowId = this.level_TowFindAll[i, index].classifyId;
        }
        this.axios.post("/api/FuhessApp_goodsModule/classify/nextClassify.do", this.qs.stringify({
          cId: this.Level_TowId
        })).then((data) => {
          this.level_ThreeFindAll = data.data
        })
      },
      /*三级列*/
      Level_Three(index) {
        for (let i = 0; i < this.level_ThreeFindAll.length; i++) {
          this.Level_ThreeId = this.level_ThreeFindAll[i, index].classifyId;
          this.findAll_Add.classifyId = this.Level_ThreeId
        }
      },
      /*获取每一列的内容 id*/
      According(index) {
        /*获取内容*/
        this.contentText = this.$refs.text_innerText[index].innerText;
        /*获取id*/
        for (let i = 0; i < this.findAll.length; i++) {
          this.findAll_Add.classifyId = this.findAll[i, index].classifyId;
        }
      },
      According2(index) {
        this.contentText = this.$refs.text_innerText2[index].innerText;
        for (let i = 0; i < this.level_TowFindAll.length; i++) {
          this.findAll_Add.classifyId = this.level_TowFindAll[i, index].classifyId;
        }
      },
      According3(index) {
        /*获取内容*/
        this.contentText = this.$refs.text_innerText3[index].innerText;
        /*获取id*/
        for (let i = 0; i < this.level_ThreeFindAll.length; i++) {
          this.findAll_Add.classifyId = this.level_ThreeFindAll[i, index].classifyId;
        }
      },
      /*鼠标点击INPUT框显示*/
      FengLei() {
        this.XianShi = true;
      },
      /*鼠标离开隐藏*/
      likai() {
        this.XianShi = false;
      },
      /*国家*/
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          {'value': '日本'},
          {'value': '台湾'},
          {'value': '美国'},
          {'value': '英国'},
          {'value': '丹麦'},
          {'value': '英国'},
          {'value': '法国'},
          {'value': '德国'},
          {'value': '加拿大'},
        ];
      }, /*模拟本地数据 全部国家*/
      /*颜色*/
      querySearchColor(queryString, cb) {
        var restaurantsColor = this.restaurantsColor;
        var results = queryString ? restaurantsColor.filter(this.createFilter(queryString)) : restaurantsColor;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilterColor(queryString) {
        return (restaurantsColor) => {
          return (restaurantsColor.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      Color() {
        return [
          {'value': '红'},
          {'value': '黄'},
          {'value': '蓝'},
          {'value': '灰'},
          {'value': '绿'},
          {'value': '紫'},
          {'value': '黑'},
          {'value': '白'},
          {'value': '深红'},
        ];
      }, /*本地数据  全部颜色*/
    },
    mounted() {
      /*赋值*/
      this.restaurants = this.loadAll();
      this.restaurantsColor = this.Color();
    },
    created() {
      /*查询所有分类*/
      this.axios.post("/api/FuhessApp_goodsModule/classify/findParCla.do").then((data) => {
        this.findAll = data.data.data;
      });
      /*查询所有品牌id*/
      this.axios.post('/api/FuhessApp_goodsModule/brand/findAllDesc.do').then((data) => {
        this.brandName = data.data.data
        // console.log(this.brandName)
      }).catch((err) => {
        console.log(err)
      })
      /*商品规格*/
      this.axios.post("/api/FuhessApp_goodsModule/specification/findAll.do").then((data) => {
        this.specifName = data.data.data
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

  * {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }

  .box li {
    width: 100px;
    list-style-type: none;
  }

  .box li:hover {
    cursor: pointer;
    /*background-color: #606266;*/
  }

  .box li span {
    font-size: 12px;
    color: #606266;
  }

  .el_form {
    margin-top: 20px;
  }

  .el-option {
    padding-left: 15px;
  }

  #btn-primary {
    padding: 0;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav_Max_ul {
    display: flex;
    height: 300px;
    width: 200px;
    position: absolute;
    /*background-color:rgb(295,295,295);*/
    background-color:rgba(295,295,295,0.7);
    padding-top: 10px;
    z-index: 20;
    border-bottom-right-radius:10px;
    border-bottom-left-radius:10px;
    box-shadow: #cccccc 2px 9px 9px 3px;
  }

  .nav i {
    font-size: 12px;
    color: black;
    font-weight: bold
  }

  .nav_Max_ul_two {
    margin-left: 30px;
    display: flex
  }

  .nav_Max_ul_two_ul{
    position: absolute;
    z-index: 20;
    padding-left: 70px;
  }

  .nav_Max_ul_one {
    position: absolute;
    z-index: 20;
    left: 10px;
  }
  .nav_Max_ul_two {
    position: absolute;
    z-index: 20;
    padding-left: 50px;
  }
</style>
