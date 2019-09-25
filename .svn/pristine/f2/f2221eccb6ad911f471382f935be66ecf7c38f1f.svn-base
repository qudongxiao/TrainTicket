<template>
  <div class="wrapper">
    <div class="navbar">
      <router-link to="/Train" tag="div" class="back iconfont">&#xe617;</router-link>
      <h2>{{startCity}}-{{endCity}}</h2>
      <div class="order" @click="toMyOrder">我的订单</div>
    </div>

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

    <div class="datepicker">
      <div :class="['iconfont', {dis:disPrev}]" @click="clickPrevDay">&#xe617;前一天</div>
      <div class="time" @click="goCalendar">
        <span class="date">{{this.$store.state._DATE_}}</span>
        <span class="week">{{weekDay}}</span>
      </div>
      <div :class="['iconfont', {dis:disNext}]" @click="clickNextDay">后一天&#xe6c6;</div>
    </div>

    <div class="tickets" ref="wrapper">
      <div style="min-height:101%;overflow:hidden">
        <div class="noData" v-if="showNoData"><img src="../../../assets/img/nodata.png"><p>没有找到车次</p></div>
        <div
          :class="['item',{active: activeIndex === index}]"
          v-for="(item,index) of List"
          :key="index"
          @click="setActive(index)"
        >
          <div class="basic">
            <p>
              <em class="t">{{item.startTime}}</em>
              <br>
              {{item.startStation}}
            </p>
            <p>
              {{item.trainNumber}}
              <br>
              <img src="../../../assets/img/skb.png" class="skb" @click.stop="getTimetable(item.trainNumber,item.startStation,item.arriveStation)">
             
              
              <br>
              {{item.runTime}}
            </p>
            <p>
              <em class="t">{{item.arriveTime}}</em>
              <br>
              {{item.arriveStation}}
            </p>
            <p>
              <em class="pr">
                {{item.seatInfo.length> 0 ? item.seatInfo[item.seatInfo.length-1]['seatPrice'] : 0}}<sub>MS</sub><small>起</small>
              </em>
            </p>
          </div>
          <div class="simple">
            <div class="seat">
              <p
                v-for="(innerItem,index) of item.seatInfo"
                :key="index"
              >{{innerItem.seatName}}({{innerItem.seatRemainTickets}})</p>
            </div>
          </div>

          <div class="detail">
            <div class="seat" v-for="(innerItem,index) of item.seatInfo" :key="index">
              <p>{{innerItem.seatName}}</p>
              <p>
                {{innerItem.seatPrice}}
                <sub>MS</sub>
              </p>
              <p>{{innerItem.seatRemainTickets}}</p>
              <p>
                <button
                  class="buy"
                  :disabled="innerItem.seatRemainTickets <= 0"
                  @click="goBuy(item,innerItem.seatName,innerItem.seatPrice)"
                >购买</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <commonMsg v-show="showTimeTable" title="时刻表" @onClose="showTimeTable= false">
      <div slot="message">
        <div class="skb-list">
          <div class="thead">
            <div class="tr">
              <span>车站</span>
              <span>到达</span>
              <span>发车</span>
              <span>停留</span>
            </div>
          </div>
          <div class="tbody" ref="skbWrapper">
            <div style="min-height:101%">
              <div class="tr" :class="{sp:clickStart=== item.stationName || clickEnd=== item.stationName}" v-for="(item,index) of timeTable" :key="index">
                <span>{{item.stationName}}</span>
                <span>{{item.arriveTime}}</span>
                <span>{{item.startTime}}</span>
                <span>{{item.stayTimeSpan}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </commonMsg>
  </div>
</template>

<script>
import commonMsg from "@/common/Msg.vue";
import BScroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  name: "TrainList",
  data() {
    return {
      showTimeTable: false,
      clickStart:'',
      clickEnd:'',
      activeIndex: 0,
      timeTable: [],
      List: [],
      showNoData: false
    };
  },
  components: {
    commonMsg
  },
  computed: {
    disPrev() {
      let nowdate = this.Util.toDate(this.$store.state._DATE_);
      if (nowdate.getTime() <= this.MinDate.getTime()) {
        return true;
      } else {
        return false;
      }
    },
    disNext() {
      let nowdate = this.Util.toDate(this.$store.state._DATE_);
      if (nowdate.getTime() >= this.MaxDate.getTime()) {
        return true;
      } else {
        return false;
      }
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
      "trainInfo"
    ])
  },
  watch: {
    _DATE_(val) {
      this.getTrain();
    }
  },
  methods: {
    goBuy(a, b, c) {
      console.log(a, b, c);
      this.changeTrainInfo({ info: a, seat: b, price: c });
      this.$router.push("/train/CreateOrder");
    },
    goCalendar() {
      this.$router.push({ path: "/Train/Calendar" });
    },
    toMyOrder() {
      this.$router.push("/train/order");
    },
    getTrain() {
      this.showNoData = false;
      this.$http
        .post(
          this.API.trainLineList,
          {
            startStation: this.startCity,
            date: this._DATE_,
            arriveStation: this.endCity,
            isHighSpeed: this.HSR ? 1 : 0
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
            if (d.data.trainListInfo && d.data.trainListInfo.length > 0) {
              this.List = d.data.trainListInfo;
              this.showNoData = false;
            } else {
              this.List = [];
              this.showNoData = true;
            }
          } else {
            this.List = [];
            this.showNoData = true;
          }
        });
    },
    getTimetable(trainnumber,start,end) {
      this.clickStart= start
      this.clickEnd= end
      this.$http
        .get(this.API.timeTable, {
          params: { trainNumber: trainnumber, date: this._DATE_ },
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          if (d.returnCode === 1) {
            this.timeTable = d.data;
            this.showTimeTable = true;
          }
        });
    },
    setActive(index) {
      this.activeIndex = index;
    },
    clickPrevDay() {
      let nowdate = this.Util.toDate(this.$store.state._DATE_);
      if (!this.disPrev) {
        this.changeDate(this.Util.toYmd(this.Util.PrevDay(nowdate)));
      }
    },
    clickNextDay() {
      let nowdate = this.Util.toDate(this.$store.state._DATE_);
      if (!this.disNext) {
        this.changeDate(this.Util.toYmd(this.Util.NextDay(nowdate)));
      }
    },

    ...mapMutations(["changeDate", "changeTrainInfo"])
  },
  mounted() {
    this.getTrain();
    this.scroll = new BScroll(this.$refs.wrapper,{click:true});
    this.scroll2 = new BScroll(this.$refs.skbWrapper);
  }
};
</script>

