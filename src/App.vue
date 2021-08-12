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
  overscroll-behavior-y: none;
}

/* no scroll bar */
.tweets-wrap::-webkit-scrollbar,
.tweet-wrap::-webkit-scrollbar,
.users::-webkit-scrollbar,
.user-wrap::-webkit-scrollbar,
.admin-users-wrap::-webkit-scrollbar,
.admin-tweets-wrap::-webkit-scrollbar,
.chat-wrap::-webkit-scrollbar,
.private-users-wrap::-webkit-scrollbar {
  display: none;
}
.tweets-wrap,
.tweet-wrap,
.users,
.user-wrap,
.admin-users-wrap,
.admin-tweets-wrap,
.chat-wrap,
.private-users-wrap {
  scrollbar-width: none; /* Newer Firefox and not confirmed */
  overflow: -moz-scrollbars-none; /* Older Firefox*/
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
  padding: 10px 15px;
  min-width: 95px;
  color: #FF6600;
  border-radius: 30px;
  border: 1px solid #FF6600;
}
.btn:hover {
  color: #ff6600;
  background: #faece3;
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
.modal-body .user-info {
  margin-bottom: 10px;
}
.modal-content {
  border-radius: 14px;
}
@media (max-width: 992px) {
  .container {
    grid-template-columns: 25% auto;
    padding-right: 0;
  }
}

@media (max-width: 576px) {
  .container {
    grid-template-columns: 15% auto;
  }
  .logo {
    margin-left: -3px;
  }
}
</style>
