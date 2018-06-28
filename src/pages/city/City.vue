<template>
    <div>
        <!--@change 监听事件-->
        <city-header></city-header>
        <city-search :cities="cities"></city-search>
        <city-list :cities="cities" 
        :hot="hotCities" 
        :letter="letter"></city-list>
        <city-alphabet :cities="cities"
        @change="handleLetterChange" 
        ></city-alphabet>
    </div>
</template>

<script>
import axios from 'axios'
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'
export default {
    name: 'City',
    //注册子组件
    components: {
        CityHeader,
        CitySearch,
        CityList,
        CityAlphabet
    },
    data (){
        return {
            cities: {},
            hotCities: [],
            letter: ''
        }
    },
    methods: {
        getCityInfo (){
            axios.get('/api/city.json')
                .then(this.hanleGetCityInfoSucc)
        },
        hanleGetCityInfoSucc (res){
            res = res.data
            if (res.ret && res.data){
                const data = res.data
                this.cities = data.cities
                this.hotCities = data.hotCities
            }
        },
        handleLetterChange (letter){
            //接收到子组件alphabet(通过事件),转发给list组件(通过属性)
            this.letter = letter
        }
    },
    mounted() {
        this.getCityInfo()
    },
}
</script>

<style lang="stylus" scoped>

</style>
