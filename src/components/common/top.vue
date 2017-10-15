<template>
      <header>
          <button @click="back" class="iconfont">&#xe602;</button>
          {{data}}
      </header>
</template>
<script>
export default{
    props:{
        data:String
    },
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>
<style scoped>
    header{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:44px;
        background:#0090ff;
        text-align:center;
        line-height:44px;
        font-size:16px;
        color:#fff;
    }
    button{
        position:absolute;
        top:0;
        left:0;
    }

</style>
