<template>
<div class="alert-mask">
  <div class="alert">
    <div class="alert-close iconfont"  v-if="showCloseBtn" @click="closeSelf">&#xe60a;</div>
    <div class="alert-tit" v-if="title">{{title}}</div>
    <div class="alert-cnt"><slot name="message"></slot></div>
    <div class="alert-btns" v-if="showBtnsRow"><button class="btn" @click="closeSelf">确定</button></div>
</div>
</div>
</template>
<script>
export default {
    name:'Msg',
    props:{
      title:{
        type:String,
      },
      showBtnsRow:{
        type:Boolean,
        default:false
      },
      
      showCloseBtn:{
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
.alert-mask{position:fixed;left:0;right:0;bottom:0;top:0;background-color:rgba(0,0,0,0.33);z-index:181}
.alert{ position:absolute;top:50%;left:50%;width:8.6rem;transform: translate(-50%,-50%);background-color:#fff;text-align:center;border-radius:0.2rem;padding:0.2rem}
.alert-tit{font-size:0.4rem;padding:0.2rem;border-bottom:1px #ddd solid;}
.alert-cnt::after,.alert-cnt::before{content:"";display:table}
.alert-btns{color:#ffc500;padding:0.3rem}
.alert-btns button{background-color:#eee;border:1px #bbb solid;border-radius:0.12rem;padding:0 0.2rem}
.alert-close{position:absolute;right:0;top:0;padding:0.2rem;font-size:0.5rem;z-index:6}
</style>