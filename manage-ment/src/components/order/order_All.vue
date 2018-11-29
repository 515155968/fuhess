<template>
  <div>
    <div style="display: flex;align-items: center">
      <div>
        <div class="search">
          <ul>
            <li>
              <el-input v-model="search" width="200"
                        placeholder="请输入搜索内容">
              </el-input>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="box">
      <el-table
        :data="userAll_search.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width: 100%">
        <el-table-column
          prop="orderId"
          label="ID"
          width="180">
        </el-table-column>
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
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="completed_Order(scope.row,scope.$index)"
            >
              已完成订单
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="audit_Order(scope.row,scope.$index)"
              style="margin-left:0;margin-top: 5px"
            >
              待审核订单
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="cancel_Order(scope.row,scope.$index)"
              style="margin-left:0;margin-top: 5px;width: 91px;"
            >
              取消订单
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
    name: "order_All",
    data() {
      return {
        total: 1000,//默认数据总数
        pagesize: 4,//每页的数据条数
        currentPage: 1,//默认开始页面
        istag: true,
        findAll: [],
        search:''
      }
    },
    methods: {
      /*分页*/
      current_change(currentPage) {
        this.currentPage = currentPage;
      },
      /*点击已完成*/
      completed_Order(rows, index) {
        this.$confirm('是否确认订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/api/FuhessApp_orderModule/info/updateStatus.do", this.qs.stringify({
            orderId: rows.orderId,
            orderStatus: 5
          })).then((data) =>{
            this.reload();
            this.$message({
              type: 'success',
              message: '订单已完成!',
            });
          }).catch((err) =>{
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });
        })
      } ,
      /*点击已完成*/
      audit_Order(rows, index) {
        this.$confirm('是否待审核订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/api/FuhessApp_orderModule/info/updateStatus.do", this.qs.stringify({
            orderId: rows.orderId,
            orderStatus: 1
          })).then((data) =>{
            this.reload();
            this.$message({
              type: 'success',
              message: '已完成!',
            });e
          }).catch((err) =>{
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });
        })
      },
      /*取消订单*/
      cancel_Order(rows, index) {
        this.$confirm('是否取消订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/api/FuhessApp_orderModule/info/updateStatus.do", this.qs.stringify({
            orderId: rows.orderId,
            orderStatus: 2
          })).then((data) =>{
            this.reload();
            this.$message({
              type: 'success',
              message: '成功!',
            });e
          }).catch((err) =>{
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });
        })
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'th';
        }
        return '';
      },
    },
    /*窗体加载  执行*/
    created() {
      this.axios.post("/api/FuhessApp_orderModule/info/findAll.do").then((data) => {
        this.findAll = data.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    computed: {
      userAll_search() {
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
  .box{
    padding-left: 20px;
  }
  .block {
    text-align: center;
    margin-top: 10px;
  }

  .box {
    padding-left: 15px;
  }
  .search{
    margin-top: 30px;
    padding-left: 20px;
  }
</style>
