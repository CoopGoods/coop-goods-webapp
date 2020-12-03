<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Information</h5>
          <div v-if="!demurrageableTokenContractAvailable">
            No contract instance available. Please deploy demurrageable token contract.
          </div>
          <div v-else>
            <base-table :columns="fields"
                        :data="data"
                        thead-classes="text-primary">
            </base-table>
          </div>
        </card>
      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";
import BaseTable from "@/components/BaseTable";

export default {
  components: {
    FadeTransition,
    BaseTable,
  },
  data() {
    return {
      fields: ["property", "value"],
      data: [],
    }
  },
  computed: {
    demurrageableTokenContractAvailable() {
      return this.cache.demurrageableTokenContractInstance != null;
    },
    ...mapState([
      'services',
      'cache',
    ])
  },
  async mounted() {
    try {
      if (this.demurrageableTokenContractAvailable) {
        const contract = this.cache.demurrageableTokenContractInstance;
        const name = await contract.methods.name().call({
          from: this.services.ethereum.selectedAddress,
        });
        this.data.push({
          property: 'Name',
          value: name,
        });
        const symbol = await contract.methods.symbol().call({
          from: this.services.ethereum.selectedAddress,
        });
        this.data.push({
          property: 'Symbol',
          value: symbol,
        });
        const supply = await contract.methods.totalSupply().call({
          from: this.services.ethereum.selectedAddress,
        });
        this.data.push({
          property: 'Initial supply',
          value: supply,
        });
        const demurrageRate = await contract.methods.demurrageRate().call({
          from: this.services.ethereum.selectedAddress,
        });
        this.data.push({
          property: 'Demurrage rate',
          value: demurrageRate,
        });
      }
    } catch (e) {
      this.$notifyMessage('danger', e);
    }
  },
  methods: {},
};
</script>
