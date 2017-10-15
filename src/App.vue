<template>
  <div id="app">
    <router-view></router-view>
    <nav class="tabs one-top-px">
      <router-link :key="index" v-for="(item,index) in tabList" :to="item.path" tag="li" class="item ">
        <i class="tabicon" :class="item.icon"></i>
        <span>{{item.title}}</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tabList:[
        {
          title:"外卖",path:"/home",icon:"icon-eleme"
        },
        {
          title:"发现",path:"/discover",icon:"icon-discover"
        },
        {
          title:"订单",path:"/order",icon:"icon-order"
        },
        {
          title:"我的",path:"/me",icon:"icon-me"
        }
      ]
    }
  }

}
</script>

<style >
#app {
  width:100%;
  position: absolute;
  top:0;
  left:0;
  bottom: 0;
  overflow: hidden;
}
#app .tabs{
  width:100%;
  height:49px;
  position:absolute;
  bottom:0;
  left:0;
  display:flex;
}
#app .tabs .item{
  width: 25vw;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
}
#app .tabs .item.router-link-active{
  color:#0089dc;
}

</style>
