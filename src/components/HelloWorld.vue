<!--  考试主页面 -->
<template>
  <div class="hello" v-if="isShow">
    <!-- 循环开始 -->
    <div class="financial" v-for="item in myData.data" :key="item.typeName">
      <div class="financialSystem">
        <img src="../assets/jinrong.png" alt />
        <span>{{item.typeName}}类</span>
      </div>
      <p class="line"></p>
      <div class="system">
        <div @click="goto('/bank',userExamType.examPaperId)" v-for="userExamType in item.userExamTypes" :key="userExamType.examPaperId">{{userExamType.examPaperName}}</div>
      </div>
    </div>
    <!-- 循环结束 -->
  </div>
</template>

<script>
import { reqOnlineExamGetExamType } from "../api/index";
export default {
  name: "HelloWorld",
  data () {
    return {
      myData: {},
    };
  },
  mounted: function () {
    this.getInitData();
  },
  methods: {
    getInitData: function () {
      reqOnlineExamGetExamType().then((response) => {
        this.myData = response.data;
      });
    },
    goto (path, id) {
      this.$router.push({
        path: "/bank",
        query: {
          id: id,
          userId: this.$route.query.userId
        },
      });
    },

  },
  computed: {
    isShow () {
      return this.$route.meta.isShow;
    },
  },
};
</script>

<!-- 写入scoped 将css 仅仅限制在当前组件使用 -->
<style scoped >
.hello {
  width: 100%;
  height: 100%;
  border-top: 2px solid #efefef;
}
/* 金融类 */
.financial .line {
  width: 675px;
  height: 2px;
  background-color: #efefef;
  margin: 0 auto;
}
.financial .financialSystem {
  width: 100%;
  margin: 34px 0 26px 30px;
  display: flex;
  justify-content: flex-start;
}
.financial .financialSystem img {
  width: 43px;
  height: 43px;
  margin-right: 21px;
}
.financial .financialSystem span {
  text-align: center;
  line-height: 44px;
  font-size: 34px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ff7a21;
}

.system {
  margin: 38px 30px 30px 50px;
  display: flex;
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #0e0e0e;
  line-height: 44px;
  flex-wrap: wrap;
}
.system div {
  white-space: nowrap;
  margin: 20px 0;
}
.system div:nth-child(odd) {
  margin-right: 100px;
}
.system div:nth-child(2) {
  margin-right: 100px;
}
/* 财务类 */
.money .line {
  width: 675px;
  height: 2px;
  background-color: #efefef;
  margin: 0 auto;
}
.money .moneySystem {
  width: 100%;
  margin: 34px 0 26px 30px;
  display: flex;
  justify-content: flex-start;
}
.money .moneySystem img {
  width: 43px;
  height: 43px;
  margin-right: 21px;
}
.money .moneySystem span {
  text-align: center;
  line-height: 44px;
  font-size: 34px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ff7a21;
}
/* 语言类 */
.language .line {
  width: 675px;
  height: 2px;
  background-color: #efefef;
  margin: 0 auto;
}
.language .languageSystem {
  width: 100%;
  margin: 34px 0 26px 30px;
  display: flex;
  justify-content: flex-start;
}
.language .languageSystem img {
  width: 43px;
  height: 43px;
  margin-right: 21px;
}
.language .languageSystem span {
  text-align: center;
  line-height: 44px;
  font-size: 34px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ff7a21;
}
/* 技术类 */
.skill .line {
  width: 675px;
  height: 2px;
  background-color: #efefef;
  margin: 0 auto;
}
.skill .skillSystem {
  width: 100%;
  margin: 34px 0 26px 30px;
  display: flex;
  justify-content: flex-start;
}
.skill .skillSystem img {
  width: 43px;
  height: 43px;
  margin-right: 21px;
}
.skill .skillSystem span {
  text-align: center;
  line-height: 44px;
  font-size: 34px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ff7a21;
}
</style>
