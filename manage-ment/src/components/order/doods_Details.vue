<template>
  <div>
    <el-table
      :data="doods_Details"
      stripe
      style="width: 100%">
      <el-table-column
        prop="finishTime"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="订单ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsId"
        label="商品ID"
        width="180"></el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsSn"
        label="商品编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsNumber"
        label="商品数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="getIntegral"
        label="商品积分"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsPrice"
        label="商品价格"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "doods_Details",
    data() {
      return {
        doods_Details: []
      }
    },
    created() {
      this.axios.post("/api/FuhessApp_orderModule/goods/findByOid.do", this.qs.stringify({
        orderId: this.$route.query.orderId
      })).then((data) => {
        this.doods_Details = data.data.data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>

</style>
