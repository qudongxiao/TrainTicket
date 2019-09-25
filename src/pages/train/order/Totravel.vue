<template>
  <div class="home">
    <div class="aircraft" v-for="(item,index) in list">
      <div class="aircraft-title">
        <nut-row type="flex">
          <nut-col span="12">
            <div class="flex-content">{{item.orderTypeName}}</div>
          </nut-col>
          <nut-col :span="12" :offset="16">
            <div class="flex-content aircraft-title-1">{{item.stateName}}</div>
          </nut-col>
        </nut-row>
      </div>
      <div class="aircraft-con">
        <nut-row type="flex">
          <nut-col :offset="1" span="3">
            <div class="flex-content iconfont aircraft-con-1">&#xe678;</div>
          </nut-col>
          <nut-col :span="13">
            <router-link :to="{ name: 'OrderDetail',query: {pid: item.tradeNo} }">
              <div class="flex-content flex-content-light aircraft-con-2">
                <p>{{item.startStation}}---{{item.arriveStation}}</p>
                <p>车次: {{item.trainNo}}</p>
                <p>出发时间: {{item.startDate}}&nbsp;&nbsp;{{item.startTime}}</p>
              </div>
            </router-link>
          </nut-col>
          <nut-col :offset="2" :span="6">
            <div class="flex-content aircraft-con-3">{{item.totalPayPrice}} MS</div>
          </nut-col>
        </nut-row>
      </div>
      <div class="aircraft-foot">
        <router-link :to="{ name: 'Refund',query: {pid: item.tradeNo}  }">
          <button>退票</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Totravel",
  data() {
    return {
      list: []
    };
  },

  methods: {
    getOrderList() {
      this.$http
        .post(
          this.API.trainorder,
          {
            tabIndex: 2
          },
          {
            headers: {
              access_token: this.$store.state.accessToken
            }
          }
        )
        .then(resp => {
          const d = resp.data;
          this.list = d.data;
          console.log(d);
        });
    }
  },
  mounted() {
    this.getOrderList();
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  background: #f4f5f7;
}
.aircraft {
  height: 4.533rem;
  background: white;
  margin-top: 0.4rem;
}
.aircraft .aircraft-title {
  padding: 0.3733rem 0.4rem;
  
}
.aircraft .aircraft-title .aircraft-title-1 {
  color: red;
}
.aircraft .aircraft-con {
  height: 2.2rem;
  padding-top: 0.4rem;
  background: #f4f5f7;
}
.aircraft .aircraft-con .aircraft-con-1 {
  font-size: 0.6933rem;
  color: #8e18f6;
}
.aircraft .aircraft-con .aircraft-con-2 p:nth-child(1) {
  font-size: 0.3733rem;
}
.aircraft .aircraft-con .aircraft-con-2 p:nth-child(2) {
  /* font-size: 0.2933rem; */
  padding-top: 0.3733rem;
  color: #999999;
}
.aircraft .aircraft-con .aircraft-con-2 p:nth-child(3) {
  /* font-size: 0.2933rem; */
  padding-top: 0.1733rem;
  color: #999999;
}
.aircraft-foot {
  padding-top: 0.1rem;
}
.aircraft-foot button {
  float: right;
  width: 2.133rem;
  height: 0.6666rem;
  margin-right: 0.4rem;
  border-radius: 0.2rem;
  border: 0.02rem solid #999999;
  color: #999999;
  background: white;
}
.train {
  margin-top: 0.2133rem;
}
</style>
