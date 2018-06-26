<template>
    <div>
        <!--父组件向子组件传值利用属性v-bind:city　简写 :city -->
        <home-header :city="city"></home-header>
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
            city: '',
            swiperList: [],
            iconList:  [],
            recommendList: [],
            weekendList: []
        }
    },
    methods: {
        getHomeInfo (){
            //通过config index.js 里面proxyTable转发
            axios.get('/api/index.json')
                .then(this.getHomeInfoSucc)
        },
        getHomeInfoSucc (res){
            console.log(res)
            res = res.data
            if (res.ret && res.data){
                const data = res.data
                this.city = data.city
                this.swiperList = data.swiperList
                this.iconList = data.iconList
                this.recommendList = data.recommendList
                this.weekendList = data.weekendList
                //console.log(this.swiperList)
            }
        }
    },
    mounted() {
        this.getHomeInfo()     
    },    
}
</script>

<style>
</style>
