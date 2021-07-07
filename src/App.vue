<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
a,
button {
  color: #000;
  text-decoration: none;
}
ul {
  list-style: none;
  padding: 0;
}
.btn {
  padding: 10px 20px;
  color: #FF6600;
  border-radius: 30px;
  border: 1px solid #FF6600;
}
.title {
  position: absolute;
  top: -62px;
  left: 0;
  z-index: 10;
  width: 100%;
  margin: 0;
  padding: 20px;
  font-size: 18px;
  text-align: left;
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #E6ECF0;
  background: #fff;
}
.avatar {
  display: block;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.avatar img {
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 50%;
}
  .users {
    width: 100%;
    margin-bottom: 0;
  }
  .user {
    display: flex;
    align-items: center;
  }

  .info {
    flex-grow: 1;
    text-align: left;
  }
  .info span{
    font-size: 15px;
    display: block;
  }
  .name {
    font-weight: bold;
    color: #1C1C1C;
  }
  .account {
    color: #657786;
  }
</style>
