import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);

const state={
    latitude:22.54286,
    longitude:114.059563,
    order:[] //订单数据
}
const getters={}
const mutations={
    //修改数据
    modifyOrder(st,parama)
    {

    },
    //删除数据
    deleteOrder(st,index)
    {
        st.order.splice(index,1);
    }
}
const actions={}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})


