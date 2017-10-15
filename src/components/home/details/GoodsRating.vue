<template>
<div class="score-wrap">
    <div class="score">
        <div class="score-inner">
            <div class="left-content one-right-px">
                <strong>{{sellerScore.overall_score | round}}</strong>
                <span class="sp1">综合评价</span>
                <span class="sp2">高于周边商家{{sellerScore.compare_rating | persent}}%</span>
            </div>
            <div class="right-content">
                <ul>
                    <li>
                        <strong>服务态度</strong>
                        <span class="txt">
                            <i v-for=" (num,index00) in Math.floor(sellerScore.service_score)" class="score_1" :key="index00"></i>
                            <i v-if="Math.floor(sellerScore.service_score)!=sellerScore.service_score" class="score_2"></i>
                            {{sellerScore.service_score | round}}</span>
                    </li>
                    <li>
                        <strong>菜品评价</strong>
                        <span class="txt">
                            <i v-for=" (num,index01) in Math.floor(sellerScore.service_score)" class="score_1" :key="index01"></i>
                            <i v-if="Math.floor(sellerScore.service_score)!=sellerScore.service_score" class="score_2"></i>
                            {{sellerScore.food_score | round}}</span>
                    </li>
                    <li>
                        <strong>送达时间</strong>
                        <strong>{{sellerScore.deliver_time}}分钟</strong>
                    </li>
                </ul>
            </div>
        </div>
        <div class="rating">
                <span v-for="(item,index) in sellerRating" :key="index" :class="{
                        'activeY':currentActive==index && !item.unsatisfied,
                        'activeN':currentActive==index && item.unsatisfied,
                        'yes':currentActive!=index && !item.unsatisfied,
                        'no':currentActive!=index && item.unsatisfied
                }" @click="clickAction(index,item.name)">
                    {{item.name}}({{item.count}})
                </span>
        </div>
        <div class="user-coment">
            <ul class="one-top-px" v-for="(arr ,index03) in userCommentData" :key="index03" v-if="arr[word]">
                <li class="list-item one-bottom-px" v-for="(item,d) in arr[word]" :key="d"> 
                    <img src="https://fuss10.elemecdn.com/cf5d0b0f2fc83f3ac3e4a0cfae891256png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/" />
                    <div class="content">
                        <p class="p1">
                            <span>{{item.username}}</span>
                            <span>{{item.rated_at}}</span>
                        </p>
                        <p class="p2">
                            <i v-for=" (num,index00) in Math.floor(item.rating_star)" class="score_1" :key="index00"></i>
                            <i v-if="Math.floor(item.rating_star)!=item.rating_star" class="score_2"></i>
                            <span>{{item.rating_star}}</span>
                        </p>
                        <p class="p3">
                            <span>{{item.time_spent_desc}}</span>
                        </p>
                        <p class="p4">
                            <span v-for="txt in item.item_ratings">{{txt.food_name}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import {userComment} from "@/components/common/getDate.js";
import Iscroll from "../../../../static/js/iscroll-probe.js"
let scoreScroll;
export default{
    props:['sellerRating','userComment','sellerScore','sellerId'],
    data(){
        return {
            sellerInfor:[],
            currentActive:0,
            userCommentData:[],
            word:"全部"
        }
    },
    methods:{
        clickAction(index,key){
            this.currentActive=index;
            this.word=key;
            this.initData();
        },
        initData(){
            //判断是否获取过数据
            if(!this.userCommentData[this.word])
                {
                    userComment(this.sellerId,this.word,0).then((result)=>{
                        var obj={};
                        obj[this.word]=result;
                        this.userCommentData.push(obj);
                    })
                }
        }
    },
    created(){
        this.initData();

    },
    mounted() {
        scoreScroll=new Iscroll('.score-wrap',{
            
        })
    },
    updated () {
        
        scoreScroll.refresh();
    }
}
    
</script>
<style scoped>
    .score-wrap{
        background: #f5f5f5;
        position:absolute;
        top:0;
        left:0;
        width:100%;
        bottom:0;
        overflow: hidden;
    }
    .score-inner{
        display:flex;
        padding:15px;
        background: #fff;
        margin-bottom: 15px;
    }
    .score-inner .left-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:40%;
        padding-right: 15px;
    }
    .score-inner .left-content strong{
        color:#ff6000;
        font-size: 24px;
        font-weight: 900;
    }
    .score-inner .left-content .sp1{
        color:#666;
        font-size: 16px;
    }
    .score-inner .left-content .sp2{
        color:#999;
        font-size: 12px;
    }
    .score-inner .right-content{
        flex:1;
        padding-left: 20px;
    }
    .score-inner .right-content .txt{
        color:#f60;
        font-size: 14px;
    }
    .score-inner .right-content strong{
        font-size: 14px;
        color:#666;
    }
    .score-inner .right-content li strong:nth-child(1){
        margin-right: 10px;
    }
    .score_1{
        display: inline-block;
        width:12px;
        height:12px;
        background:url('/static/images/stat_03.jpg') no-repeat;
        background-size: 100%;
    }
    .score_2{
        display: inline-block;
        width:12px;
        height:12px;
        background:url('/static/images/stat_05.jpg') no-repeat;
        background-size: 100%;
    }
    .score .rating{
        padding:15px 15px;
        background:#fff;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .score .rating span{
        height:28px;
        line-height:28px;
        text-align:center;
        padding: 0 8px;
        margin-right: 8px;
        margin-bottom: 10px;
        font-size:14px;
        color:#6d7885;
    }
    /* .score .rating span:first-child{
        margin:0;
    } */
    .score .rating .activeY{
        background:#0097ff;
        color:#fff;
    }
    .score .rating .activeN{
        background:#ccc;
        color:#fff;
    }
    .score .rating .yes{
        background:#ebf5ff;
    }
    .score .rating .no{
        background:#f5f5f5;
    }
    .score  .user-coment ul{
        padding:0 15px;
         background:#fff;
    }
    .score  .user-coment .list-item{
        display: flex;
        padding:15px 0;
    }
    .score  .user-coment .list-item>img{
        width:30px;
        height:30px;
        margin-right: 15px;
    }
    .score  .user-coment .list-item .p1 span:nth-child(1){
        color:#333;
    }
    .score  .user-coment .list-item .p1 span:nth-child(2){
        font-size: 12px;
        color:#bbb;
    }
    .score  .user-coment .list-item .p3{
        font-size: 12px;
        color:#666;
        margin: 3px;
    }
    .score  .user-coment .list-item .p4 span{
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 80px;
        color:#6d7885;
        border: 1px solid #eee;
        font-size: 12px;
        padding:2px 3px;
        margin: 8px 4px;
    }

</style>