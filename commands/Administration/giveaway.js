const Command = require('../../base/Command.js')
const ms = require('ms')

class Giveaway extends Command {
  constructor (client) {
    super(client, {
      name: 'giveaway',
      description: (language) => language.get('GIVEAWAY_DESCRIPTION'),
      usage: (language, prefix) => language.get('GIVEAWAY_USAGE', prefix),
      examples: (language, prefix) => language.get('GIVEAWAY_EXAMPLES', prefix),
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      permLevel: 'Server Admin',
      botPermissions: ['SEND_MESSAGES'],
      aliases: ['giveaways', 'gift', 'gifts'],
      nsfw: false,
      adminOnly: true,
      cooldown: 1000
    })
  }

  async run (message, args) {
    try {
      let method = args[0]
      if (!method) return message.channel.send(message.language.get('GIVEAWAY_NO_METHOD', message.settings.prefix))
      method = method.toLowerCase()
      if (method === 'start') {
        const time = args[1]
        if (!time || (ms(time) === undefined)) return message.channel.send(message.language.get('GIVEAWAY_NO_TIME'))
        if (ms(time) >= 8640000000000000) return message.channel.send(message.language.get('GIVEAWAY_TOO_LONG'))
        if (ms(time) <= 0) return message.channel.send(message.language.get('GIVEAWAY_TIME_NOT_POSITIVE'))
        const winnersCount = parseInt(args[2])
        if (winnersCount <= 0) return message.channel.send(message.language.get('GIVEAWAY_WINNERS_NOT_POSITIVE'))
        if (winnersCount > 100) return message.channel.send(message.language.get('GIVEAWAY_WINNERS_TOO_LONG'))
        if (!winnersCount) return message.channel.send(message.language.get('GIVEAWAY_NO_WINNERCOUNT'))
        const prize = args.slice(3).join(' ')
        if (!prize) return message.channel.send(message.language.get('GIVEAWAY_NO_PRIZE'))
        message.bot.gManager.start(message.channel, {
          time: ms(time),
          prize: prize,
          winnerCount: winnersCount,
          messages: message.language.get('GIVEAWAY_CREATE_MESSAGES'),
          hostedBy: message.author
        })
      } else if (method === 'edit') {
        const messageID = args[1]
        if (!messageID) return message.channel.send(message.language.get('GIVEAWAY_ERR_NO_ID'))
        const newWinners = parseInt(args[2])
        if (!newWinners) return message.channel.send(message.language.get('GIVEAWAY_NO_WINNERCOUNT'))
        const newTime = args[3]
        if (!newTime) return message.channel.send(message.channel.get('GIVEAWAY_NO_NEWTIME'))
        const newPrize = args.slice(4).join(' ')
        message.bot.gManager.edit(messageID, {
          newWinnerCount: newWinners,
          newPrize: newPrize,
          addTime: ms(newTime)
        }).catch(() => {
          message.channel.send(message.language.get('GIVEAWAY_ERR_MESSAGE_NOT_FOUND'))
        })
      } else if (method === 'reroll') {
        const messageID = args[1]
        if (!messageID) return message.channel.send(message.language.get('GIVEAWAY_ERR_NO_ID'))
        const winnersCount = parseInt(args[2])
        if (!winnersCount) return message.channel.send(message.language.get('GIVEAWAY_REROLL_NO_WINNERSCOUNT'))
        message.bot.gManager.reroll(messageID, {
          winnerCount: winnersCount,
          messages: message.language.get('GIVEAWAY_REROLL_MESSAGES')
        }).catch(() => {
          message.channel.send(message.language.get('GIVEAWAY_ERR_REROLL_MSG_ENDED', messageID))
        })
      } else if (method === 'end') {
        const messageID = args[1]
        if (!messageID) return message.channel.send(message.language.get('GIVEAWAY_ERR_NO_ID'))
        message.bot.gManager.end(messageID)
          .catch(() => {
            message.channel.send(message.language.get('GIVEAWAY_ERR_MESSAGE_NOT_FOUND', messageID))
          })
      } else if (method === 'delete') {
        const messageID = args[1]
        if (!messageID) return message.channel.send(message.language.get('GIVEAWAY_ERR_NO_ID'))
        message.bot.gManager.delete(messageID)
          .catch(() => {
            message.channel.send(message.language.get('GIVEAWAY_ERR_MESSAGE_NOT_FOUND', messageID))
          })
      }
    } catch (error) {
      console.error(error)
      return message.channel.send(message.language.get('ERROR', error))
    }
  }
}

module.exports = Giveaway
