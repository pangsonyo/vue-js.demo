<template>
  <div id="app">
    <el-container>
      <el-header>

        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color=""
          text-color="red"
          active-text-color="black">
          <el-menu-item index="1" style="margin-left:0px;" ><a href="#/dealCenter">处理中心</a></el-menu-item>
          <el-menu-item index="2" style="">1231231</el-menu-item>
          <el-menu-item index="3" style="background-color:rosybrown">消息中心</el-menu-item>
          <el-menu-item index="4" style="background-color: blanchedalmond">XXXXxx</el-menu-item>
        </el-menu>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <router-view></router-view>
        </el-aside>
        <el-main>
          <el-table :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <!--<router-view/>-->
  </div>
</template>

<script>
  export default {

    data() {

      return {
        activeIndex: '1',
        activeIndex2: '1',
        tableData: [{
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
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      c() {
        this.axios({
          method: 'get',
          url: 'http://192.168.7.243:8080/getOrg?id=01'
        }).then(function (resp) {
          console.log(resp.data);
        }).catch(resp => {
          console.log('请求失败：' + resp.status + ',' + resp.statusText);
        });
        // .axios.get('192.168.7.243:8080/getOrg').then((response) => {
        //   console.log(response.data)
        // }).catch(reason => {
        //   console.log('请求失败：'+resp.status+','+resp.statusText);
        // })
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }

    //name: 'App'
  }
</script>

<style>
  .el-header {
    background-color: black;
    color: black;
    text-align: center;
    line-height: 80px;
  }

  /*  .el-main {
      background-color: #E9EEF3;
      color: #333;
      line-height: 800px;
    }*/

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>

