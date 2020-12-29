const Command = require('../../base/Command.js')

class Loop extends Command {
  constructor (client) {
    super(client, {
      name: 'loop',
      description: (language) => language.get('LOOP_DESCRIPTION'),
      usage: (language, prefix) => language.get('LOOP_USAGE', prefix),
      examples: (language, prefix) => language.get('LOOP_EXAMPLES', prefix),
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      aliases: ['repeat-queue'],
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
      const loopModeEnabled = message.bot.player.getQueue(message).loopMode
      if (loopModeEnabled) {
        // if the loop mode is currently enabled, disable it
        message.bot.player.setLoopMode(message)
        message.channel.send(message.language.get('LOOP_UNLOOPING'))
      } else {
        // if the loop mode is currently disabled, enable it
        message.bot.player.setLoopMode(message)
        message.channel.send(message.language.get('LOOP_LOOPING'))
      }
    } catch (error) {
      console.error(error)
      return message.channel.send(message.language.get('ERROR', error))
    }
  }
}

module.exports = Loop
