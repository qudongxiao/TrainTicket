<template>
  <div class="home">
    <div class="head">
      <nut-row :gutter="10">
        <nut-col :span="9">
          <div class="flex-content">
            <span class="iconfont" @click="go">&#xe617;</span>
          </div>
        </nut-col>
        <nut-col :span="15">
          <div class="flex-content flex-content-light title">我的订单</div>
        </nut-col>
      </nut-row>
      <div class="content">
        <nut-row :gutter="10">
          <nut-col :offset="1" :span="5">
            <router-link to="/Train/Order" active-class="active" exact>
              <div class="flex-content content-all">全部</div>
            </router-link>
          </nut-col>
          <nut-col :span="6">
            <router-link to="/Train/Order/Totravel" active-class="active" exact>
              <div class="flex-content flex-content-light">待出行</div>
            </router-link>
          </nut-col>
          <nut-col :span="6">
            <router-link to="/Train/Order/Obligation" active-class="active" exact>
              <div class="flex-content">待付款</div>
            </router-link>
          </nut-col>
          <nut-col :span="6">
            <router-link to="/Train/Order/OrderRefund" active-class="active" exact>
              <div class="flex-content flex-content-light">退款/售后</div>
            </router-link>
          </nut-col>
        </nut-row>
        <div class="content-foot"></div>
      </div>
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
     
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
a {
  color: #666666;
}
.home {
  height: 100%;
  background: #f4f5f7;
}
.head {
  background: white;
  padding-top: 0.5rem;
}
.head .title {
  font-size: 0.4rem;
  font-weight: bold;
  color: #8e18f6;
}
.content {
  padding-top: 0.6666rem;
  font-size: 0.4rem;

  color: #666666;
}
.content .content-all {
  width: 0.8rem;
  height: 0.8rem;
}
.content .content-foot {
  border-bottom: 0.02rem solid #dadada;
}

.active {
  color: #8e18f6;
}

</style>

