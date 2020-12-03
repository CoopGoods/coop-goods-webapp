<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/CoopGoods/coop-goods-webapp">
            Github
          </a>
        </li>
      </ul>
      <div class="copyright">
        ©CoopGoods {{ year }} by
        <a href="https://github.com/CoopGoods" rel="noopener" target="_blank">CoopGoods</a>&nbsp;
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
