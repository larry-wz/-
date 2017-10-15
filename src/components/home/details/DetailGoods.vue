<template>
    <div class="goods">
        <div class="side-nav">
            <ul>
                <li v-for="(goods,index) in goodsList" :key="index" :class="{'active':currentActive==index}" @click="clickAction(index)">
                    <i v-if="currentActive==index"></i>
                    <span>{{goods.name}}</span>
                </li>
            </ul>
        </div>
        <div class="content">
            <div class="content-wrap">
                <div class="content-item" v-for="(goods,index1) in goodsList" :key="index1">
                    <h3>
                        <span>{{goods.name}}</span>
                        <span>{{goods.description}}</span>
                    </h3>
                    <ul>
                        <li v-for="(item,index2) in goods.foods" :key="index2" class="one-bottom-px">
                            <img :src="handleImg(item.image_path)" alt="">
                            <div>
                                <h4>{{item.name}}</h4>
                                <p class="p1">{{item.description}}</p>
                                <p class="p2">
                                    <span>月售{{item.month_sales}}份</span>
                                    <span>好评率{{item.satisfy_rate}}%</span>
                                </p>
                                <p class="p3">
                                    <span v-if="item.specfoods.length==1">{{item.specfoods[0].price | price }}</span>
                                    <span v-if="item.specfoods.length>1">{{getMin(item.specfoods) | price }}&nbsp;起</span>
                                    <strong v-if="item.specfoods.length==1">
                                        <i @click="reduce(orderData[index1].foods,index2)">-</i>&nbsp;&nbsp;<b v-if="orderData.length" class="buynum">{{orderData[index1].foods[index2].num}}</b>&nbsp;&nbsp;
                                        <i @click="add(orderData[index1].foods,index2)">+</i>
                                    </strong>
                                    <strong class="select" v-if="item.specfoods.length>1">
                                        <b @click="choose()">选规格</b>
                                    </strong>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {handleImg,handleDetailImg,getMin} from "@/components/common/util.js"
