<template>
  <div class="home">
    <div class="nav">
      <nut-row>
        <nut-col :span="9">
          <div class="flex-content iconfont" @click="go">&#xe617;</div>
        </nut-col>
        <nut-col :span="5">
          <div class="flex-content flex-content-light nav-con">申请退票</div>
        </nut-col>
        <nut-col :span="5" :offset="5">
          <router-link :to="{ name: 'Manual' }">
            <div class="flex-content" style="color:black">退票须知</div>
          </router-link>
        </nut-col>
      </nut-row>
    </div>
    <div class="title">
      <p>若您已在车站办理退票,款项会在15个工作日内原路返回,请您耐心等待!</p>
    </div>
    <ul>
      <li class="content" v-for="ck of passagers">
        <div class="content-details">
          <nut-row type="flex">
            <nut-col span="2" :offset="1">
              <div class="flex-content">
                <input type="checkbox" :value="ck.orderNo" v-model="orderIds" class="one">
              </div>
            </nut-col>
            <nut-col :offset="1" :span="11">
              <div class="flex-content flex-content-light">
                <p>{{orderData.date}}</p>
                <p
                  style="margin-top:0.2rem;"
                >{{orderData.startStation}}---{{orderData.arriveStation}} {{orderData.trainNumber}}</p>
              </div>
            </nut-col>
            <nut-col :span="3" :offset="5">
              <div class="flex-content">{{ck.name}}</div>
            </nut-col>
          </nut-row>
        </div>
      </li>
    </ul>
    <div class="foot">
      <nut-row type="flex">
        <nut-col span="17" :offset="1">
          <div class="flex-content">
            <div class="foot-left">
              <p class="p1">预计退还金额</p>
              <p class="p2">以铁路部门实际退还为准</p>

              <p class="p3">火车票价</p>
              <p class="p3">预估手续费</p>
              <!-- <p class="p2">距离发车时间48小时至15天内,收取票价5%</p> -->
            </div>
          </div>
        </nut-col>
        <nut-col :span="2" :offset="2">
          <div class="flex-content">
            <div class="foot-right">
              <p class="p4">{{totalRemaind}}MS</p>
              <p class="p5">{{totalPayCash}}MS</p>
              <p class="p6">{{totalDeduction}}MS</p>
            </div>
          </div>
        </nut-col>
      </nut-row>
      <div class="sold"></div>
    </div>
    <div class="cause" @click="showCause=true">
      <nut-row type="flex">
        <nut-col span="6">
          <div class="flex-content">退票原因</div>
        </nut-col>
        <nut-col :span="8">
          <div class="flex-content flex-content-light cause-1">{{tpTip}}</div>
        </nut-col>
        <nut-col :span="1" :offset="9">
          <div class="flex-content iconfont">&#xe6c6;</div>
        </nut-col>
      </nut-row>
    </div>
    <div class="bot">
      <button @click="clickRefund()">申请退票</button>
    </div>

    <commonMsg v-show="showRefundView" :showCloseBtn="false">
      <div slot="message" class="refund_view">
        <h2>退票提交后无法撤销，请认真核对以下内容</h2>
        <p>
          <span>退款行程</span>
          <span>
            {{orderData.date}}
            <br>
            {{orderData.startStation}}---{{orderData.arriveStation}} {{orderData.trainNumber}}
          </span>
        </p>
        <p>
          <span>退款乘客</span>
          <span>{{allNames}}</span>
        </p>
        <p>
          <span>预计退款</span>
          <span class="pr">
            {{totalRemaind}}
            <sub>MS</sub>
          </span>
        </p>
        <div class="btns">
          <span @click="showRefundView= false">取消</span>
          <span class="confirm" @click="doRefund">自愿退票</span>
        </div>
      </div>
    </commonMsg>

    <transition name="fade">
      <cause v-if="showCause" @onClose="closeCause"></cause>
    </transition>
  </div>
</template>

