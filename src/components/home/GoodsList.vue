<template>
    <div class="seller-list">
        <h2 v-if="!keyword">推荐商家</h2>
        <ul class="list">
            <li v-for="(seller,index) in sellerList" :key="index" class="one-bottom-px" @click="detailAction(seller)">
                <img :src="handleImg(seller.image_path)" alt="">
                <div class="item-content">
                    <h3>
                        <div>
                            <i v-if="seller.is_premium">品牌</i>
                            <span>{{seller.name}}</span>
                        </div>
                        <div v-if="seller.supports && seller.supports.length">
                            <b v-for="(supp,index1) in seller.supports" :key="index1">{{supp}}</b>
                        </div>
                        
                    </h3>
                    <div>
                        <p>
                            <i v-for=" (num,index00) in Math.floor(seller.rating)" class="score_1" :key="index00"></i>
                            <i v-if="Math.floor(seller.rating)!=seller.rating" class="score_2"></i>
                            <i class="text">{{seller.rating}}&nbsp;月售{{seller.order_num}}单</i>
                        </p>
                        <span v-if="seller.delivery_mode" :style="{
                            background:'#'+seller.delivery_mode.color,
                            color:'#'+seller.delivery_mode.text_color}">{{seller.delivery_mode.text}}</span>
                    </div>
                    <p class="one-bottom-px diver">
                        <span>
                            {{seller.minimum_order_amount | price}}起送&nbsp;&nbsp;|&nbsp;&nbsp;配送费{{seller.delivery_fee | price}}
                        </span>
                        <span >
                            {{seller.distance}}km&nbsp;|&nbsp;{{seller.order_lead_time}}分钟
                        </span>
                    </p>
                    <div class="activities" v-if="seller.activities && seller.showActives">
                        <b @click.stop="showAction(index)" v-if=" seller.activities.length>2">{{seller.activities.length}}个活动</b>
                        <p v-for="(k,ind) in seller.activities" :key="ind" v-if="ind<2 || seller.showAllActives">
                            <i :style="{background:'#'+k.icon_color}">{{k.icon_name}}</i>
                            <span>{{k.description}}</span>
                        </p>
                    </div>

                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import Vuex from "vuex";
import {handleImg,saveHistory} from "@/components/common/util.js"
import {sellerList,sellerSearchList} from "@/components/common/getDate.js"
    export default{
        props:['keyword','origin'], //origin为父组件，值分别为'home'和‘search’
        data(){
            return {
                sellerList:[],
            }
        },
        computed:{
            ...Vuex.mapState(["latitude","longitude"])
        },
        methods:{
            handleImg,
            showAction(i){
                this.sellerList[i].showAllActives = !this.sellerList[i].showAllActives;
            },
            //重新加载数据
            refresh(){
                //有搜索关键字则是搜索页
                if(this.keyword)
                    {
                        sellerSearchList(this.latitude,this.longitude,this.keyword,0,20).then((result)=>{
                            this.sellerList=result;
                        })

                    }
                else //没有搜索关键字则是首页
                    {
                        sellerList(this.latitude,this.longitude,0,20).then((result)=>{
                            this.sellerList=result;
                        })
                    }

            },
            //加载更多数据,count为数据数量
            addDate(count){
                sellerList(this.latitude,this.longitude,this.sellerList.length,20).then((result)=>{
                    result.forEach((v)=>{
                        this.sellerList.push(v);
                    },this); 
                })
            },
            //进入详情页
            detailAction(seller){
                sessionStorage.setItem("sellerDate",JSON.stringify(seller))
                this.$router.push("/home/sellerDetail");
            }

        },
        created(){
            this.refresh();
            //此方法只能有首页组件出发
            this.$event.$on("addSeller",(count)=>{
                this.addDate(count);
            });
            //监听搜索关键字变化刷新数据
            this.$watch("keyword",(word)=>{
                this.refresh()
                //存入历史记录
                if(word)
                    {
                        saveHistory('wz',word);
                    }
            })
        },
        updated(){
            //通知父组件刷新滚动
            this.$event.$emit("refreshScroll",this.origin);
        }
    }
</script>
<style>
    .seller-list{
        width:100%;
        padding: 0 10px;
        overflow: hidden;
    }
    .seller-list h2{
        width:100%;
        font-size: 16px;
        height: 35px;
        line-height: 35px;
        
    }
    .seller-list .list{
        overflow: hidden;
    }
    .seller-list .list li{
        display: flex;
        padding-bottom:10px;
        margin-top:10px;
    }
    .seller-list .list li>img{
        width:65px;
        height:65px;
    }
    .seller-list .list li>div{
        flex: 1;
    }
    .seller-list .list li .item-content{
        margin-left: 10px;
    }
    .seller-list .list li .item-content h3{
        font-size: 14px;
        position: relative;
        display:flex;
        justify-content:space-between;
    }
    .seller-list .list li .item-content h3 i{
       display: inline-block;
       font-size: 12px;
       width:30px;
       height:16px;
       background: #fff100;
       color:#6f3f15;
       line-height: 16px;
       text-align: center;
    }

    .seller-list .list li .item-content h3 b{
        display:inline-block;
        width:18px;
        height:18px;
        margin-left:5px;
        font-size: 12px;
        text-align:center;
        line-height:18px;
        color: #999;
        border: 1px solid #ddd;
        border-radius:4px;

    }
    .seller-list .list li .item-content>p{
        color: #666;
        margin-top:10px;
        font-size: 12px;
        
    }
    .seller-list .list li .item-content>div:nth-child(2){
        color:#666;
        font-size:12px;
        height:18px;
        line-height:18px;
        display:flex;
        justify-content:space-between;
        margin-top:10px;
    }
    .seller-list .list li .item-content>div:nth-child(2) i{
        display:inline-block;
        height:18px;
        line-height:18px;
    }
    .seller-list .list li .item-content>div:nth-child(2) .text{
        position:relative;
        top:-3px;
    }
    .seller-list .list li .item-content>div:nth-child(2) .score_1{
        width:18px;
        background:url('/static/images/stat_03.jpg') no-repeat;
    }
    .seller-list .list li .item-content div:nth-child(2) .score_2{
        width:18px;
        background:url('/static/images/stat_05.jpg') no-repeat;
    }
    .seller-list .list li .item-content>div:nth-child(2) span{
        padding:0 5px;
        border-radius:5px;
    }
    .seller-list .list li .item-content .diver{
        padding-bottom:10px;
        display:flex;
        justify-content:space-between;
    }
    .seller-list .list li .item-content>p span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .seller-list .list li .item-content .activities{
        position:relative;
    }
    .seller-list .list li .item-content .activities b{
        position:absolute;
        right:0;
        top:10px;
        font-size:12px;
        color:#666;        
    }
     .seller-list .list li .item-content .activities{
         padding-top:8px;
     }
    .seller-list .list li .item-content .activities p{
        margin-bottom: 3px;
        white-space:nowrap;
    }
    .seller-list .list li .item-content .activities p i{
        font-size: 12px;
        display: inline-block;
        width:20px;
        text-align: center;
        color: #fff;
        border-radius:4px;
        
    }
    .seller-list .list li .item-content .activities p span{
        font-size: 12px;
        color:#666;
        overflow:hidden;
        text-overflow:ellipsis;
    }
</style>




