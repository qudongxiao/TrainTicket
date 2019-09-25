<template>
  <div class="home">
    <div class="nav">
      <nut-row :gutter="10">
        <nut-col :span="9">
          <div class="flex-content">
            <span class="iconfont" @click="go">&#xe617;</span>
          </div>
        </nut-col>
        <nut-col :span="8">
          <div class="flex-content flex-content-light title">我的订单</div>
        </nut-col>
      </nut-row>
    </div>
    <!-- 1 -->
    <div class="header" v-if="cg1">
      <nut-row type="flex">
        <nut-col span="10" :offset="1">
          <div class="flex-content">正在预定出票中</div>
        </nut-col>
        <nut-col :span="6" :offset="5">
          <div class="flex-content header-1">
            {{order.totalPayCash}} MS
            <span
              class="iconfont"
              @click="goPriceDetail(order.tradeNo)"
            >&#xe6c6;</span>
            <span class="one1">价格明细</span>
          </div>
        </nut-col>
      </nut-row>
      <p>请凭购票时有效证件到火车站或者代售点取票</p>
      <button @click="back()">返回</button>
    </div>
    <!-- 2 -->
    <div class="header" v-if="cg2">
      <nut-row type="flex">
        <nut-col span="10" :offset="1">
          <div class="flex-content">出票成功</div>
        </nut-col>
        <nut-col :span="6" :offset="5">
          <div class="flex-content header-1">
            {{order.totalPayCash}} MS
            <span
              class="iconfont"
              @click="goPriceDetail(order.tradeNo)"
            >&#xe6c6;</span>
            <span class="one1">价格明细</span>
          </div>
        </nut-col>
      </nut-row>
      <p>请凭购票时有效证件到火车站或者代售点取票</p>
      <button @click="tui(order.tradeNo)">退票</button>
    </div>
    <!-- 3 -->
    <div class="header" v-if="cg3">
      <nut-row type="flex">
        <nut-col span="10" :offset="1">
          <div class="flex-content">预定完成、待支付</div>
        </nut-col>
        <nut-col :span="6" :offset="5">
          <div class="flex-content header-1">
            {{order.totalPayCash}} MS
            <span
              class="iconfont"
              @click="goPriceDetail(order.tradeNo)"
            >&#xe6c6;</span>
            <span class="one1">价格明细</span>
          </div>
        </nut-col>
      </nut-row>
      <p>请凭购票时有效证件到火车站或者代售点取票</p>
      <button @click="confirmCancle(order.tradeNo)">取消订单</button>
    </div>
    <!-- 4 -->
    <div class="header" v-if="cg4">
      <nut-row type="flex">
        <nut-col span="10" :offset="1">
          <div class="flex-content">{{cancleOrderTip}}</div>
        </nut-col>
        <nut-col :span="6" :offset="5">
          <div class="flex-content header-1">
            {{order.totalPayCash}} MS
            <span
              class="iconfont"
              @click="goPriceDetail(order.tradeNo)"
            >&#xe6c6;</span>
            <span class="one1">价格明细</span>
          </div>
        </nut-col>
      </nut-row>
      <p>请凭购票时有效证件到火车站或者代售点取票</p>
      <button @click="deleteOrder(order.tradeNo)">删除订单</button>
    </div>
    <!-- 5 -->
    <div class="header" v-if="cg5">
      <nut-row type="flex">
        <nut-col span="10" :offset="1">
          <div class="flex-content">有退款</div>
        </nut-col>
        <nut-col :span="6" :offset="5">
          <div class="flex-content header-1">
            {{order.totalPayCash}} MS
            <span
              class="iconfont"
              @click="goPriceDetail(order.tradeNo)"
            >&#xe6c6;</span>
            <span class="one1">价格明细</span>
          </div>
        </nut-col>
      </nut-row>
      <p>请凭购票时有效证件到火车站或者代售点取票</p>
      <button @click="deleteOrder(order.tradeNo)">删除订单</button>
    </div>
    <div class="particulars">
      <div class="particulars-top">
        <div class="one">
          <p>{{order.startStation}}</p>
          <p>{{order.startTime}}</p>
          <p>{{order.date}}</p>
        </div>
        <div class="two">
          <p>{{order.trainNumber}}</p>
          <img src="./../../../assets/img/thim.png" alt>
          <p>{{order.runTime}}</p>
        </div>
        <div class="three">
          <p>{{order.arriveStation}}</p>
          <p>{{order.arriveTime}}</p>
          <p>{{order.date}}</p>
        </div>
      </div>
      <div class="particulars-bot" v-for="ck of order.passagers">
        <nut-row>
          <nut-col :span="16">
            <div class="flex-content particulars-left">
              <p>{{ck.name}}</p>
              <p>身份证:{{ck.identityCard}}</p>
              <p class="txt">{{ck.stateName}}</p>
              <button class="nwetp" @click="goRefund(order.tradeNo,ck.orderNo)" v-if="ck.state === 1 ">退款</button>
            </div>
          </nut-col>
          <nut-col :span="8">
            <div class="flex-content flex-content-light particulars-right">
              <p>{{ck.seatName}}</p>
              <p>{{ck.carriageNo}}{{ck.seatNo}}</p>
            </div>
          </nut-col>
        </nut-row>
      </div>
    </div>
    <div class="notice">
      <span class="notice-left">退票须知</span>
      <router-link :to="{ name: 'Manual' }">
        <span class="notice-right iconfont">详情 &#xe6c6;</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetail",
  data() {
    return {
      cg1: false,
      cg2: false,
      cg3: false,
      cg4: false,
      cg5: false,
      order: {},
      priceDetail: {},
      cancleOrderTip: "已取消预订"
    };
  },
  methods: {
    goRefund(pid,sid) {
      this.$router.push({
        path: "/Train/Refund",
        query: { pid: pid,sid:sid }
      });
    },
    go() {
      this.$router.go(-1);
    },

    goPriceDetail(tradeNo) {
      this.$router.push({
        path: "/Train/Price",
        query: { tradeNo: tradeNo, priceDetail: this.priceDetail }
      });
    },
    getOrderDetail(orderId) {
      this.$http
        .get(this.API.orderDetail, {
          params: { trainOrderNo: orderId, isrefundTicket: 0 },
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          this.order = d.data;

          this.priceDetail.totalPrice = this.order.totalPayCash;
          this.priceDetail["passagersNum"] = this.order.passagers.length;
          this.priceDetail["serviceFree"] = this.order.passagers[0].otherFee;
          this.priceDetail["ticketPrice"] = this.order.passagers[0].ticketPrice;
          this.priceDetail["ticketPayCash"] = this.order.passagers[0].payCash;
          this.priceDetail["ticketInsursInfo"] =
            this.order.passagers[0].ticketInsursInfo == null
              ? 0
              : this.order.passagers[0].ticketInsursInfo.facePrice;
          if (this.order.state == 0) {
            this.cg1 = true;
          } else if (this.order.state == 1) {
            this.cg2 = true;
          } else if (this.order.state == 2) {
            this.cg3 = true;
          } else if (this.order.state == 9) {
            this.cg4 = true;
            if (d.returnCode == -1) {
              // 订单超时自动取消
              this.cancleOrderTip = d.returnMessage;
            }
          } else if (this.order.state == 8) {
            this.cg5 = true;
          }
        });
    },
    tui(tradeNo) {
      this.$router.push({
        name: "Refund",
        query: {pid: tradeNo}
      });
    },
    cancelTrainOrder(orderId) {
      // 取消
      var that = this;
      this.$http
        .get(this.API.cancelTrainOrder + "/" + orderId, {
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          // const d = resp.data;
          // this.order= d.data;
          console.log(resp.data);
          that.$router.go(0);
          // this.tradeNo = this.order.tradeNo;
        });
    },
    confirmCancle(tradeNo) {
      var that = this;
      this.$dialog({
        id: "my-dialog",
        title: "确定取消此订单？",
        onOkBtn(event) {
          this.close(); //关闭对话框
          that.cancelTrainOrder(tradeNo);
        },
        onCancelBtn(event) {
          //取消按钮点击事件，默认行为关闭对话框
          // alert("cancelBtn");
          //return false;  //阻止默认“关闭对话框”的行为
        }
      });
    },
    deleteTrainOrder(orderId) {
      //删除
      var that = this;
      this.$http
        .get(this.API.deleteTrainOrder + "/" + orderId, {
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          that.back(); // 返回上一层
        });
    },
    deleteOrder(tradeNo) {
      var that = this;
      this.$dialog({
        id: "my1-dialog",
        title: "确定删除此订单？",
        onOkBtn(event) {
          this.close(); //关闭对话框
          that.deleteTrainOrder(tradeNo);
        },
        onCancelBtn(event) {
          //取消按钮点击事件，默认行为关闭对话框
          this.close();
        }
      });
    },
    back() {
      this.$router.go(-1); //返回上一层
    }
  },
  mounted() {
    this.getOrderDetail(this.$route.query.pid);
  }
};
</script>

