<template>
    <div class="detail-header" :style="{background:'url('+handleDetailImg(sellerInfor.image_path)+')'}">
         <div class="top">
            <i class="headfont arrow-left" @click="back()"></i>
        </div> 
         <div class="title">
                <img :src="handleImg(sellerInfor.image_path)" alt="">
                <div>
                    <h3>{{sellerInfor.name}}</h3> 
                     <p class="delivery">
                        <span>商家配送 / </span>
                        <span>{{sellerInfor.order_lead_time}}分钟送达 / </span>
                        <span>配送费{{sellerInfor.delivery_fee | price}}</span>
                    </p>
                    <p class="ad">
                        <span>公告 : {{sellerInfor.promotion_info[0]}}</span>
                    </p>
                </div>
        </div> 
       <div class="activities">
            <p v-for="(item,ind) in sellerInfor.activities" :key="ind" v-if="ind==0">
                <i :style="{background:'#'+item.icon_color}">{{item.icon_name}}</i>
                <span>{{item.description+'(不与其它活动同享)'}}</span>
            </p>
            <span @click="showActive()" class="act-num" v-if='sellerInfor.activities.length'>{{sellerInfor.activities.length}}个活动</span>
        </div>
    </div>
</template>
<script>
import {handleImg,handleDetailImg} from "@/components/common/util.js"
export default{
    data(){
       return {
            sellerInfor:{}
        }
    },
    created(){
        var arr= JSON.parse(sessionStorage.getItem("sellerDate"))
        if(arr){
            this.sellerInfor=arr;
        }
    },
    methods:{
        handleDetailImg,
        handleImg,
        back(){
            this.$router.back();
        },
        showActive(){
            this.$event.$emit("showCover",true);
        }
    },
    mounted(){
    },
    updated(){
        var arr= JSON.parse(sessionStorage.getItem("sellerDate"))
        if(arr){
            this.sellerInfor=arr;
        }
    }

}
</script>
<style scoped>
    .detail-header{
        width:100%;
        height:142px;
        padding:0 15px;
        background-size:100% 100%; 
    }
    .detail-header .top{
        height:35px;
        width:100%;
       
        display:flex;
        align-items: center;
    }
    .detail-header .top i{
        font-size:20px;
        color:#fff;
        font-size:900;
    }
    .detail-header .title{
        display: flex;
        padding-top:6px;
    }
    .detail-header .title img{
        width:66px;
        height:66px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 15px;
    }
    .detail-header .title>div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .detail-header .title>div h3{
        color:#fff;
        font-weight: 900;
        font-size: 18px;
    }
    .detail-header .title>div .delivery{
        color:#fff;
        font-weight: 100;
        font-size: 12px;
    }
    .detail-header .title>div .ad{
        color:#fff;
        font-weight: 100;
        font-size: 12px;
    }
    .detail-header .activities{
        margin-top:5px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    .detail-header .activities .act-num{
        color:#fff;
        font-size:12px;
    }
    .detail-header .activities p i{
        font-size:12px;
        line-height:12px;
        color:#fff;
        padding:1px 2px;
        font-weight:100;
        border-radius:3px;
    }
    .detail-header .activities p span{
        font-size:12px;
        color:#fff;
        font-weight:100;
    }
</style>