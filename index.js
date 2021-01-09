const Discord = require('discord.js');
const client = new Discord.Client();
const {
  prefix,
  prefix11,
  color,
  omnicolor,
  color11,
  author_img,
  footer_img,
  omnitrix_logo,
  antitrix_logo,
  antitrix_author_img
} = require('./config.json');
const aliens = require('./aliens.json');
require('dotenv').config() // env
const fetch = require('node-fetch');
const canvacord = require('canvacord');
const {
  Database
} = require("quickmongo");
const db = new Database(`mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0.ikanc.mongodb.net/Omnitrix`);

db.on("ready", () => {
  console.log("Database connected!");
});

const talkedRecently = new Set();
var setting;
var alienLog = [];
const permission = ["ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_MESSAGES"];

client.login(process.env.TOKEN);

client.on('ready', () => {
  client.user.setStatus("online");
  client.user.setActivity("o!it's hero time", {
    type: "LISTENING"
  });
  console.log("It's Hero Time 👽 !!");
})

// Guild Create Welcome message
client.on("guildCreate", (guild) => {
  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  })
  let embed = new Discord.MessageEmbed()
    .setTitle(`:tada: Thanks for adding me to the server __${guild.name}__ !`)
    .setThumbnail(`${guild.iconURL()}`)
    .setDescription("> For helpful commands, type `o!it's hero time`")
    .setColor(`${color}`)
    .setFooter("© Nishith P", `${footer_img}`)
    .setTimestamp()

  defaultChannel.send({
    embed
  });

});

