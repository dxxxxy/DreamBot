module.exports = async(client, message, args) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot || !message.guild) return
    args = message.content.slice(process.env.PREFIX.length).split(/ +/)
    if (!args[0]) return
    const command = args.shift().toLowerCase() //command
    let cmd = client.commands.get(command) //function
    if (!cmd) return
    if (cmd[0]) cmd = cmd[1]
    console.log(`Author "${message.author.username}" | Command "${message}"`)
    cmd.run(client, message, args)
}