var express   = require('express');
var Book      = require('../controllers/books');
var router    = express.Router();
var Comment   = require('../controllers/comments');
/**
 *  @desc 写评论
 *  @method {*请求方法} POST
 */
router.post('/write', function (req, res, next) {
    var skey = req.body.skey;
    var content = req.body.content;
    var bookid = parseInt(req.body.bookid);

    if(skey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }
    if(content === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数content字段，请检查后重试'
        });
        return;
    }

    if (bookid === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数bookid字段，请检查后重试'
        });
        return;
    }

    Comment.addCommentBySkey(req, res, next);
});

module.exports = router;