<style scoped>
.wrapper {
  position: relative;
  height: 100%;
}

.navbar {
  position: relative;
  height: 0.92rem;
  line-height: 0.92rem;
  background-color: rgba(255, 255, 255, 0);
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
  color: #666;
}
.navbar h2 {
  color: #8e0fff;
  text-align: center;
  font-size: 0.4rem;
}

.tabs {
  border-bottom: 0.5px #ddd solid;
  margin: 0.2rem;
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

.datepicker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.1rem;
  padding: 0 0.3rem;
  height: 1rem;
  line-height: 1rem;
  color: #8f0bff;
}

.datepicker .iconfont.dis{
  color: #eee;
}

.datepicker .time {
  border: 0.5px #8f0bff solid;
  border-radius: 0.15rem;
  padding: 0.1rem 0.2rem;
  line-height: normal;
}
.tickets {
  position: absolute;
  top: 3.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
  overflow: hidden;
}

.tickets .item {
  background-color: #fff;
  margin-top: 0.16rem;
}

.basic {
  border-bottom: 1px #e5e5e5 dashed;
  display: flex;
  align-items: center;
  padding: 0.2rem 0;
  line-height: 120%;
}

.basic > p {
  flex: 1;
  text-align: center;
}

.basic .skb {
  vertical-align: text-bottom;
  height: 0.46rem;
  padding:0.05rem 0;
}

.basic em {
  font-style: normal;
}
.basic .pr {
  font-size: 0.48rem;
  color: #000;
  color: red;
}
.basic .pr small {
  font-size: 50%;
  color: #999;
}
.basic .t {
  font-size: 0.48rem;
}

.seat {
  display: flex;
  align-items: center;
  height: 0.7rem;
}
.seat p {
  flex: 1;
  text-align: center;
  color: #666;
}
.detail .seat {
  height: 0.96rem;
}
.detail .seat:not(:last-of-type) {
  border-bottom: 0.5px #ddd solid;
}
.noData {
  text-align: center;
  padding-top: 3.26rem;
  color: #999;
}
.noData img{width:2.8rem;vertical-align: middle}
.noData p{padding-top:0.2rem;font-size:0.32rem}
.detail .buy {
  background-color: #8e0fff;
  color: #fff;
  border-radius: 0.3rem;
  line-height: normal;
  padding: 0.08rem 0.3rem;
}
.detail {
  display: none;
}
.detail .buy:disabled {
  background-color: rgb(221, 221, 221);
}
.simple {
  display: block;
}
.detial {
  display: none;
}
.tickets .item.active .detail {
  display: block;
}
.tickets .item.active .simple {
  display: none;
}
.skb-list {
  padding: 0.3rem;
}

.skb-list .tbody {
  height: 4rem;
  overflow: hidden;
}
.skb-list .tr {
  height: 0.6rem;
  display: flex;
}
.skb-list .tr.sp{color:#8e0fff}

.skb-list .tr span {
  flex: 1;
  text-align: center;
}
</style>
