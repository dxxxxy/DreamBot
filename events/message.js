const prefix = process.env.PREFIX

module.exports = async(client, message, args, member) => {
    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;
    args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    if (!cmd) return
    cmd.run(client, message, args, member)
}