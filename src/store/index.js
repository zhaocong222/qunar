import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

//使用到localStorage 都应该加上try cacth 有些浏览器某些模式下无法使用
export default new Vuex.Store({
    state, // es6的简写方式 -> state: sate
    //改变state
    mutations
})