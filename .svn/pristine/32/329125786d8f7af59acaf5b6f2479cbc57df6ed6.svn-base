<template>
  <div class="wrapper">
    <div class="navbar">
      <div class="back">
        <span class="iconfont" @click="goBack">&#xe617;</span>
      </div>
      <div class="title">填写订单</div>
      <div class="order" @click="toMyOrder">我的订单</div>
    </div>
    <div class="card">
      <div class="card_inner">
        <div>
          <p>
            <big>{{trainInfo.info.startTime}}</big>
          </p>
          <p>{{trainInfo.info.startStation}}</p>
          <p>{{this.$store.state._DATE_}}{{weekDay}}</p>
        </div>
        <div>
          <p>{{trainInfo.info.trainNumber}}</p>
          <img class="skb_img" src="./../../../assets/img/thim.png" alt>
          <p>{{trainInfo.info.runTime}}</p>
        </div>
        <div>
          <p>
            <big>{{trainInfo.info.arriveTime}}</big>
          </p>
          <p>{{trainInfo.info.arriveStation}}</p>
          <p>{{this.$store.state._DATE_}}{{weekDay}}</p>
        </div>
      </div>
    </div>

    <div class="passengers">
      <ul>
        <li v-for="item of nameList" :key="item.id">
          <h4>{{item.passengerName}}</h4>
          <h5>{{item.idcardNo}}</h5>
          <div class="iconfont del" @click="delPassenger(item.id)">&#xe644;</div>
        </li>
      </ul>
      <div class="btn">
        <p @click="showAddressBook= true">
          <i></i>
          <span>添加/修改乘客</span>
        </p>
      </div>
    </div>

    <div class="selectSeat" v-show="this.seatTable.length > 0">
      <div class="amount">已选{{selectedSeats.length}}/{{peopleNum}}个</div>
      <div class="seatslist">
        <ul class="row" v-for="(item,i) of seatTable" :key="i">
          <li v-for="(letter,j) of item" :key="j" @click="doSeat(i,letter)">
            <i :class="[letter,{active:selectedSeats.indexOf(i+letter)> -1}]"></i>
          </li>
        </ul>
      </div>
    </div>

    <!-- 保险 -->
    <div class="insurance">
      <h2>出行保障</h2>
      <h3>全程无忧 建议购买 (仅成人)</h3>
      <ul>
        <li
          :class="{active:item.insursID === insursID}"
          v-for="(item,index) of insure"
          :key="index"
          @click="clickInsure(item.insursID,item.insursFee)"
        >
          <div class="icon"></div>
          <p>{{item.insursDesc}}</p>
          <p>
            <span class="a">
              {{item.insursFee}}
              <sub>MS</sub>
            </span>
            <span class="b">X{{peopleNum}}份</span>
          </p>
        </li>
      </ul>
    </div>

    <div class="contact">
      <div class="row">
        <span>联系人</span>
        <input type="text" placeholder="请输入联系人姓名" v-model="contactName" autocomplete="off">
      </div>
      <div class="row">
        <span>手机号</span>
        <input type="text" placeholder="请输入联系方式" v-model="contactTel" autocomplete="off">
      </div>
    </div>
    <div class="agree">
      <p>
        <span :class="['chk', agree ? 'checked' : 'unchecked']" @click="switchAgree"></span>已阅读并同意
        <router-link :to="{ name: 'TrainText' }">《火车票信息服务协议》</router-link>
      </p>

      <!-- <p>
        <router-link to="/">
          <span>购票须知</span>
        </router-link>
        <router-link to="/">
          <span>在线客服</span>
        </router-link>
      </p>-->
    </div>

    <div class="tradeBar_wrap">
      <div class="tradeBar">
        <div class="total">
          <span>订单总额：</span>
          <span class="pr">
            {{totalPr}}
            <sub>MS</sub>
          </span>
          <span class="num">（共{{peopleNum}}人）</span>
        </div>
        <div class="btn">
          <span @click="doCreate">提交订单</span>
        </div>
      </div>
    </div>

    <commonMsg v-show="isOccupying" :showCloseBtn="false">
      <div slot="message" class="occupy-prview">
        <img class="pic" src="../../../assets/img/cg.png">
        <div class="inner">
          <p>
            <small>请确认火车票信息</small>
          </p>
          <p>
            <big>{{trainInfo.info.startStation}}——{{trainInfo.info.arriveStation}}</big>
          </p>
          <p>{{_DATE_}} {{weekDay}}</p>
          <p>{{trainInfo.info.trainNumber}} {{trainInfo.info.startTime}}发车</p>
          <p>
            <small>乘车人</small>
          </p>
          <p>{{passagerNames}}</p>
          <p>{{percentage}} 正在为您占座，请耐心等待...</p>
        </div>
      </div>
    </commonMsg>

    <commonMsg v-show="isOccSucc" @onClose="isOccSucc= false">
      <div slot="message" class="OccSucc">
        <img class="pic" src="../../../assets/img/right.png">
        <div class="inner">
          <div class="tit">占座成功</div>
          <ul v-for="(item,index) of SucInfo.passagers" :key="index">
            <li>{{item.name}}</li>
            <li>{{item.seatName}} {{item.carriageNo}} {{item.seatNo}}</li>
            <li>
              <big>
                {{item.payCash}}
                <sub>MS</sub>
              </big>
            </li>
          </ul>
          <div class="remark">
            <i class="iconfont">&#xe62c;</i>部分所选座位无票，已为您自助选择有票座位
          </div>

          <ul>
            <li>订单总价</li>
            <li>
              <big>
                {{SucInfo.totalPayCash}}
                <sub>MS</sub>
              </big>
            </li>
          </ul>
          <div class="btn" @click="showPaymenting">去付款</div>
        </div>
      </div>
    </commonMsg>

    <commonMsg v-show="isPaymenting" @onClose="isPaymenting= false;payCode=''">
      <div slot="message" class="payment">
        <div class="tit">请输入支付密码</div>
        <div class="pr">
          {{totalPr}}
          <sub>MS</sub>
        </div>
        <input
          ref="realPwd"
          type="number"
          maxlength="6"
          v-model="payCode"
          style="position: absolute;z-index: -1;left:-100%;opacity: 0"
        >
        <div class="pwd" @click="setFocusReal">
          <ul>
            <li>
              <i v-if="this.payCodeLength > 0">●</i>
            </li>
            <li>
              <i v-if="this.payCodeLength > 1">●</i>
            </li>
            <li>
              <i v-if="this.payCodeLength > 2">●</i>
            </li>
            <li>
              <i v-if="this.payCodeLength > 3">●</i>
            </li>
            <li>
              <i v-if="this.payCodeLength > 4">●</i>
            </li>
            <li>
              <i v-if="this.payCodeLength > 5">●</i>
            </li>
          </ul>
        </div>
      </div>
    </commonMsg>

    <commonMsg v-show="isPaySucc" @onClose="isPaySucc= false">
      <div slot="message" class="paySucc">
        <div class="inner">
          <p>支付成功</p>
          <button @click="viewOrder">查看订单</button>
        </div>
      </div>
    </commonMsg>

    <transition name="rollUp" mode="out-in">
      <AddressBook v-if="showAddressBook" :list="allPassenger" @close="showAddressBook= false"></AddressBook>
    </transition>
  </div>
