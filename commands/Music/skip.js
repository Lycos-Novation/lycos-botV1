const Command = require('../../base/Command.js')

class Skip extends Command {
  constructor (client) {
    super(client, {
      name: 'skip',
      description: (language) => language.get('SKIP_DESCRIPTION'),
      usage: (language, prefix) => language.get('SKIP_USAGE', prefix),
      examples: (language, prefix) => language.get('SKIP_EXAMPLES', prefix),
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      permLevel: 'User',
      botPermissions: ['SEND_MESSAGES'],
      cooldown: 2000
    })
  }

  async run (message) {
    try {
      const trackPlaying = message.bot.player.isPlaying(message)
      if (!trackPlaying) {
        return message.channel.send(message.language.get('NOT_PLAYING'))
      }
      if (!message.member.voice.channel) return message.channel.send(message.language.get('PLAY_NO_VOICECHANNEL'))
      const track = message.bot.player.nowPlaying(message)
      await message.bot.player.skip(message)
      return message.channel.send(message.language.get('PLAY_SKIPPED', track.title))
    } catch (error) {
      console.error(error)
      return message.channel.send(message.language.get('ERROR', error))
    }
  }
}

module.exports = Skip
