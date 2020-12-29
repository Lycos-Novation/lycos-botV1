const Command = require('../../base/Command.js')

class Resume extends Command {
  constructor (client) {
    super(client, {
      name: 'resume',
      description: (language) => language.get('RESUME_DESCRIPTION'),
      usage: (language, prefix) => language.get('RESUME_USAGE', prefix),
      examples: (language, prefix) => language.get('RESUME_EXAMPLES', prefix),
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
      await message.bot.player.resume(message)
      const track = await message.bot.player.nowPlaying(message)
      return message.channel.send(`\`${track.title}\` ${message.language.get('RESUMED')}`)
    } catch (error) {
      console.error(error)
      return message.channel.send(message.language.get('ERROR', error))
    }
  }
}

module.exports = Resume
