<template>
  <div class="order">
      <toHead :data="title"></toHead>
      <div class="main">
          <img :src="imgSrc"/>
          <h3>登录后查看外卖订单</h3>
          <button>立即登录</button>
      </div>
  </div>

</template>
<script>
import {handleImg} from "@/components/common/util.js"
import toHead from "@/components/common/top.vue"
export default{
    components:{
        toHead
    },
    data(){
        return {
            title:"订单",
            imgSrc:"9fb04779371b5b162b41032baf5f3gif"
        }
    },
    methods: {
        handleImg
    },
    created (){
        this.imgSrc="9fb04779371b5b162b41032baf5f3gif";
    }
}
  
</script>
<style scoped>
    .order{
        width:100%;
        background:red;
        position:absolute;
        top:0;
        left:0;
        bottom: 49px;
        z-index: 10;
    }
    .main{
        position:absolute;
        top:44px;
        left:0;
        width:100%;
        bottom:0;
        background:#f5f5f5;
        display:flex;
        flex-direction:column;
        align-items:center;
        padding-top:100px;
        box-sizing:border-box;
    }
    .main img{
        display:block;
        width:200px;
        height:200px;
    }
    .main h3{
        font-weight:100;
        height:40px;
        line-height:40px;
    }
    .main button{
        width:120px;
        height:40px;
        border:none;
        background:#56d176;
        line-height:40px;
        text-align:center;
        color:#fff;
        border-radius:10px;
        outline: none;
    }
</style>
