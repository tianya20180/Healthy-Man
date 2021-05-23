<template>
  <div class="fillcontain">
    <head-top> </head-top>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" >
        </el-table-column>
        <el-table-column prop="description" label="简述" >
        </el-table-column>
        <el-table-column prop="content" label="内容" >
        </el-table-column>
        <el-table-column prop="createdatetime" label="发布时间" width="220">
        </el-table-column>
        <el-table-column prop="viewCount" label="浏览量" >
        </el-table-column>
        <el-table-column prop="likeCount" label="点赞量" >
        </el-table-column>
        <el-table-column prop="link" label="">
          <template slot-scope="scope">
            <p v:bind="scope"></p>
            <el-button type="text"
              ><a v-bind:href="scope.row.link">预览</a></el-button
            >
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text" @click="_deleteArticle(scope.row)"
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
  deleteArticle,
  getArticleList,
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
      this.getArticle();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getArticle();
    },
    async _deleteArticle(row) {
      // console.log(row);
      console.log(this.tableData);

      const res = await deleteArticle(row.id);
      if(res.message === "成功删除") {
        let t = [];
        this.tableData.map(item => {
          if(item.id !== row.id) {
            t.push(item);
            // return item;
          }
        })
        this.tableData = t;
      }
    },
    async getArticle() {
      const res = await getArticleList();
      console.log(res);
      if (res.status == 0) {
        this.tableData = [];
        res.data.forEach((item) => {
          const tableItem = {
            createdatetime: item.createdatetime,
            viewCount: item.viewCount,
            likeCount: item.likeCount,
            link: item.link,
            title: item.title,
            id: item.id,
            description: item.description,
            content: item.content
          };
          this.tableData.push(tableItem);
          this.count = this.tableData.length;
        });
      }
    },

    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("input", {
          domProps: {
            value: self.value,
            type: "text",
          },
          on: {
            input: function (event) {
              console.log(this.tableData);
              console.log(event.target.value);
              //   this.$emit("input", event.target.value);
            },
          },
        }),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: " + action,
        });
      });
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
