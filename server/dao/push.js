var $sqlQuery = require('./sqlCRUD').access;
var _ = require('./query');

var push = {
    getPusherToken: function() {
        return _.query($sqlQuery.queryToken);
    }
};

module.exports = push;