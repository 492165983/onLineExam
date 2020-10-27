<template>
  <div class="nothing">
        <img src="../assets/banner.png" alt="">
        <div>
          <img src="../assets/kong.png" alt="">
          <p class="word">
            <span>很遗憾暂无试题</span>
            <span>小编正在拼命努力补题中...</span>
          </p>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Nothing',
}
</script>

<style scoped>
  .nothing img{
    width: 100%;
  }
  .nothing div img{
    width: 226px;
    height: 226px;
    margin-top: 71px;
    margin-bottom: 31px;
  }
  .nothing div .word{
    display: flex;
    flex-direction: column;
    padding-bottom: 550px;
  }
   .nothing div .word span{
    font-size: 38px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #9A9A9A;
   }
</style>