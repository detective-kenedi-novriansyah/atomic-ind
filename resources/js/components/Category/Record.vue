<template>
    <div>
        <form v-on:submit.prevent="onSubmit" class="knd-newbie-container" id="knd-newbie-record">
            <div class="knd-newbie-field-group">
                <div class="knd-newbie-field">
                    <label for="username" class="knd-newbie-field-label">Code</label>
                    <vs-input type="text" readonly="true" v-model="code" placeholder="Code" class="knd-newbie-input">
                    </vs-input>
                </div>
                <div class="knd-newbie-field">
                    <label for="password" class="knd-newbie-field-label">Date</label>
                    <vs-input type="date" readonly="true" v-model="date" placeholder="Reference" class="knd-newbie-input">
                    </vs-input>
                </div>
            </div>
            <div class="knd-newbie-field-groups">
                <div class="knd-newbie-field">
                    <label for="username" class="knd-newbie-field-label">Category</label>
                    <vs-select placeholder="Select" v-model="category">
                        <vs-option label="Pengeluaran" value="Pengeluaran">
                            Pengeluaran
                        </vs-option>
                    </vs-select>
                </div>
                <div class="knd-newbie-field">
                    <label for="username" class="knd-newbie-field-label">Purse</label>
                    <vs-select placeholder="Select" v-model="purse">
                        <vs-option label="Dompet Utama" value="Dompet Utama">
                            Dompet Utama
                        </vs-option>
                    </vs-select>
                </div>
            </div>
            <div class="knd-newbie-field">
                <label for="password" class="knd-newbie-field-label">Value</label>
                <vs-input type="number" v-model="value" placeholder="Reference" class="knd-newbie-input">
                </vs-input>
            </div>
            <div class="knd-newbie-field">
                <label class="knd-newbie-field-label">Description</label>
                <textarea name="description" id="description" v-model="description"  rows="5" placeholder="Description"></textarea>
            </div>
            <div class="knd-newbie-field-group">
                <vs-button type="submit" :loading="loading">
                    Save
                </vs-button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import {Vue, Component} from 'vue-property-decorator'
import dateFormat from 'dateformat'
import { mapGetters } from 'vuex';
import { CategoryFailure } from '../../modules/types/interface';

@Component({
    computed: mapGetters(['userDetail'])
})
export default class Record extends Vue {
    code: string = 'WOUT';
    date: string = '';
    description: string = '';
    loading: boolean = false;
    category: string = '';
    value: string = '';
    purse: string = '';
    $vs: any;
    onSubmit() {
        const data = {
            code: this.code,
            description: this.description,
            category: this.category,
            value: this.value,
            purse: this.purse,
            user_id: this.userDetail.id
        }
        this.loading = true;
        this.$store.dispatch('createCategory', data).then((res: AxiosResponse) => {
            this.$store.commit('FETCH_NEW_DATA', res.data.data)
            this.$vs.notification({
                    color: 'success',
                    position: 'bottom-center',
                    title: 'Successfully',
                    text: res.data.message
            })
            this.loading = false;
            this.$router.push('/transaction')
        }).catch((err: any) => {
            this.$vs.notification({
                color: 'danger',
                position: 'bottom-center',
                title: 'Failured',
                text: CategoryFailure.constructors(err)
            })
            this.loading = false;
        })
    }
    public mounted() {
        this.$store.dispatch('loadLastCategory').then((res: AxiosResponse) => {
            this.code += `0000000` + res.data.data.id
            const now = new Date()
            this.date = dateFormat(now, 'yyyy-mm-dd')

        })
    }
}
</script>

<style>

</style>