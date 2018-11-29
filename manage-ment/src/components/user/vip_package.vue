<template>
    <div>
        <div class="content">
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
                  prop="comboName"
                  label="套餐名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="timeCycle"
                  label="周期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="价格"
                  width="180">
                </el-table-column>
              </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vip_package",
      data(){
          return{
            findAll:[]
        }
      },
      /*查询全部套餐*/
      created(){
        this.axios.post("/api/FuhessApp_AdminUserModule/user/selectALLMemberCombo.do").then((data) =>{
          this.findAll =data.data.list
        }).catch((err) =>{
          console.log(err)
        })
      }
    }
</script>

<style scoped>

</style>
