<template>
    <div>
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
                    <vs-option label="Inactive" value="0">
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

<script>
export default {

}
</script>

<style>

</style>