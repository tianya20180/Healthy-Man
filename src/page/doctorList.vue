<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="userName"
                  label="用户姓名"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="phone"
                  label="手机号"
                  width="220">
                </el-table-column>

                <el-table-column
                  property="createTime"
                  label="注册日期"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="money"
                  label="金额"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="count"
                  label="问诊量"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="money"
                  label="金额"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="workYears"
                  label="工作时间"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="money"
                  label="问诊金额"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="categoryName"
                  label="科室"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="status"
                  label="状态">
                  <template slot-scope="scope">
                      <p v-if="scope.row.status==0">未认证</p>
                      <p v-if="scope.row.status==1">已认证</p>
                      <p v-if="scope.row.status==2">认证未通过</p>
                  </template>
                </el-table-column>
              <el-table-column>
                   <template slot-scope="scope"  v-for="item in tableData">
                      <el-button type="text"  @click="banDoctor(scope.row)" >封禁</el-button>
                      <el-button type="text"  @click="deleteDoctor(scope.row)" >删除</el-button>
                   </template>
               </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getDoctorList, getUserCount,banDoctor,deleteDoctor} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async banDoctor(row){
                let id=row.id;
                let res=await banDoctor(id);
                if(res.status==0){
                    alert("封禁成功");
                }else{
                    alert("封禁失败");
                }
            },
           async deleteDoctor(row){
                let id=row.id;
                let res=await deleteDoctor(id);
                if(res.status==0){
                    alert("删除成功");
                }else{
                    alert("删除失败");
                }
            },
            async initData(){
                /*
                try{
                    let res=await getUserCount();
                    const countData = res.data;
                    if (countData.status == 0) {
                        this.count = countData.size;
                    }else{
                        throw new Error('获取数据失败');
                    }


                }catch(err){
                    console.log('获取数据失败', err);
                }*/
                this.getUsers();
                this.count=5;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            async getUsers(){
                let res=await getDoctorList();
                const Users = res.data;
                console.log(res);
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};

                    tableData.userName = item.userName;
                    tableData.createTime = item.createTime;
                    tableData.status = item.status;
                    tableData.phone=item.phone;
                    tableData.money=item.money;
                    tableData.count=item.count;
                    tableData.workYears=item.workYears;
                    tableData.id= item.id;
                    tableData.categoryName= item.categoryName;
                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
