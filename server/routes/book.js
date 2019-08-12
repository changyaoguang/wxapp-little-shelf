var express   = require('express');
var Book      = require('../controllers/books');
var router    = express.Router();

/** 
 * @desc    获取书籍信息
 * @method  {*请求方法} GET
 */
router.get('/getBooks', function (req, res, next) {
    var reqType = req.query.is_all;
    
    if(reqType === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数is_all字段，请检查后重试'
        });
        return;
    }

    if(parseInt(reqType) === 1) {   // 获取全部书籍
        Book.getAllBooks(req, res, next);
    } else {
        Book.getBookById(req, res, next);
    }
});

/**
 * @desc    查询当前用户是否已经购买该书籍并返回评论列表
 * @method  {*请求方法} GET
 */
router.get('/queryBook', function (req, res, next) {
    
    var bookid = req.query.bookid;
    var skey = req.query.skey;
    
    if(bookid === undefined || !bookid) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数bookid字段，请检查后重试'
        });
        return;
    }
    
    if(skey === undefined || !skey) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }
    
    Book.queryBookBySkey(req, res, next);
});

module.exports = router;
