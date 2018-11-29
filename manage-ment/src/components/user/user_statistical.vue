<template>
  <div>
    <div class="time">
      <div class="start_Time">
        <span class="demonstration">开始时间</span>
        <el-date-picker
          v-model="time.start_TimeText"
          format="yyyy-MM-dd"
          value-format="yyyy/MM/dd"
          @change="start_Time"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="end_Time">
        <span class="demonstration">结束时间</span>
        <el-date-picker
          v-model="time.end_TimeText"
          format="yyyy-MM-dd"
          value-format="yyyy/MM/dd"
          @change="end_Time"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <el-button @click="query">查看</el-button>
    </div>
    <div style="width: 90%;margin:40px auto">
      <el-table
        stripe
        :data="findAll">
        <el-table-column
          prop="alias"
          label="昵称" width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名" width="180">
        </el-table-column>
        <el-table-column
          prop="regTime"
          label="注册时间" width="180">
        </el-table-column>
        <el-table-column
          prop="homeAddress"
          label="住址" width="180">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: "user_statistical",
    data() {
      return {
        time: {
          start_TimeText: '', /*开始时间*/
          end_TimeText: ''/*结束时间*/
        },
        findAll: [],/*所有的用户*/
      }
    },
    methods: {
      /*获取开始时间*/
      start_Time(val) {
        this.time.start_TimeText = val;
      },
      /*获取结束时间*/
      end_Time(val) {
        this.time.end_TimeText = val;
      },
      /*查询*/
      query() {
        this.axios.post("/api/FuhessApp_AdminUserModule/user/statisticalRegTime.do", this.qs.stringify({
          strat: this.time.start_TimeText,
          end: this.time.end_TimeText
        })).then((data) => {
          this.findAll = data.data.list
          if (this.findAll == null){
            this.$message('改时间段没有用户信息！')
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .time {
    text-align: center;
    padding-top: 50px;
    display: flex;
    justify-content: space-around;
  }
</style>
