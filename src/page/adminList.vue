<template>
  <div class="fillcontain">
    <head-top> </head-top>
    <div class="add">
      <el-button @click="dialogFormVisible = true">新增管理员</el-button>
      <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
        <el-form :model="null">
          <el-form-item label="管理员id">
            <el-input v-model="userName"></el-input>
          </el-form-item>
          <el-form-item label="管理员密码">
            <el-input v-model="password"></el-input>
          </el-form-item>
          <el-form-item label="管理员手机号">
            <el-input v-model="tel"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddAdmin">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userName" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="注册日期" width="220">
        </el-table-column>
     
        <el-table-column prop="phone" label="手机"> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text" @click="_deleteAdmin(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import {
  adminList,
  adminCount,
  addAdminList,
  getAdminList,
  deleteAdmin,
} from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      dialogFormVisible: false,
      userName: "",
      password: "",
      tel: "",
    };
  },
  components: {
    headTop,
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      /*  try{
                    const countData = await adminCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }

                }catch(err){
                    console.log('获取数据失败', err);
                }*/
      this.getAdmin();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getAdmin();
    },
    async _deleteAdmin(row) {
      console.log(row);
      const res = await deleteAdmin(row.id);
      console.log(res);
      if (res.message === "成功删除") {
        let t = [];
        this.tableData.map((item) => {
          if (item.id !== row.id) {
            t.push(item);
            // return item;
          }
        });
        this.tableData = t;
      }
    },
    async getAdmin() {
      const res = await getAdminList();
      console.log(res);
      if (res.status == 0) {
        this.tableData = [];
        res.data.forEach((item) => {
          const tableItem = {
            createTime: item.createTime,
            userName: item.userName,
            address: item.address,
            phone: item.phone,
            id: item.id,
          };
          this.tableData.push(tableItem);
          this.count = this.tableData.length;
        });
      }
    },
    async submitAddAdmin() {
        console.log('sum');
      const res = await addAdminList({
          userName: this.userName,
          password: this.password,
          phone: this.tel
      });
      console.log(res);
      let t = [...this.tableData]
      if(res.message === "登录成功") {
          t.push({
            userName: this.userName,
          password: this.password,
          phone: this.tel
          })
          this.tableData = t;
      }
      this.dialogFormVisible = false;

    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
.add {
  padding-left: 1.3em;
  padding-top: 1em;
}
</style>
