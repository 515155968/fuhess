<template>
  <div>
    <div style="margin-top: 20px">
      <router-link to="/users">
         <el-button type="success">返回上一级</el-button>
      </router-link>
    </div>
    <div style="margin-top: 20px" class="content">
      <el-table
        stripe
        :data="findAll"
        style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="integralCount"
          label="积分数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dataSource"
          label="来源类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orderSn"
          label="积分来源"
          width="180">
        </el-table-column>
        <el-table-column
          prop="integralType"
          label="积分类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="record"
          label="积分记录"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="open_update(scope.row,scope.$index)"
              style="width: 100px;"
            >修改
            </el-button>
          </template>
          <el-dialog title="修改积分" :visible.sync="dialogFormVisible" :append-to-body="true">
            <el-form :model="update_User">
              <el-form-item label="积分类型:" :label-width="update_User.formLabelWidth">
                <el-input v-model="update_User.integralType" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="积分数:" :label-width="update_User.formLabelWidth">
                <el-input v-model="update_User.record" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="update_ok()">确 定</el-button>
            </div>
          </el-dialog>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user_integral",
    inject: ["reload"],
    data() {
      return {
        findAll: [],
        dialogFormVisible: false,
        update_User: {
          formLabelWidth: '120px',
          integralType: '', /*积分类型 1：支出 2：收入*/
          record: '', /*每次需要支出或收入的积分数*/
        }
      }
    },
    methods: {
      /*打开更新用户的积分窗口*/
      open_update() {
        this.dialogFormVisible = true
      },
      /*跟新用户积分*/
      update_ok() {
        this.axios.post("/api/FuhessApp_AdminUserModule/user/insertUserIntegral.do", this.qs.stringify({
          userId: this.$route.query.userId,
          integralType: this.update_User.integralType,
          record: this.update_User.record
        })).then((data) => {
          this.reload();
          this.$message('跟新成功！')
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    created() {
      this.axios.post("/api/FuhessApp_AdminUserModule/user/selectAllByUserId.do", this.qs.stringify({
        userId: this.$route.query.userId
      })).then((data) => {
        this.findAll = data.data.list
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>

</style>
