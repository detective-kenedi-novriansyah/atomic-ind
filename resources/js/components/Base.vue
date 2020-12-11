<template>
    <div id="app">
        <Navbar></Navbar>
        <div class="knd-newbie-grid" v-if="active">
            <div class="knd-newbie-template-grid">
                <vs-button v-on:click="onChangeRouter('/dashboard')">
                    Master Purse
                </vs-button>
                <vs-button v-on:click="onChangeRouter('/transaction')">
                    Transaction
                </vs-button>
            </div>
            <div class="knd-newbie-template-grid">
                <router-view></router-view>
            </div>
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import Navbar from './Navbar.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Navbar
    }
})
export default class Base extends Vue {
    active: boolean = false;
    onChangeRouter(newValue: string) {
        this.$router.push(newValue)
    }
    public mounted() {
        if(localStorage.getItem('token')) {
            this.$store.dispatch('me')
        }
        if(localStorage.getItem('token')) {
            this.active = true
        }
    }
}
</script>

<style>

</style>