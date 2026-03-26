<script setup>
import { Delete, Edit, Plus ,Star} from "@element-plus/icons-vue";

import { ref } from "vue";
import {
  preAddService,
  preListService,
  preDeleteService,
  preUpdateService,
} from "@/api/prescription.js";
// import {preDetail} from "@/api/collections.js"
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useTokenStore } from "@/stores/token";
import {useUserInfoStore} from "@/stores/userInfo";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";


//用户搜索时选中的剂型
const dosageForm = ref("");

//用户搜索时输入的方剂名
const preName = ref("");

//方剂模型
const pres = ref([]);

//收藏方剂模型
const collPre = ref({
  userId:"",
  preId:""
});

//分页条数据模型
const pageNum = ref(1); //当前页
const total = ref(20); //总条数
const pageSize = ref(10); //每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size;
  preList();
};
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num;
  preList();
};


const preList = async () => {
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    // 如果为空字符串，可以这样写
    dosageForm: dosageForm.value ? dosageForm.value : null,
    preName: preName.value ? preName.value : null,
  };
  const result = await preListService(params);
  pres.value = result.data.items;
  total.value = result.data.total;
};
preList();

const router = useRouter();
const preDetail = async (id) => {
  router.push({ path: "/user/preDetail", query: { id: id } });
}


const clearData = () => {
  preModel.value = {
    dosageForm: "",
    type: "",
  };
};

const story = async (index) => {
  await router.push({ path: "/user/preStories", query: { index: index } });
}

</script>

<template>
  <el-card class="page-container">
    <!-- 上部分div -->
    <div>
<!-- 搜索框div -->
       <div style="margin-left:30px;margin-top:10px;"> 
        <el-input v-model="preName" placeholder="按方剂名检索" style="width:90%;height:40px;font-size:15px;"> </el-input>
        <el-button @click="preList()" style="width:80px;height:40px;margin-left:10px;color:white;background-color:#8B4513">搜索</el-button>
      </div>

<!-- 筛选栏div -->
      <div style="margin-left:30px;"> 
        <table class="select-table">
          <tr class="tr">
            <td class="td-left">剂型</td>
            <td class="td" @click="dosageForm = '';preList()">
              <el-button link>全部</el-button>
            </td>
            <td class="td" @click="dosageForm = '饼剂';preList()">
              <el-button link>饼剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '茶剂';preList()">
              <el-button link>茶剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '搽剂';preList()">
              <el-button link>搽剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '醋剂';preList()">
              <el-button link>醋剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '丹剂';preList()">
              <el-button link>丹剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '点眼剂';preList()">
              <el-button link>点眼剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '锭剂';preList()">
              <el-button link>锭剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '敷剂';preList()">
              <el-button link>敷剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '膏剂';preList()">
              <el-button link>膏剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '膏药剂';preList()">
              <el-button link>膏药剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '糕剂';preList()">
              <el-button link>糕剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '羹剂';preList()">
              <el-button link>羹剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '含漱剂';preList()">
              <el-button link>含漱剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '糊剂';preList()">
              <el-button link>糊剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '胶剂';preList()">
              <el-button link>胶剂</el-button>
             </td>
            <td class="td" @click="dosageForm = '疚剂';preList()">
              <el-button link>疚剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '酒剂';preList()">
              <el-button link>酒剂</el-button>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" @click="dosageForm = '露剂';preList()">
              <el-button link>露剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '片剂';preList()">
              <el-button link>片剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '曲剂';preList()">
              <el-button link>曲剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '塞鼻剂';preList()">
              <el-button link>塞鼻剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '塞耳剂';preList()">
              <el-button link>塞耳剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '散剂';preList()">
              <el-button link>散剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '霜剂';preList()">
              <el-button link>霜剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '汤剂';preList()">
              <el-button link>汤剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '敷剂';preList()">
              <el-button link>敷剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '条剂';preList()">
              <el-button link>条剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '丸剂';preList()">
              <el-button link>丸剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '煨剂';preList()">
              <el-button link>煨剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '洗剂';preList()">
              <el-button link>洗剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '吸入烟剂';preList()">
              <el-button link>吸入烟剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '线剂';preList()">
              <el-button link>线剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '嗅剂';preList()">
              <el-button link>嗅剂</el-button>
             </td>
            <td class="td" @click="dosageForm = '熏洗剂';preList()">
              <el-button link>熏洗剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '熏烟剂';preList()">
              <el-button link>熏烟剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '油剂';preList()">
              <el-button link>油剂</el-button>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" @click="dosageForm = '熨剂';preList()">
              <el-button link>熨剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '粥剂';preList()">
              <el-button link>粥剂</el-button>
            </td>
            <td class="td" @click="dosageForm = '其他剂型';preList()">
              <el-button link>其他剂型</el-button>
            </td>
          </tr>
          
        </table>
      </div>
    </div>

