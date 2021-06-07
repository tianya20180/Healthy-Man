<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="doctorName"
                  label="医生名字"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="categoryName"
                  label="医生科室"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="createTime"
                  label="申请时间"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="money"
                  label="问诊价格"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="status"
                  label="状态"
                   width="220">
                    <template slot-scope="scope">
                        <p v-if="scope.row.status==0">未认证</p>
                        <p v-if="scope.row.status==1">已认证</p>
                        <p v-if="scope.row.status==2">认证失败</p>
                    </template>
                </el-table-column>

                <el-table-column  label="身份证"
                 width="400">
                    <template slot-scope="scope">
                        <img :src="scope.row.cardPhoto"  width="70" height="70" @click="show(scope.row.cardPhoto)"/>
                    </template>
                </el-table-column>

                <el-table-column  label="医生证明"
                width="400" prop="doctor">
                    <template slot-scope="scope">
                        <img :src="scope.row.doctorPhoto"  width="70" height="70"  @click="show(scope.row.doctorPhoto)"/>
                    </template>
                </el-table-column>



                <el-table-column>
                     <template slot-scope="scope"  v-for="item in tableData">
                        <el-button type="text"  @click="agree(scope.row)" >同意</el-button>
                        <el-button type="text"  @click="dsiagree( scope.row)" >拒绝</el-button>
                     </template>
                 </el-table-column>

            </el-table>
              <el-dialog title="图片" :visible.sync="disable" center :append-to-body='true' :lock-scroll="false" width="30%">
                    <img :src="photo" style="width: 500px; height: 500px;"/>
              </el-dialog>

            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="hanscopdleSizeChange"
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
    import {getUserList, getUserCount,agree,disagree,getAuthenticationList} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                disable:false,
                photo:''
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            show(data){
              this.disable=true;
              this.photo=data;
            },
            cancel(){
              this.disable=false;
            },
            async agree(row){
                console.log(row);
               let res=await agree(row.doctorId,row.id);
               if(res.status==0){
                   alert("已同意申请")
               }else{
                   alert("同意申请失败");
               }
            },
            async disagree(row){
                console.log(row);
                let res=await disagree(row.doctorId,row.id);
                if(res.status==0){
                    alert("已拒绝申请")
                }else{
                    alert("拒绝申请失败");
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

                    this.getUsers(this.currentPage,this.limit);
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
                this.getUsers(this.currentPage,this.limit)
            },
            hanscopdleSizeChange(){},
            async getUsers(page,size){
                let res=await getAuthenticationList(page,size);
                const Users = res.data.records;
                this.count=res.data.total;
                console.log(Users);
                this.tableData = [];
                Users.forEach(item => {



                   console.log(item.doctorPhoto);
                   const tableData = {};

                   tableData.doctorId = item.doctorId;
                   tableData.createTime = item.createTime;
                   tableData.status = item.status;
                   tableData.money=item.money;
                   tableData.id=item.id;
                   tableData.doctorPhoto=item.doctorPhoto;
                   tableData.cardPhoto=item.cardPhoto;
                   tableData.category=item.category;
                   tableData.categoryName=item.categoryName;
                   tableData.doctorName=item.doctorName;
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
    .doctor{

        }
    .card{

    }
    .photo{
        position:absolute; left:100px; top:150px;
        width: 400px;
        height: 400px;
    }
</style>
