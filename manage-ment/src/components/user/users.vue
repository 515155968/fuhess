<template>
  <div class="box">
    <div style="display: flex;align-items: center">
      <div class="add">
        <el-dialog title="新建用户" :visible.sync="dialogFormVisible">
          <el-form :model="add">
            <el-form-item label="昵称:" :label-width="formLabelWidth">
              <el-input v-model="add.alias" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户手机号:" :label-width="formLabelWidth">
              <el-input v-model="add.userPhone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名密码:" :label-width="formLabelWidth">
              <el-input v-model="add.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名:" :label-width="formLabelWidth">
              <el-input v-model="add.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:" :label-width="formLabelWidth">
              <el-input v-model="add.identityCard" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址:" :label-width="formLabelWidth">
              <el-input v-model="add.homeAddress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别:" :label-width="formLabelWidth">
              <el-input v-model="add.sex" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="determine()">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="success" @click="add_User()">新增用户</el-button>
        <el-button type="success" @click="open_Delete()">删除</el-button>
        <el-button type="success" @click="refresh">刷新</el-button>
      </div>
      <div>
        <div class="search">
          <ul>
            <li>品牌名称:</li>
            <li>
              <el-input v-model="search" width="200"
                        placeholder="请输入搜索内容">
              </el-input>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <el-table
        stripe
        :data="userAll_search.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="alias"
          label="昵称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="userImg"
          label="用户头像"
          width="180"
        >
          <template slot-scope="scope"><!--../../assets/1.jpg-->
            <img :src="scope.row.userImg" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="用户手机号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="用户密码"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="真实姓名" width="180">
        </el-table-column>
        <el-table-column
          prop="homeAddress"
          label="家庭地址" width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="配送地址" width="180">
        </el-table-column>
        <el-table-column
          prop="identityCard"
          label="身份证号" width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别" width="180">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期" width="180">
        </el-table-column>
        <el-table-column
          prop="generalize"
          label="推广码" width="180">
        </el-table-column>
        <el-table-column
          prop="byGeneralize"
          label="被推荐码" width="180">
        </el-table-column>
        <el-table-column
          prop="integral"
          label="用户积分" width="180">
        </el-table-column>
        <el-table-column
          prop="regTime"
          label="注册时间" width="180">
        </el-table-column>
        <el-table-column
          prop="addressId"
          label="配送地址id" width="180">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editor(scope.row,scope.$index)"
              style="width: 100px;"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="user_delete(scope.row,scope.$index)"
              style="width: 100px;"
            >删除
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="upd_Address(scope.row,scope.$index)"
              style="width: 100px;"
            >修改配送地址
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click.native.prevent="upd_UserImg(scope.row,scope.$index)"
              style="width: 100px;"
            >修改用户头像
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click.native.prevent="upd_integral(scope.row,scope.$index)"
              style="width: 100px;"
            >积分记录
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click.native.prevent="Userlatest_integral(scope.row,scope.$index)"
              style="width: 100px;"
            >用户最新积分
            </el-button>
            <el-dialog title="查看用户最新积分:" :visible.sync="dialogFormVisible4" :append-to-body="true">
              <el-form :model="latest_integral">
                <el-form-item label="用户最新积分:" :label-width="formLabelWidth">
                  <el-input v-model="latest_integral.num" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible4 = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="修改配送地址:" :visible.sync="dialogFormVisible2" :append-to-body="true">
              <el-form :model="updateUserAddrress">
                <el-form-item label="配送地址id:" :label-width="formLabelWidth">
                  <el-input v-model="updateUserAddrress.addressId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收件人城市:" :label-width="formLabelWidth">
                  <el-input v-model="updateUserAddrress.city" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收件人详细地址:" :label-width="formLabelWidth">
                  <el-input v-model="updateUserAddrress.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收件人省份:" :label-width="formLabelWidth">
                  <el-input v-model="updateUserAddrress.province" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="determine_Upd(scope.row,scope.$index)">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="修改用户头像:" :visible.sync="dialogFormVisible3" :append-to-body="true">
              <div class="userImg_div">
                <img :src="updateUserAddrress.userImg" alt="">
                <input class="file" name="uploadPic" type="file" @change="update"/>
              </div>
            </el-dialog>
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
    </div>
  </div>
</template>

