<template>
  <!-- Modal -->
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <img src="~@/assets/img/icon_close-og.svg" alt="">
          </button>
        </div>
        <div class="modal-body">
          <form class="create-tweet" action="">
            <div class="create-tweet-wrap">
              <span class="avatar" href="">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
              </span>
              <textarea v-model="newTweet" class="tweet-textarea" name="" id="" cols="30" rows="5" maxlength="140" placeholder="有什麼新鮮事？"></textarea>
            </div>
            <button class="btn tweet-button" @click.stop.prevent="addTweet">推文</button>
          </form>
        </div>
      </div>
    </div>
</template>
<script>

export default {
  data() {
    return{
      newTweet: '',
    }
  },
  methods: {
    addTweet() {
      this.newTweet = ''
      this.$emit('after-submit-tweet') 
    },
  },
}
</script>

<style scoped>
  .close {
    margin: 0;
    padding: 0;
    opacity: 1;
  }
  .create-tweet {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 200px;
  }
  .create-tweet-wrap {
    display: flex;
    width: 100%;
    text-align: left;
  }
  .tweet-textarea {
    font-size: 18px;
    color: #9197A3;
    border: none;
    outline: none;
    width: calc( 100% - 60px);
    resize: none;
  }
  .avatar {
    display: inline-block;
  }
  .tweet-button {
    align-self: flex-end;
    color: #fff;
    background-color: #FF6600;
  }
</style>