<template>
<div>
    <HeadingTitle firstTitle="Explore" secondTitle="Entries" />
    <b-row>
        <b-col>
            <div class="search-form">
                <b-form inline>
                    <label class="sr-only" for="datepicker-search">Search by date</label>
                    <b-form-datepicker id="datepicker-search" v-model="searchDate" class="mb-2 mr-sm-2 mb-sm-0"></b-form-datepicker>

                    <label class="sr-only" for="inline-form-input-name">Name</label>
                    <b-input
                    id="inline-form-input-name"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Search by title or body"
                    v-model="searchTitle"
                    ></b-input>
                    <b-button variant="primary" @click="page = 1; fetchEntries();">Search</b-button>
                    <small><a v-if="searchDate || searchTitle" @click="clearSearch" href="#"
                    class="inline-form-component font-italic text-decoration-none">Clear search</a></small>
                </b-form>
            </div>
            <p class="font-italic text-muted">Found {{ count }} entries</p>
            <div v-if="entries.length > 0">
                <b-card-group columns>
                    <div deck v-for="(entry, id) in entries" v-b-modal.openModal :key="id">
                            <b-card
                            class="shadow-sm p-3 mb-5 bg-white rounded"
                            :title="entry.title"
                            :sub-title="formatDate(entry.date)"
                            @click="fetchEntryById(entry.id)">
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
                            <p class="float-left font-italic text-muted">Date: {{ modalDate }}</p>
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
            <div v-if="yearByMonthsData.length > 0">
                <p class="font-weight-bold">Timeline:</p>
                <b-card v-for="calendarDatas in yearByMonthsData" :key="calendarDatas.year" no-body :header="calendarDatas.year.toString()">
                    <b-list-group v-for="monthsData in calendarDatas.data" :key="monthsData.month" flush>
                        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
                            {{ getMonthName(monthsData.month) }}
                            <b-badge variant="light" pill>{{ monthsData.count }}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
            <div v-else>
                <EmptyView/>
            </div>
        </b-col>
    </b-row>
</div>
</template>

<script>
import EntryDataService from "../services/EntryDataService";
import EmptyView from "../components/EmptyView.vue";
import HeadingTitle from "../components/HeadingTitle.vue";

export default {
    name: 'explore',
    components: { EmptyView, HeadingTitle },
    data () {
        return {
            entries: [],
            singleEntry: {},
            yearByMonthsData: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",
            searchDate: "",

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
        this.fetchGroupByYear();
    },

    methods: {
        getRequestParams(searchTitle, searchDate, page, pageSize) {
            let params = {};

            params["query"] = searchTitle ? searchTitle : "";
            params["date"] = searchDate ? searchDate : "";

            if (page) params["page"] = page - 1;
            if (pageSize) params["size"] = pageSize;

            return params;
        },

        fetchEntries() {
            const params = this.getRequestParams(
                this.searchTitle,
                this.searchDate,
                this.page,
                this.pageSize
            );

            EntryDataService.explore(params)
            .then(response => {
                const { entries, totalItems } = response.data;
                this.entries = entries;
                this.count = totalItems;
            })
            .catch(error => console.log(error));
        },

        fetchEntryById(id) {
            EntryDataService.getEntryById(id)
            .then(response => {
                this.singleEntry = response.data;
                this.modalTitle = response.data.title;
                this.modalBody = response.data.body;
                this.modalDate = response.data.date;
            })
            .catch(error => console.log(error));
        },

        fetchGroupByYear() {
            EntryDataService.groupByYear()
            .then(response => {
                this.yearByMonthsData = response.data.data;
            })
            .catch(error => console.log(error))
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

        getMonthName(month) {
            return this.$utils.getMonthName(month);
        },

        clearSearch() {
            this.searchTitle = "";
            this.searchDate = "";
            this.fetchEntries();
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
.inline-form-component {
    padding-left: 0.5em;
}
</style>