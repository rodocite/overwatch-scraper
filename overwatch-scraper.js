const request = require('request')
const Hero = require('./models/Hero')

request('http://overwatch.wikia.com/api/v1/Navigation/Data', (error, response) => {
  if (!error && response.statusCode === 200) {
    const data = JSON.parse(response.body).navigation.wiki
    const heroes = data[1].children
    let flattenedHeroes = [];

    heroes.forEach(type => {
      type.children.forEach(hero => {
        flattenedHeroes.push({
          name: hero.text,
          type: type.text
        })
      })
    })

    flattenedHeroes.forEach(hero => {
      const name = hero.name
      const type = hero.type

      Hero.create({ name, type })
    })
  }
})
