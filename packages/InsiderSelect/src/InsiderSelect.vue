<template>
  <div :class="[u_class, 'input-box']">
    <el-input v-model="userInfo" @focus="inputFocus"></el-input>
    <el-dialog
      title="人员信息"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="userSelectVisible"
      :fullscreen="true"
      @close="close"
    >
      <div class="contont-box">
        <div class="user-table">
          <div class="user-filter-box">
            <el-form :inline="true" :model="formInline">
              <el-form-item label="关键字">
                <el-input v-model="formInline.keyWord" placeholder="请输入工号或姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="reSetFilter">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="user-table-box">
            <el-table
              ref="userTable"
              :data="tableData"
              tooltip-effect="dark"
              height="530"
              @select="handleSelectionChange"
              @select-all="handleSelectionAll"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                v-for="(item, key) in keyLabels"
                :key="key"
                :label="item.label"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row[item.key] }}</template>
              </el-table-column>
            </el-table>
          </div>
          <div>
            <el-pagination
              style="margin-top:10px;"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            ></el-pagination>
          </div>
        </div>
        <div class="choose-box">
          <div class="choose-box-title">已选人员</div>
          <div style="width:100%;height:calc(100% - 83px);overflow-y:auto;">
            <div class="choose-item-title">
              <div class="choose-item-title-name">姓名</div>
              <div class="choose-item-title-operate">操作</div>
            </div>
            <div class="choose-item-box" :key="key" v-for="(item,key) in userList">
              <el-tooltip :content="item.realName" placement="top" effect="light">
                <div class="choose-item-name">{{item.realName}}</div>
              </el-tooltip>

              <div class="choose-item-btn" @click="delUser(item,key)">删除</div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="userSelectVisible = false">取 消</el-button>
        <el-button type="primary" @click="verifyUsers">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  name: "InsiderSelect",
  data() {
    return {
      currentPage: 1, //分页器当前页
      pageSize: 10,
      userSelectVisible: false,
      formInline: {
        keyWord: "", //查询关键字
      },
      userList: [],
      userInfo: "",
      tableData: [],
      oldUserList: [],
    };
  },
  props: {
    /**
     * 表格数据源url
     */
    tableUrl: {
      type: String,
      default: null,
    },
    /**
     * 表格数据源请求参数
     */
    tableReqParams: {
      type: Object,
      default: null,
    },
    /**
     * 组件自定义class
     */
    u_class: {
      type: String,
      default: "",
    },
    /**
     * 自定义要展示的人员信息
     */
    keyLabels: {
      type: Array,
      default: () => {
        return [
          { label: "姓名", key: "realName" },
          { label: "工号", key: "userName" },
          { label: "机构码", key: "orgId" },
          { label: "邮箱", key: "email" },
          { label: "联系电话", key: "phone" },
          { label: "性别", key: "sex" },
        ];
      },
    },
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    loadData: function () {
      let params = {
        searchText: this.formInline.keyWord,
        limit: this.pageSize,
        start: this.currentPage,
      };
      if (this.tableReqParams) {
        params = Object.assign({}, params, this.tableReqParams);
      }
      if (!this.tableUrl) return;
      this.$HttpRequest.get(this.tableUrl, params).then((response) => {
        if (response.success && response.dataList.length > 0) {
          this.tableData = response.dataList;
        } else {
          Message.error("未查询到用户数据，请稍后再试或联系管理员。");
        }
      });
    },
    verifyUsers: function () {
      let users = "";
      this.userList.forEach(function (item) {
        users += item.realName + "(" + item.userName + "),";
      });
      users = users.substring(0, users.length - 1);
      this.userInfo = users;
      this.oldUserList = this.userList;
      /** 数据接收方法
       * @type {event}
       * @param {Array} userList 返回选中员工的数据
       */
      this.$emit("getInsiderList", this.userList);
      this.userList = [];
      this.userSelectVisible = false;
    },
    handleSelectionAll: function (selection) {
      if (selection.length > 0) {
        selection.forEach((item) => {
          let result = this.userList.some((user) => {
            if (user.userName == item.userName) return true;
          });
          if (!result) {
            this.userList.push(item);
          }
        });
      } else {
        this.tableData.forEach((item) => {
          if (this.userList.length > 0) {
            this.userList.splice(
              this.userList.findIndex((user) => user.userName == item.userName),
              1
            );
          }
        });
      }
    },
    delUser: function (row, key) {
      this.userList.splice(key, 1);
      this.$refs.userTable.toggleRowSelection(row, false);
    },
    reSetFilter: function () {
      this.formInline.keyWord = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.loadData();
    },
    onSubmit: function () {
      this.loadData();
    },
    close: function () {
      this.userSelectVisible = false;
      this.currentPage = 1;
      this.pageSize = 10;
      this.formInline.keyWord = "";
      this.userList = [];
    },
    inputFocus: function () {
      this.loadData();
      if (this.userInfo != "") {
        this.userList = this.oldUserList;
      }
      console.log(process.env.BASC_URL)
      this.userSelectVisible = true;
    },
    handleSelectionChange: function (selection, row) {
      let result = selection.some((item) => {
        if (item.userName == row.userName) return true;
      });
      if (result) {
        let inList = this.userList.some((item) => {
          if (item.userName == row.userName) return true;
        });
        if (!inList) this.userList.push(row);
      } else {
        this.userList.splice(
          this.userList.findIndex((item) => item.userName == row.userName),
          1
        );
      }
    },
    handleSizeChange: function (pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.loadData();
    },
    /**
     * currentPage 页面改变时会触发
     * @param {Number} currentPage 当前页
     */
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.loadData();
    },
  },
};
</script>

<style lang="scss" scoped>
.input-box {
  width: 250px;
}
.contont-box {
  width: 100%;
  height: 656px;
  display: flex;
  flex-flow: row nowrap;
}
.user-table {
  width: calc(75vw - 10px);
}
.user-table-box {
  width: 100%;
  height: calc(100% - 43px);
  border: 1px solid #ebeef5;
}
.user-filter-box {
  padding-top: 22px;
  float: right;
}
.choose-box {
  width: 25vw;
  margin-left: 10px;
  height: calc(100% - 42px);
  border: 1px solid #ebeef5;
}
.choose-box-title {
  width: 100%;
  height: 83px;
  line-height: 83px;
  border-bottom: 1px solid #ebeef5;
  text-align: center;
  font-size: 25px;
}
.choose-item-box {
  width: calc(100% - 20px);
  height: calc(100% -48px);
  padding: 10px;
  overflow-y: auto;
  display: flex;
  border-bottom: 1px solid #ebeef5;
}
.choose-item-name {
  width: 60%;
  line-height: 28px;
  text-align: left;
  text-indent: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.choose-item-btn {
  width: 40%;
  line-height: 28px;
  text-align: center;
  color: red;
}
.choose-item-title {
  width: calc(100% - 20px);
  padding: 10px;
  height: calc(100% -20px);
  overflow-y: auto;
  display: flex;
  font-weight: bold;
  border-bottom: 1px solid #ebeef5;
}
.choose-item-title-name {
  width: 60%;
  line-height: 28px;
  text-align: left;
  text-indent: 10px;
}
.choose-item-title-operate {
  width: 40%;
  line-height: 28px;
  text-align: center;
}
</style>
