<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside class="aside" :style="{width:`${isCollapse?65:240}px`, transition: '0.4s'}">
        <el-menu 
          :default-active="$route.path"
          background-color="#345"
          text-color="#bbb"
          :style="{height: '100vh'}"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          router>
          <el-menu-item>
            <img width="30px" src="../assets/logo.svg" alt="">
            <template slot="title">
              <span style="font-size: 1.2em; color:#efefef; font-weight: bold;">&nbsp;&nbsp;百慕大影城后台管理</span>
            </template>
          </el-menu-item>
          <!-- 首页两个字 -->
          <el-menu-item index="/home/index">
            <i class="el-icon-message"></i>
            <template slot="title">
              首页
            </template>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">演员管理</span>
            </template>
            <el-menu-item index="/home/actor-list">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">演员列表</span>
            </el-menu-item>
            <el-menu-item index="/home/actor-add">
              <i class="el-icon-plus"></i>
              <span slot="title">新增演员</span>
            </el-menu-item>
          </el-submenu>
        
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导演管理</span>
            </template>
            <el-menu-item index="/home/director-list">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">导演列表</span>
            </el-menu-item>
            <el-menu-item index="/home/director-add">
              <i class="el-icon-plus"></i>
              <span slot="title">新增导演</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">电影管理</span>
            </template>
            <el-menu-item index="/home/movie-list">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">电影列表</span>
            </el-menu-item>
            <el-menu-item index="/home/movie-add">
              <i class="el-icon-plus"></i>
              <span slot="title">新增电影</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">电影院管理</span>
            </template>
            <el-menu-item index="/home/cinema-list">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">电影院列表</span>
            </el-menu-item>
            <el-menu-item index="/home/cinema-add">
              <i class="el-icon-plus"></i>
              <span slot="title">新增电影院</span>
            </el-menu-item>
          </el-submenu>
        
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">
          <i v-show="!isCollapse" class="el-icon-s-fold" @click="isCollapse=true"></i>
          <i v-show="isCollapse" class="el-icon-s-unfold" @click="isCollapse=false"></i>

          <!-- 面包屑导航 --> 
          <el-breadcrumb
            style="flex:1; margin-left: 20px;"
            v-if="$route.meta" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="item in $route.meta.crumb"
              :key="item"
              :to="item.split(':')[1]">
              {{item.split(':')[0]}}
            </el-breadcrumb-item>
          </el-breadcrumb>

          <span>未登录</span>
          <b>{{ $store.state.cityname }}</b>
        </el-header>

        <el-main>
          <!-- 二级路由占位符 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;

  i {
    font-size: 1.3em;
  }
}
.aside::-webkit-scrollbar {
  display: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }
</style>
