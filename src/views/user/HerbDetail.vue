<script setup>
import { useRouter } from "vue-router";
import { Delete, Edit, Plus, CaretRight } from "@element-plus/icons-vue";

import { ref } from "vue";
import { herbDetailService } from "@/api/herb";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useTokenStore } from "@/stores/token";
import { ElMessage, ElMessageBox } from "element-plus";

import { computed } from "vue";
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from "@element-plus/icons-vue";

const size = ref("default");
const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "6px",
    small: "4px",
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});
const blockMargin = computed(() => {
  const marginMap = {
    large: "32px",
    default: "28px",
    small: "24px",
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});

//添加表单数据模型
const herb = ref({
  cnName: "",
  latinName: "",
  en_name: "",
  family: "",
  habitat: "",
  part: "",
  catrgory: "",
  property: "",
  flavor: "",
  meridian_tropism: "",
  efficacy: "",
  trait: "",
  indications: "",
  herbPic: "",
});

const tokenStore = useTokenStore();
const router = useRouter();

//获取query携带的中药id
const id = router.currentRoute.value.query.id;

const detail = async () => {
  let result = await herbDetailService(id);
  herb.value = result.data;
  console.log(herb.value);
};
detail();

const backToHerb = async () => {
  await router.push("/user/herb");
};
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span> {{herb.cnName}}详情 </span>
        <div class="extra">
          <el-button style="background-color:#8B4513;color:white;" @click="backToHerb()">返回</el-button>
        </div>
      </div>
    </template>

    <el-row :gutter="0" style="display: flex">
    
      <el-col :span="18">
        <el-descriptions
          class="margin-top"
          :column="1"
          :size="size"
          border
          :data="herb"  
        >
          <el-descriptions-item label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                中文名
              </div>
            </template>
            {{ herb.cnName }}
          </el-descriptions-item>

          <el-descriptions-item lable="latinName" label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                拉丁名
              </div>
            </template>
            {{ herb.latinName }}
          </el-descriptions-item>

          <el-descriptions-item label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                英文名
              </div>
            </template>
            {{ herb.enName }}
          </el-descriptions-item>

          <el-descriptions-item label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                科
              </div>
            </template>
            {{ herb.family }}
            <!-- <el-tag size="small">{{ herb.family }}</el-tag> -->
          </el-descriptions-item>

          <el-descriptions-item label-class-name="my-label">
        <template #label>
          <div class="cell-item">
            产地
          </div>
        </template>
        {{ herb.habitat }}
      </el-descriptions-item>

        </el-descriptions>
      </el-col>

      <el-col :span="6" style="align-items: stretch">
        <div class="imgBox">
          <img
            class="devImg"
            fit="fill"
            :src="herb.herbPic"

          />
        </div>
      </el-col>
    </el-row>

    <el-descriptions class="margin-top"
          :column="1"
          :size="size"
          border
          :data="herb"
          style="margin-top:-1px">
      

      <el-descriptions-item label-class-name="my-label">
        <template #label>
          <div class="cell-item">
            入药部位
          </div>
        </template>
        {{ herb.part }}
      </el-descriptions-item>

      <el-descriptions-item label-class-name="my-label">
        <template #label>
          <div class="cell-item">
            类型
          </div>
        </template>
        {{ herb.category }}
      </el-descriptions-item>

      <el-descriptions-item label-class-name="my-label">
        <template #label>
          <div class="cell-item">
            性
          </div>
        </template>
        {{ herb.property }}
      </el-descriptions-item>

      <el-descriptions-item label-class-name="my-label">
        <template #label>
          <div class="cell-item">
            味
          </div>
        </template>
        {{ herb.flavor }}
      </el-descriptions-item>

      <el-descriptions-item label-class-name="my-label">
        <template #label>
          <div class="cell-item">
            归经
          </div>
        </template>
        {{ herb.meridianTropism }}
      </el-descriptions-item>

      <el-descriptions-item label-class-name="my-label">
        <template #label>
          <div class="cell-item">
            功效
          </div>
        </template>
        {{ herb.trait }}
      </el-descriptions-item>

      <el-descriptions-item label-class-name="my-label">
        <template #label>
          <div class="cell-item">
            规格
          </div>
        </template>
        {{ herb.indications }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }
}

//表格
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
  height: 40px;
}
.margin-top {
  margin-top: 20px;
}

:deep(.my-label) {
  // background: var(--el-color-success-light-9) !important;
  width: 200px;
}

.imgBox {
   margin-top: 20px;
  border: 1px solid #ebeef5;
  width: 99.5%;
  height: 93%;
  position: relative;
  overflow: hidden;
  margin-left: 0%;
  .devImg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: auto;
    max-height: 100%;
    padding: 10px 10px;
  }
}
</style>
