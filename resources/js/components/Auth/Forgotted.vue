<template>
    <div id="knd-form">
        <form class="knd-newbie-container">
            <h1 class="knd-newbie-title">
                Reset your password
            </h1>
             <span class="knd-newbie-caption-x">
                Enter your user account's verified email address and we will send you a password reset link.
            </span>
            <div class="form-group">
                <label for="exampleInputEmail1">Find username or email</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Find username or email">
            </div>
            <div class="knd-newbie-field">
                <button type="submit">Find</button>
                <a v-on:click="handleClickRouter('/login')">
                Already exists account?
                </a>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator' 

@Component
export default class Register extends Vue {
    handleClickRouter(newValue: string) {
        if(this.$route.path !== newValue) {
            this.$router.push(newValue)
        }
    }
}

</script>

<style>

</style>