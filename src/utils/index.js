const moment = require('moment');

module.exports = {

    formatDate: function(date) {
        var old_date = moment(date, 'YYYY-MM-DD');
        return moment(old_date).format('DD MMM YYYY, dddd');
    },

    getDate: function() {
        moment().locale('ms-my');
        return moment().format('DD MMM YYYY');
    },

    getMonthName: function(month) {
        var old_date = moment(month, 'M');
        return moment(old_date).format('MMMM');
    },
}