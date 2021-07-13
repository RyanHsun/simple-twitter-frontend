<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default {
  name: "App",
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
body {
  font-family: 'Noto Sans JP', sans-serif;
}

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
  background: no-repeat;
  border: none;
  padding: 0;
  outline: none;
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

.avatar {
  display: block;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.avatar img {
  width: 100%;
  height: 100%;
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
