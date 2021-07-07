<template>
  <ul class="followships-list">
    <li class="followships-item">
      <a class="followships-avatar avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">user1</span>
          <span class="account">@user1</span>
        </a>
        <button class="btn toggle-follow is-following">正在跟隨</button>
        <div class="followships-intro">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </li>
    <li class="followships-item">
      <a class="followships-avatar avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">user1</span>
          <span class="account">@user1</span>
        </a>
        <button class="btn toggle-follow">跟隨</button>
        <div class="followships-intro">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </li>
    <li class="followships-item">
      <a class="followships-avatar avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">user1</span>
          <span class="account">@user1</span>
        </a>
        <button class="btn toggle-follow is-following">正在跟隨</button>
        <div class="followships-intro">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </li>
    <li class="followships-item">
      <a class="followships-avatar avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">user1</span>
          <span class="account">@user1</span>
        </a>
        <button class="btn toggle-follow">跟隨</button>
        <div class="followships-intro">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </li>
    <li class="followships-item">
      <a class="followships-avatar avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">user1</span>
          <span class="account">@user1</span>
        </a>
        <button class="btn toggle-follow">跟隨</button>
        <div class="followships-intro">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </li>
    <li class="followships-item">
      <a class="followships-avatar avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">user1</span>
          <span class="account">@user1</span>
        </a>
        <button class="btn toggle-follow is-following">正在跟隨</button>
        <div class="followships-intro">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </li>
    <li class="followships-item">
      <a class="followships-avatar avatar">
        <img src="https://randomuser.me/api/portraits/men/88.jpg" alt="">
      </a>
      <div class="followships-content">
        <a class="followships-info" href="">
          <span class="name">user1</span>
          <span class="account">@user1</span>
        </a>
        <button class="btn toggle-follow is-following">正在跟隨</button>
        <div class="followships-intro">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .followships-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    border-width: 0 1px;
    border-style: solid;
    border-color: #E6ECF0;
  }
  .followships-item {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 20px;
    border-bottom: 1px solid #E6ECF0;
  }
  .followships-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: calc( 100% - 60px );
  }
  .followships-info {
    flex-grow: 1;
  }
  .followships-info span{
    display: block;
  }
  .followships-intro {
    width: 100%;
    margin-top: 10px;
  }


  .is-following {
    color: #fff;
    background-color: #FF6600;
  }

</style>