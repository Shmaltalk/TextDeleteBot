require("dotenv").config()
const Discord = require("discord.js")


const client = new Discord.Client()

client.login(process.env.TOKEN)


function setAlert() {
  // Timeout at 10 every day
  var now = new Date();
  var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 45) - now;
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
                   "Llama", "Beaver", "Gnu"]
  stupidcolors = ["Ginger", "Lavendar", "Sage", "Turquoise", "Violet",
                  "Vermilion", "Tangerine", "Apricot", "Indigo", "Canary",
                  "Aquamarine", "Cobalt", "Magenta", "Sepia", "Copper",
                  "Charcoal"]
  combo = stupidcolors[Math.floor(Math.random() * stupidanimals.length)] + " " +
          stupidanimals[Math.floor(Math.random() * stupidanimals.length)]
  member.setNickname(combo);
  member.send(`Welcome to chime!\n- 1st step, block dms\n- 2nd step, turn off
              all notifications, make sure @channel and @here are still active\n
              this how it work mon, post once a day, youll get a message from admins`)
})
