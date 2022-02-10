# DreamBot

[Setup](#setup) | [Commands](#commands) | [How it works](#how-it-works) | [Credits](#credits)

### Recode Completed (v2). For the v1, visit [DreamBot/legacy](https://github.com/DxxxxY/DreamBot/tree/legacy)<hr>

An open-source hypixel skyblock bot with extensive documentation, the latest dependencies and almost no hardcoding. Featuring simple, clean yet elegant embed messages with custom emojis and database integration.

## Setup
1. Clone repo
2. Create a `.env` file following this template:
```sh
TOKEN= # discord client token 
PREFIX= # bot command prefix
APIKEY= # hypixel api key
DATABASE= # mongodb url
```
3. `npm i` - Installs dependencies
4. `node .` - Runs bot
> Congrats, you made it.

## Commands
> Please take note that [] means required while <> means optional (arguments)
- `d!help` - Shows all commands.
- `d!register [IGN]` - Register your name so that subsequent commands don"t need your name.
- `d!timers` - Shows timers for events
> The following commands will display a players stat if given a name. If no name is given and you are registered, you will be displayed your own stats.
- `d!skills <IGN>` - Shows skills
- `d!pets <IGN>` - Shows pets
- `d!slayers <IGN>` - Shows slayers
- `d!info <IGN>` - Shows basic info

## How it works
- For command binding: 
A command is registered by reading its file name and creating a "copy" of its run function (`exports.run`).  

- For alias binding:
An alias is registered by reading the first line of the file and seeing if it has a comment (`//`). It will then parse that command and whatever text written shall be registered as an alias that can be called like a command.

As an example: imagine a file named `help.js` in the `commands/` directory. The content of that file is:
```js
//h
exports.run = (client, message, args) => {
    message.channel.send("help")
}
```
Two commands will be registered, `h` and `help` prefixed with whatever the value of `process.env.TOKEN` is.

- For event binding:
An event is registered by reading its file name and exporting it with `module.exports`.

As an example: imagine a file named `ready.js` in the `events/` directory. The content of that file is:
```js
module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}`)
}
```

```diff
+ As a plus, we get to access `client`, `message` and `args` without 
+ having to import them. 

+ And, as we already have an enclosing function, we can simply prefix the  
+ arguments with async instead of creating a self executing anonymous function.

- As a minus, commands and events are REQUIRED to be in `commands/` 
- and `events/` respectively and their names will need to adhere to discord.js.
```

A list of events can be found here: https://discord.js.org/#/docs/main/stable/class/Client

## Credits
- [InventiveTalent](https://github.com/InventivetalentDev) - Event Timers API
- [Hypixel-Skyblock Wiki](https://hypixel-skyblock.fandom.com/wiki/Hypixel_SkyBlock_Wiki) - Media, XP tables, Info
- [Minetools](https://api.minetools.eu/) - Minecraft API
- [Visage](https://visage.surgeplay.com/index.html) - Skins API
- [Hypixel](https://api.hypixel.net/) - Hypixel API