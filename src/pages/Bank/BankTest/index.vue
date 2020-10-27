<template>
  <div class="wrap">
    <!-- 图标 -->
    <div class="img">
      <div class="BigQ">
        <p>Q{{myList.data.sort}}</p>
        <div class="three"></div>
      </div>
    </div>

    <!-- 试题部分 -->
    <div class="main">
      <!-- 单选题 -->
      <div v-if="myList.data.type=== 1">
        <!-- 题目 -->
        <div class="p">{{myList.data.title}}</div>
        <!-- 内容 -->
        <div class="change" v-for="(item,index) in myList.data.texamAnswerList" :key="index" @change="onChange(item)">
          <div class="active1">
            <div class="circle">
              <span :class="{ active: value === 'A' ? '#ffffff' : isChecked }" @click="click(index)">A</span>
            </div>
            <input type="radio" name="text" style="display: none" value="A" id="a" :v-model="value" :isChecked="isChecked" />
            <label for="a" @click="click(index)">{{item.content}}</label>
          </div>
        </div>
      </div>
      <!-- 多选 -->
      <div v-else-if="myList.data.type=== 2">
        <!-- 题目 -->
        <div class="p">{{myList.data.title}}</div>
        <!-- 内容 -->
        <div class="change" v-for="(item,index) in myList.data.texamAnswerList" :key="index" :v-model="change" @change="onChange(item)">
          <div class="active1">
            <div class="circle">
              <span :class="{ active: value === 'A' ? '#ffffff' : isChecked }" @click="click(index)">A</span>
            </div>
            <input type="checkbox" name="text" style="display: none" value="A" id="a" :v-model="value" :isChecked="isChecked" />
            <label for="a">{{item.content}}</label>
          </div>
        </div>
      </div>
      <!-- 判断题 -->
      <div v-else-if="myList.data.type=== 3">
        <!-- 题目 -->
        <div class="p">{{myList.data.title}}</div>
      </div>
    </div>

    <!-- 下一题按钮 -->
    <!-- itemNum 试卷的数量 不等于它的长度 v-if="itemNum !== itemDetail.length" -->
    <div class="next" v-if="isDisplay === true">
      <button class="btn" @click="goto(index)" :disabled='disabled' :class="{ active5: isActive }">下一题</button>
    </div>
    <div class="next" v-if="isDisplay === false">
      <button @click="submit" :class="{ active5: isActive }">提交</button>

      <!-- 提交显示合格的提示框 -->
      <van-dialog class="dialog" v-model="show" show-cancel-button :beforeClose="chargeBtn">
        <div class="cirX" @click="chargeX()">
          <img src="../../../assets/cha.png" alt="" />
        </div>
        <div class="yes">成绩合格</div>
        <div class="img">
          <img src="../../../assets/hege.png" alt="" />
        </div>
        <div class="grade">
          <p>恭喜你,成绩合格</p>
          <p>已获得资格认证</p>
        </div>
        <div class="number">
          <div class="wrong">
            <div>3</div>
            <div>做错数</div>
          </div>
          <div class="notDone">
            <div>0</div>
            <div>未做题</div>
          </div>
          <div class="score">
            <div>97</div>
            <div>得分</div>
          </div>
        </div>
        <div class="submit">
          <div class="now">现在交卷</div>
        </div>
      </van-dialog>

      <!-- 为不合格的提示框 -->
      <!-- <van-dialog class="dialogNo" v-model="show"  show-cancel-button :beforeClose="chargeBtn">
        <div class="cirX"  @click="chargeX()">
          <img src="../../../assets/cha.png" alt="">
        </div>
        <div class="yesNo">成绩不合格</div>
        <div class="imgNo">
          <img src="../../../assets/tubiao.png" alt="">
        </div>
        <div class="gradeNo">
          <p>很遗憾答错了</p>
          <p>先学懂再练习, 你会收获更好的成绩</p>
        </div>
        <div class="numberNo">
          <div class="wrongNo">
            <div>11</div>
            <div>做错数</div>
          </div>
          <div class="notDoneNo">
            <div>70</div>
            <div>未做题</div>
          </div>
          <div class="scoreNo">
            <div>19</div>
            <div>得分</div>
          </div>
        </div>
        <div class="submitNo">
          <div class="continue">继续答题</div>
          <div class="nowNo">现在交卷</div>
        </div>
      </van-dialog> -->
    </div>
  </div>
