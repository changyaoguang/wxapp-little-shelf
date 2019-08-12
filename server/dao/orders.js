var $sqlOrderQuery = require('./sqlCRUD').order;
var $sqlUserQuery = require('./sqlCRUD').user;

var _ = require('./query');

var orders = {
    addBookOrder: function (bookid, price, uid, balance) {
        return Promise.all([
            _.query($sqlOrderQuery.buyBook, [uid, price, bookid]),
            _.query($sqlUserQuery.reduceBalance, [(balance - price), uid])
        ])
    }
};
module.exports = orders;