<!-- 下部分div -->
<div style="display: flex;width: 95%;margin: 0 auto;background-color: #FFF8DC;;border-radius: 5px;">
        <!-- 方剂列表div -->
    <div style="flex: 1;border-right: 1px solid #cccccc;; margin-top:20px;">
      <div v-for="p in pres" :key="p" @click="preDetail(p.id)" class="item">
          <div style="margin-left:18px;margin-top:10px;margin-right:10px;">
            <div class="name"> {{p.preName}} </div>
            <div class="text" style="">
              <div >剂型：{{p.dosageForm}}</div>
              <div>组成：{{p.originalText}}</div>
            </div>
            </div>
          </div>
    </div>

      <div style="width: 300px;">
 
        <div style="margin: 30px 20px;">
          <div style="background-color: #EEEEEE;height: 40px;display: flex;">
            <div class="stories">
              名医名方
              <div class="row">
                    <div class="title" @click="story(1)">清代叶天士与白虎汤的故事</div>
                  </div>
                  <div class="row">
                    <div class="title" @click="story(2)">北宋名医钱乙与六味地黄丸的故事</div>
                  </div>
                  <div class="row">
                    <div class="title" @click="story(3)">清代名医王清任与补阳还五汤的故事</div>
                  </div>
                  <div class="row">
                    <div class="title" @click="story(4)">一代医宗朱丹溪的医案趣事</div>
                  </div>
                  <div class="row">
                    <div class="title" @click="story(5)">华佗炼制青苔膏</div>
                  </div>
                  <div class="row">
                    <div class="title" @click="story(6)">张仲景用蜂蜜治疗便秘</div>
                  </div>
                  <div class="row">
                    <div class="title" @click="story(7)">程钟龄施计治“足痿”</div>
                  </div>
                  <div class="row">
                    <div class="title" @click="story(8)">张景岳急智救吞钉小儿</div>
                  </div>
                  <div class="row">
                    <div class="title" @click="story(9)">孙思邈巧治脚气</div>
                  </div>
                  <div class="row">
                    <div class="title" @click="story(10)">孙一奎便方治难症</div>
                  </div>
                  
            </div>
          </div>
        
        </div>
 
      </div>

</div>

    <!-- 分页条 -->
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: center"
    />
  </el-card>
  
</template>


<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  background-color: #FFF8DC;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .select-table {
    border-collapse: collapse;
    margin-left: 10px;
    margin-top: 20px;
    .tr {
      border-bottom: 1px solid rgb(205, 205, 205);
      height: 35px;
      width: 500px;
      .td-left {
        width:54px;
        font-size: 15px;
        font-weight: bold;
      }
      .td {
        width:54px;
        font-size: 13px;
    }
    }
  }

  .item {
    height: 120px;
    display: flex;
    margin: 10px 20px;
    border-bottom: 1px solid #cccccc;
    width: 750px;

    .text{
      color: #cccccc;
      margin-top:10px;height: 45px;
      overflow:hidden;  
      text-overflow:ellipsis; 
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:3;  
      line-height: 25px;
      color: gray;
      font-size:13px;
      width: 740px;

    }
    
    .name{
    font-size: 25px;
    color: #000000;
    cursor: pointer;
    width: 960px;
  }

  .name:hover{
    font-size: 1.7em;
  }
  }

  .stories {
    font-size: 16px;
    line-height: 40px;
    font-weight: 600;
    margin-left: 10px;
    .row{
      padding: 5px 0;
      display: flex;
      border-bottom: 1px dashed #cccccc;
      overflow: hidden;
      text-overflow: ellipsis;
      width:235px;
      height: 30px;
      .title{
        color: #707070;
        line-height: 20px;
        font-size: 12px;
        margin-left: 10px;
        margin-top:5px;
        cursor: pointer;
      }
    }
  }
}

</style>
