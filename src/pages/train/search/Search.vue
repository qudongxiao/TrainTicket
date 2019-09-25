<template>
  <div class="wrapper">
    <div class="navbar">
      <router-link to="/Train" tag="div" class="back iconfont">&#xe617;</router-link>
      <h2>购票</h2>
      <div class="order" @click="toMyOrder">我的订单</div>
    </div>
    <div class="banner">
      <img src="../../../assets/img/banner.png">
    </div>
    <div class="content">
      <div class="tabs">
        <ul>
          <li>
            <span class="current">火车票</span>
          </li>
          <li>
            <span>机票</span>
          </li>
        </ul>
      </div>

      <div class="station">
        <span class="start" @click="showStartPicker">{{startCity}}</span>
        <span class="trans-btn" @click="transCity"></span>
        <span class="end" @click="showEndPicker">{{endCity}}</span>
      </div>
      <div class="time" @click="goCalendar">
        <span class="date">{{this.$store.state._DATE_}}</span>
        <span class="week">{{weekDay}}</span>
      </div>
      <div class="high_speed_rail">
        <a @click="clickHSR">
          <span :class="['chk', HSR ? 'checked' : 'unchecked']"></span>
          <span>只看高铁/动车</span>
        </a>
      </div>

      <div class="query-btn">
        <button @click="doQuery" :disabled="disBtn">查询</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "trainSearch",
  data() {
    return {
      hsr: false
    };
  },
  computed: {
    disBtn() {
      return this.startCity === "出发地" || this.endCity === "目的地";
    },
    weekDay() {
      return this.Util.Week(this.Util.toDate(this.$store.state._DATE_));
    },
    ...mapState(["startCity", "endCity", "_DATE_", "HSR"])
  },

  methods: {
    transCity() {
      const tempcity = this.startCity;
      this.changeStartCity(this.endCity);
      this.changeEndCity(tempcity);
    },
    doQuery() {
      this.$router.push({ path: "/Train/List" });
    },
    showStartPicker() {
      this.$router.push({ path: "/Train/City", query: { type: "1" } });
    },
    showEndPicker() {
      this.$router.push({ path: "/Train/City", query: { type: "2" } });
    },

    clickHSR() {
      this.changeHSR(!this.HSR);
    },

    goCalendar() {
      this.$router.push({ path: "/Train/Calendar" });
    },

    toMyOrder() {
      this.$router.push("/train/order");
    },

    ...mapMutations([
      "changeStartCity",
      "changeEndCity",
      "changeDate",
      "changeHSR"
    ])
  },

  mounted() {}
};
</script>

<style scoped>
.wrapper {
  position: relative;
  height: 100%;
  background: url(../../../assets/img/bg1.jpg) no-repeat;
  background-size: 100% 100%;
}
.navbar {
  position: relative;
  height: 0.92rem;
  line-height: 0.92rem;
  color: #fff;
  margin-bottom: 0.8rem;
}
.navbar .back {
  position: absolute;
  left: 0;
  top: 0;
  width: 0.92rem;
  text-align: center;
}

.navbar .order {
  position: absolute;
  right: 0.3rem;
  top: 0;
}
.navbar h2 {
  text-align: center;
  font-size: 0.4rem;
}

.banner {
  width: 8.6933rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.banner img {
  width: 100%;
  display: block;
}

.content {
  background-color: #fff;
  border-radius: 0.2666rem;
  width: 9.4rem;
  margin: -1.4rem auto 0;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
}

.content:before,
.content:after {
  content: "";
  display: table;
}
.tabs {
  border-bottom: 0.5px #ddd solid;
  margin: 1.2rem 0.4rem 0.4rem;
}
.tabs:after {
  content: "";
  display: table;
  clear: both;
}
.tabs li {
  float: left;
  width: 50%;
  text-align: center;
}
.tabs li span {
  height: 1rem;
  display: inline-block;
  line-height: 1rem;
  box-sizing: border-box;
  padding: 0 0.4rem;
}
.tabs li span.current {
  border-bottom: 2px #8f0bff solid;
  font-weight: bold;
}

.station {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.6rem 0.4rem;
  background-color: #eee;
  border-radius: 0.1rem;
  padding: 0 0.2rem;
  height: 1rem;
}
.station span.start {
  width: 2rem;
  text-align: center;
  font-weight: bold;
}
.station span.end {
  width: 2rem;
  text-align: center;
  font-weight: bold;
}
.time {
  display: flex;
  align-items: center;
  margin: 0 0.6rem 0.4rem;
  background-color: #eee;
  border-radius: 0.1rem;
  padding: 0 0.5rem;
  height: 1rem;
}
.time .date {
  margin-right: 0.3rem;
  font-weight: bold;
}
.time .week {
  color: #666;
}

.high_speed_rail {
  margin: 0 0.6rem 0.4rem;
  color: #777;
  text-align: right;
  padding: 0.16rem;
}
.high_speed_rail a {
  color: #666;
}

.query-btn {
  margin: 0 0.6rem 0.4rem;
}
.query-btn button {
  background-image: linear-gradient(left, #eb5bbd, #7e1af4);
  width: 100%;
  height: 1rem;
  border-radius: 0.5rem;
  color: #fff;
  letter-spacing: 0.2rem;
  font-size:0.42rem;
}

.query-btn button:disabled{background:#e27dff}
.high_speed_rail span {
  display: inline-block;
  vertical-align: middle;
}
.high_speed_rail .chk {
  width: 0.32rem;
  height: 0.32rem;
  border: 1px #ddd solid;
}
.high_speed_rail .chk.checked {
  background: url(../../../assets/img/checked.png) no-repeat;
  background-size: contain;
}

.trans-btn {
  background: url(../../../assets/img/trans.png) no-repeat;
  background-size: contain;
  width: 1.2rem;
  height: 0.3413rem;
}
</style>
