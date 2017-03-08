const request = require('request');
const cheerio = require('cheerio');


class Scraper{

    constructor(url){
        this._requestCount = 0;
        this._fetchedUrls = [];
        this.maxRequests = 50;
        this.followImages = false;
        this.url = url;
        this.debug = false;
    }

    start(callback){
        this.call(this.url,callback)
    }

    call(url,callback){
        url = url.replace(/\#.*/gi,'');

        if(!(this._fetchedUrls.indexOf(url) != -1) && (this.maxRequests === false || this._requestCount <= this.maxRequests)){

            this.fetchedUrls.push(url);
            const self = this;
            request(url, function(err, resp, body) {
                if(self.debug){
                    console.log('requested',url);
                }
                if(err && self.debug){
                    console.log('ERROR:',url);
                }
                else{
                    const $ = cheerio.load(body);
                    if(typeof callback === 'function'){
                        callback($,url);
                    }
                    $('a[href]').each(function(){
                        const newHref = self.parseHref($(this).attr("href"));
                        if(newHref){
                            self.call(newHref,callback)
                        }
                    });

                }
            });
        }
    }

    parseHref(href){
        href = href.trim();
        const isInternalAbsolute = (new RegExp(this.url)).test(href);
        const isAbsolute = /http/i.test(href) !== false;
        const isImage = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(href)
        const isMailto = /mailto\:/i.test(href)

        if(href === '#' || isMailto || (isAbsolute && !isInternalAbsolute) || (isImage && !this.followImages)){
            return false;
        }

        if(!isAbsolute){
            href = this.url + (href.substring(0,1) !== '/'?'/':'') + href;
        }
        return href;
    }

}

module.exports =  Scraper;
