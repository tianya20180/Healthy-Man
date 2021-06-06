<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-button type="text"  @click="addCategory" >新增类别</el-button>

        <div class="table_container">
            <el-dialog title="添加" :visible.sync="dialogFormVisible">
              <el-form :model="null">
                <el-form-item label="类别名称" style="width: 40%;">
                  <el-input v-model="categoryName"></el-input>
                </el-form-item>
                <el-form-item label="类别类型">
                   <el-select v-model="type" placeholder="请选择">
                               <el-option
                                label="医生科室"
                                 value="0"/>
                                 <el-option
                                  label="文章分类"
                                   value="1"/>
                    </el-select>

                </el-form-item>
                <el-form-item label="图标"  style="width: 40%;">
                  <input type="file"  @change="upload">上传</el-input>
                </el-form-item>
                <el-button @click="submit">确认</el-button>
              </el-form>
              </el-dialog>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="categoryName"
                  label="类别名称"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="type"
                  label="类型"
                  width="220">
                  <template slot-scope="scope">
                      <p v-if="scope.row.type==0">医生科室</p>
                      <p v-else>文章分类</p>
                  </template>
                </el-table-column>

                <el-table-column
                  property="createTime"
                  label="创建时间"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="photo"
                  label="图标"
                  width="220">
                  <template slot-scope="scope">
                      <img :src="scope.row.photo" style="width: 20px;height: 20px;">

                  </template>
                </el-table-column>


              <el-table-column>

                   <template slot-scope="scope">
                    <el-button type="text"  @click="test(scope.row.id)" >删除</el-button>
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
    import {getDoctorList, getUserCount,banDoctor,deleteDoctor,getAllCategory,addCategory,deleteCategory} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                categoryName:'',
                type:'',
                photo:'',
                dialogFormVisible:false

            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
                submit(){
                    let data={
                        photo:this.photo,
                        type:this.type,
                        categoryName:this.categoryName
                    }
                    console.log(data);
                    let res =addCategory(data);
                     alert("上传成功");

                },
                upload(e){
                	console.log("上传");
                	this.$base64Img(e).then((res)=>{		//调用全局方法
                	    this.photo=res;
                		console.log(this.doctorPhoto);
                	 })
                },
           async test(id){
               console.log("test");
               let res =await deleteCategory(id);
               if(res.status==0){
                   alert("删除成功");
                   this.getUsers(this.currentPage,this.limit);
               }

           },
           async delete(row){
               console.log("delete");
               let res =await deleteCategory(row.id);
               if(res.status==0){
                   alert("删除成功");
                   this.getUsers(this.currentPage,this.limit);
                   
               }
            },
            addCategory(){
                this.dialogFormVisible=true;
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
                this.getUsers(this.currentPage,this.limit);

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers(this.currentPage,this.limit)
            },
            async getUsers(page,size){
                let res=await getAllCategory(page,size);
                const Users = res.data.records;
                this.count=res.data.total;
                console.log(res);
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};

                    tableData.categoryName = item.categoryName;
                    tableData.createTime = item.createTime;
                    tableData.photo = item.photo;
                    tableData.type=item.type;
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