<style scoped>
.home {
  min-height: 100%;
  background: #f4f5f7;
  position: relative;
  /* overflow: hidden; */
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
.header {
  height: 3.066rem;
  background: white;
  margin-top: 0.1466rem;
  padding: 0.4rem;
  font-size: 0.4533rem;
}
.header .header-1 {
  height: 1rem;
  color: red;
}
.header .header-1 span:nth-child(1) {
  color: black;
  padding-top: 0.5rem;
}
.header .header-1 span.one1{
  color: #999999;
  font-size: 0.36rem;
  display:block;
}
.header p {
  padding: 0.3rem 0.2933rem;
  font-size: 0.3333rem;
  color: #666666;
}
.header button {
  width: 9.2rem;
  height: 0.92rem;
  border-radius: 0.2rem;
  background: white;
  border: 0.02rem solid #8e18f6;
  color: #8e18f6;
}
.particulars {
  padding-left: 0.3733rem;
  position: relative;
}
.particulars .particulars-top {
  position: relative;
  width: 9.2rem;
  height: 2.8rem;
  margin-top: 0.4933rem;
  background: url(./../../../assets/img/co.png) no-repeat;
  background-size: 100% 100%;
}
.particulars .particulars-top .one {
  position: absolute;
  width: 2.1rem;
  height: 1.84rem;
  padding: 0.4rem;
  /* font-size: 0.2666rem; */
  color: white;
}
.particulars .particulars-top .one p:nth-child(2) {
  font-weight: bold;
  margin: 0.24rem 0;
  font-size: 0.533rem;
}
.particulars .particulars-top .two {
  position: absolute;
  top: 0;
  left: 2.5rem;
  height: 1.84rem;
  /* font-size: 0.2666rem; */
  padding: 0.4rem 0.2rem;
  color: white;
}
.particulars .particulars-top .two img {
  margin: 0.24rem 0;
  height: 0.6rem;
}
.particulars .particulars-top .two p {
  margin-left: 1rem;
}
.particulars .particulars-top .three {
  position: absolute;
  top: 0;
  left: 6.5rem;
  width: 1.8rem;
  height: 1.84rem;
  padding-top: 0.4rem;
  margin-left: 0.2rem;
  /* font-size: 0.2666rem; */
  color: white;
}
.particulars .particulars-top .three p:nth-child(2) {
  font-weight: bold;
  margin: 0.24rem 0;
  font-size: 0.533rem;
}
.particulars .particulars-top .three p:nth-child(3) {
  margin: 0.24rem 0;
  width: 2.2rem;
}
.particulars .particulars-top .foot {
  position: absolute;
  left: 1rem;
  top: 3.5rem;
  width: 8.18rem;
  height: 0.76rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.4rem;
  text-align: center;
  line-height: 0.76rem;
  color: white;
}
.particulars-bot {
  margin-top: 0.4rem;
  width: 9.2rem;
  /* height: 3rem; */
  background: white;
  border-radius: 0.2rem;
}
.particulars-bot .particulars-left {
  padding: 0.4rem;
}
.particulars-bot .particulars-left p {
  padding: 0.2rem;
  /* font-size: 0.26rem; */
}
.particulars-bot .particulars-left .txt {
  color: red;
}
.particulars-bot .particulars-right {
  padding-top: 0.2rem;
}
.particulars-bot .particulars-right p {
  padding: 0.2rem;
  /* font-size: 0.26rem; */
}
.particulars-bot .particulars-right button {
  width: 2.1866rem;
  height: 0.8rem;
  border-radius: 0.2rem;
  background: white;
  border: 0.02rem solid #8e18f6;
  color: #8e18f6;
}
.notice {
  position: relative;
  margin-top: 0.4rem;
  height: 1.3333rem;
  background: white;
  /* font-size: 0.28rem; */
  color: #999999;
}
.notice .notice-left {
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
}
.notice .notice-right {
  position: absolute;
  top: 0.4rem;
  right: 0.6rem;
}
.question {
  position: relative;
  margin-top: 0.7rem;
  height: 2.3333rem;
  background: white;
  /* font-size: 0.28rem; */
  color: #999999;
}
.question .question-left {
  margin: 0.46rem 0.4rem;
  float: left;
}
.question .question-right {
  margin: 0.46rem 0.4rem;
  float: right;
}
.question .question-but1 {
  position: absolute;
  top: 1.2rem;
  right: 0.4rem;
  width: 4rem;
  height: 0.7333rem;
  border-radius: 0.2rem;
}
.question .question-but2 {
  position: absolute;
  top: 1.2rem;
  left: 0.4rem;
  width: 4rem;
  height: 0.7333rem;
  border-radius: 0.2rem;
}
.nut-dialog-btn {
  background: #8e18f6 !important;
}

.nwetp {
  position: relative;
  top: -0.8rem;
  left: 6rem;
  width: 1.5rem;
  height: 0.6rem;
  color: white;
  border-radius: 0.2rem;
  background: #8e18f6;
}
</style>

