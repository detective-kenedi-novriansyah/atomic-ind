<template>
    <div id="knd-form">
        <form v-on:submit.prevent="onSubmit" class="knd-newbie-container">
            <div class="knd-newbie-field">
                <caption>Join Atomic Indonesia</caption>
                <h2 class="knd-newbie-field-title">
                    Create your account
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
                <label for="email" class="knd-newbie-field-label">Email</label>
                <vs-input type="email" v-model="email" placeholder="Email" class="knd-newbie-input">
                    <template #icon>
                        <i class="fas fa-at"></i>
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
                <label for="confirm_password" class="knd-newbie-field-label">Confirm Password</label>
                <vs-input type="password" v-model="confirm_password" placeholder="Confirm Password" class="knd-newbie-input">
                    <template #icon>
                        <i class="fas fa-lock"></i>
                    </template>
                </vs-input>
            </div>
            <div class="knd-newbie-field-group">
                <vs-button type="submit" :loading="loading">
                    Sign up
                </vs-button>
                <a v-on:click="handleClickRouter('/login')" class="knd-newbie-field-anchor">
                    Already exists accounts?
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
export default class Register extends Vue {
    username: string = '';
    email: string = '';
    password: string = '';
    confirm_password: string = '';
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
            email: this.email,
            password: this.password,
            password_confirmation: this.confirm_password,
        }
        this.loading = true;
        this.$store.dispatch('recordUser', data).then((res: AxiosResponse) => {
            this.loading = false
            this.$vs.notification({
                color: 'success',
                position: 'bottom-center',
                title: 'Successfully',
                text: res.data.message
            })
            this.username = '';
            this.email = '';
            this.password = '';
            this.confirm_password = '';
            this.$router.push('/login')
        }).catch((err: FailuredMessage) => {
            this.loading = false;
            this.$vs.notification({
                color: 'danger',
                position: 'bottom-center',
                title: 'Failured',
                text: Message.constructors(err)
            })
        })
    };
}

</script>

<style>

</style>