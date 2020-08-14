<template>
<div>
    <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="<"
        next-text=">"
        @change="handlePageChange"
    ></b-pagination>

    <div v-for="(entry, id) in entries" v-b-modal.openModal :key="id">
        <b-card :title="entry.title"
        :sub-title="entry.date"
        @click="modalTitle = entry.title, modalBody = entry.body, modalDate = entry.date">
            <b-card-text>
                {{ truncate(entry.body) }}
            </b-card-text>
        </b-card>
    </div>

    <b-modal id="openModal" size="lg" scrollable :title="modalTitle">

        <p>{{ sanitize(modalBody) }}</p>

        <template v-slot:modal-footer="{ cancel }">
            <div class="w-100">
                <i><p class="float-left">Date: {{ modalDate }}</p></i>
            </div>
            <b-button class="float-right" @click="cancel()">
                Close
            </b-button>
        </template>
    </b-modal>

    <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="<"
        next-text=">"
        @change="handlePageChange"
    ></b-pagination>
</div>
</template>

<script>
export default {
    name: 'explore',
    data () {
        return {
            entries: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 5,

            modalTitle: "",
            modalDate: "",
            modalBody: ""
        }
    },

    created: function() {
        this.fetchEntries();
    },

    methods: {
        getRequestParams(searchTitle, page, pageSize) {
            let params = {};

            if (searchTitle) params["title"] = searchTitle;
            if (page) params["page"] = page - 1;
            if (pageSize) params["size"] = pageSize;

            return params;
        },
        fetchEntries() {
            const params = this.getRequestParams(
                this.searchTitle,
                this.page,
                this.pageSize
            );
            console.log('params', params);

            this.$http.get(`/list?page=${params['page']}&size=${params['size']}`)
            .then(response => {
                const { entries, totalItems } = response.data;
                this.entries = entries;
                this.count = totalItems;
            })
            .catch(error => console.log(error));
        },

        handlePageChange(value) {
            this.page = value;
            this.fetchEntries();
        },

        truncate(input) {
            var output = input.length > 100 ? `${input.substring(0, 300)}...` : input;
            return this.sanitize(output);
        },

        sanitize(input) {
            return input.replace(/\\n/g, '\n');
        },

        navigate() {
            // this.$router.push({ name: "Create" });
            // this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.modal-date {
    text-align: left;
}
</style>