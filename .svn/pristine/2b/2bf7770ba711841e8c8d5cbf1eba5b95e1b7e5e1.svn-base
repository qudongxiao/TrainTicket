<template>
  <div class="home">
    <div class="nav">
      <nut-row :gutter="10">
        <nut-col :span="9">
          <div class="flex-content">
            <span class="iconfont" @click="closeSelf">&#xe617;</span>
          </div>
        </nut-col>
        <nut-col :span="15">
          <div class="flex-content flex-content-light title">取消原因</div>
        </nut-col>
      </nut-row>
      <p>请选择取消原因:</p>
    </div>
    <ul>
      <li
        v-for="(item,index) of list"
        @click="getItem(index)"
        :key="index"
        :class="activeIndex == index ? 'active':''"
      >
        <div class="con">
          <nut-row type="flex">
            <nut-col span="10" :offset="1">
              <div class="flex-content con-1">{{item.dictName}}</div>
            </nut-col>
            <nut-col :span="1" :offset="10">
              <div class="flex-content con-2">
                <!-- <nut-icon type="tick" color="#8e18f6" class="active" ></nut-icon> -->
              </div>
            </nut-col>
          </nut-row>
        </div>
      </li>
    </ul>

    <div class="adj-input">
      <span>具体说明</span>&nbsp;
      <textarea cols="30" rows="2" placeholder="您可以在此输入使用中遇到的不便,我们会尽快优化" v-model="detail"></textarea>
    </div>

    <div class="foot">
      <button @click="confirm">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cause",
  data() {
    return {
      list: [],
      activeIndex: -1,
      refundCause: {},
      detail: ""
    };
  },
  methods: {
    closeSelf() {
      this.$emit("onClose", null);
    },
    getItem(index) {
      this.activeIndex = index;
    },
    confirm() {
      if (this.activeIndex > -1) {
        this.$emit("onClose", {id:this.list[this.activeIndex]["dictCode"],name:this.list[this.activeIndex]["dictName"]});
      } else {
        this.$emit("onClose", {remark:this.detail});
      }
    },
    getOrderquery() {
      this.$http
        .get(this.API.queryOredr, {
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          const d = resp.data;
          this.list = d.data;
        });
    }
  },
  mounted() {
    this.getOrderquery();
  }
};
</script>

<style scoped>
.home {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f4f5f7;
}
.nav {
  background: white;
  padding: 0.3333rem;
  height: 1.5rem;
  border-bottom: 0.02rem solid #f5f5f7;
}
.nav .title {
  font-size: 0.4rem;
  font-weight: bold;
  color: #8e18f6;
}
.nav p {
  padding-top: 0.6666rem;
}
.con {
  height: 1.2rem;
  background: white;
  border-bottom: 0.02rem solid #f5f5f7;
}
.con .con-1 {
  margin-top: 0.4rem;
}
.con .con-2 {
  margin-top: 0.3rem;
}
.adj-input {
  margin-top: 0.4rem;
  background: white;
  height: 1rem;
  padding: 0.4rem;
}
.adj-input span {
  position: relative;
  top: -0.3rem;
  color: #8e18f6;
  font-size: 0.4rem;
}
.adj-input textarea {
  font-size: 0.4rem;
  width: 6.9333rem;
}
.foot button {
  height: 1.3333rem;
  width: 100%;
  background: url(./../../../assets/img/qd.png) no-repeat;
  background-size: 100% 100%;
  font-size: 0.4rem;
  color: white;
  margin-top: 3rem;
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

.active {
  color: #8e18f6;
  font-weight: bolder;
  font-size: 0.4rem;
}
</style>
