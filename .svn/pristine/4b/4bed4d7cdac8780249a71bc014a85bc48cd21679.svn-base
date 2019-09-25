<template>
  <div class="wrapper">
    <div class="calendar-head">
      <ul>
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
    </div>
    <div class="calendar-body" ref="wrapper">
      <div style="min-height:101%">
        <div v-for="(item,index) of calendarDate" :key="index">
          <div class="mon_head">{{item.y}}年{{item.m+1}}月</div>
          <div class="mon_body">
            <ul>
              <li
                v-for="(day,index) of item.days"
                :key="index"
                @click="clickDate(item.y,item.m+1,index+1)"
                :class="{current: isAcvited(item.y,item.m+1,index+1),dis: isDis(item.y,item.m,index+1)}"
              >{{index+1}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  name: "trainCalendar",
  data() {
    return {
      calendarDate: []
    };
  },
  computed: {
    activeDate() {
      let obj = {},
        arr = this.$store.state._DATE_.split("-");
      obj.y = Number(arr[0]);
      obj.m = Number(arr[1]);
      obj.d = Number(arr[2]);
      return obj;
    },
    ...mapState(["MinDate", "MaxDate", "_DATE_"])
  },
  methods: {
    isAcvited(y, m, d) {
      if (
        this.activeDate.y === y &&
        this.activeDate.m === m &&
        this.activeDate.d === d
      ) {
        return true;
      } else {
        return false;
      }
    },
    isDis(y, m, d) {
      var ms = new Date(y, m, d).getTime();
      if (ms < this.MinDate.getTime() || ms > this.MaxDate.getTime()) {
        return true;
      } else {
        return false;
      }
    },
    initCalendar() {
      var isLeapYear = year => {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
      };

      var dayMonth1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var dayMonth2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      var monList = [];
      var now = new Date(this.MinDate.valueOf());
      var end = this.MaxDate;

      while (
        now.getFullYear() != end.getFullYear() ||
        now.getMonth() != end.getMonth()
      ) {
        monList.push({
          y: now.getFullYear(),
          m: now.getMonth()
        });
        now.setMonth(now.getMonth() + 1);
      }
      monList.push({
        y: end.getFullYear(),
        m: end.getMonth()
      });

      monList.forEach(function(el, index) {
        if (isLeapYear(el.y)) {
          el.days = new Array(dayMonth2[el.m]);
        } else {
          el.days = new Array(dayMonth1[el.m]);
        }
      });

      this.calendarDate = monList;
    },
    clickDate(y, m, d) {
      if (this.isDis(y, m - 1, d) === false) {
        var m = m < 10 ? "0" + m : m;
        var d = d < 10 ? "0" + d : d;
        this.changeDate(y + "-" + m + "-" + d);
        this.$router.go(-1);
      }
    },
    ...mapMutations(["changeDate"])
  },
  mounted() {
    this.initCalendar();
    this.scroll = new BScroll(this.$refs.wrapper);
  }
};
</script>
<style scoped>
.wrapper {
  height: 100%;
  position: Relative;
  font-size: 0.44rem;
}

.calendar-head {
  overflow: hidden;
}
.calendar-head li {
  width: 1.428rem;
  float: left;
  text-align: center;
  line-height: 1.428rem;
  box-sizing: border-box;
  color: #8e0fff;
}
.calendar-body {
  position: absolute;
  top: 1.428rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.mon_head {
  text-align: center;
  background-color: #eee;
  line-height: 0.8rem;
}
.mon_body {
  overflow: hidden;
}
.mon_body li {
  background-color: #fff;
  width: 1.428rem;
  float: left;
  text-align: center;
  line-height: 1.428rem;
  box-sizing: border-box;
  border-radius: 25%;
}
.mon_body li.current {
  background-color: #8e0fff;
  color: #fff;
}
.mon_body li.dis {
  color: #bbb;
}
</style>