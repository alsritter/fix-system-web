<template>
  <div id="app">
    <div id="navi">
      <Nav></Nav>
    </div>
    <div id="content">
    </div>
  </div>
</template>

<script>
import Nav from './components/admin/Nav'
export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>

  #navi {
    background-image: linear-gradient(40deg, #8AC6D1, #BBDED7);
    width: 30%;
    height: 1000px;
    float: left;
  }
  #content {
    background-color: pink;
    width: 70%;
    height: 1000px;
    float: right;
  }
</style>
