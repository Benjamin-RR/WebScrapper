const PORT = 5050
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://gab.com/news';

axios(url)
    .then(response => {
        const html = response.data
        // console.log("TEST:" , html);
        // console.log(response);
        const $ = cheerio.load(html);
        const articles = [];

        $('.data-props', html).each(function() {
            const title = $(this).text();
            const url = $(this).find('a').attr('href');
            const test = $(this).find('.aside');
            // console.log('title:', title, 'url:', url);
            articles.push({
                title,
                url,
                test
            })
        })
        console.log('Articles:', articles);
    })
    .catch(err => {
        console.log(err, "oops.");
    })

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));