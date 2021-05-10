<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="top">
            <el-date-picker
                        v-model="start"
                        type="datetime"
                        format="yyyy-MM-dd hh:mm"
                        value-format="yyyy-MM-dd hh:mm"
                        placeholder="选择开始日期时间">
                </el-date-picker>
                <el-date-picker
                            v-model="end"
                            type="datetime"
                            format="yyyy-MM-dd hh:mm"
                            value-format="yyyy-MM-dd hh:mm"
                            placeholder="选择结束时间">
                    </el-date-picker>
            <el-button @click="query()">查询订单</el-button>
        </div>
        <div class="table_container">
            <el-table
			    :data="tableData"
			    @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
			    style="width: 100%">

			    <el-table-column
			      label="订单 ID"
			      prop="orderId">
			    </el-table-column>
			    <el-table-column
			      label="总价格"
			      prop="money">
			    </el-table-column>
			    <el-table-column
			      label="订单状态"
			      prop="status">
                  <template slot-scope="scope">
                      <p v-if="scope.row.status==0">未支付</p>
                      <p v-if="scope.row.status==1">已支付</p>
                  </template>
			    </el-table-column>
                <el-table-column
                  label="创建时间"
                  prop="createTime">
                </el-table-column>
                <el-table-column
                  label="患者"
                  prop="userName">
                </el-table-column>
                <el-table-column
                  label="医生"
                  prop="doctorName">
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
    import {getOrderList, getOrderCount, getResturantDetail, getUserInfo, getAddressById,deleteOrder} from '@/api/getData'
    export default {
        data(){
            return {
                start:'',
                end:'',
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                restaurant_id: null,
                expendRow: [],
            }
        },
    	components: {
    		headTop,
    	},
        created(){
        	this.restaurant_id = this.$route.query.restaurant_id;
           // this.initData();
        },
        mounted(){

        },
        methods: {


           async  query(){
                this.start =this.$moment(this.start).format("YYYY-MM-DD");
                this.end =this.$moment(this.end).format("YYYY-MM-DD");
                console.log(this.start);
                console.log(this.end);
                let res=await getOrderList(this.start,this.end);

                const Orders = res.data;
                this.tableData = [];
                Orders.forEach((item, index) => {
                    const tableData = {};
                    tableData.userId = item.userId;
                    tableData.doctorId = item.doctorId;
                    tableData.createTime = item.createTime;
                    tableData.orderId = item.orderId;
                    tableData.money = item.money;
                    tableData.status = item.status;
                    tableData.id= item.id;
                    tableData.userName= item.userName;
                    tableData.doctorName= item.doctorName;
                    this.tableData.push(tableData);
                })

            }
            ,


            async deleteOrder(row){
                console.log(row);
                let id=row.id;
                let res=await deleteOrder(id);
                if(res.status==0){
                    alert("删除订单成功");
                }else{
                    alert("删除订单失败");
                }

            },


            async initData(){
                try{
                    /*
                    const countData = await getOrderCount({restaurant_id: this.restaurant_id});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }*/
                    this.count=10;

                   // this.getOrders(start,end);
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
                //this.getOrders(start,end)
            },
            async getOrders(start,end){
                let res=await getOrderList(start,end);
                console.log(res);
                const Orders = res.data;
                this.tableData = [];
                console.log(Orders);

                if(Orders==null||Orders.length==0){
                    alert("该日期下无数据");
                }
                Orders.forEach((item, index) => {
                    const tableData = {};
                    tableData.userId = item.userId;
                    tableData.doctorId = item.doctorId;
                    tableData.createTime = item.createTime;
                    tableData.orderId = item.orderId;
                    tableData.money = item.money;
                    tableData.status = item.status;
                    tableData.id= item.id;
                    this.tableData.push(tableData);
                })
            },
            async expand(row, status){
            	if (status) {
            		const restaurant = await getResturantDetail(row.restaurant_id);
	            	const userInfo = await getUserInfo(row.user_id);
	            	const addressInfo = await getAddressById(row.address_id);

	                this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}});
                    this.$nextTick(() => {
                        this.expendRow.push(row.index);
                    })
	            }else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
    .top{
        width: 100%;
        margin-left: 20px;
        margin-top: 10px;
    }
</style>
