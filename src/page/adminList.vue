<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="userName"
		        label="姓名"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="createTime"
		        label="注册日期"
		        width="220">
		      </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="180">
              </el-table-column>
		      <el-table-column
		        prop="phone"
		        label="手机">
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
    import {adminList, adminCount,getAdminList} from '@/api/getData'
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
            async initData(){
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
                this.offset = (val - 1)*this.limit;
                this.getAdmin()
            },
            async getAdmin(){

                    const res = await getAdminList();
                    console.log(res);
                    if (res.status == 0) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                    			createTime: item.createTime,
						        userName: item.userName,
                                address: item.address,
                                phone:item.phone
                    		}
                    		this.tableData.push(tableItem)
                    	})
                    }

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
