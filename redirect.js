function http_redirector(details) {
    console.log("original url: "+details.url);
    if (details.url.indexOf("/rda/")!==-1){
        return {cancel: true};
    }
    var redirect_url = details.url.replace(".douban.com",".bigsquirrel.me");
    console.log("redirect url: "+redirect_url);
    if (redirect_url !== details.url.replace){
        return {redirectUrl: redirect_url};
    }
    return {};
}

function setup_redirect() {
    if (!chrome.webRequest.onBeforeRequest.hasListener(http_redirector)) {
        chrome.webRequest.onBeforeRequest.addListener(
                http_redirector,
                {
                    urls: [
                        "http://mr3.douban.com/*/song/*",
                        "http://mr4.douban.com/*/song/*",
                        "http://mr3.douban.com/*/rda/*",
                        "http://mr4.douban.com/*/rda/*"
                        ]
                },
                ["blocking"]
                );
        console.log('http_redirector is set');
    } else {
        var err_msg = 'http_redirector is already there!';
        console.error(err_msg);
    }
}


function clear_redirect() {
    if (chrome.webRequest.onBeforeRequest.hasListener(http_redirector)) {
        chrome.webRequest.onBeforeRequest.removeListener(http_redirector);
        console.log('http_redirector is removed');
    } else {
        var err_msg = 'http_redirector is not there!';
        console.error(err_msg);
    }
}

document.addEventListener("DOMContentLoaded",function(){
    setup_redirect();
});
