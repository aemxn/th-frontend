<template>
<div>
    <HeadingTitle firstTitle="Notes" secondTitle="" />
    <!-- metadata of updating entry -->
    <!-- forms similar from create -->
    <div v-if="id">
        {{ id }}
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
            id: "coming soon"
        }
    }
};
</script>

<style lang="scss">
</style>