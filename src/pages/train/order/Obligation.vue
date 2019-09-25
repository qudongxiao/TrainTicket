<template>
  <div class="home">
    <div class="aircraft" v-for="(item,index) in list" :key="index">
      <div class="aircraft-title">
        <nut-row type="flex">
          <nut-col span="12">
            <div class="flex-content">{{item.orderTypeName}}</div>
          </nut-col>
          <nut-col :span="15" :offset="14">
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
        <button @click="showPayment(item.tradeNo,item.totalPayPrice)">立即付款</button>
        <!-- <router-link :to="{ name: 'Cause' }"> -->
        <!-- <button>取消订单</button> -->
        <!-- </router-link> -->
      </div>
    </div>
    

<!--支付 密码输入框-->
    <commonMsg v-show="isPaymenting" @onClose="isPaymenting= false;payCode=''">
      <div slot="message" class="payment">
        <div class="tit">支付密码</div>
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
  </div>
</template>

<script>
import commonMsg from "@/common/Msg.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Obligation",
  data() {
    return {
      orderNo:'',
      payCode: "",
      payCodeLength: 0,
      totalPr:0,
      mainOrderId: "",
      isPaymenting:false,
      pass: "",
      list: []
    };
  },
  components: { commonMsg },
  computed:{
    ...mapState([
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
    doPayment() {
      // console.log(this.payCode);
      // console.log(this.encryptedData(this.publicKey, this.payCode));

      let paypwd = this.encryptedData(this.publicKey, this.payCode);
      this.isPaymenting = false;
      this.payCode = "";
      this.$http
        .post(
          this.API.payTrainOrder,
          {
            trainOrderNo: this.orderNo,
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
            this.changeShowAlert(true);
            this.changeAlertMsg(d.returnMessage);
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
    showPayment(no,pr){
      this.isPaymenting= true
      console.log(pr)
      this.orderNo= no
      this.totalPr= pr
    },
    setFocusReal() {
      this.$refs.realPwd.focus();
    },
    getOrderList() {
      this.$http
        .post(
          this.API.trainorder,
          {
            tabIndex: 3
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
    },
    pay() {
      // this.pass=true;
      // this.$rout
    },
    off() {
      this.pass = false;
    },
    ...mapMutations([
      "changeShowAlert",
      "changeAlertMsg"
    ]),
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
/* 输入密码 */
.password-cont {
  width: 8.5rem;
  height: 6rem;
  position: absolute;
  top: 50%;
  left: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 20;
  padding: 0.4rem;
  border-radius: 0.2rem;
}
.password-cont .off {
  position: absolute;
  top: 0.4rem;
  right: 0.5rem;
}
.password-cont .cont-text {
  width: 3.2rem;
  height: 2.6666rem;
  margin: 0 auto;
  line-height: 1rem;
  text-align: center;
}
.password-cont .cont-text-1 {
  font-size: 0.4rem;
  font-weight: bold;
}
.password-cont .cont-text-2 {
  font-size: 0.3rem;
  color: #999999;
}
.password-cont .cont-text-3 {
  font-size: 0.6rem;
  color: #8e18f6;
}

.password-cont .input input {
  width: 8.4rem;
  height: 1.3333rem;
  border: 0.01rem solid black;
  margin-top: 1rem;
  font-size: 1rem;
}
/* 成功对号 */
.ok .ok-1 {
  width: 8rem;
  height: 5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(./../../../assets/img/yes.png) no-repeat;
  background-size: 100% 100%;
  z-index: 20;
  padding: 0.4rem;
}
.ok .ok-1 .off {
  position: absolute;
  top: 0.4rem;
  right: 0.5rem;
}
.ok .ok-1 .text {
  width: 1.6rem;
  margin: 3.5rem auto;
  display: block;
  font-size: 0.4rem;
}
/* 失败 */
.defeated .defeated-1 {
  width: 8rem;
  height: 5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(./../../../assets/img/no.png) no-repeat;
  background-size: 100% 100%;
  z-index: 20;
  padding: 0.4rem;
}
.defeated .defeated-1 .off {
  position: absolute;
  top: 0.4rem;
  right: 0.5rem;
}
.defeated .defeated-1 .text {
  width: 1.6rem;
  margin: 3.5rem auto;
  display: block;
  font-size: 0.4rem;
}
.succeed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.payment {
  padding: 0.4rem 0.2rem;
}
.payment .tit {
  margin-bottom: 0.3rem;
  font-size: 0.42rem;
}
.payment .pr {
  font-size: 0.5rem;
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
  padding: 0.1rem 0;
}
.payment .pwd li:not(:last-child) {
  border-right: 1px #ddd solid;
  height:0.4rem;
}
</style>