<script>
import commonMsg from "@/common/Msg.vue";
import Cause from "./cause.vue";
import { mapMutations } from "vuex";
export default {
  name: "Refund",
  data() {
    return {
      showRefundView: false,
      showCause: false,
      orderData: {},
      passagers: [],
      checkbox1: false,
      orderIds: [],
      dictCode: "",
      remark: "",

      tpTip: "请选择退票原因"
    };
  },

  computed: {
    totalRemaind() {
      let rs = [];
      let n = 0;

      this.passagers.forEach(item => {
        if (this.orderIds.indexOf(item.orderNo) > -1) {
          rs.push(item.shouldRefundPrice);
        }
      });

      rs.forEach(item => {
        n += item;
      });

      return n;
    },

    allNames() {
      let rs = [];
      this.passagers.forEach(item => {
        if (this.orderIds.indexOf(item.orderNo) > -1) {
          rs.push(item.name);
        }
      });
      return rs.join(",");
    },

    totalDeduction() {
      return this.orderIds.length * this.orderData.simpleTicketRefundFree;
    },

    totalPayCash() {
      return this.totalRemaind + this.totalDeduction;
    },
    pid() {
      return this.$route.query.pid;
    },
    sid() {
      return this.$route.query.sid;
    }
  },
  components: { Cause, commonMsg },
  methods: {
    closeCause(b) {
      this.showCause = false;
      if (b) {
        if ("id" in b) {
          this.dictCode = b.id;
          this.tpTip = b.name;
        } else if ("remark" in b) {
          this.tpTip = b.remark;
        }
      }
    },
    getOrderDetail(pid) {
      this.$http
        .get(this.API.orderDetail, {
          params: { trainOrderNo: pid, isrefundTicket: 1 },
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          this.orderData = d.data;
          if (this.sid) {
            this.passagers = this.getOnePass(this.sid, d.data.passagers);
          } else {
            this.passagers = d.data.passagers;
          }
        });
    },
    getOnePass(sid, arr) {
      let newArr = arr.filter(item => {
        return item.orderNo === sid;
      });
      return newArr;
    },
    go() {
      this.$router.go(-1);
    },

    clickRefund() {
      if (this.orderIds.length > 0) {
        this.showRefundView = true;
      } else {
        this.changeShowAlert(true);
        this.changeAlertMsg("请选择订单");
      }
    },

    doRefund() {
      this.$http
        .get(this.API.refundTrainOrder, {
          params: {
            tradeOrderNo: this.pid,
            orderNos: this.orderIds.join(","),
            dictCode: this.dictCode,
            remark: this.remark
          },
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          this.showRefundView = false;
          if (d.returnCode === 1) {
            this.changeShowAlert(true);
            this.changeAlertMsg("退款成功");
            this.$router.push("/train/order");
          } else {
            this.changeShowAlert(true);
            this.changeAlertMsg("退款失败");
          }
        });
    },
    ...mapMutations(["changeShowAlert", "changeAlertMsg"])
  },
  mounted() {
    this.getOrderDetail(this.pid);
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  background: #f4f5f7;
  position: relative;
}
.nav {
  padding-top: 0.5666rem;
  margin-left: 0.7333rem;
}
.nav-con {
  font-weight: bold;
  font-size: 0.4rem;
  color: #8e18f6;
}
.title {
  margin-top: 00.32rem;
  height: 1.2rem;
  background: url(./../../../assets/img/qd.png) no-repeat;
  background-size: 100% 100%;
  color: white;
  line-height: 0.6rem;
}
.title p {
padding: 0 0.4rem;
  text-align: center
}
.content {
  height: 1.533rem;
  background: white;
  border-bottom: 0.02rem solid #f5f4f9;
}
.content .content-details {
  padding-top: 0.4rem;
}
.foot {
  height: 3.333rem;
  background: white;
  margin-top: 0.6rem;
  padding: 0.4rem;
  position: relative;
}
.sold {
  width: 9.2rem;
  position: absolute;
  top: 1.8rem;
  left: 0.4rem;
  border-bottom: 0.02rem solid #f5f4f9;
}
.foot .foot-left p {
  margin-top: 0.3rem;
}
.foot .foot-left p {
  margin-top: 0.3rem;
}
.foot .foot-left .p1 {
  font-size: 0.4rem;
}
.foot .foot-left .p2 {
  /* font-size: 0.2666rem; */
  color: #999999;
}
.foot .foot-left .p3 {
  font-size: 0.32rem;
  color: #666666;
}
.foot .foot-right p {
  margin-top: 0.3rem;
}
.foot .foot-right .p4 {
  font-size: 0.4rem;
  color: red;
}
.foot .foot-right .p5 {
  margin-top: 1rem;
  /* font-size: 0.2133rem; */
  color: red;
}
.foot .foot-right .p6 {
  /* font-size: 0.2133rem; */
  color: red;
}
.cause {
  height: 0.6rem;
  background: white;
  margin-top: 0.4rem;
  padding: 0.4rem;
  font-size: 0.4rem;
}
.cause-1 {
  color: #999999;
}
.bot button {
  background: url(./../../../assets/img/qd.png) no-repeat;
  background-size: 100% 100%;
  height: 1.3066rem;
  width: 100%;
  position: fixed;
  bottom: 1rem;
  color: white;
  font-size: 0.4rem;
}

.one {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #8e18f6;
}
.refund_view h2 {
  border-bottom: 1px #ddd solid;
  font-weight: bold;
  height: 1rem;
  line-height: 1rem;
}
.refund_view p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #ddd solid;
  height: 1rem;
  margin-bottom: 0.1rem;
}

.refund_view .pr {
  color: red;
}
.refund_view .btns {
  display: flex;
}
.refund_view .btns span {
  flex: 1;
  line-height: 1rem;
}
.refund_view .btns span.confirm {
  background-image: linear-gradient(left, #541bfe, #8e0fff);
  color: #fff;
  font-size: 0.42rem;
}
</style>

