function http_redirector(details) {
    console.log("original url: "+details.url);
    if (details.url.slice(0,22) === "http://mr3.douban.com/"){
        redirect_url = "http://mr3.bigsquirrel.me/"+details.url.slice(22);
    }
    if (details.url.slice(0,22) === "http://mr4.douban.com/"){
        redirect_url = "http://mr4.bigsquirrel.me/"+details.url.slice(22);
    }
    console.log("redirect url: "+redirect_url);
    if (redirect_url !== null){
        return {redirectUrl: redirect_url};
    }
    return {};
}

function setup_redirect() {
    if (!chrome.webRequest.onBeforeRequest.hasListener(http_redirector)) {
        chrome.webRequest.onBeforeRequest.addListener(
                http_redirector,
                {
                    urls: ["http://mr3.douban.com/*.mp3","http://mr4.douban.com/*.mp3"]
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
