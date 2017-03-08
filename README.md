# Scraper

## Installation

``` shell
npm install https://github.com/tzdesign/scraper.git -S
```

## Usage

``` javascript
const Scraper = require('scraper');
const scraper = new Scraper('http://www.my-awesome-website.com');

scraper.start(($,url) => {
    console.log($('h1').text().trim(),url);
});
```

# Options
``` javascript
const Scraper = require('scraper');
const scraper = new Scraper('http://www.my-awesome-website.com');

scraper.maxRequests = 50;
scraper.requestCount = 0;
scraper.followImages = false;
scraper.debug = false;

```
