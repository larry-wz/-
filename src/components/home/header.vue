<template>
<div>
  <header id="header">
      <div class="top">
        <div class="address headfont pos arrow-btm" @click="addressAction()">
            {{address}}
        </div>
        <div class="tem">
            <div>
                <span>{{weather.temperature}}°</span>
                <span>{{weather.description}}</span>
            </div>
            <img :src="handleImg(weather.image_hash)" alt="">
        </div>
      </div>
      <div class="search" @click="shoppimgAction()">
          <div>
              <span>搜索商家、商品名称</span>
          </div>
      </div>
      <div class="hot-word">
          <span v-for="(word,index) in hotWord" :key="index" @click="HotWordAction(word)">{{word}}</span>
      </div>
  </header>
</div>
</template>
<script>
import Vuex from "vuex";
import {handleImg} from "@/components/common/util.js"
import {getWeather,getAddress,getHotWord} from "@/components/common/getDate.js";
export default{
    data(){
        return {
            address:"",
            hotWord:[],
            weather:{}
        }
    },
    computed:{
        ...Vuex.mapState(["latitude","longitude"])
        
    },
    methods:{
        handleImg,
        //home组件切换页面
        addressAction(){
            this.$event.$emit("chagngePage","/home/searchAddress")
        },
         //home组件切换页面
        HotWordAction(word){
            this.$router.push("/home/searchHotWord/"+word)
        },
         //home组件切换页面
        shoppimgAction(){
            this.$router.push("/search")
        },
        //刷新数据
        refresh(){
            getWeather(this.latitude,this.longitude).then((result)=>{
                this.weather=result;
            }),
            getAddress(this.latitude,this.longitude).then((result)=>{
                this.address=result;
            }),
            getHotWord(this.latitude,this.longitude).then((result)=>{
                this.hotWord=result
            })
        }
    },
    created(){
        this.refresh();
    },
    updated(){
        //刷新滚动
        this.$event.$emit("refreshScroll");
    }
}
    
</script>
<style>
#header{
    width:100%;
    background: #00a8ff;
    padding:0 14px;
}
#header .top{
    width:100%;
    height:45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#header .top .address{
    color: #fff;
    font-size: 12px;
    font-weight: 900;
    width: 208px;
}

#header .top .tem{
    display: flex;
    align-items: center;
}
#header .top .tem>div{
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color:#fff;
    align-items: center;
    justify-content:space-around;
    padding: 5px 0;
}
#header .top .tem img{
    display: block;
    width: 25px;
    height:25px;
}
#header .top .tem{
    display: flex;
}
#header .search{
    width:100%;
    height:52px;

}
#header .search>div{
    height:36px;
    background: #fff; 
    text-align: center;
    position: relative;
    top: 8px;
}
#header .search>div span{
    line-height: 36px;
    font-size: 12px;
    color: #666;
}
#header .hot-word{
    width:100%;
    height:36px;
    color: #fff;
    font-size: 12px;
    line-height: 36px;
    overflow-x: auto;
    white-space: nowrap;
}
#header .hot-word span{
    display: inline-block;
    margin-right: 15px;
}
</style>



