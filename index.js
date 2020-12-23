const Discord = require('discord.js');
const client = new Discord.Client();
const {
  prefix,
  prefix11,
  color,
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
const talkedRecently = new Set();
const talkedRecently11 = new Set();
var setting;

client.login(process.env.TESTING_SANDBOX);

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
  if (!msg.content.startsWith(`${prefix}`) && !msg.content.startsWith(`${prefix11}`)) return;

  // Splitting message content
  const args = msg.content.toLowerCase().slice(`${prefix.length}`).trim().split(/ +/);
  var gifArr = "";
  var command;
  if (args.length > 1) {
    gifArr = args[0];
    command = args.slice(0, args.length).join(" ");
  } else {
    command = args.shift();
    gifArr = command;
  }

  const regex = /(heatblast|fourarms|stinkfly|cannonbolt|diamondhead|wildvine|upgrade|overflow|grey matter|xlr8|humungousaur|rath|slapback|shock rock|jetray|goop|way big)/;
  const regex11 = /(wreckingbolt|thornblade|undertow|dark matter|crystalfist|bootleg|quadsmack|hotshot|rush|skunkmoth|bashmouth)/;
  const res = regex.test(command);
  const res11 = regex11.test(command);

  // Identifying mode 
  if (msg.content.startsWith(`${prefix}`)) {
    setting = "Omnitrix";
  } else if (msg.content.startsWith(`${prefix11}`)) {
    setting = "Antitrix";
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
        value: "`o!help`",
        inline: true
      })
      .addFields({
        name: "Antitrix",
        value: "`a!help`",
        inline: true
      })
      .addFields({
        name: "Misc",
        value: "`o!gif <search q>(optional)` \n`o!clear`",
        inline: false
      })
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
      msg.channel.send("Sorry, I dont have the necessary permissions to execute that command.");
    }
  }

  // GIF Command
  if (gifArr === "gif") {
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
    msg.channel.send(json.results[index].url);
  }

  // Admin - sever list command
  if (command === "ls") {
    if (msg.author.id === process.env.ADMIN) {
      client.guilds.cache.forEach((guild) => {
        msg.channel.send(guild.name)
      })
    } else {
      msg.channel.send(`Sorry ${msg.author.id}, you don't have the required permissions to execute this command.`)
    }
  }
  // Omnitrix 
  if (setting === "Omnitrix") {
    if (talkedRecently.has(msg.author.id)) {
      if (command !== "help") {
        msg.channel.send("The Omnitrix is in cooldown. \nPlease wait: " + msg.author.username);
      }
    } else {
      function getAliens(obj, prop) {
        if (res === true) {
          return aliens.Omnitrix[obj][prop];
        } else {
          return;
        }
      }
      if (res === true) {
        let embed = new Discord.MessageEmbed()
          .setTitle(getAliens(command, "name"))
          .setAuthor("Omnitrix", `${author_img}`)
          .setColor(`${color}`)
          .setFooter("© Omnitrix", `${footer_img}`)
          .setImage(getAliens(command, "image"))
          .setThumbnail(`${omnitrix_logo}`)
          .setTimestamp()
          .addFields({
            name: "Species",
            value: getAliens(command, "species"),
            inline: true
          })
          .addFields({
            name: "Powers & Abilities",
            value: getAliens(command, "abilities")
          })
        msg.channel.send({
          embed
        });

        // Cooldown Function
        if (command === "help" || command === "clear" || gifArr === "gif") {
          setTimeout(() => {
            talkedRecently.delete(msg.author.id);
          }, 0);
        } else {
          // Adds the user to the set so that they can't talk for 30 seconds
          talkedRecently.add(msg.author.id);
          setTimeout(() => {
            // Removes the user from the set after 30 seconds
            talkedRecently.delete(msg.author.id);
          }, 30000);
        }
      }
    }
    // Help Embed - Commands List
    if (command === "help") {
      let embed = new Discord.MessageEmbed()
        .setTitle("Omnitrix Commands list")
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`${color}`)
        .setFooter("© Nishith P", `${footer_img}`)
        .setThumbnail(`${omnitrix_logo}`)
        .setTimestamp()
        .addFields({
          name: "It's Hero time !!",
          value: "`o!Fourarms` \n`o!Heatblast` \n`o!Cannonbolt` \n`o!Stinkfly` \n`o!Diamondhead` \n`o!Wildvine` \n`o!Upgrade` \n`o!Overflow` \n`o!Grey matter` \n`o!XLR8` \n`o!Humungousaur` \n`o!Rath` \n`o!Slapback` \n`o!Shock rock` \n`o!Jetray` \n`o!Goop` \n`o!Way big`",
        });
      msg.channel.send({
        embed
      });
    }
    // Antitrix
  } else if (setting === "Antitrix") {
    if (talkedRecently11.has(msg.author.id)) {
      if (command !== "help") {
        msg.channel.send("The Antitrix is in cooldown. \nPlease wait: " + msg.author.username);
      }
    } else {
      function getAliens(obj, prop) {
        if (res11 === true) {
          return aliens.Antitrix[obj][prop];
        } else {
          return;
        }
      }
      if (res11 === true) {
        let embed = new Discord.MessageEmbed()
          .setTitle(getAliens(command, "name"))
          .setAuthor("Antitrix", `${antitrix_author_img}`)
          .setColor(`${color11}`)
          .setFooter("© Antitrix", `${antitrix_logo}`)
          .setImage(getAliens(command, "image"))
          .setThumbnail(`${antitrix_logo}`)
          .setTimestamp()
          .addFields({
            name: "Species",
            value: getAliens(command, "species"),
            inline: true
          })
          .addFields({
            name: "Powers & Abilities",
            value: getAliens(command, "abilities")
          })
        msg.channel.send({
          embed
        });

        // Cooldown Function
        if (command === "help" || command === "clear" || gifArr === "gif") {
          setTimeout(() => {
            talkedRecently11.delete(msg.author.id);
          }, 0);
        } else {
          // Adds the user to the set so that they can't talk for 30 seconds
          talkedRecently11.add(msg.author.id);
          setTimeout(() => {
            // Removes the user from the set after 30 seconds
            talkedRecently11.delete(msg.author.id);
          }, 30000);
        }
      }
    }
    // Help Embed - Commands List
    if (command === "help") {
      let embed = new Discord.MessageEmbed()
        .setTitle("Antitrix Commands list")
        .setAuthor("Antitrix", `${antitrix_author_img}`)
        .setColor(`${color11}`)
        .setFooter("© Nishith P", `${antitrix_logo}`)
        .setThumbnail(`${antitrix_logo}`)
        .setTimestamp()
        .addFields({
          name: "Let's bring the pain !!",
          value: "`a!Wreckingbolt` \n`a!Thornblade` \n`a!Undertow` \n`a!Dark matter` \n`a!Crystalfist` \n`a!Bootleg` \n`a!Quadsmack` \n`a!Hotshot` \n`a!Rush` \n`a!Skunkmoth` \n`a!Bashmouth`",
        });
      msg.channel.send({
        embed
      });
    }

  }
});