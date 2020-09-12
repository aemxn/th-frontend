<template>
<div>
    <HeadingTitle firstTitle="Explore" secondTitle="Journal" />
    <b-row>
        <b-col>
            <!-- SEARCH FORM -->
            <div class="search-form">
                <b-form inline>
                    <label class="sr-only" for="datepicker-search">Search by date</label>
                    <b-form-datepicker id="datepicker-search" v-model="searchDate" class="mb-2 mr-sm-2 mb-sm-0"></b-form-datepicker>

                    <label class="sr-only" for="inline-form-input-name">Name</label>
                    <b-input
                    id="inline-form-input-name"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Search by title or body"
                    v-model="searchQuery"
                    ></b-input>
                    <b-button id="btn-search" variant="primary" @click="page = 1; fetchEntries();">Search</b-button>
                    <b-button id="btn-random" variant="outline-primary" @click="random">Random</b-button>
                    <small><a v-if="searchDate || searchQuery" @click="clearSearch" href="#"
                    class="inline-form-component font-italic text-decoration-none">Clear search</a></small>
                </b-form>
            </div>
            <p class="font-italic text-muted">Found {{ count }} entries</p>
            <!-- CONTENT GRID -->
            <div v-if="entries.length > 0">
                <b-card-group columns>
                    <div deck v-for="(entry, id) in entries" :key="id">
                            <b-card
                            class="shadow-sm p-3 mb-5 rounded card-grid"
                            :title="entry.title"
                            :sub-title="formatDate(entry.date)"
                            @click="fetchEntryById(entry.id)">
                                <b-card-text>
                                    {{ displayContent(entry.body, false) }}
                                </b-card-text>
                            </b-card>
                    </div>
                </b-card-group>
                
                <!-- PAGINATION -->
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

        <!-- TIMELINE/CALENDAR -->
        <b-col cols="3">
            <div class="calendar-view" v-if="yearByMonthsData.length > 0"> 
                <p class="text-muted">Timeline:</p>
                <p><a v-if="selectByMonth" @click="clearSearch" href="#" class="inline-form-component text-decoration-none">View all</a></p>

                <div role="tablist">
                    <b-card no-body v-for="calendarDatas in yearByMonthsData" :key="calendarDatas.year" class="mb-1">
                    <b-button block v-b-toggle="'accordion-' + calendarDatas.year" variant="primary">{{ calendarDatas.year }}</b-button>
                    <b-collapse
                    v-for="monthsData in calendarDatas.data" :key="monthsData.month"
                    :id="'accordion-' + calendarDatas.year"
                    :accordion="'accordion-' + calendarDatas.year"
                    role="tabpanel">
                        <b-list-group-item href="#"
                        @click="page = 1;
                        selectYear = calendarDatas.year;
                        selectMonth = monthsData.month;
                        fetchByMonth();"
                        class="d-flex justify-content-between align-items-center">
                            {{ getMonthName(monthsData.month) }}
                            <b-badge variant="light" pill>{{ monthsData.count }}</b-badge>
                        </b-list-group-item>
                    </b-collapse>
                    </b-card>
                </div>
            </div>
        </b-col>
    </b-row>
</div>
</template>

<script>
import EntryDataService from "../services/EntryDataService";
import EmptyView from "../components/EmptyView.vue";
import HeadingTitle from "../components/HeadingTitle.vue";
var linkify = require('linkify-it')();

