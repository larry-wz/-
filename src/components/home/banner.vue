<template>
    <div class="banner">
        <div class="swiper-container">
            <div class="swiper-wrapper">

                <div class="swiper-slide" v-for="(list,index) in bannerImgList" :key="index">
                    <div class="list" v-for="(item,ind) in list" :key="ind">
                        <img :src="handleImg(item.image_hash)" alt="">
                        <span>{{item.name}}</span>
                    </div>
                </div>

            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>

    </div>

</template>
<script>
import Vuex from "vuex";
import {handleImg} from "@/components/common/util.js"
import {entryList} from "@/components/common/getDate.js"
    export default{
        data(){
            return {
                bannerImgList:[],
                mySwiper:{}
            }
        },
        methods:{
            handleImg
        },
        computed:{
            ...Vuex.mapState(["latitude","longitude"])
        },
        created(){
            entryList(this.latitude,this.longitude).then((d)=>{
                while(d.length)
                    {
                        var list =d.splice(0,8);
                        this.bannerImgList.push(list);
                    }
                
            })
        },
        mounted(){
              this.mySwiper = new Swiper ('.swiper-container', {
                
                // 如果需要分页器
                pagination: '.swiper-pagination',
            })  
        },
        updated(){
            this.mySwiper.update();
            //刷新滚动
            this.$event.$emit("refreshScroll");
        
        }
    }
</script>
<style scoped>
    .banner{

    }
    .banner .swiper-wrapper{
        padding-bottom:20px; 
    }
    .banner .swiper-slide{
        width:100%;
        display: flex;
        flex-wrap: wrap;
    }
    .banner .swiper-slide .list{
        width:25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
    }
    .banner .swiper-slide .list>img{
        width:45px;
        height:45px;
    }
    .banner .swiper-slide .list>span{
        color:#666;
        font-size: 12px;
    }
</style>


