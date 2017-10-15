<template>
<div class="shop">
    <div class="shop-wrap">
        <div class="active">
            <h3>活动与服务</h3>
            <p class="active-item" v-for="(item,index) in sellerInformation.activities" :key="index">
                <i :style="{'background':'#'+item.icon_color}">{{item.icon_name}}</i>
                <span>{{item.description}}</span>
            </p>
            <p class="support" v-for="(item,index) in sellerInformation.supports" :key="index">
                <i>{{item.icon_name}}</i>
                <span>{{item.description}}</span>
            </p>
        </div>
        <div class="pic" v-if="sellerInformation.albums">
            <h3 >商家实景</h3>
                <ul class="img-list">
                    <li v-for="(item,index1) in sellerInformation.albums" :key="index1">
                         <img :src="handleImg(item.cover_image_hash)" alt="">
                        <span>{{item.name}} {{item.count}}张</span> 
                    </li>
                </ul>
        </div>
        <div class="sellerInfor">
            <ul>
                <li class="li01 one-bottom-px">
                    <h3>商家信息</h3>
                    <p>{{sellerInformation.description}}</p>
                </li>
                <li class="li02 one-bottom-px">
                    <h3>商家电话</h3>
                    <p>{{sellerInformation.phone[0]}}</p>
                </li>
                <li class="li03 one-bottom-px">
                    <h3>地址</h3>
                    <p>{{sellerInformation.address}}</p>
                </li>
                <li class="li04">
                    <h3>营业时间</h3>
                    <p>{{sellerInformation.opening_hours[0]}}</p>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import {handleImg} from "@/components/common/util.js"
import Iscroll from "../../../../static/js/iscroll-probe.js"
let shopScroll;
    export default {
        props:[
            'sellerInformation'
        ],
        data(){
            return {}
        },
        methods:{
            handleImg
        },
        created(){
        },
        mounted(){
            shopScroll=new Iscroll(".shop",{
                bounce:false
            })
        },
        updated(){
            shopScroll.refresh();
        }
    }
</script>
<style scoped>
    .shop{
        background: #f5f5f5;
        position:absolute;
        top:0;
        left:0;
        width:100%;
        bottom:0;
        overflow: hidden;
    }
    .shop .active{
        background: #fff;
        padding: 15px;
        margin-bottom: 15px;
    }
    .shop .active h3{
        font-size: 16px;
    }
    .shop .active .active-item{
        margin:5px 0;
    }
    .shop .active .active-item i{
        display: inline-block;
        color:#fff;
        font-size: 12px;
        padding:1px 2px;
        border-radius: 3px;
    }
    .shop .active .active-item span{
        color:#666;
        font-size: 12px;
    }
    .shop .active .support{
        display: flex;
    }
    .shop .active .support i{
        color: rgb(153, 153, 153);
        font-size: 12px;
        line-height: 12px;
        padding:1px 1px;
        border-radius: 3px;
        height:18px;
        width:18px;
        border:1px solid #999;
        margin-right:4px;
    }
    .shop .active .support span{
        color:#999;
        font-size: 12px;
    }
    .shop .pic{
        background: #fff;
        padding: 0 15px 15px;
        margin-bottom: 15px;
    }
    .shop .pic h3{
        padding:10px 0;
    }
    .shop .pic .img-list{
        display:flex;
    }
    .shop .pic .img-list li{
        flex-wrap:nowrap;
        position:relative;
    }
     .shop .pic .img-list li:first-child img{
        margin:0;
    } 
    .shop .pic .img-list li img{
        flex:1;
        display:inline-block;
        display:80px;
        height:80px;
        margin-left:10px;
    }
    .shop .pic .img-list li span{
        color:#fff;
        position:absolute;
        bottom:5px;
        width:100%;
        text-align:center;

    }
    .shop .sellerInfor{
        background: #fff;
        padding: 0 15px;
        margin-bottom: 15px;
    }
    .shop .sellerInfor .li01{
        display:flex;
        flex-direction:column;
        padding:15px 0;
    }
    .shop .sellerInfor .li01 p{
        margin-top:15px;
        color:#666;
    }
    .shop .sellerInfor .li02{
        display:flex;
        color:#333;
        font-size:14px;
        justify-content:space-between;
        align-items:center;
        padding:15px 0;
    }
    .shop .sellerInfor .li02 p{
        color:#666;
    }
    .shop .sellerInfor .li03{
        display:flex;
        color:#333;
        font-size:14px;
        justify-content:space-between;
        align-items:center;
        padding:15px 0;
    }
    .shop .sellerInfor .li03 p{
        width:250px;
        color:#666;
    }
    .shop .sellerInfor .li04{
        display:flex;
        color:#333;
        font-size:14px;
        justify-content:space-between;
        align-items:center;
        padding:15px 0;
    }
    .shop .sellerInfor .li04 p{
        color:#666;
    }
</style>

