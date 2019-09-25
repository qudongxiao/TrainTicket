<template>
  <div class="home">
    <div class="nav">
      <nut-row :gutter="10">
        <nut-col :span="9">
          <div class="flex-content">
            <span class="iconfont" @click="go">&#xe617;</span>
          </div>
        </nut-col>
        <nut-col :span="15">
          <div class="flex-content flex-content-light title">价格明细</div>
        </nut-col>
      </nut-row>
    </div>
    <div class="content">
      <div class="content-1">
        <span class="content-1-1">成人</span>
        <div class="content-1-2"></div>
        <span class="content-1-3">{{priceDetail.ticketPayCash}} MS</span>
        <span class="content-1-4 iconfont">&#xe60a;{{priceDetail.passagersNum}} 人</span>
      </div>
      <div class="content-2">
        <nut-row type="flex">
          <nut-col span="6">
            <div class="flex-content">车票</div>
          </nut-col>
          <nut-col :span="6" :offset="8">
            <div class="flex-content">{{priceDetail.ticketPrice}} MS</div>
          </nut-col>
        </nut-row>
      </div>
      <div class="content-2">
        <nut-row type="flex">
          <nut-col span="6">
            <div class="flex-content">服务费</div>
          </nut-col>
          <nut-col :span="6" :offset="8">
            <div class="flex-content">{{priceDetail.serviceFree}} MS</div>
          </nut-col>
        </nut-row>
      </div>
      <div class="content-3">
        <nut-row type="flex">
          <nut-col span="6">
            <div class="flex-content">保险</div>
          </nut-col>
          <nut-col :span="6" :offset="8">
            <div class="flex-content">{{priceDetail.ticketInsursInfo}} MS</div>
          </nut-col>
        </nut-row>
      </div>
      <div class="content-4">
        <nut-row type="flex">
          <nut-col span="6">
            <div class="flex-content">总计</div>
          </nut-col>
          <nut-col :span="6" :offset="14">
            <div class="flex-content content-4-1">{{priceDetail.totalPrice}} MS</div>
          </nut-col>
        </nut-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Price",
  data() {
    return {
      priceDetail: this.$route.query.priceDetail
    };
    console.log(priceDetail);
  },

  watch: {
    $route(r) {
      console.log(r);
    }
  },

  methods: {
    go() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  background: #f4f5f7;
}
.nav {
  background: white;
  padding: 0.3333rem;
}
.nav .title {
  font-size: 0.4rem;
  font-weight: bold;
  color: #8e18f6;
}
.content {
  height: 6.4rem;
  background: white;
  margin-top: 0.4rem;
  padding: 0.4rem;
}
.content-1 {
  font-weight: bold;
  font-size: 0.4666rem;
}

.content-1-2 {
  width: 3rem;
  height: 0.1rem;
  margin-left: 0.4666rem;
  display: inline-block;
  border-top: 0.02rem solid black;
}
.content-1-3 {
  color: red;
  margin-left: 0.5rem;
}
.content-1-4 {
  margin-left: 0.4rem;
}
.content-2 {
  height: 1rem;
  font-size: 0.4rem;
  color: #999999;
  margin-top: 0.4rem;
}
.content-3 {
  height: 1rem;
  font-size: 0.4rem;
  color: #999999;
  margin-top: 0.4rem;
  border-bottom: 0.02rem solid black;
}
.content-4 {
  font-weight: bold;
  font-size: 0.4666rem;
  margin-top: 0.4rem;
}
.content-4-1 {
  color: red;
}
</style>

