<script setup>
import { Delete, Edit, Plus } from "@element-plus/icons-vue";

import { ref } from "vue";
import { pcmListService } from "@/api/pcm.js";
import { pcmRecommendService } from "@/api/recommend.js"
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useTokenStore } from "@/stores/token";
import { ElMessage, ElMessageBox } from "element-plus";


//用户搜索时选中的剂型
const dosageForm = ref("");

//用户搜索时选中的类型
const type = ref("");

//用户搜索时输入的药名
const pcmName = ref("");

//中成药模型
const pcms = ref([]);


//分页条数据模型
const pageNum = ref(1); //当前页
const total = ref(20); //总条数
const pageSize = ref(10); //每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size;
  pcmList();
};
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num;
  pcmList();
};


const pcmList = async () => {
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    // 如果为空字符串，可以这样写
    dosageForm: dosageForm.value ? dosageForm.value : null,
    type: type.value ? type.value : null,
    pcmName: pcmName.value ? pcmName.value : null,
  };
  const result = await pcmListService(params);
  pcms.value = result.data.items;
  total.value = result.data.total;
};
pcmList();

const tokenStore = useTokenStore();

const clearData = () => {
  pcmModel.value = {
    dosageForm: "",
    type: "",
  };
};

const question = ref("");
const answer = ref("");
const recommend = async() => {
  let result = await pcmRecommendService(question.value);
  answer.value = result.data;
}

</script>

<template>
  <el-card class="page-container">
    <!-- 上部分div -->
    <div>
<!-- 搜索框div -->
       <div style="margin-left:30px;margin-top:10px;"> 
        <el-input v-model="pcmName" placeholder="按中成药名检索" style="width:90%;height:40px;font-size:15px;"> </el-input>
        <el-button @click="pcmList()" style="width:80px;height:40px;margin-left:10px;color:white;background-color:#8B4513">搜索</el-button>
      </div>

<!-- 筛选栏div -->
      <div style="margin-left:30px;"> 
        <table class="select-table">
          <tr class="tr">
            <td class="td-left">类型</td>
            <td class="td" @click="type = '';pcmList()">
              <el-button link>全部类型</el-button>
            </td>
            <td class="td" @click="type = '安神';pcmList()">
              <el-button link>安神药</el-button>
            </td>
            <td class="td" @click="type = '表里双解';pcmList()">
              <el-button link>表里双解药</el-button>
            </td>
            <td class="td" @click="type = '补肾壮骨';pcmList()">
              <el-button link>补肾壮骨药</el-button>
            </td>
            <td class="td" @click="type = '补虚';pcmList()">
              <el-button link>补虚药</el-button>
            </td>
            <td class="td" @click="type = '补益';pcmList()">
              <el-button link>补益药</el-button>
            </td>
            <td class="td" @click="type = '疮疡消';pcmList()">
              <el-button link>疮疡消药</el-button>
            </td>
            <td class="td" @click="type = '调和';pcmList()">
              <el-button link>调和药</el-button>
            </td>
            <td class="td" @click="type = '调止';pcmList()">
              <el-button link>调止药</el-button>
            </td>
            <td class="td" @click="type = '扶正';pcmList()">
              <el-button link>扶正药</el-button>
            </td>
            <td class="td" @click="type = '固涩';pcmList()">
              <el-button link>固涩药</el-button>
            </td>
            <td class="td" @click="type = '和血';pcmList()">
              <el-button link>和血药</el-button>
            </td>
            <td class="td" @click="type = '化湿';pcmList()">
              <el-button link>化湿药</el-button>
            </td>
            <td class="td" @click="type = '化痰';pcmList()">
              <el-button link>化痰药</el-button>
            </td>  
          </tr>
          <tr class="tr">
            <td class="td" @click="type = '止咳';pcmList()">
              <el-button link>止咳药</el-button>
            </td>
            <td class="td" @click="type = '平喘';pcmList()">
              <el-button link>平喘药</el-button>
             </td>
            <td class="td" @click="type = '活血化瘀';pcmList()">
              <el-button link>活血化瘀药</el-button>
            </td>
            <td class="td" @click="type = '活血通络';pcmList()">
              <el-button link>活血通络药</el-button>
            </td>
            <td class="td" @click="type = '接骨续筋';pcmList()">
              <el-button link>接骨续筋药</el-button>
            </td>
            <td class="td" @click="type = '理气';pcmList()">
              <el-button link>理气药</el-button>
            </td>
            <td class="td" @click="type = '理血';pcmList()">
              <el-button link>理血药</el-button>
            </td>
            <td class="td" @click="type = '解表';pcmList()">
              <el-button link>解表药</el-button>
            </td>
            <td class="td" @click="type = '开窍';pcmList()">
              <el-button link>开窍药</el-button>
            </td>
            <td class="td" @click="type = '民族';pcmList()">
              <el-button link>民族药</el-button>
            </td>
            <td class="td" @click="type = '清热祛暑';pcmList()">
              <el-button link>清热祛暑药</el-button>
            </td>
            <td class="td" @click="type = '清热';pcmList()">
              <el-button link>清热药</el-button>
            </td>
            <td class="td" @click="type = '祛风活络';pcmList()">
              <el-button link>祛风活络药</el-button>
            </td>
            <td class="td" @click="type = '祛风';pcmList()">
              <el-button link>祛风药</el-button>
            </td>
            <td class="td" @click="type = '祛湿';pcmList()">
              <el-button link>祛湿药</el-button>
            </td>
          </tr>
          <tr class="tr">
            
            <td class="td" @click="type = '祛瘀';pcmList()">
              <el-button link>祛瘀药</el-button>
            </td>
            <td class="td" @click="type = '散结';pcmList()">
              <el-button link>散结药</el-button>
             </td>
            <td class="td" @click="type = '收涩';pcmList()">
              <el-button link>收涩药</el-button>
            </td>
            <td class="td" @click="type = '温经';pcmList()">
              <el-button link>温经活血药</el-button>
            </td>
            <td class="td" @click="type = '温理';pcmList()">
              <el-button link>温理药</el-button>
            </td>
            <td class="td" @click="type= '消导';pcmList()">
              <el-button link>消导药</el-button>
            </td>
            <td class="td" @click="type = '消食化积';pcmList()">
              <el-button link>消食化积药</el-button>
            </td>
            <td class="td" @click="type = '泻下';pcmList()">
              <el-button link>泻下药</el-button>
            </td>
            <td class="td" @click="type = '燥湿';pcmList()">
              <el-button link>燥湿药</el-button>
            </td>
            <td class="td" @click="type = '止血';pcmList()">
              <el-button link>止血药</el-button>
            </td>
            <td class="td" @click="type = '治风';pcmList()">
              <el-button link>治风药</el-button>
            </td>
            <td class="td" @click="type = '其他';pcmList()">
              <el-button link>其他</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>

