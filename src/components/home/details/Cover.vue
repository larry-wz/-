<template>
    <div class="cover">
        <h1>{{sellerInfor.name}}</h1>
        <p>
            <span>
            <i v-for=" (num,index00) in Math.floor(sellerInfor.rating)" class="score_1" :key="index00"></i>
            <i v-if="Math.floor(sellerInfor.rating)!=sellerInfor.rating" class="score_2"></i>
            </span>
        </p>
        <button @click="back()">X</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            sellerInfor:{}
        }
    },
    methods:{
        back(){
            this.$event.$emit("showCover",false);
        }
    },
    created(){
        var arr= JSON.parse(sessionStorage.getItem("sellerDate"))
        if(arr)
            {
                this.sellerInfor=arr;
                console.log(this.sellerInfor)
            }
    }
}

</script>
<style scoped>
    .cover{
        position:absolute;
        bottom:0;
        left:0;
        top:0;
        width:100%;
        background:#262626;
        z-index:10000;
    }
    .cover h1{
        color:#fff;
        font-size: 16px;
        font-weight: normal;
        text-align: center;
        
    }
    .cover  p{
        margin: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .score_1{
        display: inline-block;
        width:18px;
        height:18px;
        background:url('/static/images/stat_03.jpg') no-repeat;
    }
    .score_2{
        display: inline-block;
        width:18px;
        height:18px;
        background:url('/static/images/stat_05.jpg') no-repeat;
    }    
</style>