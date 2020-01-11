# Bot avec plusieurs fichiers (discord.js)

## 1 : Installation

- Installer nodejs.
- Dans le dossier du bot executer (cmd)
  - `npm install discord.js`
  - `npm install enmap`
- Créer un fichier main.js
- Créer un dossier commands et un dossier events.

## 2 :  Main.js

Dans main.js, mettre :

```js
const Discord = require('discord.js');
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();

var prefix = ".";
var deleteErrorMessages = true;

// Reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the event file
    const event = require(`./events/${file}`);
    // Get the event name
    let eventName = file.split(".")[0];
    // scall events with all their proper arguments *after* the `client` var.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file
    let props = require(`./commands/${file}`);
    // Get command name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Storing in the Enmap
    client.commands.set(commandName, props);
    console.log(`${commandName} loaded.`);
  });
});

client.login('NDE1Nzk2MzQzNzgxNDU3OTIx.DjT3iA.0RGjnK79CV5gKtGKA50PvPjlSFQ');
client.on('ready', () => {
  console.log(`Bot connecté : ${client.user.tag}`);
});
```

## Events

Le dossier events sert à définir les events auquels le bot va réagir. (message, ready, ect).
- Fichiers: nomdel'event.js (ex: message.js)

fichier message.js :
```js
module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix
  if (message.content.indexOf('.') !== 0) return;

  // Standard argument/command name definition.
  const args = message.content.slice('1').trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
```
Ce fichier sert à executer les commandes du dossier /commands.

exemple du fichier ready.js :
```js
module.exports = (client) => {
  // Code à executer quand le bot est chargé
}
```

## Commands

Le dossier commands sert à définir chaque commande.
- Fichiers: nomdelacommande.js (ex: help.js)

**Template des fichiers commands**
```js
const Discord = require('discord.js');
const client = new Discord.Client();

// Ici importez les modules supplémentaires

module.exports.run = (client, message, args) => {
  //Code de la commande
  // la variable args corrsepond aux arguments passés avec la commande
}

```
