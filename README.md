# Scraper

## Installation

```
npm install https://github.com/tzdesign/scraper.git -S
```

## Usage

```
const Scraper = require('scraper');
const scraper = new Scraper('http://www.my-awesome-website.com');

scraper.start(($,url) => {
    console.log($('h1').text().trim(),url);
});
```
