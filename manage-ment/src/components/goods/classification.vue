<template>
  <div class="box">
    <!--商品规格页面-->
    <!--新建  删除  刷新-->
    <div class="btnDiv">
      <el-button type="success" class="btn" @click="newClassFication()">新建</el-button>
      <el-dialog title="新建分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称:" :label-width="formLabelWidth">
            <el-input v-model="form.classify_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父类ID:" :label-width="formLabelWidth">
            <el-select v-model="form.classify_parent_id" clearable placeholder="请选择"
                       filterable
                       allow-create
                       default-first-option>
              <el-option
                v-for="item in findAll"
                :key="item.classifyId"
                :label="item.classifyId"
                :value="item.classifyId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序:" :label-width="formLabelWidth">
            <el-input v-model="form.sort_order" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否显示:" :label-width="formLabelWidth">
            <el-input v-model="form.is_show" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="newClass()">确 定</el-button>
        </div>
      </el-dialog>
      <el-button type="success" class="btn" @click="openDelete()">删除</el-button>
      <el-button type="success" class="btn" @click="refresh()">刷新</el-button>
    </div>
    <!--内容-->
    <div>
      <el-table
        ref="multipleTable"
        stripe
        :data="findAll.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!--@selection-change="handleSelectionChange">-->
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="classifyId"
          label="分类ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="classifyName"
          label="分类名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="classifyParentId"
          label="父类ID"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isShow"
          label="是否显示"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sortOrder"
          label="排序"

          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="lower_level(scope.row,scope.$index)"
              size="mini"
               style="width: 90px;height: 38px;"
            >查询下级
            </el-button>
            <el-button
              size="mini"
              @click="editor(scope.row,scope.$index)"
                 style="width: 90px;height: 38px;margin: 10px 0 0 0;padding: 0"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="class_delete(scope.row,scope.$index)"

                 style="width: 90px;height: 38px;margin: 10px 0 0 0;padding: 0"

            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible2">
        <el-form :model="form">
          <el-form-item label="分类名称:" :label-width="formLabelWidth">
            <el-input v-model="form.classify_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父类ID:" :label-width="formLabelWidth">
            <el-input v-model="form.classify_parent_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序:" :label-width="formLabelWidth">
            <el-input v-model="form.sort_order" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否显示:" :label-width="formLabelWidth">
            <el-input v-model="form.is_show" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="determine()">确 定</el-button>
        </div>
      </el-dialog>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          @current-change="current_change"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ["reload"],
    name: "classification",
    data() {
      return {
        findAll: [], /*查询所有分类*/
        total: 100,//默认数据总数
        pagesize: 3,//每页的数据条数
        currentPage: 1,//默认开始页面
        istag: true,
        /*弹窗*/
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
          classify_name: '', /*名称*/
          classify_parent_id: '', /*父类ID*/
          sort_order: '', /*排序*/
          is_show: ''/*是否显示*/
        },
        classifyId: [],
        formLabelWidth: '120px',
        classifyId: '', /*用户接收数据的每一条id*/
        /*面包屑name*/
        /*全选 删除*/
        selectedId: []
      }
    },
    methods: {
      /*分页*/
      current_change(currentPage) {
        this.currentPage = currentPage;
      },
      /*新建分类弹框*/
      newClassFication() {
        this.dialogFormVisible = true;
      },
      /*确认新建*/
      newClass() {
        this.axios.post("/api/FuhessApp_goodsModule/classify/add.do", this.qs.stringify({
          classifyName: this.form.classify_name,
          sortOrder: this.form.sort_order,
          isShow: this.form.is_show,
          classifyParentId: this.form.classify_parent_id
        })).then((data) => {
          /*成功回调*/
          this.dialogFormVisible = false;
          this.$message("添加成功！")
          this.reload();
        }).catch((err) => {
          console.error(err)
          alert("添加失败")
        })
      },
      /*刷新*/
      refresh() {
        this.reload();
      },
      /*点击编辑获取到当前行的id*/
      editor(row, index) {
        this.dialogFormVisible2 = true;
        this.classifyId = row.classifyId;
        this.axios.post("/api/FuhessApp_goodsModule/classify/findById.do", this.qs.stringify({
          classifyId: this.classifyId
        })).then((data) => {
          this.form.classify_name = data.data.classifyName;
          this.form.classify_parent_id = data.data.classifyParentId;
          this.form.sort_order = data.data.sortOrder;
          this.form.is_show = data.data.isShow;
        }).catch((err) => {
          console.error(err)
        })
      },
      /*修改操作*/
      determine() {
        this.axios.post("/api/FuhessApp_goodsModule/classify/update.do", this.qs.stringify({
          classifyId: this.classifyId,
          classifyName: this.form.classify_name,
          sortOrder: this.form.sort_order,
          isShow: this.form.is_show,
          classifyParentId: this.form.classify_parent_id
        })).then((data) => {
          this.$message("跟新成功！")
          this.dialogFormVisible2 = false;
        }).catch((err) => {
          console.log(err)
        })
      },
      /*删除一行操作*/
      class_delete(rows, index) {
        this.classifyId = rows.classifyId;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/api/FuhessApp_goodsModule/classify/delete.do", this.qs.stringify({
            ids: this.classifyId
          })).then((data) => {
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
      /*复选框删除*/
      openDelete(index, rows) {
        this.$confirm('此操作将永久删除,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*获取到每一行的 id 删除*/
          for (let i = 0; i < this.selectedId.length; i++) {
            this.axios.post("/api/FuhessApp_goodsModule/classify/delete.do", this.qs.stringify({
              ids: this.selectedId[i].classifyId
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
      /*分类查询下级*/
      lower_level(rows, index) {
        this.axios.post("/api/FuhessApp_goodsModule/classify/nextClassify.do",this.qs.stringify({
          cId:rows.classifyId
        })).then((data) =>{
          this.findAll = []
          this.findAll = data.data
        })
      },
      /*查询全部*/
      queryAll() {
        this.axios.post("/api/FuhessApp_goodsModule/classify/findParCla.do").then((data) => {
          this.findAll = []
          this.findAll = data.data.data;
        }).catch((err) => {
          console.log(err)
        })
      },
      handleSelectionChange(index) {
        this.selectedId = index
      }
    },
    /*窗体加载执行*/
    created() {
      /*查询全部分类*/
      this.axios.post("/api/FuhessApp_goodsModule/classify/findParCla.do").then((data) => {
        this.findAll = data.data.data;
      });

    },
  }
</script>

<style scoped>
  .box {
    padding-top: 20px;
    padding-left: 10px;
  }

  .btnDiv .btn {
    margin-top: 20px;
  }

  .el-button + .el-button {
    margin-left: 0;
    margin-top: 10px;
  }

  .block {
    text-align: center;
    margin-top: 15px;
  }
</style>
