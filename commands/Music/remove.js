const Command = require('../../base/Command.js')

class Remove extends Command {
  constructor (client) {
    super(client, {
      name: 'remove',
      description: (language) => language.get('REMOVE_DESCRIPTION'),
      usage: (language, prefix) => language.get('REMOVE_USAGE', prefix),
      examples: (language, prefix) => language.get('REMOVE_EXAMPLES', prefix),
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      permLevel: 'User',
      botPermissions: ['SEND_MESSAGES'],
      cooldown: 2000
    })
  }

  async run (message, args) {
    try {
      const trackPlaying = message.bot.player.isPlaying(message)
      if (!trackPlaying) {
        return message.channel.send(message.language.get('NOT_PLAYING'))
      }
      if (!message.member.voice.channel) return message.channel.send(message.language.get('PLAY_NO_VOICECHANNEL'))
      const toRemove = args[0]
      if (!toRemove || isNaN(parseInt(toRemove))) return message.channel.send(message.language.get('REMOVE_NO_ARGS'))
      if (parseInt(toRemove) === 0) return message.channel.send(message.language.get('REMOVE_ZERO'))
      await message.bot.player.remove(message, parseInt(toRemove))
      return message.channel.send(message.language.get('REMOVE_REMOVED'))
    } catch (error) {
      console.error(error)
      return message.channel.send(message.language.get('ERROR', error))
    }
  }
}

module.exports = Remove
