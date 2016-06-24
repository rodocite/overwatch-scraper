const request = require('request')
const cheerio = require('cheerio')
const { Hero, Player, Stat, User, Map } = require('./models')

const scrapeGameContent = () => {
  request('http://overwatch.wikia.com/api/v1/Navigation/Data', (error, response) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(response.body).navigation.wiki
      const heroes = data[1].children
      const maps = data[0].children
      let flattenedHeroes = [];
      let flattenedMaps = [];

      heroes.forEach(type => {
        type.children.forEach(hero => {
          flattenedHeroes.push({
            name: hero.text,
            type: type.text
          })
        })
      })

      maps.forEach(type => {
        if (type.text != 'Overview')
        type.children.forEach(map => {
          flattenedMaps.push({
            name: map.text,
            type: type.text
          })
        })
      })

      flattenedMaps.forEach(map => {
        const name = map.name
        const type = map.type

        Map.create({ name, type })
      })

      flattenedHeroes.forEach(hero => {
        const name = hero.name
        const type = hero.type

        Hero.create({ name, type })
      })
    }
  })
}

const scrapePlayerStats = battleTag => {
  const [name, id] = battleTag.split('#')

  request(`https://playoverwatch.com/en-us/career/pc/us/${name + '-' + id}`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)
      const player = $('.header-masthead').text()

      const create = () => {
        Player.create({ battletag: battleTag })
        .then(player => {
          Stat.create(
              [].slice.call($('.data-table').first().children().find('td:nth-child(1)')
              .map((i, stat) => {
                return {
                  name: $(stat).text().split(' ').join('_').toLowerCase(),
                  value: parseInt($(stat).next().text())
                }
              }))
              .reduce((obj, current) => {
                obj[current.name] = current.value
                return obj
              }, {})
          )
          .then(stat => {
            player.update({ stat_id: stat.id })
            stat.update({ player_id: player.id })
          })
        })
      }

      const update = (player) => {
        stat.update(
          [].slice.call($('.data-table').first().children().find('td:nth-child(1)')
          .map((i, stat) => {
            return {
              name: $(stat).text().split(' ').join('_').toLowerCase(),
              value: parseInt($(stat).next().text())
            }
          }))
          .reduce((obj, current) => {
            obj[current.name] = current.value
            return obj
          }, {})
        )
      }

      Player.find({ where: { battletag: battleTag }, include: { model: Stat } })
      .then(update, create)
    }
  })
}

scrapeGameContent()
scrapePlayerStats('Riot#1153')