<!-- 下部分div -->
<div class="main">
        <!-- 方剂列表div -->
    <div style="flex: 1;border-right: 1px solid #cccccc;; margin-top:20px;">
      <div v-for="p in pcms" :key="p" @click="pcmDetail(p.id)" class="item">
          <div style="margin-left:18px;margin-top:10px;margin-right:10px;">
            <div class="name"> {{p.pcmName}} </div>
            <div class="info" style="">
              <div style="display: flex;">
                  <div >剂型：{{p.dosageForm}}</div> 
                  <div style="margin-left:30px;">类型：{{p.type}}</div>
              </div>
              <div>组成：{{p.composition}}</div>
              <div >用法用量：{{p.pcmUsage}}</div>
            </div>
            </div>
          </div>
    </div>

      <div style="width: 300px;">
        <div style="margin: 30px 20px;">
          <div style="background-color: #EEEEEE;height: 40px;display: flex;">
            <div style="font-size: 16px;line-height: 40px;font-weight: 600;margin-left: 10px;">
              中成药智能推荐
              <div>
                <el-input v-model="question" placeholder="请输入病症，例如：咳嗽痰多"/>
                <el-button @click="recommend()" style="margin-bottom:5px;">确定</el-button>
                <el-input type="textarea" v-model="answer" rows="25"/>
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

  .select-table {
    border-collapse: collapse;
    margin-left: 10px;
    margin-top: 20px;
    .tr {
      border-bottom: 1px solid rgb(205, 205, 205);
      height: 35px;
     
      .td-left {
        width:64px;
        font-size: 15px;
        font-weight: bold;
      }
      .td {
        width:64px;
        font-size: 13px;
    }
    }
  }

  .main {
    display: flex;
    width: 95%;
    margin: 0 auto; 
    background-color: #FFF8DC;
    border-radius: 5px;
  }

  .item {
    height: 140px;
    display: flex;
    margin: 10px 20px;
    border-bottom: 1px solid #cccccc;
  }
  .name{
    font-size: 25px;
    color: #000000;
    cursor: pointer;
  }
  
  .info {
    color: #cccccc; 
    margin-top:10px;
    height: 70px;
    overflow:hidden;  
    text-overflow:ellipsis; 
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:4;
    line-clamp:4;  
    line-height: 23px;
    color: gray;
    font-size:13px;
  }
}


</style>
