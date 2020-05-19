require("dotenv").config()
const Discord = require("discord.js")


const client = new Discord.Client()

client.login(process.env.TOKEN)


function setAlert() {
  // Timeout at 10 every day
  var now = new Date();
  var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 0) - now;
  if (millisTill10 < 0) {
       millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
  }
  console.log(millisTill10)
  setTimeout(function(){
    const channel = client.channels.cache.get("704739753018392638");
    channel.send(`@everyone Hello! This is a reminder to post your moods today, again, thanks so much for helping us out with our study!`);
    console.log("Sent alert, resetting for tomorrow")
    setAlert()
  }, millisTill10);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  setAlert()
})

client.on("message", msg => {

  if (!msg.author.bot) {
    if (!msg.member.roles.member._roles.includes('704751116692488202')) {
      if (msg.content.match(/[0-9a-zA-Z]/)) {
        msg.delete({reason: "this message contained text"});
      }
    }
  }
})

client.on('guildMemberAdd', member => {
  stupidanimals = ["Chicken", "Iguana", "Kangaroo", "Anchovy", "Dingo",
                   "Dolphin", "Emu", "Penguin", "Zebra", "Gopher", "Aardvark",
                   "Llama", "Gnu"]
  stupidcolors = ["Ginger", "Lavendar", "Sage", "Turquoise", "Violet",
                  "Vermilion", "Tangerine", "Apricot", "Indigo", "Canary",
                  "Aquamarine", "Cobalt", "Magenta", "Sepia", "Copper",
                  "Charcoal"]
  combo = stupidcolors[Math.floor(Math.random() * stupidanimals.length)] + " " +
          stupidanimals[Math.floor(Math.random() * stupidanimals.length)]
  member.setNickname(combo);
  member.send(`**Welcome to chime!**\n
**Heres how to get set up:**\n
> 1st step: block direct messaging by clicking on the "Chime" server name in the top left corner (make sure you are on the chime server page), going to "Privacy Settings", and disabling direct messaging\n
> 2nd step: set your notification settings by going to "Notification Settings" in the server settings tab, (again accessed by clicking on the "Chime" server name while on the chime server). From there, check "Only @mentions"\n\n
**Now that your setup is done, you can start posting!**\n
> Chime only allows for emoji based text posts, so any message you send containing text will be deleted.\n
> We prefer that you post in a format of one main emoji, representing your mood, followed by an arbitrary number of "story emojis", which will be used to describe your mood. Try to separate your main emoji from your story emojis with a dash. Example: 😊-🎨📚📖☀️\n
> We encourage members to post once a day and we will be sending daily reminders to help you remember to post!\n
> We encourage you to also use the discord reaction feature to respond to other posts.\n
> Thanks so much for helping us out and have fun using Chime!\n\n
**Setup Reference Images**\n\n`, {files: ["https://i.imgur.com/Ox1ePLr.png", "https://i.imgur.com/0kNOeZq.png"]})
})
