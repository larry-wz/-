<template>
  <div class="hot-word">
      <header>
          <i class="headfont arrow-left" @click="back()"></i>
          <input type="text" placeholder="请输入商品名称" v-model="keyword">
          <button @click="search()">搜索</button>
      </header>
      <nav class="tab one-bottom-px">
          <li v-for="(item,index) in tabList" :key="index" 
                @click="clickAction(index)" 
                :class="{'active':activeIndex==index}">
              <span>{{item}}</span>
          </li>
      </nav>
      <div class="search-warp">
            <seller-list v-if="isShow" :keyword="searchWord" :origin='origin'></seller-list>
      </div>
      <div v-if="activeIndex!=-1" class="cover">
          <h1>123</h1>
      </div>
  </div>
</template>
<script>
import SellerList from "./GoodsList.vue"
import Iscroll from "../../../static/js/iscroll-probe.js"
let myscroll;
    export default{  
        data(){
            return {
                keyword:this.$route.params.word,
                searchWord:this.$route.params.word,
                isShow:true,
                origin:'search', //通知子组件父组件是搜索页面
                tabList:["类型","排序","筛选"],
                activeIndex:-1
            }
        },
        components:{
            "seller-list":SellerList
        },
        methods:{
            back(){
                this.$router.back();
            },
            search(){
                this.searchWord=this.keyword;
            },
            clickAction(index){
                this.activeIndex=this.activeIndex==index ? -1: index;
            }
        },
        created(){
                this.$event.$on("refreshScroll",(origin)=>{
                    if(this.origin==origin)
                        {
                            myscroll.refresh();
                        }
                })
        },
        mounted(){
            myscroll=new Iscroll(".search-warp",{
                bounce:false
            })
        },
        updated(){

        }
    }
</script>
<style  scoped>
    .hot-word{
        width:100%;
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        background: #fff;
        z-index: 10;
    }
    .hot-word header{
        height:50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .hot-word header i{
        display: block;
        width: 30px;
        height:35px;
        text-align: center;
        line-height: 35px;
    }
    .hot-word header input{
        border:none;
        background: #f2f2f2;
        width:270px;
        height:35px;
        padding-left: 30px;

    }
    .hot-word header button{
        display: block;
        width: 50px;
        height:35px;
        border:none;
        text-align: center;
        background: none;
        font-size: 16px;
    }
    .hot-word .tab{
        display: flex;
        height:40px;
        justify-content: space-around;
        align-items: center;
        color:#666;
        font-size: 14px;
    }
    .hot-word .tab .active{
        color:#3190e8;
    }
    .hot-word .search-warp{
        position: absolute;
        top:90px;
        bottom:0;
        left:0;
        width:100%;
        overflow: hidden;
    }
    .hot-word  .cover{
        background:rgba(0,0,0,0.2);
        position:absolute;
        top:90px;
        bottom:0;
        left:0;
        width:100%;
        z-index:10000;
    }
    .hot-word  .cover h1{
        background: #fff;
    }
</style>


