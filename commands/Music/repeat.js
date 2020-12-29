const Command = require('../../base/Command.js')

class Repeat extends Command {
  constructor (client) {
    super(client, {
      name: 'repeat',
      description: (language) => language.get('REPEAT_DESCRIPTION'),
      usage: (language, prefix) => language.get('REPEAT_USAGE', prefix),
      examples: (language, prefix) => language.get('REPEAT_EXAMPLES', prefix),
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      aliases: ['repeat-song'],
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
      const repeatModeEnabled = message.bot.player.getQueue(message).repeatMode
      if (repeatModeEnabled) {
        // if the repeat mode is currently enabled, disable it
        message.bot.player.setRepeatMode(message, false)
        message.channel.send(message.language.get('REPEAT_UNLOOPING'))
      } else {
        // if the repeat mode is currently disabled, enable it
        message.bot.player.setRepeatMode(message, true)
        message.channel.send(message.language.get('REPEAT_LOOPING'))
      }
    } catch (error) {
      console.error(error)
      return message.channel.send(message.language.get('ERROR', error))
    }
  }
}

module.exports = Repeat