</template>

<script>
import commonMsg from "@/common/Msg.vue";
import AddressBook from "@/common/AddressBook";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      agree: true,
      isOccupying: false,
      isOccSucc: false,
      isPaymenting: false,
      showAddressBook: false,
      isPaySucc: false,
      selectedSeats: [],
      insure: [],
      serviceFee: 0,
      insursID: "",
      insursFee: 0,
      contactName: "",
      contactTel: "",
      allPassenger: [],
      percentage: "0%",
      payCode: "",
      payCodeLength: 0,
      mainOrderId: "",
      SucInfo: {}
    };
  },
  components: { AddressBook, commonMsg },
  computed: {
    chooseSeats() {
      let str = this.selectedSeats.join("");
      return str.replace(/1/g, "2").replace(/0/g, "1");
    },
    passagerIDs() {
      let arr = [];
      this.nameList.forEach(item => {
        arr.push(item.id);
      });
      return arr.join(",");
    },
    passagerNames() {
      let arr = [];
      this.nameList.forEach(item => {
        arr.push(item.passengerName);
      });
      return arr.join(",");
    },
    peopleNum() {
      return this.nameList.length;
    },
    isHigh() {
      return /^(D|G)/.test(this.trainInfo.info.trainNumber);
    },
    seatTable() {
      if (this.peopleNum === 0) {
        return [];
      }
      if (this.isHigh === false) {
        return [];
      }
      const seat = this.trainInfo.seat;
      if (seat === "商务座") {
        if (this.peopleNum > 1) {
          return [
            ["Z", "A", "C", "X", "F", "Z"],
            ["Z", "A", "C", "X", "F", "Z"]
          ];
        } else {
          return [["Z", "A", "C", "X", "F", "Z"]];
        }
      } else if (seat === "一等座") {
        if (this.peopleNum > 1) {
          return [
            ["Z", "A", "C", "X", "D", "F", "Z"],
            ["Z", "A", "C", "X", "D", "F", "Z"]
          ];
        } else {
          return [["Z", "A", "C", "X", "D", "F", "Z"]];
        }
      } else if (seat === "二等座") {
        if (this.peopleNum > 1) {
          return [
            ["Z", "A", "B", "C", "X", "D", "F", "Z"],
            ["Z", "A", "B", "C", "X", "D", "F", "Z"]
          ];
        } else {
          return [["Z", "A", "B", "C", "X", "D", "F", "Z"]];
        }
      }
    },
    totalPr() {
      return (
        (this.serviceFee + this.trainInfo.price + this.insursFee) *
        this.peopleNum
      );
    },

    weekDay() {
      return this.Util.Week(this.Util.toDate(this.$store.state._DATE_));
    },
    ...mapState([
      "startCity",
      "endCity",
      "_DATE_",
      "HSR",
      "MinDate",
      "MaxDate",
      "trainInfo",
      "nameList",
      "publicKey"
    ])
  },
  watch: {
    payCode(curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.payCode = this.payCode.replace(/[^\d]/g, "");
      } else {
        this.payCodeLength = curVal.length;

        if (this.payCodeLength === 6) {
          this.doPayment();
        }
      }
    }
  },
  methods: {
    switchAgree() {
      this.agree = !this.agree;
    },
    viewOrder() {
      this.$router.push({
        path: "/Train/OrderDetail",
        query: { pid: this.mainOrderId }
      });
    },
    showPaymenting() {
      this.isOccSucc = false;
      this.isPaymenting = true;
    },
    setFocusReal() {
      this.$refs.realPwd.focus();
    },
    doSeat(a, b) {
      if (b === "Z" || b === "X") {
        return false;
      }
      let index = this.selectedSeats.indexOf(a + b);
      if (index > -1) {
        this.selectedSeats.splice(index, 1);
        this.selectedSeats.sort();
      } else {
        if (this.selectedSeats.length < this.peopleNum) {
          this.selectedSeats.push(a + b);
          this.selectedSeats.sort();
        }
      }
      console.log("selectedSeats", this.selectedSeats);
    },

    delPassenger(pid) {
      let arr = this.nameList.filter(item => {
        return item.id !== pid;
      });
      this.changeNameList(arr);
      this.selectedSeats.pop();
    },

    getAllPassenger() {
      this.$http
        .get(this.API.AllPassenger, {
          params: {},
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          if (d.returnCode === 1) {
            this.allPassenger = d.data;
          }
        });
    },
    doPayment() {
      // console.log(this.payCode);
      // console.log(this.encryptedData(this.publicKey, this.payCode));

      let paypwd = this.encryptedData(this.publicKey, this.payCode);

      this.$http
        .post(
          this.API.payTrainOrder,
          {
            trainOrderNo: this.mainOrderId,
            paymentPassword: paypwd,
            paymentTotalPrice: this.totalPr
          },
          {
            headers: {
              access_token: this.$store.state.accessToken
            }
          }
        )
        .then(resp => {
          const d = resp.data;
          if (d.returnCode === 1) {
            this.isPaymenting = false;
            this.payCode = "";
            this.isPaySucc = true;
          } else {
            this.changeShowAlert(true);
            this.changeAlertMsg(d.returnMessage);
          }
        });
    },
    encryptedData(publicKey, data) {
      let encryptor = new JSEncrypt();
      encryptor.setPublicKey(publicKey);
      return encryptor.encrypt(data);
    },
    getOccSucc() {
      this.$http
        .get(this.API.orderDetail, {
          params: { trainOrderNo: this.mainOrderId },
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          this.SucInfo = d.data;
        });
    }, //SucInfo
    getOrderState() {
      this.$http
        .get(this.API.OrderNewState, {
          params: { trainOrderNo: this.mainOrderId },
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const that = this;
          const d = resp.data;
          if (d.returnCode === 1 && d.data) {
            this.percentage = d.data.percentage;
            if (d.data.tradeState === 2) {
              clearInterval(this.TIME1);
              setTimeout(function() {
                that.isOccupying = false;
                that.percentage = "0%";
                that.isOccSucc = true;
                that.getOccSucc(); //SucInfo
              }, 2000);
            } else if (d.data.tradeState === 9) {
              this.isOccupying = false;
              this.percentage = "0%";
              clearInterval(this.TIME1);
              this.changeShowAlert(true);
              this.changeAlertMsg("订单被动取消");
            }
          }
        });
    },

    getTicketFeeInfo() {
      this.$http
        .get(this.API.TicketFeeInfo, {
          params: {},
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          if (d.returnCode === 1) {
            this.serviceFee = d.data.serviceFee;
            this.insure = d.data.trainInsursInfo;
          }
        });
    },

    doCreate() {
      if (this.peopleNum === 0) {
        this.changeShowAlert(true);
        this.changeAlertMsg("请选择乘客");
        return false;
      }

      if (
        /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/.test(
          this.contactName
        ) === false
      ) {
        this.changeShowAlert(true);
        this.changeAlertMsg("请正确填写联系人");
        return false;
      }

      if (/\d{11}/.test(this.contactTel) === false) {
        this.changeShowAlert(true);
        this.changeAlertMsg("请正确填写手机号");
        return false;
      }

      if (this.agree === false) {
        this.changeShowAlert(true);
        this.changeAlertMsg("请同意服务协议");
        return false;
      }

      this.$http
        .post(
          this.API.createTrainOrder,
          {
            startStation: this.trainInfo.info.startStation,
            arriveStation: this.trainInfo.info.arriveStation,
            date: this._DATE_,
            trainNumber: this.trainInfo.info.trainNumber,
            runTime: this.trainInfo.info.runTime,
            startTime: this.trainInfo.info.startTime,
            arriveTime: this.trainInfo.info.arriveTime,
            contactName: this.contactName,
            contactTel: this.contactTel,
            passagerIDs: this.passagerIDs,
            seatName: this.trainInfo.seat,
            itemIdInsur: this.insursID,
            chooseSeats: this.chooseSeats
          },
          {
            headers: {
              access_token: this.$store.state.accessToken
            }
          }
        )
        .then(resp => {
          const d = resp.data;
          if (d.returnCode === 1) {
            const that = this;
            this.isOccupying = true;
            this.mainOrderId = d.data.ticketTradeOrder.tradeNo;
            this.TIME1 = setInterval(function() {
              that.getOrderState();
            }, 2000);
          } else {
            this.changeShowAlert(true);
            this.changeAlertMsg(d.returnMessage);
          }
        });
    },
    goBack() {
      this.$router.go(-1);
    },

    clickInsure(id, fee) {
      this.insursFee = this.insursFee === fee ? 0 : fee;
      this.insursID = this.insursID === id ? "" : id;
    },

    ...mapMutations([
      "changeDate",
      "changeTrainInfo",
      "changeNameList",
      "changeShowAlert",
      "changeAlertMsg"
    ]),
    toMyOrder() {
      this.$router.push("/train/order");
    }
  },
  destroyed() {
    if (this.TIME1) clearInterval(this.TIME1);
  },
  mounted() {
    this.getTicketFeeInfo();
    this.getAllPassenger();
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  position: Relative;
}
.navbar {
  position: relative;
  line-height: 0.92rem;
  background-color: white;
}
.navbar .back {
  position: absolute;
  left: 0;
  top: 0;
  width: 0.92rem;
  text-align: center;
}
.navbar .back .iconfont {
  font-size: 0.42rem;
}
.navbar .order {
  position: absolute;
  right: 0.3rem;
  top: 0;
}
.navbar .title {
  text-align: center;
  font-size: 0.4rem;
  font-weight: bold;
  color: blueviolet;
}

