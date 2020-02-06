var ugUtil = (function (ugUtil, $, undefined) {
    // 로딩 보기
    ugUtil.showLoading = function () {
        var loadingHTML = '<div class="loading"><div class="loading-img"><img src="data:image/gif;base64,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" alt="로딩"></div></div>';
        if ($(".loading").length) $(".loading").remove();
        ugUtil.htmlFixedSetting();
        $("body").append(loadingHTML).fadeIn();
    };

    // 로딩 숨기기
    ugUtil.hideLoading = function () {
        if ($(".loading").length) {
            setTimeout(function () {
                $(".loading").fadeOut(300, function () {
                    $("loading").remove();
                });
            }, 300);
            ugUtil.htmlUnfixedSetting();
        }
    };

    // HTML FIXED 스크롤 값 구하기
    ugUtil.htmlFixedSetting = function () {
        var scroll_v = $(window).scrollTop();
        $("html").addClass("off");
        $("body").css({
            'margin-top': (scroll_v) * -1
        });
    };

    // HTML FIXED 해제시
    ugUtil.htmlUnfixedSetting = function () {
        $("html").removeClass("off");
        var scroll_v = $("body").css("margin-top") || 0;
        scroll_v = parseInt(scroll_v, 10) * -1;
        $("body").css({
            'margin-top': 0
        });
        $("html, body").stop().animate({
            scrollTop: scroll_v
        }, 1);
    };

    // 모바일 여부 검사
    ugUtil.mobileCheck = function () {
        this.navigator = top.navigator.userAgent;
        var nav = this.navigator;
        var plat = top.navigator.platform;
        return plat.match(/iPhone|iPod|iPad/) ? 'ios' : nav.indexOf('Android') > -1 ? 'android' : nav.indexOf('iPhone') > -1 ? 'iphone' : nav.indexOf('iPad') > -1 ? 'ipad' : nav.indexOf('mobile') > -1 ? 'mobile' : '';
    };

    // app 여부 확인
    ugUtil.isApp = function () {
        return (!!window.webkit && !!window.webkit.messageHandlers && !!window.webkit.messageHandlers.onLoginMessage) || (!!window.myJs);
    };

    // app iOS인지 확인
    ugUtil.isAppIos = function () {
        return (!!window.webkit && !!window.webkit.messageHandlers && !!window.webkit.messageHandlers.firebase);
    };

    // app android인지 확인
    ugUtil.isAppAndroid = function () {
        return (!!window.myJs);
    };

    // url 파라미터 정보 json 객체로 반환
    ugUtil.paramToJson = function (str) {
        if (!str) {
            return {};
        }
        if (str.indexOf('?') == 0 || str.indexOf('#') == 0) {
            str = str.substr(1);
        }
        if (str.indexOf('+') > -1 && str.indexOf(' ') == -1 && str.indexOf('=') > -1) {
            str = str.split('+').join(' ');
        }
        var arr = str.replace(/(^\?)/, '').split("&");
        var map = {};
        for (var i = 0; i < arr.length; i++) {
            var key = decodeURIComponent(arr[i].split('=')[0]);
            var val = arr[i].split('=')[1];
            if (val != null) {
                val = decodeURIComponent(val);
            } else {
                val = '';
            }
            if (typeof map[key] != 'undefined') {
                if (typeof map[key] == 'string') {
                    map[key] = [map[key]];
                }
                map[key].push(val);
            } else {
                map[key] = val;
            }
        }
        return map;
    };

    // ascii 암호화
    ugUtil.encrypt = function (theText) {
        output = new String;
        Temp = new Array();
        Temp2 = new Array();
        TextSize = theText.length;
        for (i = 0; i < TextSize; i++) {
            rnd = Math.round(Math.random() * 122) + 68;
            Temp[i] = theText.charCodeAt(i) + rnd;
            Temp2[i] = rnd;
        }
        for (i = 0; i < TextSize; i++) {
            output += String.fromCharCode(Temp[i], Temp2[i]);
        }
        return output;
    };

    // ascii 복호화
    ugUtil.unEncrypt = function (theText) {
        output = new String;
        Temp = new Array();
        Temp2 = new Array();
        TextSize = theText.length;
        for (i = 0; i < TextSize; i++) {
            Temp[i] = theText.charCodeAt(i);
            Temp2[i] = theText.charCodeAt(i + 1);
        }
        for (i = 0; i < TextSize; i = i + 2) {
            output += String.fromCharCode(Temp[i] - Temp2[i]);
        }
        return output;
    };

    // json 객체 파라미터 문자로 변환
    ugUtil.jsonToParam = function (data) {
        if (typeof data == 'string' && (data.split(' ').join('').substr(0, 1) == '{' || data.split(' ').join('').substr(0, 1) == '{')) {
            data = JSON.parse(data);
        }
        var str = '';
        if (!data) {
            return '';
        }
        for (key in data) {
            if (data[key] != undefined) {
                str += (str != '' ? '&' : '') + key + '=' + encodeURIComponent(data[key]);
            }
        }
        return str;
    };

    // 빈 객체 여부 검사
    ugUtil.isEmpty = function (str) {
        if (str == undefined || str == null || str.length == 0) {
            return true;
        } else {
            return false;
        }
    };

    // 해시값 가져오기
    ugUtil.getHash = function () {
        return ugUtil.paramToJson(location.hash);
    };

    // 해시값 셋팅하기
    ugUtil.setHash = function (ha, f) {
        var rtn = ugUtil.jsonToParam(ha);
        if (rtn) {
            location.hash = rtn;
        } else {
            window.history.replaceState("", document.title, window.location.pathname);
        }
    };

    // 크로스 사이트 스크립팅 방지
    // strTemp : 검사 문자열
    // level : 
    //          0  기본 : XSS 취약한 문자 제거
    //          1  선택 : 단순 <, > 치환
    ugUtil.xssCheck = function (strTemp, level, flag) {
        if (flag == 'search') {
            strTemp = JSON.stringify(strTemp);
        }

        if (level == undefined || level == 0) {
            strTemp = strTemp.replace(/\<|\>|\%|\;|\(|\)|\&|body|meta|iframe|script|onload|onclick|onsubmit|onfocus|onkeyup/gi, "")
        } else if (level != undefined && level == 1) {

            function replaceAll(str, searchStr, replaceStr) {
                return str.split(searchStr).join(replaceStr);
            };
            strTemp = replaceAll(strTemp, "<", "&lt;");
            strTemp = replaceAll(strTemp, ">", "&gt;");
            strTemp = replaceAll(strTemp, "(", "&#40;");
            strTemp = replaceAll(strTemp, ")", "&#41;");
            strTemp = replaceAll(strTemp, "'", "&#39;");
            strTemp = replaceAll(strTemp, "script", "");
            strTemp = replaceAll(strTemp, "body", "");
            strTemp = replaceAll(strTemp, "meta", "");
            strTemp = replaceAll(strTemp, "onfocus", "");
        }

        if (flag == 'search') {
            strTemp = JSON.parse(strTemp);
        }
        return strTemp;
    };

    // 쿠키 생성
    ugUtil.setCookie = function (cName, cValue, cDay) {
        // 쿠키
        var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + escape(cValue) + '; path=/ ';
        // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if (typeof cDay != 'undefined')
            cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    };

    // 쿠키 가져오기
    ugUtil.getCookie = function (cName) {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if (start != -1) {
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if (end == -1)
                end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    };

    // 쿠키 삭제
    ugUtil.removeCookie = function (cName) {
        hnbCookie.set(cName, '', -1);
    };

    // 전달받은 파라미터값 조회
    ugUtil.getParamvalue = function (paramName) {
        var paramMap = ugUtil.paramToJson(location.search);
        var rtn = !!paramMap[paramName] ? paramMap[paramName] : '';
        return rtn;
    };

    // 파라미터 값 전체
    ugUtil.getParam = function () {
        var url = document.location.href;
        var qs = url.substring(url.indexOf('?') + 1).split('&');
        for (var i = 0, rtn = {}; i < qs.length; i++) {
            qs[i] = qs[i].split('=');
            rtn[qs[i][0]] = decodeURIComponent(qs[i][1]);
        }
        return rtn;
    }

    // comma
    ugUtil.comma = function (str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };

    // uncomma
    ugUtil.uncomma = function (str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    };

    ugUtil.jsonArrSort = function (data, key, dir) {
        var sortArray = data;
        sortArray.sort(function (a, b) {
            if (a[key] < b[key]) {
                return -1 * dir;
            } else if (a[key] > b[key]) {
                return 1 * dir;
            } else {
                return 0;
            }
        });
        return sortArray;
    };

    ugUtil.localStorageSetItem = function (dataNm, data) {
        localStorage.setItem(dataNm, data);
    };

    ugUtil.localStorageGetItem = function (dataNm) {
        return localStorage.getItem(dataNm);
    };

    ugUtil.setItemJSON = function (dataNm, dataObj) {
        localStorage.setItem(dataNm, JSON.stringify(dataObj));
    };

    ugUtil.getItemJSON = function (dataNm) {
        var rtn = localStorage.getItem(dataNm);
        return eval(JSON.parse(rtn));
    };

    ugUtil.arrayMove = function (arr, oldIndex, newIndex) {
        if (newIndex >= arr.length) {
            var k = newIndex - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr; // for testing
    };

    // 오늘 일자 (2020-01-17)
    ugUtil.getToday = function () {
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var d = d.getDate();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        return y + '-' + m + '-' + d;
    };

    // 오늘 일자 (20200117)
    ugUtil.getTodayStr = function () {
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var d = d.getDate();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        return y + m + d;
    };

    // 남은 시간 계산
    ugUtil.getTimeRemain = function (dt) {
        // IOS APP
        if (ugUtil.isAppIos()) {
            var tgt = new Date(dt.replace(' ', 'T'));
            tgt.setHours(tgt.getHours() - 9);
        } else {
            var tgt = new Date(dt);
        }
        //alert(tgt);
        var tod = new Date();
        var tgv = tgt.valueOf() + (tgt.getTimezoneOffset() * (1000 * 60 * 60)); //  GMT 기준시
        var tdv = tod.valueOf() + (tod.getTimezoneOffset() * (1000 * 60 * 60)); // GMT 기준시
        var remain = tgv - tdv;
        var hh = parseInt(remain / (1000 * 60 * 60));
        var mm = parseInt(remain / (1000 * 60)) % 60;
        var ss = parseInt(remain / (1000)) % 60;
        mm = mm < 10 ? '0' + mm : mm;
        ss = ss < 10 ? '0' + ss : ss;
        return hh + ':' + mm + ':' + ss;
    };

    // 16:9 calculate
    ugUtil.ratio16_9 = function (width) {
        var value = width * 0.5625;
        return parseInt(value, 10);
    }

    return ugUtil;
})(window.ugUtil || {}, jQuery);

// sessionStorage
var ugSession = (function (window, $, undefined) {
    var getItem = function (_key) {
        try {
            return sessionStorage.getItem(_key);
        } catch (e) {
            console.log(e.message);
            return null;
        }
    };

    var setItem = function (_key, _val) {
        try {
            sessionStorage.setItem(_key, _val);
        } catch (e) {
            console.log(e.message);
        }
    };

    return {
        get: function (key) {
            return getItem(key);
        },
        set: function (key, val) {
            setItem(key, val);
        },
        setItems: function (json) {
            for (key in json) {
                sessionStorage[key] = typeof json[key] == 'object' ? JSON.stringify(json[key]) : json[key];
            }
        },
        getTokenData: function () {
            var _tokenData = getItem("TOKEN_DATA");
            if (_tokenData == null) {
                return '';
            } else {
                return _tokenData;
            }
        },
        setTokenData: function (val) {
            setItem("TOKEN_DATA", val);
        },
        remove: function (key) {
            sessionStorage.removeItem(key);
        },
        getUserId: function () {
            sessionStorage.getItem("LOGGED_USER_ID");
        },
        setUserId: function (userId) {
            sessionStorage.setItem("LOGGED_USER_ID", userId);
        }
    }

})(window.ugSession || {}, jQuery);

// ajax data
var ugData = (function (ugData, $, undefined) {
    var ajaxObject = function (_url, _param, _type, _withToken, _async) {
        //var jqxhr, sendData = _type == 'get' ? ugUtil.jsonToParam(_param) : (typeof _param == 'object') ? JSON.stringify(_param) : (typeof _param == 'string') ? _param : '';
        var jqxhr, sendData = _param;
        //console.log(sendData)
        $.ajaxSetup({
            url: _url,
            //data : ugUtil.xssCheck(sendData, 0),
            data: sendData,
            dataType: "json",
            type: _type,
            async: _async,
            contentType: "application/json"
        });

        if (_withToken) {
            jqxhr = $.ajax({
                beforeSend: function (request) {
                    request.setRequestHeader("__TOKEN_DATA__", ugSession.getTokenData());
                    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                    ugUtil.showLoading();
                },
                complete: function () {
                    ugUtil.hideLoading();
                }
            });
        } else {
            jqxhr = $.ajax({
                beforeSend: function (request) {
                    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                    ugUtil.showLoading();
                },
                complete: function () {
                    ugUtil.hideLoading();
                }
            });
        }
        return jqxhr;
    };

    return {
        isEmpty: function (param) {
            if (param === null || param === undefined || param === "") {
                return true;
            }
            return false;
        },

        urlParam: function (name) {
            var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);

            if (results == null) {
                return null;
            } else {
                return results[1] || 0;
            }
        },

        // get 방식
        get: function (url, param) {
            console.log("get");
            return ajaxObject(url, param, 'get', false, true);
        },

        getWithToken: function (url, param) {
            return ajaxObject(url, param, 'get', true, true);
        },

        // post 방식
        post: function (url, param) {
            return ajaxObject(url, param, 'post', false, true);
        },

        postWithToken: function (url, param) {
            return ajaxObject(url, param, 'post', true, true);
        }
    }
})(window, jQuery);


/* ********************************************************* */
//alert(ugUtil.isApp() && ugUtil.mobile_check());

/*ugUtil.showLoading();
setTimeout(function(){
    ugUtil.hideLoading();
}, 2000);*/

//console.log(ugUtil.encrypt('aaaaaaa'));
//console.log(ugUtil.unEncrypt('aaaaaaa'));

data = [{
    "id": "105",
    "name": "FIAT",
    "active": true,
    "parentId": "1"
}, {
    "id": "107",
    "name": "BMW",
    "active": true,
    "parentId": "1"
}, {
    "id": "106",
    "name": "AUDI",
    "active": true,
    "parentId": "1"
}, {
    "id": "109",
    "name": "RENAULT",
    "active": true,
    "parentId": "1"
}];
//console.log(ugUtil.jsonArrSort(data, 'id', 1));