// Event Listener
client.on('message', async (msg) => {
  if (msg.author.bot) return;
  if (msg.author.id === client.user.id) return;
  if (msg.channel.type == "dm") return;

  // Prefix
  let guild_id = msg.guild.id;
  const guildPrefix = await db.get(`${guild_id}_prefix1`);
  const guildPrefix11 = await db.get(`${guild_id}_prefix2`);

  const defPrefix = guildPrefix || `${prefix}`;
  const defPrefix11 = guildPrefix11 || `${prefix11}`;

  if (!msg.content.startsWith(defPrefix) && !msg.content.startsWith(defPrefix11) && !msg.mentions.has(client.user.id)) return;

  // Splitting message content
  const args = msg.content.toLowerCase().slice(defPrefix.length).trim().split(/ +/);
  var miscCom = "";
  var command, alienName, miscComBool;
  if (args.length > 1) {
    miscCom = args[0];
    command = args.slice(0, args.length).join(" ");
    alienName = args.slice(0, args.length).join("");
  } else {
    command = args.shift();
    miscCom = command;
    alienName = command;
  }

  var miscComArray = ["help", "rank", "clear", "gif", "addxp", "invite", "vote"];
  if (miscComArray.indexOf(miscCom) != -1) {
    miscComBool = true
  } else {
    miscComBool = false
  }

  // Alien cmd analysing regex
  const regex = /(heatblast|fourarms|stinkfly|cannonbolt|diamondhead|wildvine|upgrade|overflow|greymatter|xlr8|humungousaur|rath|slapback|shockrock|jetray|goop|waybig)/;
  const kixRegex = /(heatblast|fourarms|cannonbolt|diamondhead|xlr8|humungousaur|rath|slapback|shockrock|jetray)/;
  const nautRegex = /(heatblast|humungousaur|jetray|shockrock)/;
  const regex11 = /(wreckingbolt|thornblade|undertow|darkmatter|crystalfist|bootleg|quadsmack|hotshot|rush|skunkmoth|bashmouth)/;

  // User Variables
  let user = msg.author;
  let key = await db.has(`${user.id}_items_omni-key`);

  // XP
  async function addXP(num) {
    let exp = Math.floor(Math.random() * num + 10);
    db.add(`${user.id}_xp`, exp);
  }

  // Level Notif
  var lvl = await db.get(`${user.id}_level`) || 1;
  var currentXP = await db.get(`${user.id}_xp`) || 0;
  var xpNeeded = (lvl * 200);
  if (currentXP >= xpNeeded) {
    ++lvl;
    currentXP -= xpNeeded;
    db.set(`${user.id}_xp`, currentXP);
    db.add(`${user.id}_level`, 1);
    msg.channel.send(`Congratulations :tada: <@${user.id}>, You are now at **Level ${lvl}**`);
  }
  if (lvl >= 6 && !key) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Omni Key")
      .setAuthor(`${user.username}${user.discriminator}`, `${user.avatarURL({ dynamic: false, format: "jpg" })}`)
      .setColor(`${color}`)
      .setDescription("Type `insert` to insert the Key into the Omnitrix")
      .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FKey.png?alt=media&token=11c24859-8312-456b-8103-b3ccaa48093f")
      .setFooter("© Omnitrix", `${footer_img}`)
      .setTimestamp()
    msg.channel.send({
      embed
    });
    msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
      max: 1,
      time: 1200000
    }).then(collected => {
      if (collected.first().content.toLowerCase() === 'insert') {
        db.push(`${user.id}_items_omni-key`)
        msg.channel.send("Omni-Key inserted successfully !!");
        msg.channel.send(`Congratulations :tada: <@${user.id}>, You have now unlocked Omni-Kix & Omni-Naut functions.Now, you can transform into an alien and type **${defPrefix}kix** or **${defPrefix}naut to access Omni-Kix armour & Omni-Naut suit respectively.**`)
        addXP(10);
      }
    });
  }

  // Main Commands List
  if (command === "it's hero time") {
    let embed = new Discord.MessageEmbed()
      .setTitle("Omnitrix Commands Palette")
      .setAuthor("Omnitrix", `${author_img}`)
      .setColor(`${color}`)
      .setFooter("© Nishith P", `${footer_img}`)
      .setThumbnail(`${omnitrix_logo}`)
      .setTimestamp()
      .addFields({
        name: "Omnitrix",
        value: "> **o!help**",
        inline: true
      })
      .addFields({
        name: "Antitrix",
        value: "> **a!help**",
        inline: true
      })
      .addFields({
        name: "Misc",
        value: "> **o!gif <search q>(optional)** - Sends a gif based on the search query \n> **o!clear** - Clears the bot chat history \n> **o!prefix <1> <2>** - Sets custom prefix 1, 2 for Omnitrix & Antitrix \n> **o!reset** - Resets custom prefix \n> **@mention** - Sends the default prefix of the bot in the Server \n> **o!rank <user>(optional)** - Sends rank card of the mentioned user \n> **o!invite** - Sends bot invite link \n> **o!vote** - Sends bot Listing to Vote",
        inline: false
      })
    msg.channel.send({
      embed
    });
  }

  // Identifying mode
  if (msg.content.startsWith(defPrefix)) {
    setting = "Omnitrix";
    var res = regex.test(alienName);
  } else if (msg.content.startsWith(defPrefix11)) {
    setting = "Antitrix";
    var res11 = regex11.test(alienName);
  }

  // Omnitrix 
  if (setting === "Omnitrix") {
    if (talkedRecently.has(msg.author.id + " Omnitrix")) {
      if (miscComBool === false) {
        msg.channel.send("The Omnitrix is in cooldown. \nPlease wait: " + msg.author.username);
      }
    } else {
      function getAliens(obj, prop) {
        if (res === true) {
          addXP(10);
          return aliens.Omnitrix[obj][prop];
        } else {
          return;
        }
      }
      if (res === true) {
        let embed = new Discord.MessageEmbed()
          .setTitle(getAliens(alienName, "name"))
          .setAuthor("Omnitrix", `${author_img}`)
          .setColor(`${color}`)
          .setFooter("© Omnitrix", `${footer_img}`)
          .setImage(getAliens(alienName, "image"))
          .setThumbnail(`${omnitrix_logo}`)
          .setTimestamp()
          .addFields({
            name: "Species",
            value: getAliens(alienName, "species"),
            inline: true
          })
          .addFields({
            name: "Powers & Abilities",
            value: getAliens(alienName, "abilities")
          })
        msg.channel.send({
          embed
        });

        // Cooldown Function
        if (miscComBool === true) {
          setTimeout(() => {
            talkedRecently.delete(msg.author.id + " Omnitrix");
          }, 0);
        } else {
          // Adds current alien data and removes it after 40s.
          alienLog.push(alienName);
          setTimeout(() => {
            while (alienLog.length != 0) {
              alienLog.pop(alienName);
            }
            if (!miscComBool) {
              msg.channel.send("Omnitrix timed out !!");
            }
            // Adds the user to the set so that they can't transform for 30 seconds
            talkedRecently.add(msg.author.id + " Omnitrix");
            setTimeout(() => {
              // Removes the user from the set after 30 seconds
              talkedRecently.delete(msg.author.id + " Omnitrix");
            }, 30000);
          }, 40000)
        }
      }
    }
    // Help Embed - Commands List
    if (command === "help") {
      let embed = new Discord.MessageEmbed()
        .setTitle("Omnitrix Commands list")
        .setDescription(`Type \`\ ${defPrefix}\`\ followed by the Alien name.`)
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`${color}`)
        .setFooter("© Nishith P", `${footer_img}`)
        .setThumbnail(`${omnitrix_logo}`)
        .setTimestamp()
        .addFields({
          name: "It's Hero time !!",
          value: "`Fourarms` \n`Heatblast` \n`Cannonbolt` \n`Stinkfly` \n`Diamondhead` \n`Wildvine` \n`Upgrade` \n`Overflow` \n`Grey matter` \n`XLR8` \n`Humungousaur` \n`Rath` \n`Slapback` \n`Shock rock` \n`Jetray` \n`Goop` \n`Way big`",
        });
      msg.channel.send({
        embed
      });
      addXP(2);
    }
    // Antitrix
  } else if (setting === "Antitrix") {
    if (talkedRecently.has(msg.author.id + " Antitrix")) {
      if (miscComBool === false) {
        msg.channel.send("The Antitrix is in cooldown. \nPlease wait: " + msg.author.username);
      }
    } else {
      function getAliens(obj, prop) {
        if (res11 === true) {
          addXP(11);
          return aliens.Antitrix[obj][prop];
        } else {
          return;
        }
      }
      if (res11 === true) {
        let embed = new Discord.MessageEmbed()
          .setTitle(getAliens(alienName, "name"))
          .setAuthor("Antitrix", `${antitrix_author_img}`)
          .setColor(`${color11}`)
          .setFooter("© Antitrix", `${antitrix_logo}`)
          .setImage(getAliens(alienName, "image"))
          .setThumbnail(`${antitrix_logo}`)
          .setTimestamp()
          .addFields({
            name: "Species",
            value: getAliens(alienName, "species"),
            inline: true
          })
          .addFields({
            name: "Powers & Abilities",
            value: getAliens(alienName, "abilities")
          })
        msg.channel.send({
          embed
        });

        // Cooldown Function
        if (miscComBool === true) {
          setTimeout(() => {
            talkedRecently.delete(msg.author.id + " Antitrix");
          }, 0);
        } else {
          // Adds the user to the set so that they can't transform for 30 seconds
          talkedRecently.add(msg.author.id + " Antitrix");
          setTimeout(() => {
            // Removes the user from the set after 30 seconds
            talkedRecently.delete(msg.author.id + " Antitrix");
          }, 30000);
        }
      }
    }
    // Help Embed - Commands List
    if (command === "help") {
      let embed = new Discord.MessageEmbed()
        .setTitle("Antitrix Commands list")
        .setDescription(`Type \`\ ${defPrefix11}\`\ followed by the Alien name.`)
        .setAuthor("Antitrix", `${antitrix_author_img}`)
        .setColor(`${color11}`)
        .setFooter("© Nishith P", `${antitrix_logo}`)
        .setThumbnail(`${antitrix_logo}`)
        .setTimestamp()
        .addFields({
          name: "Let's bring the pain !!",
          value: "`Wreckingbolt` \n`Thornblade` \n`Undertow` \n`Dark matter` \n`Crystalfist` \n`Bootleg` \n`Quadsmack` \n`Hotshot` \n`Rush` \n`Skunkmoth` \n`Bashmouth`",
        });
      msg.channel.send({
        embed
      });
      addXP(2);
    }

  }

  // Omnikix & Omninaut commands
  if (command === "kix" && key === true) {
    let result = kixRegex.test(alienLog[alienLog.length - 1]);

    function getOKix(obj, prop) {
      if (result) {
        addXP(10);
        return aliens.Omnitrix[obj]["omnikix"][prop];
      } else {
        return;
      }
    }
    if (result) {
      let embed = new Discord.MessageEmbed()
        .setTitle(getOKix(alienLog[alienLog.length - 1], "name"))
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("© Omnitrix", `${footer_img}`)
        .setImage(getOKix(alienLog[alienLog.length - 1], "image"))
        .setTimestamp()
      msg.channel.send({
        embed
      });
      msg.react("797164865408073780");
    }

  } else if (command === "naut" && key === true) {
    let result = nautRegex.test(alienLog[alienLog.length - 1]);

    function getOKix(obj, prop) {
      if (result) {
        addXP(10);
        return aliens.Omnitrix[obj]["omninaut"][prop];
      } else {
        return;
      }
    }
    if (result) {
      let embed = new Discord.MessageEmbed()
        .setTitle(getOKix(alienLog[alienLog.length - 1], "name"))
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("© Omnitrix", `${footer_img}`)
        .setImage(getOKix(alienLog[alienLog.length - 1], "image"))
        .setTimestamp()
      msg.channel.send({
        embed
      });
      msg.react("797164865408073780");
    }
  } else if (!key && command === "kix" || command === "naut") {
    msg.reply("Omni-Kix & Omni-Naut features unlock at Level 6");
  }

  //..............................................................
  //.MMMMMMM....MMMMMMM..IIIII....SSSSSSSSS........CCCCCCCCCC.....
  //.MMMMMMM....MMMMMMM..IIIII...SSSSSSSSSSSS.....CCCCCCCCCCCC....
  //.MMMMMMM....MMMMMMM..IIIII..SSSSSSSSSSSSS....CCCCCCCCCCCCCC...
  //.MMMMMMMM...MMMMMMM..IIIII..SSSSSS.SSSSSSS..CCCCCCCCCCCCCCCC..
  //.MMMMMMMM..MMMMMMMM..IIIII..SSSSS....SSSSS..CCCCCC....CCCCC...
  //.MMMMMMMM..MMMMMMMM..IIIII..SSSSSS.........SCCCCC.............
  //.MMMMMMMM..MMMMMMMM..IIIII..SSSSSSSSSS.....SCCCC..............
  //.MMMMMMMMMMMMMMMMMM..IIIII..SSSSSSSSSSSS...SCCCC..............
  //.MMMMMMMMMMMMMMMMMM..IIIII....SSSSSSSSSSS..SCCCC..............
  //.MMMMMMMMMMMMMMMMMM..IIIII......SSSSSSSSSS.SCCCC..............
  //.MMMMMMMMMMMMMMMMMM..IIIII..........SSSSSS.SCCCC..............
  //.MMMMMMMMMMMMMMMMMM..IIIII.ISSSS.....SSSSS.SCCCCC.............
  //.MMMMM.MMMMMMMMMMMM..IIIII.ISSSSS....SSSSS..CCCCCC....CCCCC...
  //.MMMMM.MMMMMM.MMMMM..IIIII.ISSSSSSSSSSSSSS..CCCCCCC.CCCCCCCC..
  //.MMMMM.MMMMMM.MMMMM..IIIII..SSSSSSSSSSSSSS...CCCCCCCCCCCCCC...
  //.MMMMM.MMMMMM.MMMMM..IIIII...SSSSSSSSSSSS.....CCCCCCCCCCCC....
  //.MMMMM..MMMMM..MMMM..IIIII....SSSSSSSSSS.......CCCCCCCCCC.....
  //..............................................................


  // Rank card
  if (miscCom === "rank") {
    let mention = msg.mentions.users.first();
    if (mention) {
      user = msg.mentions.users.first();
      if (user.bot && user.id !== client.user.id) {
        msg.channel.send(`<@${user.id}> is a **bot**! Bots aren't invited to the **super fancy ${defPrefix}rank party**`);
      } else if (user.id === client.user.id) {
        msg.channel.send("Hello, that's me! **I'm un-rankable!!**")
      }
    } else {
      user = msg.author;
    }
    if (!user.bot) {
      currentXP = await db.get(`${user.id}_xp`) || 0;
      lvl = await db.get(`${user.id}_level`) || 1;
      xpNeeded = (lvl * 200);
      let img = user.displayAvatarURL({
        dynamic: false,
        format: "jpg"
      });
      const canvas = new canvacord.Rank()
        .setAvatar(img)
        .setCurrentXP(currentXP)
        .setRequiredXP(xpNeeded)
        .setStatus("online")
        .setProgressBar(["#5AFF15", "#00B712"], "GRADIENT", true)
        .setProgressBarTrack("#0f3443")
        .setLevel(lvl)
        .setLevelColor("#22c1c3")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setOverlay("#000000", 0.15, true)
        .setBackground("IMAGE", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fcool-background%20(1).png?alt=media&token=931182bc-4aaf-4046-b32f-bcaccfaf9a88")
        .setStatus("online", true, true)
      canvas.build()
        .then(data => {
          const attachment = new Discord.MessageAttachment(data, "RankCard.png");
          msg.channel.send(attachment);
        });
    }
  }

  // Custom Prefix
  if (args[0] === "prefix") {
    if (msg.member.hasPermission(permission[0]) || msg.member.hasPermission(permission[1])) {
      db.set(`${guild_id}_prefix1`, args[1]);
      db.set(`${guild_id}_prefix2`, args[2]);
      msg.channel.send("Prefix set sucessfully !!");
    } else {
      msg.channel.send(`Sorry!! <@${user.id}> you don't have the necessary permissions to execute this command.`)
    }
  } else if (command === "reset") {
    if (msg.member.hasPermission(permission[0]) || msg.member.hasPermission(permission[1])) {
      db.set(`${guild_id}_prefix1`, `${prefix}`);
      db.set(`${guild_id}_prefix2`, `${prefix11}`);
      msg.channel.send("Prefix re-setted sucessfully !!");
    } else {
      msg.channel.send(`Sorry!! <@${user.id}> you don't have the necessary permissions to execute this command.`)
    }
  }

  // Returns default prefix 
  if (msg.mentions.has(client.user.id)) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`Omnitrix Prefix |  __${msg.guild.name}__`)
      .setAuthor("Omnitrix", `${author_img}`)
      .setThumbnail(`${msg.guild.iconURL()}`)
      .setColor(`${color}`)
      .addFields({
        name: "Prefix 1",
        value: `${defPrefix}`,
        inline: true
      })
      .addFields({
        name: "Prefix 2",
        value: `${prefix11}`,
        inline: true
      })
      .setFooter("© Omnitrix", `${footer_img}`)
      .setTimestamp()
    msg.channel.send({
      embed
    });

  }

  // Invite Link
  if (command === "invite") {
    let embed = new Discord.MessageEmbed()
      .setTitle("Omnitrix Invite Link")
      .setAuthor("Omnitrix", `${author_img}`)
      .setThumbnail(`${omnitrix_logo}`)
      .setColor(`${color}`)
      .setDescription("https://discord.com/oauth2/authorize?client_id=777587639301701662&scope=bot&permissions=321536")
      .setFooter(`Requested by ${user.username}#${user.discriminator}`)
    msg.channel.send({
      embed
    });
  }

  // Vote
  if (command === "vote") {
    let embed = new Discord.MessageEmbed()
      .setTitle("Vote for Omnitrix")
      .setAuthor("Omnitrix", `${author_img}`)
      .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fballot-box-with-ballot_1f5f3.png?alt=media&token=21bb2fa9-21f7-4257-9c20-01f55f352e63")
      .setColor(`${color}`)
      .addFields({
        name: "**__top.gg__**",
        value: "[Vote Now](https://top.gg/bot/777587639301701662)",
        inline: false
      })
      .addFields({
        name: "**__discordbotlist.com__**",
        value: "[UpVote Now](https://discordbotlist.com/bots/omnitrix)",
        inline: false
      })
      .setFooter(`Requested by ${user.username}#${user.discriminator}`)
    msg.channel.send({
      embed
    });
  }

  // Bulk-delete command
  if (command === "clear") {
    if (msg.guild.me.hasPermission("ADMINISTRATOR") || msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
      msg.channel.messages.fetch({
        limit: 100
      }).then((messages) => {
        const botMessages = [];
        messages.filter(m => m.author.id === process.env.BOT_ID).forEach(mesg => botMessages.push(mesg))
        msg.channel.bulkDelete(botMessages).then(() => {
          msg.channel.send("Cleared bot messages").then(mesg => mesg.delete({
            timeout: 3000
          }))
        });
      })
    } else {
      msg.channel.send("Sorry, I don't have the necessary permissions to execute that command.(MANAGE_MESSAGES)");
    }
  }

  // GIF Command
  if (miscCom === "gif") {
    var search_term
    if (args.length > 1) {
      search_term = command;
    } else {
      search_term = "ben 10";
    }
    let url = "https://api.tenor.com/v1/search?q=" + search_term + "&key=" + process.env.KEY + "&limit=10";
    let response = await fetch(url);
    let json = await response.json();
    let index = Math.floor(Math.random() * json.results.length);
    addXP(5);
    msg.channel.send(json.results[index].url);
  }

  // Admin - sever list command
  if (command === "stats") {
    if (msg.author.id === process.env.ADMIN) {
      let counter = 0;
      client.guilds.cache.forEach((guild) => {
        ++counter;
      })
      msg.channel.send(`Server count: **${counter}**`);
    } else {
      msg.channel.send(`Sorry <@${msg.author.id}>, only my creator can execute this command.`)
    }
  } else if (miscCom === "addxp") {
    if (msg.author.id === process.env.ADMIN) {
      let user = msg.mentions.users.first();
      let amount = parseInt(args[2], 10);
      db.add(`${user.id}_xp`, amount);
      msg.channel.send(`**${amount}xp** successfully credited to <@${user.id}>`)
    } else {
      msg.channel.send(`Sorry <@${msg.author.id}>, only my creator can execute this command.`)
    }
  }
});