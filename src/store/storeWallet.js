import queryString from 'querystring';

function plusReady(callback) {
    if(/offlinewallet/gi.test(navigator.userAgent)){
        if(window.plus) {
            setTimeout(function() {
                callback();
            }, 0);
        } else {
            document.addEventListener("plusready", function() {
                callback();
            }, false);
        }
    }else{
        callback();
    }
};

let timeOut = 6000;

plusReady(function () {
    console.log('plusReady');

    //saveToken();

    setTimeout(saveToken(), timeOut);
});

