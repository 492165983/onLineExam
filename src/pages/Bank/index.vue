<template>
  <div class="box">
    <!-- 相关科目有考试内容 -->
    <div v-if="show" class="have">
      <div class="logo">
        <img src="../../assets/banner.png" alt />
        <!-- <div>
           <span>金融类</span>
        </div>-->
      </div>

      <!-- 考试正文内容 -->
      <div class="study">
        <div class="main">
          <p>考试题目：{{this.myData.data.examName}}</p>
          <p>考试时间：{{this.myData.data.examTime}}分钟</p>
          <p>合格标准：{{this.myData.data.passScore}}分</p>
          <p>出题规则：{{this.myData.data.note}}</p>
          <p>考试价格：￥{{this.myData.data.price}}</p>
          <p>计分规则：点击下一题后不能修改前一题答案，每错一题扣1分，错题累计超过10道，考试不通过，系统自动提醒交卷。</p>
        </div>
      </div>
      <!-- 开始考试按钮 -->
      <div class="action">
        <span @click="goto('/bankTest')">开始考试</span>
      </div>
      <router-view></router-view>
    </div>

    <!-- 相关科目没有考试内容 -->
    <div v-else class="no">
      <Nothing />
    </div>
  </div>
</template>

<script>
import Nothing from "../../components/Nothing";
import { reqOnlineExamGetExamInfo } from "../../api/index";
export default {
  name: "Bank",
  components: {
    Nothing,
  },
  data () {
    return {
      myData: {
        data: {
          examName: "",
        },
      },
      id: {},
      show: true,
      _this: this,
    };
  },
  mounted: function () {
    this.getInitData();
  },
  methods: {
    getInitData: function () {
      reqOnlineExamGetExamInfo(
        this.$route.query.id
      ).then((response) => {
        this.myData = response.data;
        window.passScore = response.data.data.passScore
        if (this.myData.data == undefined || this.myData.data == null) {
          this.show = false;
        }
      });
    },

    goto (path, param) {
      return this.$router.push({
        path: path,
        query: {
          examPaperId: this.$route.query.id,
          userId: this.$route.query.userId
        }
      });
    },
  },
};
</script>

<style scoped>
.box {
  background-color: #f6f5f8;
  height: 1600px;
}
.have.logo {
  position: relative;
  width: 100%;
  background: red;
}
.have .logo img {
  width: 100%;
}
.have .logo div {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 55px;
  left: -3px;
  transform: rotate(-45deg);
  z-index: 111;
  /* background-color: #F0BA85; */
}
.have .logo div span {
  /* width: 74px;
    height: 77px; */
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 60px;
  /* background-color: #F49638; */
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  display: block;
  text-align: center;
}

/* 考试正题内容 */
.have .study {
  margin: 30px;
  background-color: #ffffff;
  border-radius: 10px;
}
.study .main {
  padding-bottom: 30px;
}

.study .main p {
  text-align: left;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #343434;
  line-height: 40px;
  margin: 39px 0 0 61px;
}

.study .main p:nth-child(1) {
  padding-top: 55px;
}
.study .main p:nth-child(5) {
  padding-bottom: 39px;
}

.study .main p:nth-child(6) {
  text-align: left;
  line-height: 40px;
  margin: 0px 50px 39px 61px;
  /* width: 100%; */
  height: 74px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #9a9a9a;
}

/* 开始考试按钮 */
.have .action {
  margin: 68px 55px 225px 55px;
  /* width: 640px; */
  height: 96px;
  background: #f49537;
  border-radius: 8px;
  position: relative;
}
.have .action span {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding-top: 25px;
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
}

/* 没有试题的情况下 */
.no {
  background-color: #f6f5f8;
}
</style> 