import Iscroll from "../../../../static/js/iscroll-probe.js"
import Vuex from "vuex"
let contentScroll;
let navScroll;
export default {
    props:['sellerId',"goodsList"],
    data(){
            return {
                seller:{},
                currentActive:0,
                orderData:[],
                dataIndex:-1
            }
        },
    computed:{
        ...Vuex.mapState(["order"]),
    },
    methods:{
        handleImg,
        handleDetailImg,
        getMin,
        ...Vuex.mapMutations(["deleteOrder"]),
        //左侧点击，右侧滚动
        clickAction(index){
            this.currentActive=index;
            //console.log(this.currentActive)
            //获取右侧高度
            var arr=Array.from(document.querySelectorAll(".content-item"));
            var aHeight=arr.map((o)=>{
                return -o.offsetHeight;
            })
            // contentScroll
            var scrollHeight=0
            for (var i=0;i<index;i++)
                {
                    scrollHeight+=aHeight[i];
                }
            if(scrollHeight<contentScroll.maxScrollY)
                {
                    scrollHeight=contentScroll.maxScrollY;
                }
            contentScroll.scrollTo(0,scrollHeight);
        },
        //右侧点击，左侧滚动
        itemScrollAction(){
            //获取右侧高度
            var arr=Array.from(document.querySelectorAll(".content-item"));
            var aHeight=arr.map((o)=>{
                return -o.offsetHeight;
            })

            for(var i=0;i<aHeight.length;i++)
                {
                    var max=0;
                    var min=0;
                    for(var j=0 ;j<i;j++)
                        {
                            min+=aHeight[j];
                        }
                    max=min+aHeight[i];
                    if(contentScroll.y <= min && contentScroll.y > max)
                        {
                            this.currentActive=j;
                            break;
                        }
                }
        },
        //数量减
        reduce(obj,index){
            if(obj[index].num-1<0)
                {
                    obj[index].num=0;
                }
            else
            {
                obj[index].num--;
            }
            
        },
        //数量加
        add(obj,index){
            obj[index].num++;
        },
        //选规格
        choose(){

        },
        //初始化数据
        init(){
            //判断状态管理仓库中是否有当前数据，没有则新建数据并存进store中
            for (var i=0;i<this.order.length;i++)
                {
                    if(this.order[i][this.sellerId])
                        {
                            this.orderData=[...this.order[i][this.sellerId]];
                            break;
                        }
                }
            if(i==this.order.length) //初始化数据
                {
                    //生成商家订单数据
                    var arr=[]
                    for(var i=0;i<this.goodsList.length;i++)
                        {
                            var a=[];
                            for(var j=0;j<this.goodsList[i].foods.length;j++)
                                {
                                    a.push({
                                        name:this.goodsList[i].foods[j].name,
                                        price:this.goodsList[i].foods[j].specfoods[0].price,
                                        num:0
                                    })
                                }
                            arr.push({
                                type:this.goodsList[i].name,
                                foods:a
                            })
                        }
                    this.orderData=arr;
                }
            }
    },
    created(){
        //当goodsList数据存在是初始化
        this.init()
        //监听当前商家订单数据，修改store中的数据
        this.$watch("orderData",()=>{
            console.log(999)
        },{deep:true});

    },
    mounted(){
        contentScroll=new Iscroll(".content",{
            click:true,
            bounce:false,
            probeType:3
        })
        //监听滚动
        contentScroll.on("scroll",()=>{
            this.itemScrollAction()
        })
        navScroll=new Iscroll(".side-nav",{
            bounce:false,
            probeType:3
        })
    },
    updated(){
        contentScroll.refresh();
        navScroll.refresh();
    }
    
}
</script>
<style scoped>
    .goods{
        position:absolute;
        bottom:0;
        left:0;
        top:0;
        width:100%;
        display:flex;
        overflow:hidden;
    }
    .goods  .side-nav{
        width:85px;
        background:#f8f8f8;
    }
    .goods  .side-nav li{
        height: 52px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .goods  .side-nav li span{
        display: block;
        width: 70px;
        font-size: 12px;
        color: #666;
    }
    .goods  .side-nav .active{
        background: #fff;
        position: relative;
    }
    .goods  .side-nav .active i{
        display: block;
        width: 3px;
        height: 100%;
        position: absolute;
        left: 0;
        background: #3190e8;
    }
    .goods  .side-nav span{
        position: relative;
    }
    .goods  .side-nav b{
        position:absolute;
        padding:0 3px;
        height:10px;
        background:red;
        border-radius: 50%;
    }
    .goods .content{
        flex:1;
    }
    .goods .content h3{
        height: 32px;
        width: 100%;
        background: #f1f1f1;
        color: #666;
        font-size: 14px;
        line-height: 32px;
        padding-left: 10px;
    }
    .goods .content ul{
        padding: 0 15px;
    }
    .goods .content li{
        display: flex;
        padding:15px 0;
    }
    .goods .content li img{
        display: block;
        width:82px;
        height:82px;
        margin-right: 10px;
    }
    .goods .content li>div{
        flex: 1;
    }
    .goods .content li>div  h4{
        color:#333;
        font-size: 14px;
    } 
    .goods .content li>div .p1{
        color:#ccc;
        line-height: 18px;
        font-size: 10px;
    } 
    .goods .content li>div .p2{
        color:#ccc;
        font-size: 12px;
    } 
    .goods .content li>div .p3{
        display: flex;
        width:100%;
        justify-content: space-between;
        color:#f60;
        font-size: 16px;
    } 
    .goods .content li>div .p3 i{
        display: inline-block;
        font-weight: 900;
        width:20px;
        height:20px;
        color:#fff;
        line-height: 16px;
        text-align: center;
        background: #3190e8;
        border-radius: 50%;
        font-size: 18px;

    }
    .goods .content li>div .p3 strong i:first-child{
        background: #fff;
        color: #3190e8;
        width:19px;
        height:19px;
        border:1px solid #3190e8;
    }
    .goods .content li>div .p3 strong .buynum{
        color:#666;
        display: inline-block;
        height:20px;
        line-height: 12px;
        font-size: 12px;
        position: relative;
        top:-2px;
    }
    .goods .content li>div .p3 strong{
        display: block;
    }
    .goods .content li>div .p3 .select b{
        
        display: inline-block;
        background: #3199e8;
        font-size: 12px;
        width: 50px;
        height:20px;;
        color: #fff;
        line-height: 20px;
        text-align: center;
        border-radius: 10px;
        
    }
</style>
