<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Dashboard</h5>
          <div class="row">
            <div class="col-md-6 mt-2">
              <base-input
                label="Name"
                v-model="demurrageableToken.name"
              ></base-input>
            </div>
            <div class="col-md-6 mt-2">
              <base-input
                label="Symbol"
                v-model="demurrageableToken.symbol"
              ></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-2">
              <base-input
                label="Initial supply"
                v-model="demurrageableToken.initialSupply"
              ></base-input>
            </div>
            <div class="col-md-6 mt-2">
              <base-input
                label="Demurrage rate"
                v-model="demurrageableToken.demurrageRate"
              ></base-input>
            </div>
          </div>
          <div class="row ml-4">
            <base-button @click="deployContract">
              Deploy
            </base-button>
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
import {DemurrageableTokenArtifacts} from '@/assets/contracts/DemurrageableToken';

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
      demurrageableToken: {
        name: '',
        symbol: '',
        initialSupply: 0,
        demurrageRate: 0,
      }
    }
  },
  computed: {
    ...mapState([
      'services',
      'cache',
    ])
  },
  async created() {

  },
  methods: {
    async deployContract() {
      const demurrageableTokenContract = new window.web3.eth.Contract(DemurrageableTokenArtifacts.abi);
      demurrageableTokenContract.deploy({
        data: DemurrageableTokenArtifacts.bytecode,
        arguments: [this.demurrageableToken.name, this.demurrageableToken.symbol, this.demurrageableToken.initialSupply, this.demurrageableToken.demurrageRate],
      })
        .send({
          from: this.services.ethereum.selectedAddress,
        }, function (err, transactionHash) {
          if (err) {
            console.error(err);
          } else {
            console.log('transaction hash: ', transactionHash);
          }
        })
        .on('error', this.onDeployError)
        .on('transactionHash', this.onDeployTransactionHash)
        .on('receipt', this.onDeployReceipt)
        .then(this.onContractDeployed);
    },
    onDeployError(error) {
      this.$notifyMessage('danger', `Cannot deploy contract: ${error}`);
    },
    onDeployTransactionHash(transactionHash) {
      this.$notifyMessage('success', `Transaction hash: ${transactionHash}`);
    },
    onDeployReceipt(receipt) {
      console.log(receipt.contractAddress);
      this.$notifyMessage('success', `Contract address: ${receipt.contractAddress}`);
    },
    onContractDeployed(newContractInstance) {
      this.cache.demurrageableTokenContractInstance = newContractInstance;
    },
  },
};
</script>
