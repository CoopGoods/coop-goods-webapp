/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import './plugins/bootstrap-vue';
import './plugins/font-awesome';
import './plugins/clipboard';
import Vuex from "vuex";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch';
import App from "./App";
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n";
import './registerServiceWorker';
import Web3 from "web3";

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(Vuex);

const settings = buildSettings();
const services = buildServices(settings);
// create store
const store = new Vuex.Store({
  state: {
    settings: settings,
    services: services,
    cache: {
      demurrageableTokenContractInstance: null,
    }
  },
  mutations: {}
});

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App),
  store,
}).$mount("#app");

router.push({path: '/'});

function buildSettings() {
  return {
    ethereum: {
      rpcUrl: 'http://127.0.0.1:8545',
    }
  };
}

function buildServices(settings) {
  const web3Initialized = initWeb3Environment();
  return {
    web3: window.web3,
    ethereum: window.ethereum,
  };
}

function initWeb3Environment() {
  console.log('initializing web3 environment');
  const ethEnabled = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  };
  if (!ethEnabled()) {
    alert("Please install an Ethereum compatible browser or extension like MetaMask to use this dApp!");
  } else {
    console.log('web3 environment successfully loaded');
  }
}
