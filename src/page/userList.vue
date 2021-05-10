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
                  property="status"
                  label="状态">
                  <template slot-scope="scope">
                      <p v-if="scope.row.status==0">封禁</p>
                      <p v-else>正常</p>
                  </template>
                </el-table-column>
                <el-table-column>
                     <template slot-scope="scope"  v-for="item in tableData">
                        <el-button type="text"  @click="banUser(scope.row)" >封禁</el-button>
                        <el-button type="text"  @click="deleteUser( scope.row)" >删除</el-button>
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
    import {getUserList, getUserCount,banUser,deleteUser} from '@/api/getData'
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
           async banUser(row){
               console.log(row);
                let id=row.id;
                let res=await banUser(id);
                if(res.status==0){
                    alert("封禁成功");
                    this.getUsers();
                }else{
                    alert("封禁失败");
                }
            },
           async deleteUser(row){
                let id=row.id;
                let res=await deleteUser(id);
                if(res.status==0){
                    alert("删除成功");
                }else{
                    alert("删除失败");
                }
            },
            async initData(){
                try{
                    /*
                    let res=await getUserCount();
                    const countData = res.data;
                    if (countData.status == 0) {
                        this.count = countData.size;
                    }else{
                        throw new Error('获取数据失败');
                    }*/
                    this.count=5;
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
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
                let res=await getUserList();
                const Users = res.data;
                console.log(Users);
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                   tableData.userName = item.userName;
                   tableData.createTime = item.createTime;
                   tableData.status = item.status;
                   tableData.money=item.money;
                   tableData.phone=item.phone;
                   tableData.id=item.id;
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
