import {createRouter, createWebHistory} from "vue-router";
import Login from "@/views/Login.vue";
import Layout from "@/views/Layout.vue";
import UserInfo from "@/views/mine/UserInfo.vue";
import UserAvatar from "@/views/mine/UserAvatar.vue";
import UserResetPassword from "@/views/mine/UserResetPassword.vue";
import Collections from "@/views/mine/Collections.vue";
import UserManage from '@/views/admin/UserManage.vue';
import HerbManage from '@/views/admin/HerbManage.vue';
import PcmManage from '@/views/admin/PcmManage.vue';
import PreManage from '@/views/admin/PreManage.vue';
import BookManage from '@/views/admin/BookManage.vue'; 
import ChapterManage from '@/views/admin/ChapterManage.vue';
import PostManage from '@/views/admin/PostManage.vue';
import CommentManage from '@/views/admin/CommentManage.vue';
import Herb from '@/views/user/Herb.vue';
import HerbDetail from '@/views/user/HerbDetail.vue';
import HerbStories from '@/views/user/HerbStories.vue';
import Prescription from '@/views/user/Prescription.vue';
import PreDetail from '@/views/user/PreDetail.vue';
import PreStories from '@/views/user/PreStories.vue';
import Pcm from '@/views/user/Pcm.vue';
import Book from '@/views/user/Book.vue';
import Chapter from '@/views/user/Chapter.vue';
import Content from '@/views/user/Content.vue';
import Forum from '@/views/user/Forum.vue';
import PostDetail from '@/views/user/PostDetail.vue';
import MyPost from '@/views/user/MyPost.vue';



//定义路由关系
const routes = [
  {path: '/login', component: Login},
  {
    path: '/',
    redirect: '/user/herb', //重定向'/user/herb'
    component: Layout,
    children: [ //子路由
      {path: '/mine/info', component: UserInfo},
      {path: '/mine/avatar', component: UserAvatar},
      {path: '/mine/resetPassword', component: UserResetPassword},
      {path: '/mine/collections', component: Collections},
      {path: '/admin/userManage', component: UserManage},
      {path: '/admin/herb', component: HerbManage},
      {path: '/admin/pcm', component: PcmManage},
      {path: '/admin/pre', component: PreManage},
      {path: '/admin/book', component: BookManage},
      {path: '/admin/chapter', component: ChapterManage},
      {path: '/admin/post', component: PostManage},
      {path: '/admin/comment', component: CommentManage},
      {path: '/user/herb', component: Herb},
      {path: '/user/herbDetail', component: HerbDetail},
      {path: '/user/herbStories', component: HerbStories},
      {path: '/user/prescription', component: Prescription},
      {path: '/user/preDetail', component: PreDetail},
      {path: '/user/preStories', component: PreStories},
      {path: '/user/pcm', component: Pcm},
      {path: '/user/book', component: Book},
      {path: '/user/chapter', component: Chapter},
      {path: '/user/content', component: Content},
      {path: '/user/forum', component: Forum},
      {path: '/user/postDetail', component: PostDetail},
      {path: '/user/myPost', component: MyPost},

    ]
  },
]

//创建路由器
const router = createRouter({
  history: createWebHistory(), //声明路由模式history
  routes: routes //关系 
})

//导出路由
export default router