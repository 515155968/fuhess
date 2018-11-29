<template>
  <!--商品品牌展示-->
  <div>
    <div>
      <!--标题-->
      <div class="title">
        <p>商品品牌</p>
      </div>
      <div class="content">
        <!-- Form -->
        <!--新建 弹框  删除弹框 -->
        <el-button type="text" @click="construction()" class="construction">新建</el-button>
        <el-button type="danger" @click="open()" class="construction delete"
                   style="background-color: rgb(245,108,108);color: #ffffff">删除
        </el-button>
        <div class="search">
          <ul>
            <li>品牌名称:</li>
            <li>
              <el-input placeholder="请输入关键字" icon="search" v-model="search" @click="search()"></el-input>
            </li>
          </ul>
        </div>
        <!--查询所有品牌-->
        <div class="information">
          <!--findAlls.slice((currentPage-1)*pagesize,currentPage*pagesize) 分页-->
          <el-table
            :data="findAlls.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%"
            :center=true
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column
              prop="brandId"
              label="品牌id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="brandName"
              label="品牌名称"
              width="180">
            </el-table-column>
            <el-table-column prop="brand_logor" label="品牌LOGO" width="180">
              <template slot-scope="scope">
                <img :src='scope.row.brandLogo' alt="" class="brand_img">
              </template>
            </el-table-column>
            <el-table-column
              prop="brandUrl"
              label="品牌网址"
              width="180">
            </el-table-column>
            <el-table-column
              prop="brandDescribe"
              label="品牌描述"
              width="180">
            </el-table-column>
            <el-table-column
              prop="brandIsshow"
              label="商品是否显示"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="110"
            >
              <template slot-scope="scope">
                <el-button type="success"
                           @click='updateBrand(scope.row,scope.$index)'
                           style="width: 90px;height: 38px;"
                >修改
                </el-button>
                <!--修改-->
                <el-dialog title="修改品牌" :visible.sync="dialogFormVisible" :append-to-body="true">
                  <el-form :model="form">
                    <el-form-item label="品牌名称:" :label-width="formLabelWidth">
                      <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌LOGO:" :label-width="formLabelWidth">
                      <div style="margin-left: 12px;display: flex;align-items: center">
                        <div style="width: 100px;height: 100px;border: 1px solid #cccccc">
                          <img :src="imgUrl" alt="" style="width: 100%;height: 100%;">
                        </div>
                        <input class="file" name="uploadPic" type="file" @change="update"/>
                      </div>
                    </el-form-item>

                    <el-form-item label="品牌网址:" :label-width="formLabelWidth">
                      <el-input v-model="form.brandUrl" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌描述:" :label-width="formLabelWidth">
                      <el-input v-model="form.brandDescribe" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示:" :label-width="formLabelWidth">
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
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update_OK()">确 定</el-button>
                  </div>
                </el-dialog>
                <el-button
                  @click='deleteRow(scope.row,scope.$index)'
                  type="danger"
                  size="small"
                  style="width: 90px;height: 38px;margin: 10px 0 0 0;padding: 0"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              @current-change="current_change"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ["reload"],
    name: "brand",
    data() {
      return {
        /*图片url*/
        imgUrl: '',
        value: true,
        total: 1000,//默认数据总数
        pagesize: 4,//每页的数据条数
        currentPage: 1,//默认开始页面
        istag: true,
        /*form 模拟本地数据 dialogTableVisible  dialogFormVisible 事件*/
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          brandUrl: '',
          brandDescribe: ''
        },
        formLabelWidth: '120px',
        /*查询所有品牌*/
        findAll: [],
        /*搜索 品牌 创建一个新的数组*/
        search: '',
        /*获取到每一行的id 接口里的id 供修改删除使用*/
        rowsID: '',
        //获取复选框ID
        selectedId: {},
        AllID: [], /*所有的id*/
        update_Date: [],
        /*是否显示*/
        brandIsshow: ''
      }
    },
    methods: {
      /*上传头像操作*/
      update(e) {
        let uploadPic = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('uploadPic', uploadPic, uploadPic.name,);//通过append向form对象添加数据
        // param.append('gId',66);//添加form表单中其他数据
        console.log(param.get('uploadPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };  //添加请求头333
        // this.axios.post('/api/FuhessApp_AdminUserModule/user/updetaPic.do',param,config,this.qs.stringify({
        //   userId:62
        // }))
        this.axios.post('/api/FuhessApp_goodsModule/goods/upload.do', param, config)
          .then((data) => {
            this.imgUrl = data.data.data
            console.log(data.data.data)
          })
      },
      /*点击修改  获取到当前行的id 然后赋值给rowsID*/
      updateBrand(row, index) {
        //记录索引
        //记录数据
        //显示弹窗
        this.dialogFormVisible = true;
        /*获取到每一行的id*/
        this.rowsID = row.brandId
        /*修改  获取原有的数据
        */
        this.axios.post('/api/FuhessApp_goodsModule/brand/findOne.do', this.qs.stringify({
          /*吧id传过去  用于接受数据*/
          id: this.rowsID
        })).then((data) => {
          /*成功 回调 赋值*/
          this.form.name = data.data.brandName;
          this.form.brandUrl = data.data.brandUrl;
          this.form.brandDescribe = data.data.brandDescribe;
          brandLogo:this.imgUrl
        }).catch((err) => {
          console.error(err)
        });
      },
      /*完成修改操作*/
      update_OK() {
        /*关闭窗口*/
        this.axios.post("/api/FuhessApp_goodsModule/brand/update.do", this.qs.stringify({
          brandId: this.rowsID,
          brandName: this.form.name,
          brandUrl: this.form.brandUrl,
          brandIsshow: this.brandIsshow,
          brandDescribe: this.form.brandDescribe
        })).then((data) => {
          /*成功回调*/
          this.$message('修改成功！')
          this.reload();
        }).catch((err) => {
          /*失败返回 error*/

        })
        this.dialogFormVisible = false;
        // alert(this.rowsID)
      },
      /*打开是否删除窗口*/
      open(index, rows) {
        this.$confirm('此操作将永久删除,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*获取到每一行的 id 删除*/
          for (let i = 0; i < this.selectedId.length; i++) {
            this.axios.post("/api/FuhessApp_goodsModule/brand/delete.do", this.qs.stringify({
              ids: this.selectedId[i].brandId
            })).then((data) => {
              this.reload();
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            })
          }
          // console.log(this.selectedId)


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
          /*成功回调  弹框  删除成功*/

        })
      },
      /*删除数据 点击事件*/
      construction() {
        this.$router.replace('/newBrand');
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'th';
        }
        return '';
      },
      switchChange() {
        this.istag = !this.istag;
      },
      created() {
        this.total = this.tableData.length;
      },
      current_change(currentPage) {
        this.currentPage = currentPage;
      },
      /*删除每一行*/
      deleteRow(rows, index) {
        this.$confirm('此操作将永久删除,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*获取到每一行的 id 赋值给 rowsID*/
          this.rowsID = rows.brandId
          /*删除操作*/
          this.axios.post('/api/FuhessApp_goodsModule/brand/delete.do', this.qs.stringify({
            ids: this.rowsID
          })).then((data) => {
            this.reload();
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            // rows.splice(index, this.rowsID);
            /*删除一行 按rows 删除*/
          }).catch((err) => {
            console.error(err)
          })
          /*成功回调  弹框  删除成功*/

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        })
      },
      handleSelectionChange(index) {
        this.selectedId = index;
      },
      /*是否显示*/
      changeStatus(value) {
        this.brandIsshow = value
      }
    },
    /*页面加载时候的一些操作*/
    created() {
      /*查询全部*/
      this.axios.post('/api/FuhessApp_goodsModule/brand/findAllDesc.do').then((data) => {
        this.findAll = data.data.data;
        // for (let i = 0; i < this.findAll.length; i++) {
        //   console.log(this.findAll[i].brandIsshow)
        // }
      }).catch((err) => {
        console.error(err)
      })

    },
    /*搜索操作*/
    computed: {
      findAlls: function () {
        var search = this.search;
        if (search) {
          return this.findAll.filter(function (dataNews) {
            return Object.keys(dataNews).some(function (key) {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.findAll
      }
    },
  }
</script>
<style scoped>
  .left .title p {
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 22px;
    border-bottom: 1px solid #cccccc;
    font-weight: bold;
    padding-left: 10px;
  }

  .left .content .construction {
    width: 100px;
    height: 40px;
    background-color: #cccccc;
    font-size: 18px;
    color: #333333;
    line-height: 10px;
    margin-left: 10px;
    margin-top: 15px;
  }

  .left .content .information {
    width: 97.5%;
    border: 1px solid #cccccc;
    margin: 20px auto;
  }

  /*这是修改按钮*/
  /*.update-btn{
    width: 100px;
    height: 30px;
    background-color: #3d9970;
    position: relative;
    right: 60px;
    padding-left: 45px;
    color: #ffffff;
    line-height: 3px;
  }*/
  .search {
    float: right;
    padding-top: 15px;
  }

  .search ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search ul li {
    padding-right: 12px;
  }

  .block {
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }

  .brand_img {
    width: 80px;
    height: 80px;
  }
</style>
