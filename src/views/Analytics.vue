<template>
<div>
    <HeadingTitle firstTitle="Analytics" secondTitle="" />
    <!-- metadata of updating entry -->
    <!-- forms similar from create -->
    <div v-if="id">
        <!-- content here -->
    </div>

    <div v-else>
        <EmptyView/>
    </div>
</div>
</template>

<script>
import HeadingTitle from "../components/HeadingTitle.vue";
import EmptyView from "../components/EmptyView.vue";

export default {
    name: "analytics",
    components: { HeadingTitle, EmptyView },
    data () {
        return {
            id: false
        }
    }
};
</script>

<style lang="scss">
</style>