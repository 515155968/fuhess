<template>
  <!--规格管理模块-->
  <div>
    <div>
      <!--标题-->
      <div class="title">
        <p>商品</p>
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
            <li>规格名称:</li>
            <li>
              <el-input v-model="search" placeholder="请输入内容"></el-input>
            </li>
          </ul>
        </div>
        <!--修改-->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="品牌名称:" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌名称:" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌名称:" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌名称:" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌名称:" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <!--带有下拉菜单-->
            <!--<el-form-item label="活动区域" :label-width="formLabelWidth">-->
            <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <!--数据-->
        <div class="information">
          <el-table
            :data="findAll_search.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :center=true
          >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column
              prop="goodsId"
              label="商品id"
              width="180">
            </el-table-column>
           <!-- <el-table-column
              prop="goodsSn"
              label="商品编号"
              width="180">
            </el-table-column>-->
            <el-table-column
              prop="goodsName"
              label="商品名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="classifyId"
              label="产品分类"
              width="180">
            </el-table-column>
            <el-table-column
              prop="brandId"
              label="商品品牌id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="specifId"
              label="商品规格id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="attributeId"
              label="商品属性id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goodsTypeId"
              label="商品类型id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goodsMarket"
              label="市场价格"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goodsLocation"
              label="位置"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goodsColor"
              label="商品颜色"
              width="180">
            </el-table-column>
            <el-table-column
              prop="isCollect"
              label="是否收藏"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goodsMembers"
              label="会员价格"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goodsAgent"
              label="代理商价格"
              width="180">
            </el-table-column>
            <el-table-column
              prop="isBest"
              label="是否精品"
              width="180">
            </el-table-column>
            <el-table-column
              prop="isNew"
              label="是否新品"
              width="180">
            </el-table-column>
            <el-table-column
              prop="isHot"
              label="是否热销"
              width="180">
            </el-table-column>
            <el-table-column label="商品图片" width="180">
              <template slot-scope="scope">
                <img v-for="item in goodsImg " :src='item' alt="" class="img goodsImg">
              </template>
            </el-table-column>
            <el-table-column
              prop="goodsIntegral"
              label="赠送积分"
              width="180">
            </el-table-column>
            <el-table-column prop="goodsDesc" label="商品详情" width="180">
              <template slot-scope="scope">
                <img :src='scope.row.goodsDesc' alt="" class="img">
              </template>
            </el-table-column>
            <el-table-column
              prop="goodsTime"
              label="创建时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="isDelete"
              label="商品是否删除"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="110"
            >
              <template slot-scope="scope">
                <el-button
                  type="success"
                  @click="upd_Goods(scope.row,scope.$index)"
                  class="update-btn" style="width: 90px;height: 38px;">修改</el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.row,scope.$index)"
                  type="danger"
                  size="small" style="width: 90px;height: 38px;margin: 10px 0 0 0;padding: 0">
                  移除
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
    name: "ManagePage",
    data() {
      return {
        total: 1000,//默认数据总数
        pagesize: 4,//每页的数据条数
        currentPage: 1,//默认开始页面
        istag: true,
        /*form 模拟本地数据 dialogTableVisible  dialogFormVisible 事件*/
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        /*Table 表格模拟数据*/
        findAll: [],
        upd_Id: '',/*修改传的id*/
        selectedId:[],
        search:'',/*搜索*/
        goodsImg:[],/*商品图片*/
      }
    },
    methods: {
      /*打开是否删除窗口*/
      open(index, rows) {
        this.$confirm('此操作将永久删除,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*获取到每一行的 id 删除*/
          for (let i = 0; i < this.selectedId.length; i++) {
            this.axios.post("/api/FuhessApp_goodsModule/goods/delete.do",this.qs.stringify({
              ids:this.selectedId[i].goodsId
            })).then((data) =>{
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
      /*移除当前行*/
      deleteRow(rows, index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/api/FuhessApp_goodsModule/goods/delete.do", this.qs.stringify({
            ids: rows.goodsId
          })).then((data) => {
            this.reload();
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          }).catch((err) => {
            console.log(err)
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /*删除数据 点击事件*/
      deleteUser(val) {
        //这里写相应的逻辑，val是指传进来的参数也就是上面的scope.row.phone；也可以是scope.row.nickname等
      },
      construction() {
        this.$router.replace('/construction');
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
      created: function () {
        this.total = this.tableData.length;
      },
      current_change: function (currentPage) {
        this.currentPage = currentPage;
      },
      /*点击修改  */
      upd_Goods(rows, index) {
        /*把商品id穿过去*/
        this.upd_Id = rows.goodsId
        this.$router.push({path: "/upd_Goods", query: {upd_Id: this.upd_Id}})
      },
      /*复选框删除*/
      handleSelectionChange(index){
        this.selectedId = index
      }
    },
    /*页面加载执行*/
    created() {
      /*查询全部*/
      this.axios.post("/api/FuhessApp_goodsModule/goods/findAll.do").then((data) => {
        this.findAll = data.data.data
        let imgs;
        for (let i = 0; i < this.findAll.length; i++) {
          imgs = this.findAll[i].imgUrl;
          this.goodsImg = imgs;
        };
        // console.log(this.goodsImg)
      })
    },
    /*搜索*/
    computed: {
      findAll_search() {
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.findAll.filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.findAll
      }
    }

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
  .img{
    width: 50px;
    height:90px;
  }
</style>
