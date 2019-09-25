
<template>
  <div class="home">
    <div class="aircraft train" v-for="(item,index) in list">
      <div class="aircraft-title">
        <nut-row type="flex">
          <nut-col span="12">
            <div class="flex-content">{{item.orderTypeName}}</div>
          </nut-col>
          <nut-col :span="19" :offset="16">
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
        <button @click="skip(item.tradeNo,item.state)">{{item.state | formatState}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "All",
  data() {
    return {
      list: [],
      refreshFlag: this.$route.query.refreshFlag
    };
  },

  filters: {
    formatState(num) {
      switch (num) {
        case 1:
          return "退票";
          break;
        case 2:
          return "取消订单";
          break;
        case -2:
          return "删除订单";
          break;
        case 9:
          return "删除订单";
          break;
        case 8:
          return "查看详情";
          break;
        case -3:
          return "查看详情";
          break;
        case 0:
          return "查看详情";
          break;
      }
    }
  },
  methods: {
    getOrderList() {
      this.$http
        .post(
          this.API.trainorder,
          {
            tabIndex: 1
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
        });
    },
    cancelTrainOrder(orderId) {
      // 取消
      var that = this;
      this.$http
        .get(this.API.cancelTrainOrder + "/" + orderId, {
          headers: {
            access_token: this.$store.state.accessToken
          }
        })
        .then(resp => {
          that.$router.go(0);
        });
    },
    skip(tradeNo, state) {
      var that = this;
      if (state == 1) {
        this.$router.push({ name: "Refund", query: { pid: tradeNo } });
      } else if (state == 2) {
        this.$dialog({
          id: "my-dialog",
          title: "确定取消此订单？",
          onOkBtn(event) {
            this.close(); //关闭对话框
            that.cancelTrainOrder(tradeNo);
          },
          onCancelBtn(event) {
            //取消按钮点击事件，默认行为关闭对话框
            this.close();
          }
        });
      } else if (state == -2 || state == 9) {
        this.delete(tradeNo);
      } else if (state == 8 || state == -3 || state == 0) {
        this.$router.push({
          name: "OrderDetail",
          query: { pid: tradeNo }
        });
      }
    },
    delete(orderId) {

      const that= this
      this.$dialog({
        id: "my-dialog2",
        title: "确定删除此订单？",
        onOkBtn(event) {
          this.close(); //关闭对话框
          doDel()
        },
        onCancelBtn(event) {
          this.close();
        }
      });

      function doDel() {
        that.$http
          .get(that.API.deleteTrainOrder + "/" + orderId, {
            headers: {
              access_token: that.$store.state.accessToken
            }
          })
          .then(resp => {
            const d = resp.data;
            if(d.returnCode===1){
              that.changeShowAlert(true)
              that.changeAlertMsg(d.returnMessage)
              that.getOrderList();
            };
          });
      }
    },
     ...mapMutations(["changeShowAlert", "changeAlertMsg"])
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
.nut-dialog-ok {
  background-color: green !important;
}
</style>
