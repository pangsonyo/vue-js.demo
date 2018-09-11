<template>

  <el-container>
  <el-aside width="250px" style="color: #D3DCE6">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-tree style="background-color:#D3DCE6"
      class="filter-tree"
      :data="data2"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
       @node-click="handleNodeClick">
      ref="tree2">
    </el-tree>
  </el-aside>
  <el-container>

  <el-header>
    <el-container>
      <el-form :inline="true" :model="filters">
        <el-form-item>
        <el-input placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" >查询</el-button>
        </el-form-item>
        <el-form-item>
        <el-button type="primary"  @click="handleAdd()" >新增</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </el-header>

  <el-main>
    <!--列表-->
    <el-table :data="tableData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;"  @cell-dblclick="viewForm">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="orgName" label="机构名称"   width="120" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="是否营业" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="parentid" label="上级机构" width="100" sortable>
      </el-table-column>
      <el-table-column prop="date" label="创建日期" width="120"  header-align="center"  sortable>
      </el-table-column>
      <el-table-column prop="address" label="机构地址" min-width="180"sortable>
      </el-table-column>
      <el-table-column label="操作" width="150" header-align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button size="mini" type="danger"
            @click="handleDelete(scope.$index, tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-main>
    </el-container>


  <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :visible.sync="editFormVisible">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="机构名称" prop="orgName">
          <el-input v-model="editForm.orgName" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="性别">-->
          <!--<el-radio-group v-model="editForm.sex">-->
            <!--<el-radio class="radio" :label="1">男</el-radio>-->
            <!--<el-radio class="radio" :label="0">女</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <el-form-item label="上级机构">
          <el-input-number v-model="editForm.parentid" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="机构地址">
          <el-input type="address" v-model="editForm.address" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="机构名称" prop="orgName">
          <el-input v-model="addForm.orgName" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="性别"  >-->
          <!--<el-radio-group v-model="addForm.sex">-->
            <!--<el-radio class="radio" :label="1">男</el-radio>-->
            <!--<el-radio class="radio" :label="0">女</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <el-form-item label="上级机构">
          <el-input-number v-model="addForm.parentid" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="机构地址"  v-model="addForm.addr">
          <el-input type="address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>

  export default {
      watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;

      },
      //删除
      handleDelete(index, row) {
        row.splice(index, 1);
      },
      //显示编辑界面
      handleClick: function (row,_index) {
        // //记录索引
        // this.listIndex=_index;
        //记录数据
         this.editForm=row;
        //显示弹窗
         this.editFormVisible=true;
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        console.log(this.tableData[0].parentid);
        this.addForm.parentid = this.tableData[0].parentid;

      },

      selsChange: function (sels) {
        this.sels = sels;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      viewForm(row, column, cell, event){
        this.editForm=row;
        console.log(row);
        //显示弹窗
        this.editFormVisible=true;
      },

      //单击左侧树节点
      handleNodeClick:function (data) {
        console.log(data);
      },

      //add 提交表单
      addSubmit:function () {

        // this.$refs[addForm].validate((valid) => {
        //   if (valid) {
            let _this = this;
            console.log( _this.addForm);
            this.$axios.post('http://192.168.7.236:8080/createOrg', _this.addForm)
              .then((response) => {
                this.$message.success('注册成功！')
                this.$refs[addForm].resetFields()
                // 跳转到登录页
                // this.$router.push({path: '/'})
              })
          // } else {
          //   console.log('error submit!!')
          //   return false
          // }
        //})
      }

    },



    data() {
      return {
        filters: {
          name: ''
        },

        filterText: '',

        data2: '', //树

        tableData: "",  //列表
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列

        editFormVisible: false,//编辑界面是否显示

        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm: {
          id: '',
          orgName: '',
          sex: '',
          parentid: '',
          date: '',
          addr: ''
        },

        addFormVisible: false,//新增界面是否显示

        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //新增界面数据
        addForm: {
          orgName: '',
          sex: '',
          parentid: '',
          date: '',
          addr: ''
        }

      }
    },

      created:function() {
        this.$axios.get('static/list.json').then(res => {
          console.log(res.data.result)
          const _self = this;
          _self.tableData = res.data.result;
        })

        this.$axios.get('static/tree.json').then(res => {
          console.log(res.data.result)
          const _self = this;
          _self.data2 = res.data.result;
        })

      }


    }

</script>
<style>
  table thead{
    border-bottom:2px solid #000080;
  }

  .el-aside {
    background-color:#D3DCE6;
    color: #D3DCE6;
    text-align: center;
  }

</style>

