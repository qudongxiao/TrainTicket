<template>
<div class="alert-mask">
  <div class="alert">
    <div class="alert-close iconfont" @click="closeSelf">&#xe60a;</div>
    <div class="alert-tit">{{title}}</div>
    <div class="alert-cnt">{{message}}</div>
    <div class="alert-btns" v-if="showBtnsRow"><button class="btn" @click="closeSelf">确定</button></div>
</div>
</div>
</template>
<script>
export default {
    name:'Alert',
    props:{
      title:{
        type:String,
      },
      message:{
        type:String
      },
      showBtnsRow:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      closeSelf (){
        this.$emit('onClose')
      }
    }
}
</script>
<style scoped>
.alert-mask{position:fixed;left:0;right:0;bottom:0;top:0;background-color:rgba(0,0,0,0.2);z-index:182}
.alert{ position:absolute;top:50%;left:50%;width:8.6rem;transform: translate(-50%,-50%);background-color:#fff;text-align:center;padding:0.2rem}
.alert-tit{font-size:0.4rem;padding:0.2rem;}
.alert-cnt{overflow:hidden;line-height:160%}
.alert-btns{color:#ffc500;padding:0.3rem}
.alert-btns button{background-color:#8e0ffe;color:#fff;border-radius:0.12rem;padding:0.08rem 0.4rem}
.alert-close{position:absolute;right:0;top:0;padding:0.2rem;font-size:0.5rem;z-index:5}
</style>