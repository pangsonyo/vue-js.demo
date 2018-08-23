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
          <el-menu-item index="dealCenter" style="margin-left:0px;">处理中心</el-menu-item>
          <el-menu-item index="2csd" style="">1231231</el-menu-item>
          <el-menu-item index="messageCenter" style="background-color:rosybrown">消息中心</el-menu-item>
          <el-menu-item index="74" style="background-color: blanchedalmond">XXXXxx</el-menu-item>
        </el-menu>
      </el-header>

<!--左侧栏-->
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

          <!--<el-menu-->
            <!--theme="dark"-->
            <!--:default-active="openMenuID"-->
            <!--:default-openeds="openMenuArr"-->
            <!--class="el-menu"-->
            <!--@select="handleSelect">-->
            <!--<template v-for="(item,index) in menuList">-->
              <!--<el-submenu :index=item.menuID v-if="item.IsContent">-->
                <!--<template slot="title">-->
                  <!--<i class="el-icon-menu"></i>-->
                  <!--{{item.name}}-->
                <!--</template>-->
                <!--<tree-menu :data="item.list"></tree-menu>-->
              <!--</el-submenu>-->
              <!--<el-menu-item :index=item.menuID v-else>{{item.name}}</el-menu-item>-->
            <!--</template>-->
          <!--</el-menu>-->
         <el-menu>
          <el-menu-item :index="item.id"
          v-for="(item,index) in menuList"
          v-bind:key="item.productId"
          >{{item.productName}}
          </el-menu-item>
         </el-menu>

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
 // import left from "./components/DealCenter"
  export default {

    data() {

      return {
        activeIndex: '1',
        activeIndex2: '1',
        menuList:'',
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
        }]
      };
    },
    // components:{
    //   left,
    // },
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

      //点击导航按钮 请求资源 并获取列表XWQ
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
        this.$axios.get('static/list.json').then(res=>{

          const _self  = this;
          _self.menuList = res.data.result;
          console.log( _self.menuList);

        })
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

