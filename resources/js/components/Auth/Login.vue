<template>
    <div id="knd-form">
        <form v-on:submit.prevent="onSubmit" class="knd-newbie-container">
            <div class="knd-newbie-field">
                <h2 class="knd-newbie-field-title">
                    Sign in To Atomic Indonesia
                </h2>
            </div>
            <div class="knd-newbie-field">
                <label for="username" class="knd-newbie-field-label">Username</label>
                <vs-input type="text" v-model="username" placeholder="Username" class="knd-newbie-input">
                    <template #icon>
                        <i class="fas fa-user"></i>
                    </template>
                </vs-input>
            </div>
            <div class="knd-newbie-field">
                <label for="password" class="knd-newbie-field-label">Password</label>
                <vs-input type="password" v-model="password" placeholder="Password" class="knd-newbie-input">
                    <template #icon>
                        <i class="fas fa-lock"></i>
                    </template>
                </vs-input>
            </div>
            <div class="knd-newbie-field">
                <a v-on:click="handleClickRouter('/forgotted/password')" class="knd-newbie-field-anchor">
                    Forgotted Password?
                </a>
            </div>
            <div class="knd-newbie-field-group">
                <vs-button type="submit" :loading="loading">
                    Sign in
                </vs-button>
                <a v-on:click="handleClickRouter('/signup')" class="knd-newbie-field-anchor">
                    Create new account?
                </a>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator' 
import { FailuredMessage, Message } from '../../modules/types/interface';

@Component
export default class Login extends Vue {
    username: string = '';
    password: string = '';
    loading: boolean = false;
    $vs: any;
    handleClickRouter(newValue: string) {
        if(this.$route.path !== newValue) {
            this.$router.push(newValue)
        }
    };
    onSubmit() {
        const data = {
            username: this.username,
            password: this.password,
        }
        this.loading = true;
        this.$store.dispatch('loginUser', data).then((res: AxiosResponse) => {
            this.$store.commit('ACCESS_USER', res.data.access_token)
            this.loading = false
            this.$vs.notification({
                color: 'success',
                position: 'bottom-center',
                title: 'Successfully',
                text: res.data.message
            })
            this.username = '';
            this.password = '';
            this.$router.push('/dashboard')
        }).catch((err: any) => {
            this.loading = false;
            this.$vs.notification({
                color: 'danger',
                position: 'bottom-center',
                title: 'Failured',
                text: err.response.data.error
            })
        })
    };
}

</script>

<style>

</style>