<template>
  <section class="sidebar">
    <div class="top">
      <h1 class="logo">
        <a href="#">
          <img src="~@/assets/img/logo.svg" alt="">
        </a>
      </h1>
      <nav class="navigation">
        <a class="nav-item" href="#">
          <div class="icon index">
            <img src="~@/assets/img/icon_index.svg" alt="">
          </div>
          <div>推文清單</div>
        </a>
        <a class="nav-item" href="#">
          <div class="icon user">
            <img src="~@/assets/img/icon_user.svg" alt="">
          </div>
          <div>使用者列表</div>
        </a>
      </nav>
    </div>
    <div class="bottom">
      <a class="logout" href="#">
        <div class="icon">
          <img src="~@/assets/img/icon_logout.svg" alt="">
        </div>
        <div>登出</div>
      </a>
    </div>
  </section>
</template>

<style scoped>
  .sidebar {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .sidebar > div {
    width: 100%;
    text-align: left;
  }
  .logo {
    margin-bottom: 40px;
  }
  .nav-item,
  .logout {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .nav-item:hover,
  .logout:hover,
  .nav-item.active {
    color: #FF6600;
  }
  .icon {
    margin-right: 20px;
  }
  .new-tweet {
    width: 80%;
    color: #fff;
    background: #FF6600;
  }
</style>