</template>

<script>
import { reqOnlineExam, reqNextExam } from "../../../api/index";
export default {
  name: "BankTest",
  inject: ['reload'],  // 点击下一题刷新页面
  data () {
    return {
      value: "", //是单选框的值
      isChecked: false, // 单选框是否选中
      isReady: false,
      myList: {}, // 题库
      isActive: false,   //按钮文字颜色
      change: '',
      radio: "1", //测试的值
      check: true, // 是否选中
      index: "",
      answer: "", //题目的答案
      sort: 1,  // 题目序列
      // choosedResult: null, //当前选择的题号
      disabled: true, // 按钮点击与不能点击
      show: false, // 提交按钮
      isDisplay: true,   //下一题与提交按钮的显示隐藏
      type: 1,  //  题目类型
    };
  },
  computed: {
  },
  mounted: function () {
    this.get_data();
  },
  methods: {
    // 获取数据
    get_data: function () {
      reqOnlineExam().then((response) => {
        this.myList = response.data;
      });
    },

    goto (index) {
      //点击下一题
      reqNextExam
        (this.myList.data.answer, this.sort, this.myList.data.examPaperId, this.sort + 1)
        .then((response) => {
          console.log(response);
          this.reload() //重新刷新页面

        })
      this.sort++;

    },

    onChange () {
      // 考试题选中时
      this.disabled = false;
      this.isActive = true
    },
    click: function (index) {
      // 点击单选框选中时
      this.isChecked = true;
      this.disabled = false;
      this.isActive = true;
    },
    submit () {
      // 提交按钮
      this.show = true;
    },
    chargeBtn (action, done) {
      // 确认OR　取消
      if (action === "cancel") {
        // 取消按钮
        done();
      } else if (action === "confirm") {
        // 确认按钮
        this.show = false;
      }
      done();
    },
    chargeX () {
      //点击X 关闭弹出框
      this.show = false;
    },
  },
};
</script>

<style scoped>
.active5 {
  color: #ed7430 !important;
  background: #e4e5ea;
}

.wrap {
  border-top: 2px solid #efefef;
}
.img {
  margin-bottom: 21px;
}
.img .BigQ {
  width: 71px;
  height: 63px;
  margin: 0 0 0 27px;
  background: #ff7a22;
  position: relative;
}
.img .BigQ .three {
  position: absolute;
  top: -5px;
  left: -5px;
  z-index: 99;
  width: 0;
  height: 0;
  overflow: hidden;
  border-top: 40px solid transparent;
  border-left: 40px solid transparent;
  border-bottom: 40px solid #ffffff;
  border-right: 40px solid transparent;
}
.img .BigQ p {
  text-align: center;
  /* width: 26px; */
  height: 21px;
  line-height: 40px;
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
}

/* 正式的题目 */
.active1 {
  display: flex;
  margin-bottom: 35px;
}
.active1 input {
  margin-left: -38px;
  margin-top: 5px;
}
/* 圆圈的大小 */
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid #dedede;
  position: relative;
}
.circle span {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
}
/* 这里是单选框的 */
.active {
  background: #ff7a22;
  border-radius: 50%;
  color: #ffffff;
}
.main ul {
  margin: 20px 20px 50px 20px;
}
/* 选项部分 */
.main .change {
  margin: 0 20px 120px 20px;
}
label {
  margin-left: 30px;
}

