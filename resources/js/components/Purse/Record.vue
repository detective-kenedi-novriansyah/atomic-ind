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
                  Create New
              </li>
          </ul>
          <ul>
          </ul>
      </div>
        <form v-on:submit.prevent="onSubmit" class="knd-newbie-container" id="knd-newbie-record">
            <div class="knd-newbie-field-group">
                <div class="knd-newbie-field">
                    <label for="username" class="knd-newbie-field-label">Name</label>
                    <vs-input type="text" v-model="name" placeholder="Username" class="knd-newbie-input">
                    </vs-input>
                </div>
                <div class="knd-newbie-field" v-if="!detailPurse.reference">
                    <label for="password" class="knd-newbie-field-label">Reference</label>
                    <vs-input type="text" v-model="reference" placeholder="Reference" class="knd-newbie-input">
                    </vs-input>
                </div>
            </div>
            <div class="knd-newbie-field">
                <label class="knd-newbie-field-label">Description</label>
                <textarea name="description" id="description" v-model="description"  rows="5" placeholder="Description"></textarea>
            </div>
            <div class="knd-newbie-field">
                <label for="password" class="knd-newbie-field-label">Status</label>
      <vs-select placeholder="Select" v-model="status">
        <vs-option label="Active" value="1">
          Active
        </vs-option>
        <vs-option label="Inactive" value="2">
          Inactive
        </vs-option>
      </vs-select>
            </div>
            <div class="knd-newbie-field-group">
                <vs-button type="submit" :loading="loading">
                    Create Purse
                </vs-button>
            </div>
      </form>
    </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { Component, Vue} from 'vue-property-decorator'
import { mapGetters } from 'vuex';
import { RecordPurseMessage } from '../../modules/types/interface';
@Component({
    computed: mapGetters(['userDetail','detailPurse'])
})
export default class Record extends Vue {
    retrieve: boolean = false;
    id: number = 0;
    name: string = '';
    reference: string = '';
    description: string = '';
    status: number| string = 'Active';
    loading: boolean = false;
    $vs: any;
    onSubmit() {
        const data = {
            id: this.id,
            name: this.name,
            user_id: this.userDetail.id,
            status: this.status,
            reference: this.reference,
            description: this.description,
        }
        this.loading = true;
        if(this.retrieve) {
            this.$store.dispatch('updatePurse', data).then((res: AxiosResponse) => {
                this.reference = '';
                this.description = '';
                this.status = '';
                this.$store.commit('SET_PURSE', res.data.data)
                this.$router.push('/')
                this.$vs.notification({
                    color: 'success',
                    position: 'bottom-center',
                    title: 'Successfully',
                    text: res.data.message
                })
                this.loading = false;
            }).catch((err: any) => {
                this.$vs.notification({
                    color: 'danger',
                    position: 'bottom-center',
                    title: 'Failured',
                    text: RecordPurseMessage.constructors(err)
                })
                this.loading = false;
            })
        } else {
            this.$store.dispatch('recordPurse', data).then((res: AxiosResponse) => {
                this.reference = '';
                this.description = '';
                this.status = '';
                this.$router.push('/')
                this.$vs.notification({
                    color: 'success',
                    position: 'bottom-center',
                    title: 'Successfully',
                    text: res.data.message
                })
                this.loading = false;
            }).catch((err: any) => {
                this.$vs.notification({
                    color: 'danger',
                    position: 'bottom-center',
                    title: 'Failured',
                    text: RecordPurseMessage.constructors(err)
                })
                this.loading = false;
            })
        }
    }
    public created() {
        if(localStorage.getItem('sst')) {
            this.$store.dispatch('retrievePurse', localStorage.getItem('sst')).then((res: AxiosResponse) => {
                this.$store.commit('DETAIL_PURSE', res.data.data)
                this.id = res.data.data.id
                this.name = res.data.data.name
                this.description = res.data.data.description
                this.status = res.data.data.status
                this.retrieve = true;
            }).catch((err: any) => {
                this.$vs.notification({
                    color: 'danger',
                    position: 'bottom-center',
                    title: 'Failured',
                    text: err.response.error
                })
            })
        }
    }
}
</script>

<style>

</style>