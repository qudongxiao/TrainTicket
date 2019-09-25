<template>
<div class="loading-mask">
<div class="loading">
</div>
</div>
</template>
<script>
export default {
    name:'Loading',
}
</script>
<style scoped>
.loading-mask{position:absolute;left:0;right:0;bottom:0;top:0;background-color:rgba(0,0,0,0.02);z-index:188}
.loading{width:1.2rem;height:1.2rem;position:absolute;top:50%;left:50%;margin-top:-0.6rem;margin-left:-0.6rem;border-radius:0.2rem;;background:url(../assets/img/loading3.gif) rgba(0,0,0,0.6) no-repeat;background-size:60% auto;background-position:center}
</style>