.main {
  margin: 0 55px 10px 30px;

  /* 这里是静态 */
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #343434;
  line-height: 60px;
  text-align: left;
}
.main .p {
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #343434;
  line-height: 60px;
  text-align: left;
  white-space: nowrap;
}
.next {
  width: 640px;
  height: 96px;
  margin: 0 55px 41px 50px;
  background: #e4e5ea;
  border-radius: 8px;
}
.next .btn {
  color: #ffffff;
  background: #e4e5ea;
}
.next button {
  line-height: 96px;
  text-align: center;
  border: none;
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 500;
  /* background: #e4e5ea; */
}

/* 这里都是静态测试 */
.container {
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #343434;
  line-height: 60px;
  text-align: left;
  margin: 0 55px 62px 40px;
}
.container p {
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #343434;
  line-height: 60px;
}
.containerOne {
  margin: 10px;
  height: 100%;
}
.containerOne .ul {
  height: 100%;
  padding: 10px;
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #343434;
  line-height: 40px;
}
.containerOne .ul li {
  line-height: 50px;
}
.van-radio {
  height: 50px;
  display: flex;
}

.van-radio .van-radio {
  margin-left: 30px !important;
}

/* 未全部做完合格的提示框 */
.next .dialog {
  width: 606px;
  height: 724px;
}
.cirX {
  margin: 20px 20px -20px 80%;
}
.yes {
  white-space: nowrap;
  margin: 3px 217px 24px 223px;
  width: 166px;
  height: 40px;
  font-size: 42px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 40px;
}
.next .dialog .img {
  width: 362px;
  height: 226px;
  margin: 30px 122px 0 122px;
}
.next .dialog .img img {
  width: 100%;
  height: 100%;
}
.grade p:nth-child(1) {
  color: #333333;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: bold;
}
.grade p:nth-child(2) {
  color: #999999;
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
}
/* 做错题  未做题  得分情况 */
.number {
  display: flex;
  justify-content: space-around;
  margin: 0px 87px 45px 87px;
}
.wrong {
  display: flex;
  flex-direction: column;
}
.wrong div {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-top: 30px;
}
.notDone {
  display: flex;
  flex-direction: column;
}
.notDone div {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-top: 30px;
}
.score {
  display: flex;
  flex-direction: column;
}
.score div {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-top: 30px;
}
.submit {
  background: #ff7a21;
  border-radius: 42px;
  margin: 0 40px 40px 40px;
}
.now {
  font-size: 34px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  padding: 26px 195px;
}

/*  为不合格的提示框 */
.next .dialogNo {
  width: 606px;
  height: 724px;
}
.cirX {
  margin: 20px 20px -20px 80%;
}
.yesNo {
  white-space: nowrap;
  margin: 3px 217px 24px 223px;
  width: 166px;
  height: 40px;
  font-size: 42px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 40px;
}
.next .dialogNo .imgNo {
  width: 362px;
  height: 226px;
  margin: 30px 122px 0 122px;
}
.next .dialogNo .imgNo img {
  width: 100%;
  height: 100%;
}
.gradeNo p:nth-child(1) {
  color: #333333;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: bold;
}
.gradeNo p:nth-child(2) {
  color: #999999;
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
}

/* 做错题  未做题  得分情况 */
.numberNo {
  display: flex;
  justify-content: space-around;
  margin: 0px 87px 45px 87px;
}
.wrongNo {
  display: flex;
  flex-direction: column;
}
.wrongNo div {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-top: 30px;
}
.notDoneNo {
  display: flex;
  flex-direction: column;
}
.notDoneNo div {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-top: 30px;
}
.scoreNo {
  display: flex;
  flex-direction: column;
}
.scoreNo div {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-top: 30px;
}
.submitNo {
  margin: 0 40px 40px 40px;
  display: flex;
  justify-content: space-between;
}
.continue {
  background: #ffffff;
  border: 2px solid #dedede;
  border-radius: 42px;
  padding: 26px 54px;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 10px;
}
.nowNo {
  background: #ff7a21;
  border: 2px solid #dedede;
  border-radius: 42px;
  padding: 26px 54px;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 10px;
}
</style>
