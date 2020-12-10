<template>
    <div id="app">
        <Navbar></Navbar>
        <router-view></router-view>
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
    public mounted() {
        if(localStorage.getItem('token')) {
            this.$store.dispatch('me')
        }
    }
}
</script>

<style>

</style>