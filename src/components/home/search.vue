<template>
<div>
  <div class="shopping">
      <header>
          <i class="headfont arrow-left" @click="back()"></i>
          <input type="search" placeholder="请输入商品名称" v-model="keys">
          <button @click="search(keys)">搜索</button>
      </header>
      <div class="main">
        <h3 class="history" v-if="searchHistory.length">
            <span>历史记录</span>
            <i class="delete" @click="del()">X</i></h3>
        <div class="content">
            <ul>
                <li @click="search(item)" v-for="(item,index) in searchHistory" :key="index" v-if="item"><span>{{item}}</span></li>
            </ul>
        </div>
        <h3>热门搜索</h3>
        <div class="content">
            <ul>
                <li @click="search(item)" v-for="(item,index) in searchdata" :key="index" v-if="item"><span>{{item}}</span></li>
            </ul>
        </div>
      </div>
  </div>
  <router-view></router-view>
</div>
</template>
<script>
import Vuex from "vuex";
import {saveHistory,delHistory,getHistory} from "@/components/common/util.js"
import {getHotWord} from "@/components/common/getDate.js"
    export default{
        data(){
            return {
                searchdata:[],
                keys:"",
                searchHistory:[]
            }
        },
        methods:{
            back(){
                this.$router.back();
            },
            search(word){
                saveHistory("wz",word);
                this.searchHistory= ("wz");
                this.$router.push("/search/shop/"+word);
                this.keys="";
            },
            del(){
                delHistory("wz");
                this.searchHistory=getHistory("wz");
            }
        },
        computed:{
            ...Vuex.mapState(["latitude","longitude"])
        },
        created(){
            getHotWord(this.latitude,this.longitude,{locationName:'福田区深圳市民中心',geohash:'ws105rz9smwm',timestamp:new Date().getTime()}).then((d)=>{
                this.searchdata=d;
            });
            //获取历史记录
            this.searchHistory=getHistory("wz");
        },
        updated(){
            
        }
    }
</script>
<style  scoped>
    .shopping{
        width:100%;
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        background: #fff;
        z-index: 10;
    }
    .shopping header{
        height:50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .shopping header i{
        display: block;
        width: 30px;
        height:35px;
        text-align: center;
        line-height: 35px;
    }
    .shopping header input{
        border:none;
        background: #f2f2f2;
        width:270px;
        height:35px;
        padding-left: 30px;

    }
    .shopping header button{
        display: block;
        width: 50px;
        height:35px;
        border:none;
        text-align: center;
        background: none;
        font-size: 16px;
    }
    .shopping .main{
        padding: 15px;
    }
    .shopping .main h3{
        margin: 0 0 15px;
        color:#666;
        font-size:16px;
    }
    .shopping .main ul{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .shopping .main ul li{
        margin-left: 8px;
        margin-bottom: 8px;
    }
    .shopping .main ul li span{
        color:#666;
        display: block;
        padding: 5px 8px;
        background:#f7f7f7;
    }
    .shopping .main .history{
        display: flex;
        justify-content: space-between;

    }
    .shopping .main .delete
    {
        font-weight: 100;
    }
</style>


