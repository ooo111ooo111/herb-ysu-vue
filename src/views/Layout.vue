<script setup>

import {
  CaretBottom,
  Crop,
  EditPen,
  Management,
  Promotion,
  SwitchButton,
  User,
  UserFilled,
  HotWater,
  Orange,
  Mug,
  Reading,
  ChatLineRound,
  Setting,
  Star
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import {userInfoService} from "@/api/user";
import {useUserInfoStore} from "@/stores/userInfo";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {useTokenStore} from "@/stores/token";

//调用函数，获取用户信息
const userInfoStore = useUserInfoStore();
const getUserInfo = async () => {
  //调用接口
  let result = await userInfoService();
  //把数据存到pinia中
  userInfoStore.setUserInfo(result.data);
}
getUserInfo();

//条目被点击后调用的函数
const router = useRouter();
const tokenStore = useTokenStore();
const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessageBox.confirm(
        '你确认要退出吗？',
        '温馨提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
    ).then(
        async () => {
          //退出登录
          //1.清空pinia中存储的token以及个人信息
          userInfoStore.removeUserInfo()
          tokenStore.removeToken()
          ElMessage.success("退出成功")
          //2.跳转到登录页面
          await router.push('/login')
        }
    )
  } else {
    //路由
    router.push('/mine/' + command)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu text-color="#8B4513" background-color="#FFF8DC" router>
        <el-menu-item index="/user/herb" v-if="userInfoStore.userInfo.role === 'ROLE_USER'">
          <el-icon>
            <Orange/>
          </el-icon>
          <span>药材坊</span>
        </el-menu-item>

        <el-menu-item index="/user/prescription" v-if="userInfoStore.userInfo.role === 'ROLE_USER'">
          <el-icon>
            <HotWater/>
          </el-icon>
          <span>方剂堂</span>
        </el-menu-item>

        <el-menu-item index="/user/pcm" v-if="userInfoStore.userInfo.role === 'ROLE_USER'">
          <el-icon>
            <Mug/>
          </el-icon>
          <span>中成药</span>
        </el-menu-item>

        <el-menu-item index="/user/book" v-if="userInfoStore.userInfo.role === 'ROLE_USER'">
          <el-icon>
            <Reading/>
          </el-icon>
          <span>藏经阁</span>
        </el-menu-item>

        <el-menu-item index="/user/forum" v-if="userInfoStore.userInfo.role === 'ROLE_USER'">
          <el-icon>
            <ChatLineRound/>
          </el-icon>
          <span>老茶馆</span>
        </el-menu-item>

        <el-menu-item index="/admin/herb" v-if="userInfoStore.userInfo.role === 'ROLE_ADMIN'">
          <el-icon>
            <Setting/>
          </el-icon>
          <span>中药材管理</span>
        </el-menu-item>

        <el-menu-item index="/admin/pre" v-if="userInfoStore.userInfo.role === 'ROLE_ADMIN'">
          <el-icon>
            <Setting/>
          </el-icon>
          <span>方剂管理</span>
        </el-menu-item>

        <el-menu-item index="/admin/pcm" v-if="userInfoStore.userInfo.role === 'ROLE_ADMIN'">
          <el-icon>
            <Setting/>
          </el-icon>
          <span>中成药管理</span>
        </el-menu-item>

        <el-menu-item index="/admin/book" v-if="userInfoStore.userInfo.role === 'ROLE_ADMIN'">
          <el-icon>
            <Setting/>
          </el-icon>
          <span>典籍管理</span>
        </el-menu-item>

        <el-menu-item index="/admin/post" v-if="userInfoStore.userInfo.role === 'ROLE_ADMIN'">
          <el-icon>
            <Setting/>
          </el-icon>
          <span>讨论区管理</span>
        </el-menu-item>

        <el-menu-item index="/admin/userManage" v-if="userInfoStore.userInfo.role === 'ROLE_ADMIN'">
          <el-icon>
            <Setting/>
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>

        <el-sub-menu index="">
          <template #title>
            <el-icon>
              <UserFilled/>
            </el-icon>
            <span>个人中心</span>
          </template>

          <el-menu-item index="/mine/info">
            <el-icon>
              <User/>
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>

          <el-menu-item index="/mine/avatar">
            <el-icon>
              <Crop/>
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>

          <el-menu-item index="/mine/resetPassword">
            <el-icon>
              <EditPen/>
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>

          <el-menu-item index="/mine/collections" v-if="userInfoStore.userInfo.role === 'ROLE_USER'">
            <el-icon>
              <Star/>
            </el-icon>
            <span>收藏夹</span>
          </el-menu-item>

        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div style="color:#8B4513">用户：<strong>{{ userInfoStore.userInfo.nickname }}</strong></div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.userInfo.userPic?userInfoStore.userInfo.userPic:avatar"/>
                        <el-icon>
                            <CaretBottom/>
                        </el-icon>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- command：条目被点击后会触发，在事件函数上可以声明一个参数，接受条目对应的指令，指令名字要与路由路径对应起来 -->
              <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <!-- 内容展示区,根据左侧菜单的点击动态展示相应内容 -->
        <router-view/>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>百草居 ©2024 Created by lx</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  background-image: url('@/assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .el-aside {
    background-image: url('@/assets/background.jpg');
    background-repeat: no-repeat;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 320px auto;
    }

    .el-menu {
      border-right: none;
      .el-menu-item.is-active {
        border-left:#8B4513 solid 6px !important;
        background-color:#FFFFF0 !important;
        color: #8B4513 !important;
    }
    .el-menu-item:hover{
        //border-left:#81C784 solid 6px !important;
        background-color: #FFFFF0 !important;
        color: #8B4513 !important;
        //less语法，实现鼠标悬停时icon变色
        i {
            color: #8B4513;
        }
    }
    
    }
    
  }

  .el-header {
    background-image: url('@/assets/background.jpg');
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }


  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
    height: 40px;
  }
}
</style>
