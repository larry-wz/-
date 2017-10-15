<template>
    <div class="search-address  ">      
        <header class="header">
            <i class="headfont arrow-left" @click="back()"></i>
            选择收货地址
        </header>
        <div class="main">
            <div class="wraper">
                <div class="search-box">
                    <div class="search-wrap">
                        <input type="search" placeholder="请输入地址" v-model="keyword">
                    </div>
                </div>
                <ul class="list">
                    <li v-for="(item,index) in dataList" :key="index" class="one-top-px">
                        <p>{{item.name}}</p>
                        <p>{{item.address}}</p>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
import Vuex from "vuex";
import {getAddressNear} from "@/components/common/getDate.js"
    export default {
        data(){
            
            return {
                keyword:"",
                dataList:[],
                action:1
            }

        },
        computed:{
            ...Vuex.mapState(["latitude","longitude"])
        },
        methods:{
            back(){
                this.$router.back();
            }
        },
        created(){
            var timer=null;
            this.$watch("keyword",(k)=>{
                clearTimeout(timer)
                timer=setTimeout(()=>{
                    getAddressNear(this.latitude,this.longitude,k).then((result)=>{
                        this.dataList=result;
                        console.log(this.dataList)
                    })
                },500)
            })
            

        }
    }
</script>
<style >
    .search-address{
        padding: 0 15px;
        width:100%;
        position: absolute;
        bottom: 0;
        left:0;
        top:0;
        z-index: 10;

    }
    .search-address .header{
        width:100%;
        height:44px;
        background: #00a3ff;
        position: absolute;
        top:0;
        left:0;
        text-align: center;
        line-height: 44px;
        font-size: 20px;
        color:#fff;
    }
    .search-address .header i{
        position:absolute;
        left:15px;
        top:0;
    }
    .search-address .main{
        position: absolute;
        top:44px;
        left:0;
        bottom: 0;
        width: 100%;
        background: #f4f4f4;
    }
    .search-address .main .search-box{
        width: 100%;
        height:56px;
        background: #fff;
        padding:0 15px;
        position: relative;
        display: flex;
        align-items: center;
    }
    .search-address .main .search-box .search-wrap{

        width:100%;
        height:36px;
        background: #f4f4f4;
        display: flex;
        align-items: center;
    }
    .search-address .main .search-box .search-wrap input{
        width: 100%;
        height:100%;
        border:none;
        background: none;
        padding:0 10px 0 30px;
    }
.search-address .main .list li{
    padding: 8px 15px;
    height:58px;
    width:100%;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #fff;
    border-top: 1px solid #eee;
}
.search-address .main .list li p:nth-child(1){
    font-weight: 900;
}
</style>


