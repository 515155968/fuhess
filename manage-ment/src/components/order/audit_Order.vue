<template>
  <div>
    <div class="box">
      <el-table
        :data="findAll.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width: 100%">
        <el-table-column
          prop="orderSn"
          label="订单编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单信息"
          width="180">
        </el-table-column>
        <el-table-column
          prop="consignee"
          label="收件人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="收件人详细地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="收件人电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="postcode"
          label="收件人邮编"
          width="180">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="订单备注"
          width="180">
        </el-table-column>
        <el-table-column
          prop="total"
          label="订单总金额"
          width="180">
        </el-table-column>
        <el-table-column
          prop="usingIntegral"
          label="使用积分"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pointIntegral"
          label="获得积分"
          width="180">
        </el-table-column>
        <el-table-column
          prop="creatTime"
          label="订单创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="checkTime"
          label="审核时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cancelTime"
          label="取消时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="finishTime"
          label="完成时间"
          width="180">
        </el-table-column>
        <!--scope.row,scope.$index-->
        <el-table-column
          fixed="right"
          label="操作"
          width="120"

        >
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="audit_OK(scope.row,scope.$index)"
              style="width: 90px;"
            >
              审核通过
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="audit_NO(scope.row,scope.$index)"
              style="margin-left:0;margin-top: 5px;width: 90px;"
            >
              审核不通过
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
</template>
<script>
  export default {
    inject: ["reload"],
    name: "audit_Order",
    data() {
      return {
        total: 1000,//默认数据总数
        pagesize: 5,//每页的数据条数
        currentPage: 1,//默认开始页面
        istag: true,
        findAll: []
      }
    },
    methods: {
      /*分页*/
      current_change(currentPage) {
        this.currentPage = currentPage;
      },
      /*审核通过*/
      audit_OK(rows, index) {
        this.$confirm('是否确认通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/api/FuhessApp_orderModule/info/updateStatus.do", this.qs.stringify({
            orderId: rows.orderId,
            orderStatus: 4
          })).then((data) => {
            this.reload();
            this.$message({
              type: 'success',
              message: '已通过!',
            });
          }).catch((err) => {
            console.error(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消通过'
          });
        })

      },
      /*不通过*/
      audit_NO(rows, index) {
        this.$confirm('是否确认通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/api/FuhessApp_orderModule/info/updateStatus.do", this.qs.stringify({
            orderId: rows.orderId,
            orderStatus: 2
          })).then((data) => {
            this.reload();
            this.$message({
              type: 'success',
              message: '已通过!',
            });
          }).catch((err) => {
            console.error(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消通过'
          });
        })
      }
    },
    /*窗体加载  执行*/
    created() {
      this.axios.post("/api/FuhessApp_orderModule/info/findByStatus.do", this.qs.stringify({
        orderStatus: 1
      })).then((data) => {
        this.findAll = data.data.data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>
  .block {
    text-align: center;
    margin-top: 10px;
  }

  .box {
    padding-left: 15px;
  }
</style>