<script>
  export default {
    inject: ["reload"],
    name: "users",
    data() {
      return {
        findAll: [], /*查询所有分类*/
        total: 100,//默认数据总数
        pagesize: 2,//每页的数据条数
        currentPage: 1,//默认开始页面
        userAll: [], /*获取全部数据*/
        search: ''/*搜索数据*/,
        selectedId: []/*复选框的ID*/,
        upd_UserId: [], /*获取修改哪一行的id*/
        dialogFormVisible: false,
        formLabelWidth: '120px',
        identityCard: '',
        /*添加用户*/
        add: {
          alias: '',
          userPhone: '',
          password: '',
          userName: '',
          homeAddress: '',
          sex: ''
        },
        /*修改用户*/
        updateUserAddrress: {
          addressId: '', /*配送地址id*/
          city: '', /*收件人城市*/
          address: '', /*收件人详细地址*/
          province: '', /*收件人省份*/
          userImg: ''
        },
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        dialogFormVisible4: false,
        userImg_Id: '',
        latest_integral: {
          num: ''
        }
      }
    },
    methods: {
      /*分页*/
      current_change(currentPage) {
        this.currentPage = currentPage;
      },
      /*刷新*/
      refresh() {
        this.reload();
      },
      /*修改*/
      editor(rows, index) {
        this.upd_UserId = rows.userId
        console.log(rows)
        // this.$router.push({path: "/upd_Goods", query: {upd_Id: this.upd_Id}})
        /*把当前id传过去*/
        this.$router.push({path: "/editor", query: {upd_UserId: this.upd_UserId}})
      },
      /*删除每一行*/
      user_delete(rows, index) {
        this.$confirm('此操作将永久删除,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*获取到每一行的 id 赋值给 rowsID*/
          /*删除操作*/
          this.axios.post('/api/FuhessApp_AdminUserModule/user/deleteUser.do', this.qs.stringify({
            userId: rows.userId
          })).then((data) => {
            /*成功回调  弹框  删除成功*/
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

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        })
      },
      /*获取所有的复选框id*/
      handleSelectionChange(index) {
        this.selectedId = index;
      },
      open_Delete(index, rows) {
        this.$confirm('此操作将永久删除,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*获取到每一行的 id 删除*/
          for (let i = 0; i < this.selectedId.length; i++) {
            this.axios.post("/api/FuhessApp_AdminUserModule/user/deleteUser.do", this.qs.stringify({
              userId: this.selectedId[i].userId
            })).then((data) => {
              this.reload();
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
          /*成功回调  弹框  删除成功*/

        })
      },
      /*打开添加窗口*/
      add_User() {
        this.dialogFormVisible = true;
      },
      /*添加用户*/
      determine() {
        this.axios.post("/api/FuhessApp_AdminUserModule/user/adduser.do", this.qs.stringify({
          alias: this.add.alias,
          identityCard: this.add.identityCard,
          userPhone: this.add.userPhone,
          password: this.add.password,
          userName: this.add.userName,
          homeAddress: this.add.homeAddress,
          sex: this.add.sex
        })).then((data) => {
          this.dialogFormVisible = false;
          this.reload();
          this.$message("添加成功");
        }).catch((err) => {
          console.log(err)
        })
      },
      /*修改配送地址*/
      upd_Address(rows, index) {
        this.axios.post("/api/FuhessApp_AdminUserModule/user/selectUserAddrress.do", this.qs.stringify({
          addressId: rows.addressId
        })).then((data) => {
          this.updateUserAddrress.addressId = rows.addressId;
          this.updateUserAddrress.city = data.data.addrress.city;
          this.updateUserAddrress.address = data.data.addrress.address;
          this.updateUserAddrress.province = data.data.addrress.province;
          this.dialogFormVisible2 = true
        }).catch((err) => {
          console.log(err)
        })
      },
      /*确定修改*/
      determine_Upd() {
        this.axios.post("/api/FuhessApp_AdminUserModule/user/updateUserAddrress.do", this.qs.stringify({
          addressId: this.updateUserAddrress.addressId,
          city: this.updateUserAddrress.city,
          address: this.updateUserAddrress.address,
          province: this.updateUserAddrress.province
        })).then((data) => {
          this.reload();
          this.$message("修改成功")
          this.dialogFormVisible2 = false
        }).catch((err) => {
          console.log(err)
        })
      },
      /*吧当前的用户id获取到 供修改头像使用*/
      upd_UserImg(rows, index) {
        this.userImg_Id = rows.userId
        // console.log(rows)
        this.dialogFormVisible3 = true
      },
      /*修改用户头像*/
      update(e) {
        let uploadPic = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('uploadPic', uploadPic, uploadPic.name);//通过append向form对象添加数据
        // param.append('chunk','0');//添加form表单中其他数据
        // console.log(param.get('uploadPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };  //添加请求头333
        this.axios.post('/api/FuhessApp_AdminUserModule/user/updetaPic.do', param, config, this.qs.stringify({
          userId: this.userImg_Id
        })).then((data) => {
          // this.updateUserAddrress.userImg = data.data.imgurl
        }).catch((err) => {
          console.log(err)
        })
      },
      /*点击跳转用户积分 获取用户的id 传到积分页面*/
      upd_integral(rows, index) {
        let userId = rows.userId;
        this.$router.push({path: "/user_integral", query: {userId: userId}})
      },
      /*查看用户最新记分*/
      Userlatest_integral(rows, index) {
        this.dialogFormVisible4 = true
        this.axios.post('/api/FuhessApp_AdminUserModule/user/selectUserIntegral.do', this.qs.stringify({
          userId: rows.userId
        })).then((data) => {
          this.latest_integral.num = data.data.num
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    /*页面加载 执行 */
    created() {
      this.axios.post('/api/FuhessApp_AdminUserModule/user/selectAll.do').then((data) => {
        this.userAll = data.data.map.arrayList
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
          return this.userAll.filter(data => {
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
        return this.userAll
      }
    },
  }
</script>
<style scoped>
  .file {
    border: none;
    margin-left: 50px;
  }

  img {
    width: 100px;
    height: 100px;
  }

  .box {
    padding-top: 5%;
    padding-left: 20px;
  }

  .box .add button {
    width: 100px;
    height: 40px;
  }

  .el-button + .el-button {
    margin-left: 0;
    margin-top: 10px;
  }

  .block {
    text-align: center;
    margin-top: 5px;
  }

  .search {
    padding-top: 15px;
    padding-left: 120px;
  }

  .search ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search ul li {
    padding-right: 12px;
  }

  .userImg_div {
    display: flex;
    align-items: center;
  }
</style>

