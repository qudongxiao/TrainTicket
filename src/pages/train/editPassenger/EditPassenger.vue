<template>
  <div class="home">
    <div class="nav">
      <nut-row :gutter="10">
        <nut-col :span="9">
          <div class="flex-content">
            <span class="iconfont" @click="goBack()">&#xe617;</span>
          </div>
        </nut-col>
        <nut-col :span="15">
          <div class="flex-content flex-content-light title">编辑乘车人</div>
        </nut-col>
      </nut-row>
    </div>
    <!-- 1 成人 -->
    <div class="content">
      <div class="inputRow">
        <nut-row type="flex">
          <nut-col span="6">
            <div class="flex-content">乘客类型</div>
          </nut-col>
          <nut-col :offset="3" :span="6">
            <div class="flex-content flex-content-light">{{passengerType_name}}</div>
          </nut-col>
          <nut-col :offset="8" :span="2">
            <div class="flex-content iconfont" @click="switchActionSheet('isVisible1')">&#xe603;</div>
          </nut-col>
        </nut-row>
        <nut-actionsheet
          :is-visible="isVisible1"
          @close="switchActionSheet('isVisible1')"
          :menu-items="menuItems1"
          @choose="chooseItem1"
        ></nut-actionsheet>
      </div>
      <!-- 证件 -->
      <div class="inputRow">
        <nut-row type="flex">
          <nut-col span="8">
            <div class="flex-content">证件类型</div>
          </nut-col>
          <nut-col :offset="1" :span="11">
            <div class="flex-content flex-content-light">{{cardType_name}}</div>
          </nut-col>
          <nut-col :offset="3" :span="2">
            <div class="flex-content iconfont" @click="switchActionSheet('isVisible2')">&#xe603;</div>
          </nut-col>
        </nut-row>
        <nut-actionsheet
          :is-visible="isVisible2"
          @close="switchActionSheet('isVisible2')"
          :menu-items="menuItems2"
          @choose="chooseItem2"
        ></nut-actionsheet>
      </div>
      <!-- id number -->
      <div class="inputRow">
        <nut-row type="flex">
          <nut-col span="6">
            <div class="flex-content" style="margin-top:0.1rem">证件号码</div>
          </nut-col>
          <nut-col :span="9" :offset="2">
            <div class="flex-content">
              <input v-model="idNo" type="text" placeholder="请输入证件号">
            </div>
          </nut-col>
        </nut-row>
      </div>
      <!-- name -->
      <div class="inputRow">
        <nut-row type="flex">
          <nut-col span="6">
            <div class="flex-content" style="margin-top:0.1rem">姓名</div>
          </nut-col>
          <nut-col :span="9" :offset="2">
            <div class="flex-content">
              <input type="text" placeholder="请输入姓名" v-model="name">
            </div>
          </nut-col>
        </nut-row>
      </div>

      <!-- mobile -->
      <div class="inputRow">
        <nut-row type="flex">
          <nut-col span="6">
            <div class="flex-content" style="margin-top:0.1rem">手机号</div>
          </nut-col>
          <nut-col :span="9" :offset="2">
            <div class="flex-content">
              <input type="text" placeholder="请输入手机号" v-model="mobile">
            </div>
          </nut-col>
        </nut-row>
      </div>
      <div class="error_info">{{error}}</div>
    </div>
    <!-- 脚部 -->
    <div class="foot">
      <nut-checkbox v-model="agree" class="ma-foot">阅读并同意以下内容</nut-checkbox>
      <P>根据实名制要求,购买火车票需要提交乘客的身份证件信息,并需要在乘车时出具对应身份证件用于验证,请确保录入信息真实有效.密客将通过加密等方式保护您录入的身份证件信息,且仅在具体订票过程中授权提供给与您进行交易的商户/承运人.</P>

      <button @click="doEdit">确定修改</button>
      <button class="del" @click="doDel">删除乘客</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "EditPassenger",
  data() {
    return {
      name: "",
      mobile: "",
      idNo: "",
      agree: false,
      error: "",

      passengerType: -1,
      cardType: -1,
      passengerType_name: "请选择",
      cardType_name: "请选择",

      isVisible1: false,
      isVisible2: false,

      menuItems1: [
        {
          name: "成人票",
          value: 1
        }
      ],

      menuItems2: [
        {
          name: "身份证",
          value: 1
        },
        {
          name: "护照",
          value: 2
        },
        {
          name: "台胞证",
          value: 3
        },
        {
          name: "港澳通行证",
          value: 4
        }
      ]
    };
  },
  computed: {
    pid() {
      return this.$route.query.id;
    }
  },
  methods: {
    switchActionSheet(param) {
      this[`${param}`] = !this[`${param}`];
    },

    chooseItem1(itemParams) {
      this.passengerType_name = itemParams.name;
      this.passengerType = itemParams.value;
    },
    chooseItem2(itemParams) {
      this.cardType_name = itemParams.name;
      this.cardType = itemParams.value;
    },

    goBack() {
      this.$router.go(-1);
    },
    doDel() {
      console.log("del", this.pid);
      this.$http
        .get(this.API.delPassenger + this.pid, {
          params: {},
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          this.changeShowAlert(true);
          this.changeAlertMsg(d.returnMessage);
          this.$router.push("/train/CreateOrder");
        });
    },
    doQuery() {
      this.$http
        .get(this.API.PassengerInfo + this.pid, {
          params: {},
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          if (d.returnCode !== 1) {
            this.$router.push("/train/CreateOrder");
          } else {
            this.name = d.data.passengerName;
            this.mobile = d.data.passengerPhone;
            this.cardType = d.data.idcardType;
            this.cardType_name = d.data.idcardTypeName;
            this.idNo = d.data.idcardNo;
            this.passengerType = d.data.passengerType;
            this.passengerType_name = this.getName(d.data.passengerType);
          }
        });
    },
    getName(type) {
      let name = "";
      this.menuItems1.forEach(el => {
        if (el.value === type) {
          name = el.name;
        }
      });
      return name;
    },
    doEdit() {

      if (this.ticketType === -1) {
        this.changeShowAlert(true);
        this.changeAlertMsg("请选择证件乘车人类型");
        return;
      }
      if (this.cardType === -1) {
        this.changeShowAlert(true);
        this.changeAlertMsg("请选择证件类型");

        return;
      }

      if (this.idNo.trim() === "") {
        this.changeShowAlert(true);
        this.changeAlertMsg("请输入证件号码");

        return;
      }
      if (this.name.trim() === "") {
        this.changeShowAlert(true);
        this.changeAlertMsg("请输入乘客姓名");

        return;
      }
      if (/\d{6,11}/.test(this.mobile) === false) {
        this.changeShowAlert(true);
        this.changeAlertMsg("请输入正确的手机号");

        return;
      }

      if (this.agree === false) {
        this.changeShowAlert(true);
        this.changeAlertMsg("请同意用户协议");

        return;
      }


      this.$http
        .post(
          this.API.editPassenger,
          {
            id: this.pid,
            passengerType: this.passengerType,
            passengerName: this.name,
            idcardType: this.cardType,
            idcardNo: this.idNo,
            passengerPhone: this.mobile
          },
          {
            headers: { access_token: this.$store.state.accessToken }
          }
        )
        .then(resp => {
          const d = resp.data;
           if (d.returnCode === 1) {
            this.$router.push("/train/CreateOrder");
          } else {
            this.changeShowAlert(true);
            this.changeAlertMsg(d.returnMessage);
          }
        });
    },
    ...mapMutations(["changeShowAlert", "changeAlertMsg"])
  },
  mounted() {
    this.doQuery();
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  background: #f4f5f7;
}
.error_info {
  color: red;
  text-align: center;
  padding: 0.4rem;
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
  padding: 0.5333rem;
  margin-top: 0.4rem;
  height: 7.66rem;
  background: white;
  font-size: 0.4rem;
}
.inputRow {
  padding: 0.3rem 0;
  border-bottom: 0.02rem solid #f5f4f9;
}

.foot {
  padding: 0.4rem;
  height: 6rem;
}
.foot .ma-foot {
  color: #8e18f6;
}
.foot p {
  margin-top: 0.2rem;
  color: #999999;
  line-height: 0.4rem;
}
.foot button {
  background-image: linear-gradient(left, #541bfe, #8e0fff);
  color: #fff;
  font-size: 0.48rem;
  width: 100%;
  margin-top: 0.4rem;
  border-radius: 0.2rem;
  padding: 0.125rem 0;
}
.foot button.del {
  background-image: linear-gradient(left, #f53e65, #f53e65);
}
</style>
