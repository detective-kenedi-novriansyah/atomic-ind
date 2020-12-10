<template>
  <div>
      <div class="knd-newbie-header-dash">
          <ul>
              <li>
                  <h1>dompet</h1>
              </li>
              <li>
                  -
              </li>
              <li>
                  active
              </li>
          </ul>
          <ul>
              <li>
                  <vs-button v-on:click="onChangeRouter('/record/purse')">
                      Create New
                  </vs-button>
              </li>
              <li>
                  <vs-button>
                    Active {{allPurse.active.length}}
                  </vs-button>
              </li>
          </ul>
      </div>
      <div class="knd-newbie-filter">
          <div>
              <vs-button id="opendropdown">
                  {{allPurse.count}} / Page
              </vs-button>
              <div class="knd-newbie-dropdown" id="ope-dropdown">
                    <div class="knd-newbie-dropdown-contents">
                        <div>
                            <vs-button>
                                5
                            </vs-button>
                        </div>
                        <div>
                            <vs-button>
                                10
                            </vs-button>
                        </div>
                        <div>
                            <vs-button>
                                15
                            </vs-button>
                        </div>
                    </div>
              </div>
          </div>
          <div>
            <vs-input type="text" placeholder="Search" v-model="search"></vs-input>
          </div>
      </div>
      <table>
          <thead>
              <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Reference</th>
                  <th>Description</th>  
                  <th>Status</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="purse in allPurse.allPurse" :key="purse.id">
                  <td>{{purse.id}}</td>
                  <td>{{purse.user_id.username}}</td>
                  <td>{{purse.reference}}</td>
                  <td>{{purse.description}}</td>
                  <td v-if="purse.status">Active</td>
                  <td v-else>Inactive</td>
                    <td class="knd-newbie-opx">
                        <vs-button :aria-kenedi-awesome="purse.id" class="knd-newbie-onclick-dropdown">
                          <i class="fas fa-arrow-down"></i>
                        </vs-button>
                        <div class="knd-newbie-dropdown" id="knd-newbie-dropdown" :arai-knd-awesome="purse.id">
                            <div class="knd-newbie-dropdown-content">
                              <div>
                                  Checkout
                              </div>
                              <div>
                                  <vs-button>
                                      Detail
                                  </vs-button>
                              </div>
                              <div>
                                  <vs-button>
                                      Update
                                  </vs-button>
                              </div>
                              <div>
                                  <vs-button v-on:click="onClickActive(purse.id,purse.status)">
                                      Inactive
                                  </vs-button>
                              </div>
                          </div>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
      <div class="knd-newbie-table-footer">
          <div class="per_page">
              showing 1 to 5 of {{allPurse.total}} enteris
          </div>
          <vs-button-group>
              <vs-button v-on:click="onChangePage(allPurse.prevPageUrl)" :disabled="!Boolean(allPurse.prevPageUrl)">
                  Previous
              </vs-button>
              <vs-button v-for="i in allPurse.links" :key="i.links" v-on:click="onChangePage(i.links)">
                  {{i.page}}
              </vs-button>
              <vs-button v-on:click="onChangePage(allPurse.nextPageUrl)" :disabled="!Boolean(allPurse.nextPageUrl)">
                  Next
              </vs-button>
          </vs-button-group>
      </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import $ from 'jquery'

@Component({
    computed: mapGetters(['allPurse'])
})
export default class Dashboard extends Vue {
    openPage: number = 0;
    search: string = '';
    $vs: any;
    onClickActive(pk: number, status: number) {
        let newStatus: number 
        if(status) {
            newStatus = status -= 1
        } else {
            newStatus = status +=1 
        }
        const data = {
            id: pk,
            status: newStatus
        }
        this.$store.dispatch('purseActive', data).then((res) => {
            this.$store.commit('SET_PURSE', res.data.purse)
            this.$vs.notification({
                color: 'success',
                position: 'bottom-center',
                title: 'Successfully',
                text: res.data.message
            })
        })
        // purseActive
    }
    onChangePage(newUrl: string) {
        this.$store.dispatch('purseGetPage', newUrl)
    }
    onChangeRouter(newUrl: string) {
        this.$router.push(newUrl)
    }
    public mounted() {
        this.$store.dispatch('fetchPurse')
    }
}
</script>

<style>

</style>
