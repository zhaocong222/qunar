<template>
    <div>
        <!--父组件向子组件传值利用属性v-bind:city　简写 :city -->
        <home-header></home-header>
        <home-swiper :list="swiperList"></home-swiper>
        <home-icons  :list="iconList"></home-icons>
        <home-recommend :list="recommendList"></home-recommend>
        <home-weekend :list="weekendList"></home-weekend>
    </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
import {mapState} from 'vuex'

//父组件
export default {
    name: 'Home',
    //注册子组件
    components: {
        HomeHeader,
        HomeSwiper,
        HomeIcons,
        HomeRecommend,
        HomeWeekend
    },
    data (){
        return {
            lastCity: '',
            swiperList: [],
            iconList:  [],
            recommendList: [],
            weekendList: []
        }
    },
    computed: {
        ...mapState(['city'])
    },
    methods: {
        getHomeInfo (){
            //通过config index.js 里面proxyTable转发
            axios.get('/api/index.json?city=' + this.city)
                .then(this.getHomeInfoSucc)
        },
        getHomeInfoSucc (res){
            console.log(res)
            res = res.data
            if (res.ret && res.data){
                const data = res.data
                this.swiperList = data.swiperList
                this.iconList = data.iconList
                this.recommendList = data.recommendList
                this.weekendList = data.weekendList
                //console.log(this.swiperList)
            }
        }
    },
    mounted (){
        this.lastCity = this.city
        this.getHomeInfo()     
    }, 
    //当使用了kepp-alive标签后,多出一个生命周期函数 (当页面重新显示的时候会执行)
    activated (){
        if (this.city !== this.lastCity){
            //重新发送请求
            this.lastCity = this.city
            this.getHomeInfo()
        }
    },
}
</script>

<style>
</style>
