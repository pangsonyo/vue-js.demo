<template>

  <el-container>
    <el-aside width="250px"  style="color: #D3DCE6">
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
              <el-input placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="handleAdd()" >新增</el-button>
            </el-form-item>
          </el-form>
        </el-container>
      </el-header>

      <el-main>
        <!--列表-->
        <el-table :data="userList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;"  @cell-dblclick="viewForm">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="60">
          </el-table-column>
          <el-table-column prop="userName" label="用户名"   width="120" sortable>
          </el-table-column>

          <el-table-column prop="gender" label="性别" width="100" :formatter="formatSex" sortable>
          </el-table-column>

          <el-table-column prop="userId" label="用户账号" width="100" sortable>
          </el-table-column>
          <el-table-column prop="createDate" label="创建日期" width="120"  header-align="center"  sortable>
          </el-table-column>
          <el-table-column prop="isUse" label="是否注销" min-width="180"sortable>
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


    <!--&lt;!&ndash;编辑界面&ndash;&gt;-->
    <!--<el-dialog title="编辑" v-model="editFormVisible" :visible.sync="editFormVisible">-->
      <!--<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">-->
        <!--<el-form-item label="机构名称" prop="orgName">-->
          <!--<el-input v-model="editForm.orgName" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--&lt;!&ndash;<el-form-item label="性别">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-radio-group v-model="editForm.sex">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-radio class="radio" :label="1">男</el-radio>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-radio class="radio" :label="0">女</el-radio>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-radio-group>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--<el-form-item label="上级机构">-->
          <!--<el-input-number v-model="editForm.parentid" :min="0" :max="200"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="创建日期">-->
          <!--<el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="机构地址">-->
          <!--<el-input type="address" v-model="editForm.address" ></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click.native="editFormVisible = false">取消</el-button>-->
        <!--<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :visible.sync="addFormVisible">
      <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-select v-model="form.region" placeholder="请选择机构">
            <el-option label="揭东卫生院" value="jd"></el-option>
            <el-option label="雷州卫生院" value="lz"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="管理员">
          <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="药房" name="type"></el-checkbox>
            <el-checkbox label="搞基" name="type"></el-checkbox>
            <el-checkbox label="看病" name="type"></el-checkbox>
            <el-checkbox label="搞事" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="radio选择">
          <el-radio-group v-model="form.resource">
            <el-radio label="6666"></el-radio>
            <el-radio label="sexsexsex"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
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

		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
        filters: {
          name: ''
        },
        filterText: '',
        data2: '', //树
        userList:'', //用户列表
        addFormVisible: false,//新增界面是否显示

			}
		},
		methods: {
      onSubmit() {
        console.log('submit!');
      },

      formatSex: function (row, column) {
        return row.gender === 1 ? '男' : row.gender === 0 ? '女' : '未知';
      },

      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      handleAdd: function () {
        this.addFormVisible = true;
//        this.addForm.parentid = this.tableData[0].parentid;

      },


      //单击左侧树节点
      handleNodeClick: function (data) {
        console.log(data);
      }
    },

    //初始化左侧树 不写在methods中
    created: function () {
      this.$axios.get('static/user.json').then(res => {
        const _self = this;
        _self.userList = res.data.result;
      });

      this.$axios.get('static/departmentTree.json').then(res => {
        const _self = this;
        _self.data2 = res.data.result;
      });
    }

	}

</script>
