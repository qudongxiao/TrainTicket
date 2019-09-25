<template>
  <div class="AddressBook-mask">
    <div class="AddressBook">
      <div class="nav">
        <div class="close" @click="closeSelf">关闭</div>
        <div class="confirm" @click="addToNameList">确认</div>
      </div>
      <div class="btns">
        <router-link tag="span" to="/train/AddPassenger" class="iconfont add">&#xe65b; 新增乘车人</router-link>
        <div class="line"></div>
        <span class="iconfont refresh">&#xe66d; 刷新乘车人</span>
      </div>
      <div class="tips">刷新可以获取乘车人最新状态</div>
      <div class="addressList" ref="wrapper">
        <div style="min-height:101%">
          <ul>
            <li v-for="(item,index) of list" :key="index">
              <router-link :to="{ path: 'editPassenger', query: { id: item.id }}"><div class="iconfont edit">&#xe938;</div></router-link>
              <h4>{{item.passengerName}}</h4>
              <h5>{{item.idcardNo}}</h5>
              <input
                type="checkbox"
                :value="{'id':item.id,'passengerName':item.passengerName,'idcardNo':item.idcardNo}"
                v-model="tempList"
                class="checkbox"
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Betterscroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  name: "AddressBook",
  props: {
    list: Array
  },
  data() {
    return {
      tempList: this.$store.state.nameList
    };
  },
  methods: {
    closeSelf() {
      this.$emit("close");
    },
    addToNameList() {
      var arr = this.tempList;
      if (arr.length <= 5) {
        this.changeNameList(arr);
        this.$emit("close");
      } else {
        this.changeShowAlert(true);
        this.changeAlertMsg("不能超过5位乘客");
      }
    },
    ...mapMutations(["changeNameList", "changeShowAlert", "changeAlertMsg"])
  },

  mounted() {
    this.scroll = new Betterscroll(this.$refs.wrapper);
  }
};
</script>
<style scoped>
.AddressBook-mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 18;
  overflow: hidden;
}
.AddressBook {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #f4f5f7;
}
.nav {
  display: flex;
  justify-content: space-between;
  color: #8f0eff;
}
.nav .close {
  padding: 0.3rem;
}
.nav .confirm {
  padding: 0.3rem;
}

.btns {
  margin: 0 0.3rem;
  background-color: #fff;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
}
.btns span {
  flex: 1;
  text-align: center;
  padding: 0.3rem 0;
  color: #8f0eff;
}

.btns .line {
  width: 1px;
  background-color: #ddd;
  height: 0.4rem;
}

.tips {
  text-align: center;
  font-size: 0.29rem;
  color: #999;
  padding: 0.3rem 0;
}

.addressList {
  position: absolute;
  top: 2.8rem;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  overflow: hidden;
}
.addressList li {
  position: relative;

  border-bottom: 1px #ddd dotted;
  padding: 0.24rem 0 0.24rem 1.2rem;
}

.addressList .edit {
  position: absolute;
  left: 0.3rem;
  top: 0.3rem;
  font-size: 0.7rem;
  color: #999;
}
[type="checkbox"] {
  position: absolute;
  right: 0.3rem;
  top: 20%;
  width: 0.45rem;
  height: 0.45rem;
  appearance: none;
  border: 1px solid #ddd;
  border-radius: 0.08rem;
  outline: none;
}

[type="checkbox"]:checked {
  background: url(../assets/img/checked.png) no-repeat center;
  background-size: contain;
}

[type="checkbox"]:disabled {
  background: url(../assets/img/disabled.png) no-repeat center;
  background-size: contain;
}

.addressList h4 {
  font-size: 0.4rem;
  padding-bottom: 0.2rem;
}

.rollUp-enter,
.rollUp-leave-to {
  top: 100%;
}
.rollUp-enter-active,
.rollUp-leave-active {
  transition: all 650ms;
}
</style>