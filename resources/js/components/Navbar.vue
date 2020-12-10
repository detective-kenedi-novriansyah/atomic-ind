<template>
    <div id="app">
        <div class="knd-newbie-nav" id="navbar">
            <ul class="knd-newbie-list">
                <li>
                    <img src="data:image/png;base64,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" alt="">
                </li>
            </ul>
            <ul class="knd-newbie-list">
                <li class="knd-newbie-link" id="knd-newbie-login" v-if="!authenticate">
                    <a v-on:click="handleClickRouter('/login')">Login</a>
                </li>
                <li class="knd-newbie-link" id="knd-newbie-register" v-if="!authenticate">
                    <a v-on:click="handleClickRouter('/signup')">Register</a>
                </li>
                <li class="knd-newbie-link" id="knd-newbie-dashboard" v-if="authenticate">
                    <a v-on:click="handleClickRouter('/')">Dashboard</a>
                </li>
            </ul>
            <ul class="knd-newbie-list">
                <li class="knd-newbie-link" v-if="!authenticate">
                    <a v-on:click="handleClickRouter('/login')">
                        Sign in
                        <i class="fas fa-sign-in-alt"></i>
                    </a>
                </li>
                <li class="knd-newbie-link" id="knd-newbie-dashboard" v-if="authenticate">
                    <a v-on:click="handleClickRouter('/')">Dashboard</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
@Component({
    computed: mapGetters(['authenticate'])
})
export default class Navbar extends Vue {
    handleClickRouter(newValue: string) {
        const path = this.$route.path
        if(path !== newValue) {
            this.$router.push(newValue)
        }
    };
    public mounted() {
        if(localStorage.getItem('token')) {
            this.$store.commit('ACCESS_USER', localStorage.getItem('token'))
        }
    }
}

</script>

<style>

</style>