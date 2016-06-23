const request = require('request')
const cheerio = require('cheerio')
const Hero = require('./models/Hero');

request('https://playoverwatch.com', (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html)

    $('li.u-inline-block').each((i, portrait) => {
      const attribs = portrait.children[0].attribs
      const heroName = attribs['data-hero-name']
      const heroDescription = attribs['data-hero-description']

      Hero.create({
        name: heroName,
        description: heroDescription 
      })
    })
  }
})
