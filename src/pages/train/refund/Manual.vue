<template>
    <div class="home">
<div class="nav">
      <nut-row :gutter="10">
        <nut-col :span="8">
          <div class="flex-content">
            <span class="iconfont" @click="go">&#xe617;</span>
          </div>
        </nut-col>
        <nut-col :span="15">
          <div class="flex-content flex-content-light title">火车票退票说明</div>
        </nut-col>
      </nut-row>
    </div>
    <div class="content-text">
        <p>退票说明</p>
        <p>1.晚上22：30-早上6:00期间，需前往火车站人工窗口办理退票业务。</p>
        <p>2.其它时间：未取票且距离发车前1小时前的，可以在秘客订单中操作退票。</p>
        <p>3.铁路部门规定，发车后一律不可退票，请谅解。</p>
        <p>4.2019年春运，改签活变更到站后的车票乘车日期在1月21日-3月1日期间，退票时一律按照20%核收退票费。</p>
    </div>
      
    <div class="money">
      <span>退票手续费</span>
    <div class="money-1">
        <div class="money-left">
            <div class="money-left-1">申请退票距发车时间</div>
           <div class="money-left-txt">
            <p class="iconfont">&#xe810; 15天(不含)以上</p>
           <p class="iconfont">&#xe810; 48小时-15天</p>
          <p class="iconfont">&#xe810; 24小时-48小时(不含)</p>
          <p class="iconfont">&#xe810; 不足24小时</p>
           </div>
        </div>
        <div class="money-right">
            <div class="money-right-1">
                收取手续费
            </div>
            <div class="money-right-txt">
               <p>无</p>
               <p>票价 5%</p>
               <p>票价 10%</p>
               <p>票价 20%</p>
            </div>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
export default {
name:"Manual",
data () {
    return {
        
    }
},
  methods: {
    go(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.nav {
    color: white;
  background:#8e18f6;
  padding: 0.3333rem;
}
.nav .title {
  font-size: 0.4rem;
  font-weight: bold;

}
.content-text{
    padding: 0.4rem;
}

.content-text p{
    margin-bottom: 0.4rem; 
    color:#999999; 
    line-height: 0.5rem;     
}
.content-text p:nth-child(1){
    font-size: 0.4rem;
    font-weight: bold;
    color: black;
    margin-bottom: 0.4rem;  

}
.money{
    padding: 0.4rem;
}
.money span{
    font-size: 0.4rem;
    font-weight: bold;
    color: black;
    display: block;
    margin-bottom: 0.4rem;    
} 

.money .money-left{
    float: left;
    width: 5.3rem;
    height: 4.266rem;
    border: 0.01rem solid #cccccc;
}
.money .money-left-1{
    height: 1.0666rem;
    background: #cccccc;
    color: #666666;
    text-align: center;
    line-height: 1.0666rem;
}
.money .money-right{
     float: left;
    width: 3.8rem;
    height: 4.266rem;
    border: 0.01rem solid #cccccc;
}
.money .money-right-1{
     height: 1.0666rem;
    background: #8e18f6;
    color: white;
    text-align: center;
    line-height: 1.0666rem;
}
.money .money-left-txt{
    padding: 0.4rem;
 
}
.money .money-left-txt p{
   font-size: 0.2933rem;
   margin-top: 0.2rem;
}
.money-right-txt{
    padding: 0.4rem;
}
.money-right-txt p{
    font-size: 0.2933rem;
   margin-top: 0.2rem;
}
</style>