.card {
  background-color: #f4f5f7;
  overflow: hidden;
  color: #fff;
}

.card_inner {
  margin: 0.32rem;
  padding: 0.24rem 0;
  background: url(./../../../assets/img/co.png) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card_inner > div {
  flex: 1;
  text-align: center;
}

.card_inner p {
  margin: 0.124rem 0;
}
.card_inner p big {
  font-size: 150%;
}
.card_inner .skb_img {
  max-width: 2.72rem;
}

.passengers {
  margin: 0.24rem;
}
.passengers li {
  border-bottom: 1px #ddd dashed;
  position: relative;
  padding: 0.24rem 0;
}
.passengers li h4 {
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  font-size: 0.4rem;
}
.passengers li h5 {
  padding-left: 0.2rem;
}
.passengers li .del {
  position: absolute;
  right: 0.2rem;
  top: 0.5rem;
  font-size: 0.46rem;
}

.passengers .btn {
  text-align: center;
}
.passengers .btn p {
  padding: 0.4rem 0;
  font-size: 0.4rem;
  line-height: 0.56rem;
}
.passengers .btn i {
  display: inline-block;
  width: 0.56rem;
  height: 0.56rem;
  background: url(../../../assets/img/add1.png) no-repeat;
  background-size: contain;
  margin-right: 0.2rem;
  vertical-align: middle;
}

.passengers .btn span {
  display: inline-block;
  vertical-align: middle;
}

.selectSeat {
  background-color: #f4f5f7;
  padding: 0.4rem;
}
.selectSeat .amount {
  text-align: right;
  margin-bottom: 0.4rem;
}

.seatslist .row {
  display: flex;
}
.seatslist .row li {
  flex: 1;
  text-align: center;
  padding-bottom: 0.25rem;
}
.seatslist .row li i {
  display: inline-block;
  width: 0.8533rem;
  height: 0.76rem;
  line-height: 0.76rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.seatslist .row li i.X::before {
  content: "\8fc7\9053";
}
.seatslist .row li i.Z::before {
  content: "\7a97";
}
.seatslist .row li i.A {
  background-image: url(../../../assets/img/A0.png);
}
.seatslist .row li i.A.active {
  background-image: url(../../../assets/img/A1.png);
}
.seatslist .row li i.B {
  background-image: url(../../../assets/img/B0.png);
}
.seatslist .row li i.B.active {
  background-image: url(../../../assets/img/B1.png);
}
.seatslist .row li i.C {
  background-image: url(../../../assets/img/C0.png);
}
.seatslist .row li i.C.active {
  background-image: url(../../../assets/img/C1.png);
}
.seatslist .row li i.D {
  background-image: url(../../../assets/img/D0.png);
}
.seatslist .row li i.D.active {
  background-image: url(../../../assets/img/D1.png);
}
.seatslist .row li i.F {
  background-image: url(../../../assets/img/F0.png);
}
.seatslist .row li i.F.active {
  background-image: url(../../../assets/img/F1.png);
}

.insurance {
  margin: 0.25rem;
}
.insurance h2 {
  padding-bottom: 0.2rem;
  font-size: 0.42rem;
}
.insurance h3 {
  padding-bottom: 0.4rem;
  color: #999;
}
.insurance ul {
  display: flex;
  justify-content: space-between;
}
.insurance li {
  border: 1px #bbb solid;
  padding: 0.12rem;
  border-radius: 0.12rem;
  margin: 0 0.1rem;
}
.insurance li .icon {
  margin-top: 0.3rem;
  float: left;
  width: 0.3rem;
  height: 0.3rem;
  border: 1px #bbb solid;
  position: relative;
}

.insurance li.active .icon::before {
  position: absolute;
  top: 0.04rem;
  left: 0.04rem;
  content: "";
  width: 0.22rem;
  height: 0.22rem;
  display: block;

  background-color: #8e0fff;
}
.insurance li p {
  line-height: 0.6rem;
  margin-left: 0.5rem;
}
.insurance li p .a {
  color: #8e0fff;
}
.insurance li p .b {
  color: #999;
}
.contact {
  margin: 0.3rem;
}
.contact .row {
  display: flex;
  align-items: center;
  height: 0.9rem;
  border-bottom: 1px #ddd solid;
}

.contact span {
  min-width: 1.6rem;

  text-align: center;
}
.contact [type="text"] {
  flex: 1;

  padding-left: 0.4rem;
  height: 100%;
}
.agree {
  padding: 0.2rem 0.4rem;
  background-color: #f4f5f7;
}
.agree p {
  line-height: 0.7rem;
}
.agree p span {
  display: inline-block;
}
.agree .chk {
  width: 0.32rem;
  height: 0.32rem;
  border: 1px #ddd solid;
  margin-right: 0.1rem;
}
.agree .chk.checked {
  background: url(../../../assets/img/checked.png) no-repeat;
  background-size: contain;
}
.tradeBar_wrap {
  height: 1.2rem;
}
.tradeBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  height: 1.2rem;
  line-height: 1.2rem;
}
.tradeBar .total {
  padding-left: 0.4rem;
  float: left;
}
.tradeBar .total .pr {
  color: red;
  font-size: 0.5rem;
}
.tradeBar .total .num {
  color: #999;
}
.tradeBar .btn {
  float: right;
  width: 3.1rem;
}
.tradeBar .btn span {
  display: block;
  background-image: linear-gradient(left, #541bfe, #8e0fff);
  color: #fff;
  font-size: 0.48rem;
  text-align: center;
}

.OccSucc {
  position: relative;
  padding: 0.7rem 0.2rem 0.2rem 0.2rem;
}
.OccSucc .tit {
  color: #8e0fff;
  font-size: 0.42rem;
  padding-bottom: 0.25rem;
}

.OccSucc .pic {
  position: absolute;
  width: 1.1rem;
  left: 50%;
  top: -0.7rem;
  transform: translateX(-50%);
}
.OccSucc .inner {
  position: relative;
}

.OccSucc ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.OccSucc ul li {
  padding: 0.2rem 0;
}

.OccSucc .remark {
  border-bottom: 1px #ddd dashed;
  text-align: left;
  padding: 0.2rem 0;
  color: #999;
  font-size: 0.32rem;
}

.OccSucc .remark i {
  color: #8e0fff;
  margin-right: 0.1rem;
  font-size: 0.36rem;
}

.OccSucc big {
  color: red;
  font-size: 111%;
}
.OccSucc .btn {
  background-image: linear-gradient(left, #541bfe, #8e0fff);
  color: #fff;
  font-size: 0.42rem;
  border-radius: 0.1rem;
  padding: 0.2rem;
}

.paySucc .inner {
  padding: 0.3rem 0;
}
.paySucc .inner p {
  margin-top: 0.1rem;
  margin-bottom: 0.4rem;
}
.paySucc .inner button {
  background-color: #8e0ffe;
  color: #fff;
  border-radius: 0.12rem;
  padding: 0.1rem 0.4rem;
  line-height: normal;
}
.occupy-prview {
  position: relative;
}
.occupy-prview .pic {
  position: absolute;
  width: 3rem;
  left: 0.1rem;
  top: -1.1rem;
}
.occupy-prview .inner {
  position: relative;
}
.occupy-prview p {
  padding: 0.15rem;
}
.occupy-prview small {
  color: #999;
}
.occupy-prview big {
  color: #000;
  font-size: 126%;
}
.occupy-prview i.loading {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url(../../../assets/img/loading1.gif) no-repeat;
  background-size: contain;
}
.payment {
  padding: 0.4rem 0.2rem;
}
.payment .tit {
  margin-bottom: 0.3rem;
}
.payment .pr {
  font-size: 0.56rem;
  color: #8e0fff;
  margin-bottom: 0.4rem;
}
.payment .pwd ul {
  display: flex;
  border: 1px #ddd solid;
  align-items: center;
  height: 1rem;
}
.payment .pwd li {
  flex: 1;
  height: 0.4rem;
}
.payment .pwd li:not(:last-child) {
  border-right: 1px #ddd solid;
}
</style>
