<template>
  <div>
      <div class="knd-newbie-header-dash">
          <div>
              <div>
                  <h1>dompet</h1>
              </div>
              <div>
                  -
              </div>
              <div>
                  active
              </div>
          </div>
          <div>
              <div>
                  <vs-button v-on:click="onChangeRouter('/record/purse')">
                      Create New
                  </vs-button>
              </div>
              <div>
                  <vs-button>
                    Active {{allPurse.active.length}}
                  </vs-button>
              </div>
              <div>
                  <vs-button icon>
                      <i class="fas fa-bars"></i>
                  </vs-button>
              </div>
          </div>
      </div>
      <div class="knd-newbie-filter">
          <div>
              <vs-button id="opendropdown" v-on:click="onClickDropdown()">
                  {{allPurse.count}} / Page
              </vs-button>
              <div class="knd-newbie-dropdown" id="ope-dropdown">
                    <div class="knd-newbie-dropdown-contents">
                        <div>
                            <vs-button v-on:click="onChangePerPage(5)">
                                5
                            </vs-button>
                        </div>
                        <div>
                            <vs-button v-on:click="onChangePerPage(10)">
                                10
                            </vs-button>
                        </div>
                        <div>
                            <vs-button v-on:click="onChangePerPage(15)">
                                15
                            </vs-button>
                        </div>
                    </div>
              </div>
          </div>
          <div class="knd-newbie-input-search">
            <vs-input type="text" placeholder="Search" v-model="search"></vs-input>
          </div>
      </div>
      <div class="knd-newbie-table">
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
                  <td>{{purse.name}}</td>
                  <td>{{purse.reference}}</td>
                  <td>{{purse.description}}</td>
                  <td v-if="purse.status">Active</td>
                  <td v-else>Inactive</td>
                    <td class="knd-newbie-opx">
                        <vs-button :aria-kenedi-awesome="purse.id" class="knd-newbie-onclick-dropdown" v-on:click="onClickDropdownTable(purse.id)">
                          <i class="fas fa-arrow-down"></i>
                        </vs-button>
                        <div class="knd-newbie-dropdown" id="knd-newbie-dropdown" :arai-knd-awesome="purse.id">
                            <div class="knd-newbie-dropdown-content">
                              <div>
                                  Spending
                              </div>
                              <div>
                                  <vs-button>
                                      Detail
                                  </vs-button>
                              </div>
                              <div>
                                  <vs-button v-on:click="onUpdatePurse(purse.id)">
                                      Update
                                  </vs-button>
                              </div>
                              <div>
                                  <vs-button v-on:click="onClickActive(purse.id,purse.status)">
                                      <span v-if="purse.status">
                                          Inactive
                                      </span>
                                      <span v-else>
                                          Active
                                      </span>
                                  </vs-button>
                              </div>
                          </div>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
      </div>
      <div class="knd-newbie-table-footer">
          <div class="per_page">
              showing 1 to {{displayPage}} of {{allPurse.total}} enteris
          </div>
          <div class="knd-newbie-pagination">
              <vs-button v-on:click="onChangePage(allPurse.prevPageUrl)">
                  <i class="fas fa-arrow-left"></i>
              </vs-button>
              <vs-button circle v-for="i in allPurse.links" :key="i.id" v-on:click="onChangePage(i.links)">
                  {{i.page}}
              </vs-button>
                <vs-button v-on:click="onChangePage(allPurse.nextPageUrl)">
                  <i class="fas fa-arrow-right"></i>
              </vs-button>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import $ from 'jquery'
import { AxiosResponse } from 'axios';

@Component({
    computed: mapGetters(['allPurse'])
})
export default class Dashboard extends Vue {
    displayPage: number = 5;
    currentPage1 = 1;
    openPage: number = 0;
    checkPage: number = 0;
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
    onChangePage(newUrl: number) {
        if(newUrl) {
            this.$store.dispatch('purseGetPage', newUrl)
        }
    }
    onChangeRouter(newUrl: string) {
        this.$router.push(newUrl)
    }
    onChangePerPage(newValue: number) {
        this.$store.dispatch('fetchPurse', newValue)
        this.displayPage = newValue
        const check = (document.getElementById('ope-dropdown-active') as HTMLDivElement)
        check.id = "ope-dropdown"
    }
    private onDeletePurse(value: number) {
        this.$store.dispatch('destroyPurse', value).then((res: AxiosResponse) => {
            this.$store.commit('DESTROY_PURSE', value)
            this.$vs.notification({
                color: 'success',
                position: 'bottom-center',
                title: 'Successfully',
                text: res.data.message
            })
        }).catch((err: any) => {
            this.$vs.notification({
                color: 'danger',
                position: 'bottom-center',
                title: 'Failured',
                text: err.response.data.detail
            })
        })
    }
    private onUpdatePurse(newValue: number) {
        this.$store.dispatch('retrievePurse', newValue).then((res: AxiosResponse) => {
            this.$store.commit('DETAIL_PURSE', res.data.data)
            localStorage.setItem('sst', res.data.data.id)
            this.$router.push('/update/purse')
        })
    }
    public mounted() {
        this.$store.dispatch('fetchPurse')

    }
    private onClickDropdown() {
        const check = (document.getElementById('ope-dropdown-active') as HTMLDivElement)
        const inactive = (document.getElementById('ope-dropdown') as HTMLDivElement)
        if(check) {
            check.id = 'ope-dropdown'
        } else if(inactive) {
            inactive.id = 'ope-dropdown-active'
        }
    }
    private onClickDropdownTable(newAttr: number) {
        if(this.openPage) {
            if(this.checkPage === newAttr) {
                const attrs = $(`div[arai-knd-awesome=${newAttr}]`)
                attrs.fadeOut('slow')
                this.openPage -= 1
            } else {
                const old_attrs = $(`div[arai-knd-awesome=${this.checkPage}]`)
                old_attrs.fadeOut('slow')
                const attrs = $(`div[arai-knd-awesome=${newAttr}]`)
                this.checkPage = newAttr
                attrs.fadeIn('slow')
            }
        } else {
            this.openPage += 1
            this.checkPage = newAttr;
            const attrs = $(`div[arai-knd-awesome=${newAttr}]`)
            attrs.fadeIn('slow')
        }
    }
}
</script>

<style>

</style>
