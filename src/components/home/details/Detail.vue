<template>
  <div class="detail">
       <shadow-cover v-if="showCover"></shadow-cover>
      <detail-header ></detail-header>
      <nav class="tab one-bottom-px">
          <li  v-for="(text,index) in tabList" :key="index" @click="changeTab(index)" :class="{'active':curentTabIndex==index}">
              <span>{{text}}<i class="active-btm" v-if="curentTabIndex==index"></i>
              </span>
        </li>
      </nav> 
      <div class="wrapper">
        <detail-goods :sellerId="seller.id" v-if="curentTabIndex==0" :goodsList="goodsList"></detail-goods>
        <detail-rating v-if="curentTabIndex==1" :sellerId="seller.id" :sellerScore="sellerScore" :sellerRating="sellerRating" :userComment="userComment"></detail-rating>
        <detail-shopping v-if="curentTabIndex==2" :sellerInformation="sellerInformation"></detail-shopping>
      </div>
  </div>
</template>
<script>
import Vuex from "vuex";
import {sellerGoods,sellerInfor,sellerRating,userComment,sellerScore} from "@/components/common/getDate.js"
import DetailHeader from "./DetailHead.vue"
import DetailGoods from "./DetailGoods.vue"
import DetailRating from "./GoodsRating.vue"
import DetailShop from "./DetailShop.vue"
import ShadowCover from "./Cover.vue"
export default {
    data(){
        return {
            tabList:["商品","评价","店铺"],
            curentTabIndex:0,
            showCover:false,
            goodsList:[],
            seller:{},
            sellerInformation:{},
            sellerRating:[],
            userComment:[],
            sellerScore:{}
        }
    },
    components:{
        "detail-header":DetailHeader,
        "detail-goods":DetailGoods,
        "detail-rating":DetailRating,
        "detail-shopping":DetailShop,
        "shadow-cover":ShadowCover
    },
    computed:{
        ...Vuex.mapState(["latitude","longitude"])
    },
    methods:{
        changeTab(index){
            this.curentTabIndex=index;
        }
    },
    created(){
        this.$event.$on("showCover",(flag)=>{
            if(flag)
            {
                this.showCover=true;
            }
            else
            {
                this.showCover=false;
            }
            
        });
        this.seller= JSON.parse(sessionStorage.getItem("sellerDate"))
        //请求商品数据
        sellerGoods(this.seller.id).then((result)=>{
            this.goodsList=result;
        });
        //请求商家数据
        sellerInfor(this.latitude,this.longitude,this.seller.id)
        .then((result)=>{
            this.sellerInformation=result;
        });
        //请求评分综合数据
        sellerRating(this.seller.id).then((result)=>{
            this.sellerRating=result;
        });
        //获取评分具体信息
        sellerScore(this.seller.id).then((result)=>{
            this.sellerScore=result;
        });
        //获取用户品论信息
        // id,offset,limit
        userComment(this.seller.id,this.userComment.length).then((result)=>{
            this.userComment=result;
        })

        
    }
}
</script>
<style scoped>
    .detail{
        position: absolute;
        width:100%;
        bottom: 0;
        left:0;
        top:0;
        background: #fff;
        z-index: 100;
        display:flex;
        flex-direction:column;
    }
    .detail .tab{
        display:flex;
        justify-content:center;
        align-items:center;
        height:40px;
        width:100%;
    }
    .detail .tab li{
        flex:1;
        text-align:center;
        color:#666;
    }
    .detail .tab li span{
        height:40px;
        display:inline-block;
        line-height:40px;
        position:relative;
    }
    .detail .tab li span i{
        display:block;
        height:2px;
        background:#3190e8;
        position:relative;
        top:-2px;
    }
    .detail .tab li.active{
        color:#3190e8;
        font-weight:900;
    }
    .detail .wrapper{
        flex:1;
        position:relative;
    }
</style>




