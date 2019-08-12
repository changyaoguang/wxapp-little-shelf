var $sqlQuery = require('./sqlCRUD').book;
var _ = require('./query');

var books = {
    getBookInfo: function (isAll, bookid) {
        if (isAll) {
            return _.query($sqlQuery.queryAll, [])
        } else {
            return _.query($sqlQuery.queryById, [bookid]);
        }
    },
    queryBookBySkey: function (bookid, skey) {
        return _.query($sqlQuery.queryBookBySkey, [skey, bookid]);
    },
    getPriceById: function (bookid) {
        console.log(bookid,'<>>>>')
        return _.query($sqlQuery.getPrice, bookid);
    }
};
module.exports = books;