<template>
  <ul class="list">
    <li class="item" v-for="item of letters" 
    :key="item" 
    @click="handleLetterClick"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    :ref="item"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    letters (){
      const letters = []
      for (let i in this.cities){
        letters.push(i)
      }
      return letters
    }
  },
  data (){
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  //数据被更新后同时页面渲染完后触发
  updated (){
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick (e){
      //兄弟组件之间传值, alphabet组件传值给父组件city,通过city组件传值给list组件
      //console.log(e.target.innerText)
      //子组件传值给父组件　利用事件 $emit
      this.$emit('change',e.target.innerText)
    },
    handleTouchStart (){
      this.touchStatus = true
    },
    handleTouchMove (e){
      if (this.touchStatus){

          //性能优化，截流,降低handleTouchMove的频率
          if (this.timer){
            clearTimeout(this.timer)
          }

          this.timer = setTimeout(() => {
            //计算最上面一个字母A距离顶部距离
            //拖动目前坐标
            const touchY = e.touches[0].clientY -79
            //计算出当前位置对应的字母
            const index = Math.floor((touchY - this.startY) / 20)
            if (index >= 0 && index < this.letters.length){
              this.$emit('change',this.letters[index])
            }
          }, 16);
            
      }
    },
    handleTouchEnd (){
      this.touchStatus = false
    }

  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .list
    display: flex
    flex-direction: column
    justify-content: center
    position: absolute
    top: 1.58rem
    right: 0
    bottom: 0
    width: .4rem
    .item
      line-height: .4rem
      text-align: center
      color: $bgColor
</style>