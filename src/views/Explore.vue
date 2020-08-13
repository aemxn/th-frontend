<template>
  <div class="overflow-auto">
    <div>
        <b-pagination
            v-model="page"
            :total-rows="count"
            :per-page="pageSize"
            prev-text="<"
            next-text=">"
            @change="handlePageChange"
        ></b-pagination>

        <div v-for="(tutorial, id) in entries" :key="id">
            <b-card :title="tutorial.title" :sub-title="tutorial.date">
                <b-card-text>
                    {{ truncate(tutorial.body) }}
                </b-card-text>
            </b-card>
        </div>

        <b-pagination
            v-model="page"
            :total-rows="count"
            :per-page="pageSize"
            prev-text="<"
            next-text=">"
            @change="handlePageChange"
        ></b-pagination>
    </div>
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

</style>