<template>
<div>
    <h1 class="font-weight-bold page-title">Explore Entries</h1>
    <b-row>
        <b-col>
            <div v-if="entries.length > 0">
                <div class="search-form">
                    <b-form inline>
                        <label class="sr-only" for="inline-form-input-name">Name</label>
                        <b-input
                        id="inline-form-input-name"
                        class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Search by title or body"
                        ></b-input>
                        <b-button variant="primary" @click="page = 1; retrieveTutorials();">Search</b-button>
                    </b-form>
                </div>

                <b-card-group columns>
                    <div deck v-for="(entry, id) in entries" v-b-modal.openModal :key="id">
                            <b-card
                            class="shadow-sm p-3 mb-5 bg-white rounded"
                            :title="entry.title"
                            :sub-title="formatDate(entry.date)"
                            @click="modalTitle = entry.title, modalBody = entry.body, modalDate = formatDate(entry.date)">
                                <b-card-text>
                                    {{ truncate(entry.body) }}
                                </b-card-text>
                            </b-card>
                    </div>
                </b-card-group>

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
                
                <div class="mt-3 position-relative">
                    <b-pagination pills
                        v-model="page"
                        align="fill"
                        class="pagination"
                        :total-rows="count"
                        :per-page="pageSize"
                        prev-text="Prev"
                        next-text="Next"
                        @change="handlePageChange"
                    ></b-pagination>
                </div>

            </div>

            <div v-else>
                <EmptyView/>
            </div>
        </b-col>

        <b-col cols="3">
            Calendar view here
        </b-col>
    </b-row>
</div>
</template>

<script>
import EntryDataService from "../services/EntryDataService";
import EmptyView from "../components/EmptyView.vue";

export default {
    name: 'explore',
    components: {
        EmptyView
    },
    data () {
        return {
            entries: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 6,

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

            if (searchTitle) params["query"] = searchTitle;
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

            EntryDataService.getAll(params)
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

        formatDate(input) {
            return this.$utils.formatDate(input);
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
.search-form {
    padding: 0 0 1em 0;
}
</style>