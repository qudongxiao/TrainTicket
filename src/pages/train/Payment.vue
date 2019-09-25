<template>
  <div class="home">
    <div class="nav">
      <p class="iconfont nav-1" @click="go">&#xe617;</p>
      <div class="nav-2">
        <p class="iconfont">&#xe609; 支付成功,等待确认</p>
        <span>实付金额:309.0MS</span>
      </div>
    </div>
    <div class="content">
      <div class="content-text">
        <p>正在出票中请耐心等待,稍后会短信及消息让通知若出票失败,票款将原路退回至您的支付宝账户</p>
        <button class="content-1">继续预定</button>
        <button class="content-2">查看订单</button>
      </div>
    </div>
    <div class="foot">
      <p>郑州东---北京西</p><br>
      <p>G808 05月17日 (周五) 19:08 发车</p>
    </div>
  </div>
</template>

<script>
export default {
  name:"Payment",
  data () {
    return {
      
    }
  },
    methods: {
    go(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.home {
  background: #f4f5f7;
  height: 100%;
}
.nav {
  height: 3.866rem;
  background: white;
}
.nav .nav-1 {
  padding: 0.4rem;
}
.nav .nav-2 {
  width: 6.1333rem;
  height: 1.7333rem;
  margin: 0.8rem auto;
}
.nav .nav-2 p {
  font-weight: bold;
  font-size: 0.5333rem;
  margin: 0.3rem;
}
.nav .nav-2 span {
  margin: 1.2rem;
  font-size: 0.3733rem;
}
.content {
  height: 3.8666rem;
  background: #f4f5f7;
}
.content .content-text {
  margin-top: 0.4rem;
  height: 3.066rem;
  background: white;
}
.content .content-text p {
  width: 8rem;
  height: 0.8rem;
  font-size: 0.32rem;
  margin: 0 auto;
  line-height: 0.52rem;
  padding-top: 0.3333rem;
}
.content .content-text button {
  width: 3.266rem;
  height: 0.906rem;
  border-radius: 0.1rem;
  margin: 0.533rem 0.75rem;
}
.content .content-text .content-1 {
  background: white;
  border: 0.02rem solid #8e18f6;
  color: #8e18f6;
}
.content .content-text .content-2 {
  background: url(./../../assets/img/qd.png) no-repeat;
  background-size: 100% 100%;
  color: white;
}
.foot {
    padding: 0.4rem;
  height: 1.5rem;
  background: white;
  
}
.foot p{
font-size: 0.3466rem;

}
</style>
