<template>
  <div id="app">
    <!--keep-alive优化作用,如果路由里面的内容加载过一次,就把内容放在内存中,不需要重新渲染-->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
