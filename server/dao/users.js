var moment = require('moment');
var _      = require('./query');
var $sqlQuery = require('./sqlCRUD').user;
var config = require('../conf/app').userConfig;

var user = {
    saveUserInfo: function (userInfo, session_key, skey) {
        var uid = userInfo.openId,
            create_time = moment().format('YYYY-MM-DD HH:mm:ss'),
            update_time = create_time;
        var insertObj = {
            'uid': uid,
            'create_time': create_time,
            'uname': userInfo.nickName,
            'ugender': userInfo.gender,
            'uaddress': userInfo.province+','+userInfo.country,
            'update_time': update_time,
            'ubalance': config.credit,
            'skey': skey,
            'sessionkey': session_key,
            'uavatar': userInfo.avatarUrl
        };
        var updateObj = {
            'uname': userInfo.nickName,
            'ugender': userInfo.gender,
            'uaddress': userInfo.province + ',' + userInfo.country,
            'update_time': update_time,
            'skey': skey,
            'sessionkey': session_key,
            'uavatar': userInfo.avatarUrl
        };
        let ubalance;
        return _.query($sqlQuery.hasUser, uid)
            .then(function(res) {
                if (res && res[0] && res[0].userCount) {         // 已经有此用户，则更新用户信息
                    ubalance = res[0].ubalance;
                    return _.query($sqlQuery.update, [updateObj, uid])
                } else {                        // 否则，添加此用户
                    ubalance = config.credit;
                    return _.query($sqlQuery.add, insertObj)
                }
            })
            .then(function () {
                var resUserObj = Object.assign({}, userInfo, { balance: ubalance});
                delete resUserObj.openId && delete resUserObj.watermark;
                return {
                    userInfo: resUserObj,
                    skey: skey
                }
            })
            .catch(function(e) {
                console.log('save userInfo error', JSON.stringify(e));
                return {
                    errmsg: JSON.stringify(e)
                }
            })
    },
    getBoughtBooks: function (skey) {
        return _.query($sqlQuery.getBoughtBooks, skey);
    },
    getUserBalance: function (skey) {
        return _.query($sqlQuery.getBalance, skey);
    },
    getUserId: function (skey,content) {
        return _.query($sqlQuery.getId, [skey,content]);
    }
};

module.exports = user;