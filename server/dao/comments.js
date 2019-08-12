var $sqlQuery = require('./sqlCRUD').comment;
var _ = require('./query');

var comments = {
    getCommentsBySkey: function(bookid) {
        return _.query($sqlQuery.queryComments, bookid);
    },
    addCommentBySkey: function(skey, content, bookid) {
        return _.query($sqlQuery.addComment, [bookid, bookid, content, skey]);
    }
};
module.exports = comments;