const moment = require('moment');

module.exports = {
    // for new source format
    formatDate: function(date) {
        var old_date = moment(date, 'YYYY-MM-DD');
        return moment(old_date).format('DD MMM YYYY, dddd');
    },

    getDate: function() {
        moment().locale('ms-my');
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },
}