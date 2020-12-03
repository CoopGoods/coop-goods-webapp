<template>
  <div class="wrapper">
    <side-bar title="CoopGoods">
      <template slot="links">
        <sidebar-link :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36" to="/dashboard"/>
        <sidebar-link :name="$t('sidebar.information')" icon="tim-icons icon-alert-circle-exc" to="/information"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./AppNavbar";
import ContentFooter from "./ContentFooter";
import DashboardContent from "./Content";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
