<template>
  <div class="home-wrap">
    <div class="search" @click="shoppimgAction()" v-if="showSearch">
        <div>
            <span>搜索商家、商品名称</span>
        </div>
    </div>
    <div class="home">
        <div class="wraper">
            <div class="blank" v-if="showBlack">
                <img :src="scrollImg" alt="">
                <span>{{scrollTxt}}</span>
            </div>
            <header-top></header-top>
            <banner></banner>
            <advertisement></advertisement>
            <goods-list :keyword="keyword" :origin='origin'></goods-list>
            <div class="blank_btm">
                <img :src="scrollImg" alt="">
                <span>{{downLoadTxt}}</span>
            </div>
        </div>
    </div>
    <router-view ></router-view>
  </div>
</template>
<script>
import Iscroll from "../../static/js/iscroll-probe.js"
import HeaderTop from "../components/home/header.vue"
import Banner from "../components/home/banner.vue"
import Advertisement from "../components/home/Advertisement.vue"
import GoodsList from "../components/home/GoodsList.vue"
import SearcherList from "../components/home/searchShopList.vue"
let homeScroll;
export default{
    data(){
        return {
            scrollImg:"static/images/ajax-loader.gif",
            scrollTxt:"下拉刷新",
            showSearch:false,
            downLoadTxt:"加载更多",
            showBlack:false,
            showSearchList:false,
            keyword:"", //首页搜索参数为空
            origin:'home'//通知子组件父组件是首页
        }
    },
    methods:{
        //home组件切换页面
        shoppimgAction(){
            this.$event.$emit("chagngePage","/home/searchShopping")
        }
    },
    components:{
        "header-top":HeaderTop,
        "banner":Banner,
        "advertisement":Advertisement,
        "goods-list":GoodsList,
        "search-list":SearcherList
    },
    created(){
        this.$event.$on("chagngePage",(url)=>{
            this.$router.push(url)
        });
        this.$event.$on("refreshScroll",(origin)=>{
            if(this.origin==origin)
                {
                    homeScroll.refresh();
                }
        });
    },
    mounted(){
        homeScroll=new Iscroll(".home",{probeType: 3})
        homeScroll.on("scrollStart",()=>{
                this.showBlack=true;
                homeScroll.refresh();
                homeScroll.scrollTo(0,-40)
        })
        homeScroll.on("scroll",()=>{
                if(homeScroll.y>-40 && homeScroll.y < 0)
                {
                    //homeScroll.scrollTo(0,-40,100);
                    this.scrollTxt="下拉刷新"
                } 
                else if(homeScroll.y > 0)
                {
                    this.scrollTxt="释放刷新"
                }
                if(homeScroll.y<=-95)
                {
                    this.showSearch=true;
                }
                else{
                    this.showSearch=!true;
                }
        })
        homeScroll.on("scrollEnd",()=>{
                if(homeScroll.y>-40 && homeScroll.y < 0)
                {
                    homeScroll.scrollTo(0,-40);
                } 
                else if(homeScroll.y==0)
                {
                    this.scrollTxt="正在刷新";

                    setTimeout(()=>{
                        homeScroll.scrollTo(0,-40,300)
                        this.scrollTxt="下拉刷新"
                    },1000)
                }
               if( homeScroll.y <=  homeScroll.maxScrollY)
                {
                    this.downLoadTxt="正在记载数据";
                    setTimeout(()=>{
                        this.$event.$emit("addSeller",20);
                        homeScroll.scrollTo(0,homeScroll.maxScrollY+40,300)
                        this.downLoadTxt="上拉加载更多";
                    },2000)
                }
        })
    },
    updated(){
        homeScroll.refresh();
    }

}
  
</script>
<style scoped>
    .home{
        position: absolute;
        width:100%;
        top:0;
        bottom:49px;
        overflow: hidden;
    }
    .home .blank,.home .blank_btm{
        width:100%;
        height:40px;
        text-align: center;
    }
    .home .blank img,.blank_btm img{
        width:20px;
        height:20px;
        display: inline-block;
         vertical-align: middle;
        }
     .home .blank span{
         display: inline-block;
         height:40px;
         line-height: 40px;
        
     }
.home-wrap .search{
    padding:0 14px;
    width:100%;
    height:52px;
    background:#00a8ff;
    z-index:10;
    position:absolute;
    top:0px;
    left:0;
}
.home-wrap .search>div{
    height:36px;
    background: #fff; 
    text-align: center;
    position: relative;
    top: 8px;
}
.home-wrap .search>div span{
    line-height: 36px;
    font-size: 12px;
    color: #666;
}
        
</style>
