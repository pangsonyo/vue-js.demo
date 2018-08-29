<template>
  <el-container>
    <el-aside width="250px">
      <el-input size="small"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="data2"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree2">
      </el-tree>


    </el-aside>
    <el-container>
      <el-header>
        <el-row justify="end">
        <el-button type="primary">新增</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
          </el-row>
      </el-header>

      <el-main>
        <el-table :data="departmentList" tooltip-effect="dark" stripe="true" style="width: 100%">
          <el-table-column ype="selection" width="55">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="140" header-align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120" header-align="center">
          </el-table-column>
          <el-table-column prop="address" label="地址"  header-align="center">
          </el-table-column>

          <el-table-column label="操作" header-align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

      </el-main>
    </el-container>
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
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }


      },


      data() {
        return {
          filterText: '',
          data2: [{
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }],

          departmentList: [{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],

          defaultProps: {
            children: 'children',
            label: 'label'
          }
        };
      },


      name: "DealCenter"
    }
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0d1;
    color: #222;
    text-align: left;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 20px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 30px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
