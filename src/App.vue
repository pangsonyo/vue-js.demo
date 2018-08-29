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
          <el-menu-item index="dealCenter" style="margin-left:0px;" ></el-menu-item>
          <el-menu-item index="2csd" style="">1231231</el-menu-item>
          <el-menu-item index="messageCenter" style="background-color:rosybrown">消息中心</el-menu-item>
          <el-menu-item index="74" style="background-color: blanchedalmond">XXXXxx</el-menu-item>
        </el-menu>
      </el-header>

<!--左侧栏-->
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

         <el-menu>
          <el-menu-item :index="item.id"
          v-for="item in menuList"
          v-bind:key="item.productId" >
            <a v-bind:href="item.href" style="text-decoration:none;color:#0000FF;">{{item.productName}}</a>
          </el-menu-item>
         </el-menu>
        </el-aside>

        <el-main>
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
 // import left from "./components/DealCenter"
  export default {

    data() {

      return {
        activeIndex: '1',
        activeIndex2: '1',
        menuList:''
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
      //点击导航按钮 请求资源 并获取列表XWQ
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
        this.$axios.get('static/list.json').then(res=>{
          const _self  = this;
          _self.menuList = res.data.result;
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

