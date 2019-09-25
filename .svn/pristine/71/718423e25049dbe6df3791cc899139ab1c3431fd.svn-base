<template>
  <div class="wrapper">
    <div class="navbar">
      <router-link to="/Train" tag="div" class="back iconfont">&#xe617;</router-link>
      <h2>城市选择</h2>
    </div>

    <div class="search-outer">
      <div class="search">
        <i class="iconfont">&#xe601;</i>
        <input type="text" v-model="keyword" class="search-input" placeholder="中文/拼音/首字母">
      </div>
    </div>
    <div class="list" ref="wrapper">
      <div>
        <div class="area">
          <div class="title border-topbottom">当前选择城市</div>
          <div class="button-list">
            <div class="button-wrapper">
              <div class="button active">{{curCity}}</div>
            </div>
          </div>
        </div>
<!-- 
        <div class="area">
          <div class="title border-topbottom">热门城市</div>
          <div class="button-list">
            <div
              class="button-wrapper"
              v-for="item of hotCities"
              :key="item.id"
              @click="handleCityClick(item.name)"
            >
              <div class="button">{{item.name}}</div>
            </div>
          </div>
        </div> -->

        <div class="area" v-for="(item,key) of cities" :key="key" :ref="key">
          <div class="title border-topbottom">{{key}}</div>
          <div class="item-list">
            <div
              class="item border-bottom"
              v-for="innerItem of item"
              :key="innerItem.stationName"
              @click="handleCityClick(innerItem.stationName)"
            >{{innerItem.stationName}}</div>
          </div>
        </div>
      </div>
    </div>

    <ul class="alphabet">
      <li v-for="item of letters" :key="item" :ref="item" @click="handleLetterClick">{{item}}</li>
    </ul>

    <div class="search-result" ref="wrapper2" v-show="keyword">
      <ul>
        <li
          class="search-item border-bottom"
          v-for="item of resultList"
          :key="item.stationName"
          @click="handleCityClick(item.stationName)"
        >{{item.stationName}}</li>
        <li class="search-item border-bottom" v-show="noData">无匹配数据</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  name: "trainCity",
  data() {
    return {
      keyword: "",
      TIME1: null,
      resultList: [],
      hotCities: [],
      cities: {
      
      }
    };
  },
  computed: {
    noData() {
      return this.resultList.length === 0;
    },
    curCity() {
      const type = this.$route.query.type;
      if (type === "1") {
        return this.startCity;
      } else if (type === "2") {
        return this.endCity;
      }
    },
    letters() {
      const letters = [];
      for (let i in this.cities) {
        letters.push(i);
      }
      return letters;
    },
    ...mapState(["startCity", "endCity"])
  },
  watch: {
    keyword() {
      const result = [];
      if (!this.keyword) {
        this.resultList = [];
        return;
      }
      if (this.TIME1) {
        clearTimeout(this.TIME1);
      }
      this.TIME1 = setTimeout(() => {
        for (let i in this.cities) {
          this.cities[i].forEach(el => {
            if (
              el.stationName.indexOf(this.keyword) > -1 ||
              el.stationPinYin.indexOf(this.keyword) > -1 ||
              el.stationSuoXie.indexOf(this.keyword) > -1
            ) {
              result.push(el);
            }
          });
        }
      }, 100);
      this.resultList = result;
    }
  },
  methods: {
    getCityList() {
      this.$http
        .get(this.API.stationsList, {
          headers: {access_token: this.$store.state.accessToken}
        })
        .then(resp => {
          const d = resp.data;
          if(d.returnCode){
            this.cities= d.data
          }
        });
    },
    handleLetterClick(e) {
      const key = e.target.innerText.trim();
      const el = this.$refs[key][0];
      this.scroll.scrollToElement(el);
    },
    handleCityClick(city) {
      const type = this.$route.query.type;
      if (type === "1") {
        this.changeStartCity(city);
      } else if (type === "2") {
        this.changeEndCity(city);
      }
      this.$router.go(-1);
    },
    ...mapMutations(["changeStartCity", "changeEndCity"])
  },
  mounted() {
    this.getCityList()
    this.scroll = new BScroll(this.$refs.wrapper,{click:true});
    this.scroll2 = new BScroll(this.$refs.wrapper2,{click:true});
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
  height: 0.92rem;
  line-height: 0.92rem;
  background-color: rgba(2558, 255, 255, 0);
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
.search-outer {
  padding: 0.3rem;
  background-color: #eee;
}
.search {
  background-color: #fff;
  position: relative;
  border-radius: 0.14rem;
  height: 0.86rem;
  line-height: 0.86rem;
  box-shadow: 0 0 0.2rem #eee inset;
}
.search i {
  position: absolute;
  top: 0;
  left: 0.3rem;
}
.search-input {
  width: 100%;
  height: 100%;
  border-radius: 0.1rem;
  background: transparent;
  padding-left: 1rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
}

.list {
  position: absolute;
  top: 2.72rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.list .title {
  line-height: 0.64rem;
  background: #eee;
  padding-left: 0.3rem;
  color: #666;
}
.list .button-list {
  overflow: hidden;
  padding: 0.2rem 0.6rem 0.2rem 0.2rem;
}
.list .button-list .button-wrapper {
  width: 33.333%;
  float: left;
}
.list .button-list .button-wrapper .button {
  margin: 0.1rem;
  padding: 0.12rem 0;
  text-align: center;
  border: 0.5px solid #ccc;
  border-radius: 0.1rem;
}
.list .button-list .button-wrapper .button.active {
  color: #8742c5;
  border-color: #8742c5;
}
.list .item-list .item {
  line-height: 0.76rem;
  padding-left: 0.4rem;
}

.alphabet {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 2.4rem;
  bottom: 0;
  width: 0.5rem;
}
.alphabet li {
  text-align: center;
  line-height: 0.5rem;
  color: #8742c5;
}

.search-result {
  position: absolute;
  top: 2.72rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #fff;
  z-index: 1;
}
.search-item {
  line-height: 0.76rem;
  padding-left: 0.4rem;
  color: #666;
  background: #fff;
}
</style>