export default {
    name: 'explore',
    components: { EmptyView, HeadingTitle },
    data () {
        return {
            entries: [],
            singleEntry: {},
            yearByMonthsData: [],
            selectYear: '',
            selectMonth: '',
            selectByMonth: false,
            currentTutorial: null,
            currentIndex: -1,
            truncateLength: 300,
            searchQuery: '',
            searchDate: '',

            page: 1,
            count: 0,
            pageSize: 6
        }
    },

    created: function() {
        this.fetchEntries();
        this.fetchGroupByYear();
    },

    methods: {
        getRequestParams(searchQuery, searchDate, page, pageSize) {
            let params = {};

            params["query"] = searchQuery ? searchQuery : '';
            params["date"] = searchDate ? searchDate : '';

            if (page) params["page"] = page - 1;
            if (pageSize) params["size"] = pageSize;

            return params;
        },

        fetchEntries() {
            const params = this.getRequestParams(
                this.searchQuery,
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

        random() {
            EntryDataService.random()
            .then(response => {
                this.singleEntry = response.data;
                this.showModal(response.data);
            })
            .catch(error => console.log(error));
        },

        fetchEntryById(id) {
            EntryDataService.getEntryById(id)
            .then(response => {
                this.singleEntry = response.data;
                this.showModal(response.data);
            })
            .catch(error => console.log(error));
        },

        showModal(data) {
            const h = this.$createElement

            const dateStr = '<span class="font-italic text-muted"><small>' + this.formatDate(data.date) + '</small></span>';
            const titleStr = '<strong>' + data.title + '</strong>' + '<br/>' + dateStr;

            const titleVNode = h('div', { domProps: { innerHTML: titleStr } })
            const messageVNode = h('div', { class: ['modal-content'] }, [
            h('p', { domProps: { innerHTML: this.displayContent(data.body, true) } })
            ]);

            this.$bvModal.msgBoxConfirm([messageVNode], {
                title: [titleVNode],
                size: 'lg',
                buttonSize: 'sm',
                okVariant: 'danger',
                cancelVariant: 'light',
                okTitle: 'Close',
                cancelTitle: 'Edit',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            }).then(isClose => {
                if (isClose === false) this.edit(data.id);
            }).catch(err => {
                throw new String(err.message);
            })
        },
        
        fetchGroupByYear() {
            EntryDataService.groupByYear()
            .then(response => {
                this.yearByMonthsData = response.data.data;
            })
            .catch(error => console.log(error))
        },

        fetchByMonth() {
            let date = this.selectYear + "-" + this.selectMonth;
            this.selectByMonth = true;

            const params = this.getRequestParams(
                this.searchQuery,
                date,
                this.page,
                this.pageSize
            );

            EntryDataService.exploreByMonth(params)
            .then(response => {
                const { entries, totalItems } = response.data;
                this.entries = entries;
                this.count = totalItems;
            })
            .catch(error => console.log(error));
        },

        edit(entryId) {
            this.$router.push({ name: "Edit Entry", params: { id: entryId } });
        },

        handlePageChange(value) {
            this.page = value;
            if (this.selectByMonth) this.fetchByMonth();
            else this.fetchEntries();
        },

        truncate(input) {
            var output = input.length > this.truncateLength ? `${input.substring(0, this.truncateLength)} ...` : input;
            return output;
        },

        displayContent(content, isModal) {
            // sanitize
            let replace = content.trim()
                            .replace(/\\n/g, '\n')
                            .replace(/\\'/g, '\'')
                            .replace(/\\"/g, '"')
                            .replace(/\\%/g, '%');

            let out     = escape(replace),
                matches = linkify.match(replace),
                result  = [],
                last;

            if (matches) {
                last = 0;
                matches.forEach(function (match) {
                if (last < match.index) {
                    result.push(escape(replace.slice(last, match.index)).replace(/\r?\n/g, '<br>'));
                }
                result.push('<a target="_blank" href="');
                result.push(escape(match.url));
                result.push('">');
                result.push(escape(match.text));
                result.push('</a>');
                last = match.lastIndex;
                });
                if (last < replace.length) {
                result.push(escape(replace.slice(last)).replace(/\r?\n/g, '<br>'));
                }
                out = result.join('');
            }

            let unescaped = unescape(out);

            return (isModal) ? unescaped : this.truncate(replace);
        },

        formatDate(input) {
            return this.$utils.formatDate(input);
        },

        getMonthName(month) {
            return this.$utils.getMonthName(month);
        },

        clearSearch() {
            this.searchQuery = '';
            this.searchDate = '';
            this.selectMonth = '';
            this.selectYear = '';
            this.selectByMonth = false;
            this.page = 1;
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
.calendar-view {
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;
}
.modal-content {
    white-space: pre-wrap;
    border: none;
}
.card-grid:hover {
    background-color: lightgray;
    cursor: pointer;
}
#btn-random {
    margin-left: 0.5em;
}
</style>