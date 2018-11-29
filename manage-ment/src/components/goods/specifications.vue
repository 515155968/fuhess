<template>
  <div class="box">
    <!--商品规格页面-->
    <!--新建规格  删除规格  刷新-->
    <div>
      <el-button type="success" @click="new_Specification()">新建</el-button>
      <el-dialog title="新建规格" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品id:" :label-width="formLabelWidth">
            <el-select v-model="form.goodsId" clearable placeholder="请选择">
              <!--<el-option-->
              <!--v-for="item in classifyId"-->
              <!--:key="item.classifyId"-->
              <!--:label="item.classifyId"-->
              <!--:value="item.classifyId"-->
              <!--&gt;-->
              <!--</el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="描述:" :label-width="formLabelWidth">
            <el-input
              v-model="form.specifDetails"
              autocomplete="off"
              placeholder="请输入描述内容"
              type="textarea"
              autosize
              style="width: 215px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine()">确 定</el-button>
        </div>
      </el-dialog>
      <el-button type="danger" @click="open_Delete()">删除</el-button>
      <el-button type="primary" @click="The_refresh()">刷新</el-button>
    </div>
    <div class="table">
      <el-table
        :data="findAll.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="specifId"
          label="规格id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goodsId"
          label="商品id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="specifDetails"
          label="规格详情">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="110">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="update(scope.row,scope.$index)"
              style="width: 90px;height: 38px;"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="delete_Specif(scope.row,scope.$index)"
              style="width: 90px;height: 38px;margin: 10px 0 0 0;padding: 0"

            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          @current-change="current_change"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog title="修改" :visible.sync="dialogFormVisible2">
        <el-form :model="form">
          <el-form-item label="商品id:" :label-width="formLabelWidth">
            <el-select v-model="form.goodsId" clearable placeholder="修改">
              <!--<el-option-->
              <!--v-for="item in classifyId"-->
              <!--:key="item.classifyId"-->
              <!--:label="item.classifyId"-->
              <!--:value="item.classifyId"-->
              <!--&gt;-->
              <!--</el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="描述:" :label-width="formLabelWidth">
            <el-input
              v-model="form.specifDetails"
              autocomplete="off"
              placeholder="请输入描述内容"
              type="textarea"
              autosize
              style="width: 215px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="determine_update()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ["reload"],
    name: "specifications",
    data() {
      return {
        total: 100,//默认数据总数
        pagesize: 5,//每页的数据条数
        currentPage: 1,//默认开始页面
        istag: true,
        /*查询所有的规格*/
        findAll: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
          specifId: '', /*规格id*/
          goodsId: '', /*商品id*/
          specifDetails: ''/*商品描述*/
        },
        formLabelWidth: '120px',
        /*复选框id */
        selectedId:[]
      }
    },
    methods: {
      current_change(currentPage) {
        this.currentPage = currentPage;
      },
      /*新建弹框*/
      new_Specification() {
        /*显示弹框*/
        this.dialogFormVisible = true;
      },
      /*添加操作*/
      determine() {
        this.axios.post('/api/FuhessApp_goodsModule/specification/add.do', this.qs.stringify({
          goodsId: '1',
          specifDetails: this.form.specifDetails
        })).then((data) => {
          this.$message("添加成功！");
          this.reload();
        }).catch((err) => {
          console.log(err);
        })
      },
      /*修改操作*/
      update(rows, index) {
        this.dialogFormVisible2 = true;
        this.form.goodsId = rows.goodsId;
        this.form.specifDetails = rows.specifDetails
      },
      /*修改规格*/
      determine_update() {
        this.axios.post("/api/FuhessApp_goodsModule/specification/update.do", this.qs.stringify({
          specifId: this.form.specifId,
          goodsId: this.form.goodsId,
          specifDetails: this.form.specifDetails
        })).then((data) => {
          this.$message("修改成功！")
          this.reload();
        }).catch((err) => {
          console.log(err)
        })
      },
      /*删除一行*/
      delete_Specif(rows,index){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.axios.post("/api/FuhessApp_goodsModule/specification/delete.do",this.qs.stringify({
              ids:rows.specifId
            })).then((data) =>{
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.reload();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /*刷新*/
      The_refresh(){
        this.reload();
      },
      /*复选框删除 获取id*/
      handleSelectionChange(index){
        this.selectedId = index;
      },
      open_Delete(){
        this.$confirm('此操作将永久删除,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*获取到每一行的 id 删除*/
          for (let i = 0; i < this.selectedId.length; i++) {
            this.axios.post("/api/FuhessApp_goodsModule/specification/delete.do",this.qs.stringify({
              ids:this.selectedId[i].specifId
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
      }
    },
    /*窗体加载 执行*/
    created() {
      /*查询所有规格*/
      this.axios.post("/api/FuhessApp_goodsModule/specification/findAll.do").then((data) => {
        this.findAll = data.data.data
      }).catch((err) => {
        console.log(erre)
      })
    }
  }
</script>

<style scoped>
  .box {
    padding-top: 2%;
    padding-left: 2%;
  }

  .table,
  .block{
    text-align: center;
    margin-top: 5px;
  }

</style>
