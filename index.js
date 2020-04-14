require("dotenv").config()
const Discord = require("discord.js")


const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  console.log(msg.content)
  console.log(msg.content.match(/[0-9a-zA-Z]/))
  if (msg.content.match(/[0-9a-zA-Z]/)) {
    msg.delete({reason: "this message contained text"});
  }
})


client.login(process.env.TOKEN)