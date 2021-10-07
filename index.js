const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const {
  MessageAttachment
} = require('discord.js');
const client = new Discord.Client();
const {
  prefix,
  prefix11,
  prefixUA,
  prefixOG,
  prefixOV,
  color,
  omnicolor,
  color11,
  author_img,
  footer_img,
  omnitrix_logo,
  antitrix_logo,
  antitrix_author_img,
  ultimatrix_author_img,
  omnitrix_OG_author_img,
  omnitrix_OV_author_img,
  omnitrix_OV_logo
} = require('./config.json');
const aliens = require('./aliens.json');
require('dotenv').config() // env
const fetch = require('node-fetch');
const fs = require('fs')
const canvacord = require('canvacord');
const { Database } = require("quickmongo");
const db = new Database(`mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0.ikanc.mongodb.net/Omnitrix`);
const express = require('express');

// TownList.xyz Code
const dtl = require("api-townlist-xyz");
const dbl = new dtl(process.env.TOWNLIST_TOKEN, client);

const app = express({
  urlEncoded: true
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/aliens', (req, res) => {
  res.status(201).send(aliens);
})

db.on("ready", () => {
  console.log("Database connected!");
});

const talkedRecently = new Set();
var setting, alienLog = [],
  alienLogUA = [],
  alienLogAnti = [],
  alienLogOG = [],
  alienLogOV = [];
const permission = ["ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_MESSAGES"];

client.login(process.env.TOKEN);

client.on('ready', () => {
  client.user.setStatus("online");
  client.user.setActivity("o!it's hero time", {
    type: "LISTENING"
  });

  dbl.serverCount(); // TownList.xyz Server Count
  
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

  let guild_id = msg.guild.id;
  /*// Prefix
  
  const guildPrefix = await db.get(`${guild_id}_prefix1`);
  const guildPrefix11 = await db.get(`${guild_id}_prefix2`); */

  const defPrefix = `${prefix}`;
  const defPrefix11 = `${prefix11}`;
  const defPrefixUA = `${prefixUA}`;
  const defPrefixOG = `${prefixOG}`;
  const defPrefixOV = `${prefixOV}`;

  if (!msg.content.startsWith(defPrefix) && !msg.content.startsWith(defPrefix11) && !msg.content.startsWith(defPrefixUA) && !msg.content.startsWith(defPrefixOG) && !msg.content.startsWith(defPrefixOV) && !msg.mentions.has(client.user.id)) return;

  // Splitting message content
  const args = msg.content.slice(defPrefix.length).trim().split(/ +/);
  var miscCom = "";
  var command, alienName, miscComBool;
  if (args.length > 1) {
    miscCom = args[0].toLowerCase();
    command = args.slice(1, args.length).join(" ");
    alienName = args.slice(0, args.length).join("").toLowerCase();
  } else {
    command = args.shift().toLowerCase();
    miscCom = command;
    alienName = command;
  }

  var miscComArray = ["help", "rank", "clear", "gif", "addxp", "invite", "vote", "g", "yt"];
  if (miscComArray.indexOf(miscCom) != -1) {
    miscComBool = true
  } else {
    miscComBool = false
  }

  // Alien cmd analysing regex / Array
  //const regex = /(heatblast|fourarms|stinkfly|cannonbolt|diamondhead|wildvine|upgrade|overflow|greymatter|xlr8|humungousaur|rath|slapback|shockrock|jetray|goop|waybig)/;
  const omnitrixAliens = Object.keys(aliens["Omnitrix (RE)"]);
  const antitrixAliens = Object.keys(aliens["Antitrix"]);
  const ultimatrixAliens = ["Alien X", "Ampfibian", "Arctiguana", "Armodrillo", "Big Chill", "Blitzwolfer", "Brainstorm", "Cannonbolt", "Chamalien", "Chromastone", "Clockwork", "Diamondhead", "Ditto", "Eatle", "Echo Echo", "Eye Guy", "Fasttrack", "Four Arms", "Frankenstrike", "Ghostfreak", "Goop", "Grey Matter", "Heatblast", "Humungousaur", "Jetray", "Juryrigg", "Lodestar", "Nanomech", "NRG", "Rath", "Ripjaws", "Shocksquatch", "Snare-oh", "Spidermonkey", "Spitter", "Stinkfly", "Swampfire", "Terraspin", "Upchuck", "Upgrade", "Water Hazard", "Way Big", "Wildmutt", "Wildvine", "XLR8"]
  const ultimateAliens = ["Big Chill", "Cannonbolt", "Echo Echo", "Humungousaur", "Spidermonkey", "Swampfire", "Way Big", "Wildmutt"]
  const kixRegex = /(heatblast|fourarms|cannonbolt|diamondhead|xlr8|humungousaur|rath|slapback|shockrock|jetray)/;
  const nautRegex = /(heatblast|humungousaur|jetray|shockrock)/;
  const omnitrix_OVAliens = ["Alien X", "Ampfibian", "Arctiguana", "Armodrillo", "Astrodactyl ", "Atomix ", "Ball Weevil ", "Blitzwolfer", "Bloxx ", "Big Chill", "Brainstorm", "Bullfrag ", "Buzzshock", "Cannonbolt", "Chamalien ", "Chromastone", "Clockwork", "Crashhopper ", "Diamondhead", "Ditto", "Eatle", "Echo Echo", "Eye Guy", "Fasttrack ", "Feedback ", "Four Arms", "Frankenstrike", "Ghostfreak", "Goop", "Gravattack ", "Grey Matter", "Gutrot ", "Heatblast", "Humungousaur", "Jetray ", "Juryrigg", "Kickin Hawk ", "Lodestar", "Mole-Stache ", "NRG", "Nanomech", "Pesky Dust ", "Rath", "Ripjaws", "Shocksquatch", "Snare-oh", "Spidermonkey", "Squidstrictor", "Stinkfly", "Swampfire", "Terraspin", "The Worst ", "Toepick ", "Upchuck", "Upgrade", "Walkatrout ", "Water Hazard", "Way Big", "Whampire ", "Wildmutt", "Wildvine", "XLR8"]
  const omnitrix_OGAliens = ["Heatblast", "Wildmutt", "Diamondhead", "XLR8", "Grey Matter", "Four Arms", "Stinkfly", "Ripjaws", "Upgrade", "Ghostfreak", "Cannonbolt", "Wildvine", "Blitzwolfer", "Snare-oh", "Frankenstrike", "Upchuck", "Ditto", "Way Big", "Eye Guy"];
  //const regex11 = /(wreckingbolt|thornblade|undertow|darkmatter|crystalfist|bootleg|quadsmack|hotshot|rush|skunkmoth|bashmouth)/;


  // Alien checking function
  function alienCheck(arr, name) {
    let newArr = [];
    let regex = /\w+/ig;
    for (let i = 0; i < arr.length; i++) {
      let alien = arr[i].match(regex).join("").trim().toLowerCase();
      newArr.push(alien);
    }

    if (newArr.indexOf(name.match(regex).join("").trim().toLowerCase()) !== -1) {
      alienName = arr[newArr.indexOf(name.match(regex).join("").trim().toLowerCase())];
      if (typeof alienName === undefined)
        alienName = name
      return true
    } else {
      return false
    }
  }

  function getAliens(check, xp, obj, prop, key) {
    if (check === true) {
      addXP(xp);
      return aliens[obj][prop][key];
    } else {
      return;
    }
  }

  function timer(loger, time = 60000, cooldown = 30000, set) {
    // Adds current alien data and removes it after 60s.
    loger.push(alienName);
    setTimeout(() => {
      while (loger.length != 0) {
        loger.pop(alienName);
      }
      if (miscComBool === false) {
        msg.channel.send(set + " timed out !!");
      }
      // Adds the user to the set so that they can't transform for 30 seconds
      talkedRecently.add(msg.author.id + " " + set);
      setTimeout(() => {
        // Removes the user from the set after 30 seconds
        talkedRecently.delete(msg.author.id + " " + set);
      }, cooldown);
    }, time)

  }

  function findData(arr, prop) {
    let data = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].includes(prop)) {
        data = arr[i]
        break;
      }
    }
    return data.replace(prop, "").trim();
  }

  function Alien(name, species, image, abilities) {
    this.name = name;
    this.image = image;
    this.species = species;
    this.abilities = abilities;
  }

  function transform(authorImg, thumbnailUrl, colorCode) {
    return (check, xp, obj, prop) => {
      try {
        let embed = new Discord.MessageEmbed()
          .setTitle(getAliens(check, xp, obj, prop, "name"))
          .setAuthor(`${setting}`, authorImg)
          .setColor(colorCode)
          .setFooter(`© ${setting}`, thumbnailUrl)
          .setImage(getAliens(check, xp, obj, prop, "image"))
          .setThumbnail(thumbnailUrl)
          .setTimestamp()
          .addFields({
            name: "Species",
            value: getAliens(check, xp, obj, prop, "species"),
            inline: true
          })
          .addFields({
            name: "Powers & Abilities",
            value: getAliens(check, xp, obj, prop, "abilities")
          })
        return msg.channel.send({
          embed
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  function cooldown(check = miscComBool, loger, set) {
    // Cooldown Function
    if (check === true) {
      setTimeout(() => {
        talkedRecently.delete(msg.author.id + " " + set);
      }, 0);
    } else {
      timer(loger, 60000, 30000, set);
    }
  }

  function getOKixOrNaut(check, boost, obj, prop) {
    if (check === true) {
      addXP(10);
      return aliens["Omnitrix (RE)"][obj][`omni${boost}`][prop];
    } else {
      return;
    }
  }

  function getUltimate(name) {
    addXP(10);
    return aliens.Ultimatrix[name]["ultimate"]["image"];
  }

  async function google(cx, key, query) {
    var pictureUrl = "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fdefault-fallback-image.png?alt=media&token=fb4de87c-8b8c-4ec2-a711-76c89b5cf12c"
    try {
      let imgUrl = `https://www.googleapis.com/customsearch/v1/?cx=${cx}&key=${key}&imgSize=huge&q=${query}`;

      let response = await fetch(imgUrl)
        .then(res => res.json())
        .catch(err => {
          console.log(err)
        })

      let response_id = response["items"][0];

      if (typeof response_id["pagemap"]["cse_image"][0]["src"] !== undefined) {
        pictureUrl = response_id["pagemap"]["cse_image"][0]["src"];
      } else if (typeof response_id["pagemap"]["hcard"][0]["photo"] !== undefined) {
        pictureUrl = response_id["pagemap"]["hcard"][0]["photo"];
      } else {
        pictureUrl = response_id["pagemap"]["cse_thumbnail"][0]["src"];
      }

    } catch (e) {
      console.log(e)
    }

    return pictureUrl;
  }

  async function fetchAlienFromWikia(alienName, tag = "|UA") {
    let regex = /(Classic)\w+/g;
    try {
      let url = `https://ben10.fandom.com/api.php?action=query&prop=revisions&titles=${alienName}&rvprop=content&format=json`

      let res = await fetch(url)
        .then(response => response.json())
        .catch(err => {
          console.log(err)
        })

      let pageID = Object.keys(res["query"]["pages"])

      let base = res["query"]["pages"][pageID[0]]["revisions"][0]["*"].split("\n");
      species = findData(base, "|species = ").replace(/[^0-9a-zA-Z ,]/g, "");
      let abilitiesArr = findData(base, "|power = ").split("<br>");
      filteredAbilities = "";

      var ctr = 0;
      for (let i = 0; i < 5; i++) {
        if (!abilitiesArr[i].includes("Enhanced")) {
          if (abilitiesArr[i].indexOf("{") !== -1)
            filteredAbilities += abilitiesArr[i].substring(0, abilitiesArr[i].indexOf("{")) + " " + "\n"
          else
            filteredAbilities += abilitiesArr[i] + " " + "\n"
          ctr++;
        }
      }
      for (let i = ctr; i < 5; i++) {
        if (abilitiesArr[i].includes("Enhanced")) {
          filteredAbilities += abilitiesArr[i] + "\n"
        }
      }

      imgID = findData(base, tag)

      if(alienName === "The Worst") { imgID = "OmniverseTheWorst.png" }

      if (imgID[imgID.length - 1] === "F") imgID = imgID.substring(0, imgID.length - 1);
      if (regex.test(species) === true) species = species.substring(0, species.indexOf(species.match(regex)[0]))
      if(alienName.includes("Alien X")) species = "Celestialsapien"

    } catch (e) {
      console.log(e)
    }

    return [species, filteredAbilities, imgID]
  }

  function writeAliens(obj = aliens, prop, name, name2, species, img, abilities) {
    try {
      let temp = new Alien(name2, species, img, abilities);
      obj[prop][name] = temp;
      fs.writeFileSync("./aliens.json", JSON.stringify(aliens, null, 2), (err) => {
        if (err) console.log(err)
      })
    } catch (e) {
      console.log("Alien Write Error ");
    }
  }

  async function openWebPage(url, set = "UA") {
    let n;
    switch (setting) {
      case "Ultimatrix":
        set = "UA";
        break;
      case "Omnitrix (OG)":
        set = "OS";
        break;
      case "Omnitrix (OV)":
        set = "OV";
        break;
      default:
        set = "UA";
        break;
    }

    switch (set) {
      case "UA":
        n = 2;
        break;
      case "OV":
        n = 1;
        break;
      case "OS":
        n = 3;
        break;
      default:
        n = 2;
        break;
    }

    var image = "";
    try {
      //image = await page.$eval("div.media img", img => img.src);
      
      const browser = await puppeteer.launch();

      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: "load",
        timeout: 0
      });

      try {
        image = await page.$eval("div.media img", img => img.src);
      } catch (e) {
        try {
          console.log("Algorithm 1 Failed \nTrying Algorithm 2")
          await page.click(`#mw-content-text > div > aside > div > div.wds-tabs__wrapper > ul > li:nth-child(${n}) > span`)
          image = await page.$eval("#mw-content-text > div > aside > div > div.wds-tab__content.wds-is-current > figure > a img", img => img.src);

        } catch (e) {
          console.log("Algorithm 2 Failed \nTrying Algorithm 3")
          image = await page.$eval("aside figure.pi-item img", img => img.src);
        }
      }
      await browser.close();

    } catch (e) {
      console.log(e);
    }
    console.log(image)
    return image;
  };

  // XP
  var addXP = async function (num) {
    let exp = Math.floor(Math.random() * num + 10);
    db.add(`${user.id}_xp`, exp);
  }

  // User Variables
  let user = msg.author;
  let key = await db.has(`${user.id}_items_omni-key`);

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
  if (args.join(" ").toLowerCase() === "it's hero time") {
    let str = fs.readFileSync(`./help.txt`, 'utf-8', (err, file) => {
      if (err) console.log(err);
    })

    let embed = new Discord.MessageEmbed()
      .setTitle("Omnitrix Commands Palette")
      .setAuthor("Omnitrix", `${author_img}`)
      .setColor(`${color}`)
      .setFooter("© Nishith P", `${footer_img}`)
      .setThumbnail(`${omnitrix_logo}`)
      .setTimestamp()
      .addFields({
        name: "OG Omnitrix",
        value: "> **g!help**",
        inline: true
      })
      .addFields({
        name: "Omniverse Omnitrix",
        value: "> **o!help**",
        inline: true
      })
      .addFields({
        name: "Reboot Omnitrix",
        value: "> **r!help**",
        inline: true
      })
      .addFields({
        name: "Ultimatrix",
        value: "> **u!help**",
        inline: true
      })
      .addFields({
        name: "Antitrix",
        value: "> **a!help**",
        inline: true
      })
      .addFields({
        name: "Misc",
        value: str,
        inline: false
      })
    msg.channel.send({
      embed
    });
  }

  // Identifying mode
  if (msg.content.startsWith(defPrefix)) {
    setting = "Omnitrix (RE)";
    var res = alienCheck(omnitrixAliens, alienName);
  } else if (msg.content.startsWith(defPrefix11)) {
    setting = "Antitrix";
    var res11 = alienCheck(antitrixAliens, alienName);
  } else if (msg.content.startsWith(defPrefixUA)) {
    setting = "Ultimatrix"
    var resUA = alienCheck(ultimatrixAliens, alienName)
  } else if (msg.content.startsWith(defPrefixOG)) {
    setting = "Omnitrix (OG)"
    var resOG = alienCheck(omnitrix_OGAliens, alienName)
  } else if (msg.content.startsWith(defPrefixOV)) {
    setting = "Omnitrix (OV)"
    var resOV = alienCheck(omnitrix_OVAliens, alienName)
  }

  // Omnitrix 
  if (setting === "Omnitrix (RE)") {
    if (talkedRecently.has(msg.author.id + " Omnitrix (RE)")) {
      if (miscComBool === false) {
        msg.channel.send("The Reboot Omnitrix is in cooldown. \nPlease wait: " + msg.author.username);
      }
    } else {
      if (res === true) {
        transform(author_img, omnitrix_logo, color)(res, 10, setting, alienName)

        // Cooldown Function
        cooldown(miscComBool, alienLog, "Omnitrix (RE)")
      }
    }
    // Help Embed - Commands List
    if (command === "help") {
      let embed = new Discord.MessageEmbed()
        .setTitle("Omnitrix Commands list")
        .setDescription(`Type \`\ ${defPrefix}\`\ followed by the Alien name.`)
        .setAuthor("Omnitrix (RE)", `${author_img}`)
        .setColor(`${color}`)
        .setFooter("© Nishith P", `${footer_img}`)
        .setThumbnail(`${omnitrix_logo}`)
        .setTimestamp()
        .addFields({
          name: "It's Hero time !!",
          value: "`Fourarms`, \t`Heatblast`, \t`Cannonbolt`, \t`Stinkfly`, \t`Diamondhead`, \t`Wildvine`, \t`Upgrade`, \t`Overflow`, \t`Grey matter`, \t`XLR8`, \t`Humungousaur`, \t`Rath`, \t`Slapback`, \t`Shock rock`, \t`Jetray`, \t`Goop`, \t`Way big`, \t`Gax`, \t`Surge`, \t`Alien X`",
        });
      msg.channel.send({
        embed
      });
    }
    // Antitrix
  } else if (setting === "Antitrix") {
    if (talkedRecently.has(msg.author.id + " Antitrix")) {
      if (miscComBool === false) {
        msg.channel.send("The Antitrix is in cooldown. \nPlease wait: " + msg.author.username);
      }
    } else {
      if (res11 === true) {
        transform(antitrix_author_img, antitrix_logo, color11)(res11, 11, setting, alienName)

        // Cooldown Function
        cooldown(miscComBool, alienLogAnti, "Antitrix")
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
          value: "`Wreckingbolt`, \t`Thornblade`, \t`Undertow`, \t`Dark matter`, \t`Crystalfist`, \t`Bootleg`, \t`Quadsmack`, \t`Hotshot`, \t`Rush`, \t`Skunkmoth`, \t`Bashmouth` \t`Humungoraptor`",
        });
      msg.channel.send({
        embed
      });
    }
    // Ultimatrix
  } else if (setting === "Ultimatrix") {
    if (talkedRecently.has(msg.author.id + " Ultimatrix")) {
      if (miscComBool === false) {
        msg.channel.send("The Ultimatrix is in cooldown. \nPlease wait: " + msg.author.username);
      }
    } else {

      if (resUA === true) {

        if (alienCheck(omnitrixAliens, alienName) === true && alienCheck(ultimatrixAliens, alienName) === true)
          alienName += "_(Classic)"

        var species, imgID, filteredAbilities;

        species = getAliens(resUA, 10, setting, alienName, "species");
        imgID = getAliens(resUA, 10, setting, alienName, "imgID");
        filteredAbilities = getAliens(resUA, 10, setting, alienName, "abilities");

        transform(ultimatrix_author_img, omnitrix_logo, omnicolor)(resUA, 10, setting, alienName)
        // Cooldown Function
        cooldown(miscComBool, alienLogUA, "Ultimatrix")
      }
    }
    // Help Embed - Commands List
    if (command === "help") {
      let alienStr = "";
      for (let i = 0; i < ultimatrixAliens.length; i++) {
        alienStr += `\`${ultimatrixAliens[i]}\`, \t`
      }

      let embed = new Discord.MessageEmbed()
        .setTitle("Ultimatrix Commands list")
        .setDescription(`Type \`\ ${defPrefixUA}\`\ followed by the Alien name.`)
        .setAuthor("Ultimatrix", `${ultimatrix_author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("© Nishith P", `${footer_img}`)
        .setThumbnail(`${omnitrix_logo}`)
        .setTimestamp()
        .addFields({
          name: "It's Hero time !!",
          value: `${alienStr.trim().substring(0, alienStr.length-1)}`,
        });
      msg.channel.send({
        embed
      });
    }

  } else if (setting === "Omnitrix (OG)") {
    if (talkedRecently.has(msg.author.id + " Omnitrix (OG)")) {
      if (miscComBool === false) {
        msg.channel.send("The OG Omnitrix is in cooldown. \nPlease wait: " + msg.author.username);
      }
    } else {

      if (resOG === true) {

        if (alienCheck(omnitrixAliens, alienName) === true && alienCheck(omnitrix_OGAliens, alienName) === true)
          alienName += "_(Classic)"

        var species, imgID, filteredAbilities;

        species = getAliens(resOG, 10, setting, alienName, "species");
        imgID = getAliens(resOG, 10, setting, alienName, "imgID");
        filteredAbilities = getAliens(resOG, 10, setting, alienName, "abilities");

        transform(omnitrix_OG_author_img, omnitrix_logo, omnicolor)(resOG, 10, setting, alienName)
        // Cooldown Function
        cooldown(miscComBool, alienLogOG, "Omnitrix (OG)")
      }
    }
    // Help Embed - Commands List
    if (command === "help") {
      let alienStr = "";
      for (let i = 0; i < omnitrix_OGAliens.length; i++) {
        alienStr += `\`${omnitrix_OGAliens[i]}\`, \t`
      }

      let embed = new Discord.MessageEmbed()
        .setTitle("Omnitrix Commands list")
        .setDescription(`Type \`\ ${defPrefixOG}\`\ followed by the Alien name.`)
        .setAuthor("Omnitrix (OG)", `${omnitrix_OG_author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("© Nishith P", `${footer_img}`)
        .setThumbnail(`${omnitrix_logo}`)
        .setTimestamp()
        .addFields({
          name: "It's Hero time !!",
          value: `${alienStr}`,
        });
      msg.channel.send({
        embed
      });
    }

  } else if (setting === "Omnitrix (OV)") {
    if (talkedRecently.has(msg.author.id + " Omnitrix (OV)")) {
      if (miscComBool === false) {
        msg.channel.send("The Omniverse Omnitrix is in cooldown. \nPlease wait: " + msg.author.username);
      }
    } else {

      if (resOV === true) {

        if (alienCheck(omnitrixAliens, alienName) === true && alienCheck(omnitrix_OVAliens, alienName) === true)
          alienName += "_(Classic)"

        var species, imgID, filteredAbilities;

        species = getAliens(resOV, 10, setting, alienName, "species");
        imgID = getAliens(resOV, 10, setting, alienName, "imgID");
        filteredAbilities = getAliens(resOV, 10, setting, alienName, "abilities");

        transform(omnitrix_OV_author_img, omnitrix_OV_logo, omnicolor)(resOV, 10, setting, alienName)
        // Cooldown Function
        cooldown(miscComBool, alienLogOV, "Omnitrix (OV)")
      }
    }
    // Help Embed - Commands List
    if (command === "help") {
      let alienStr = "";
      for (let i = 0; i < omnitrix_OVAliens.length; i++) {
        alienStr += `\`${omnitrix_OVAliens[i]}\`, \t`
      }

      let embed = new Discord.MessageEmbed()
        .setTitle("Omnitrix Commands list")
        .setDescription(`Type \`\ ${defPrefixOV}\`\ followed by the Alien name.`)
        .setAuthor("Omnitrix (OV)", `${omnitrix_OV_author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("© Nishith P", `${footer_img}`)
        .setThumbnail(`${omnitrix_logo}`)
        .setTimestamp()
        .addFields({
          name: "It's Hero time !!",
          value: `${alienStr}`,
        });
      msg.channel.send({
        embed
      });
    }
  }

  // Omnikix & Omninaut commands
  if (command === "kix" && key === true && setting === "Omnitrix (RE)") {
    let result = kixRegex.test(alienLog[alienLog.length - 1]);

    if (result) {
      let embed = new Discord.MessageEmbed()
        .setTitle(getOKixOrNaut(result, "kix", alienLog[alienLog.length - 1], "name"))
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("© Omnitrix", `${footer_img}`)
        .setImage(getOKixOrNaut(result, "kix", alienLog[alienLog.length - 1], "image"))
        .setTimestamp()
      msg.channel.send({
        embed
      });
      msg.react("797164865408073780");
    }

  } else if (command === "naut" && key === true && setting === "Omnitrix (RE)") {
    let result = nautRegex.test(alienLog[alienLog.length - 1]);

    if (result) {
      let embed = new Discord.MessageEmbed()
        .setTitle(getOKixOrNaut(result, "naut", alienLog[alienLog.length - 1], "name"))
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("© Omnitrix", `${footer_img}`)
        .setImage(getOKixOrNaut(result, "naut", alienLog[alienLog.length - 1], "image"))
        .setTimestamp()
      msg.channel.send({
        embed
      });
      msg.react("797164865408073780");
    }
  } else if (!key && command === "kix" || command === "naut") {
    msg.reply("Omni-Kix & Omni-Naut features unlock at Level 6");
  }

  // Ultimate Transformations
  if (command === "ultimate" && setting === "Ultimatrix") {
    alienName = alienLogUA[alienLogUA.length - 1];

    if (alienCheck(omnitrixAliens, alienName) === true && alienCheck(ultimatrixAliens, alienName) === true)
      alienName += "_(Classic)"


    if (aliens["Ultimatrix"][alienName].hasOwnProperty("ultimate") === true) {

      let pictureUrl = getUltimate(alienName);
      try {

        let embed = new Discord.MessageEmbed()
          .setTitle(`Ultimate ${alienLogUA[alienLogUA.length - 1].replace("_(Classic)", "")}`)
          .setAuthor("Ultimatrix", `${ultimatrix_author_img}`)
          .setColor(`${omnicolor}`)
          .setFooter("© Ultimatrix", `${footer_img}`)
          .setImage(`${pictureUrl}`)
          .setThumbnail(`${omnitrix_logo}`)
          .setTimestamp()
        msg.channel.send({
          embed
        });
      } catch (err) {
        console.log("Embed Send Error");
      }
    } else {
      return;
    }
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

  if(command === "") return;
  /*
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
    }*/

  // Returns default prefix 
  if (msg.mentions.has(client.user.id)) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`Omnitrix Prefix |  __${msg.guild.name}__`)
      .setAuthor("Omnitrix", `${author_img}`)
      .setThumbnail(`${msg.guild.iconURL()}`)
      .setColor(`${color}`)
      .addFields({
        name: "Reboot Omnitrix",
        value: `${defPrefix}`,
        inline: true
      })
      .addFields({
        name: "Omniverse Omnitrix",
        value: `${defPrefixOV}`,
        inline: true
      })
      .addFields({
        name: "OG Omnitrix",
        value: `${defPrefixOG}`,
        inline: true
      })
      .addFields({
        name: "Ultimatrix",
        value: `${defPrefixUA}`,
        inline: true
      })
      .addFields({
        name: "Antitrix",
        value: `${defPrefix11}`,
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

  // YouTube Search & Google Search
  if (miscCom == "yt") {
    var query;
    if (args.length > 1) {
      query = command;

      let url = `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${process.env.YT_KEY}&part=snippet&maxResults=1`;

      let video = await fetch(url)
        .then(r => r.json())
        .catch(err => {})

      let ytVideoID = video["items"][0]["id"]["videoId"];

      let embed = new Discord.MessageEmbed()
        .setTitle(video["items"][0]["snippet"]["title"])
        .setDescription(video["items"][0]["snippet"]["description"])
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`#FF0000`)
        .setFooter("Powered by YouTube", `${footer_img}`)
        .setImage(video["items"][0]["snippet"]["thumbnails"]["high"]["url"])
        .setTimestamp()
        .addFields({
          name: "Link",
          value: `https://youtu.be/${ytVideoID}`,
          inline: true
        })

      msg.channel.send({
        embed
      });
    } else {
      msg.reply("Please provide a search query !");
    }
  } else if (miscCom == "g") {
    var query;
    if (args.length > 1) {
      query = command;

      let url = `https://www.googleapis.com/customsearch/v1/?cx=${process.env.CX}&key=${process.env.G_SEARCH_KEY}&imgSize=medium&q=${query}`;

      let response = await fetch(url)
        .then(res => res.json())
        .catch(err => {
          console.log(err)
        })

      let response_id = response["items"][Math.floor(Math.random() * response["items"].length)];
      let pictureUrl;

      if (typeof response_id["pagemap"]["cse_image"][0]["src"] !== undefined) {
        pictureUrl = response_id["pagemap"]["cse_image"][0]["src"];
      } else if (typeof response_id["pagemap"]["hcard"][0]["photo"] !== undefined) {
        pictureUrl = response_id["pagemap"]["hcard"][0]["photo"];
      } else {
        pictureUrl = response_id["pagemap"]["cse_thumbnail"][0]["src"];
      }

      let embed = new Discord.MessageEmbed()
        .setTitle(response_id["title"])
        .setDescription(response_id["snippet"])
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("Powered by Google", `${footer_img}`)
        .setImage(pictureUrl)
        .setTimestamp()
        .addFields({
          name: "Link",
          value: `${response_id["link"]}`,
          inline: true
        })

      msg.channel.send({
        embed
      });
    } else {
      msg.reply("Please provide a search query !");
    }
  }

  // Admin - sever list command
  if (command === "stats") {
    if (msg.author.id === process.env.ADMIN) {
      let embed = new Discord.MessageEmbed()
        .setTitle("Server Stats")
        .setDescription(`${client.guilds.cache.size}`)
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("© Omnitrix", `${footer_img}`)
        .setTimestamp()

      msg.channel.send({
        embed
      });
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
  } else if (miscCom === "eval") {
    if (msg.author.id === process.env.ADMIN) {
      var output = await eval(command);
      let embed = new Discord.MessageEmbed()
        .setTitle("Code Evaluator")
        .setAuthor("Omnitrix", `${author_img}`)
        .setColor(`${omnicolor}`)
        .setFooter("© Omnitrix", `${footer_img}`)
        .setTimestamp()
        .addFields({
          name: ":inbox_tray: Input",
          value: `\`\`\`${command}\`\`\``,
          inline: false
        })
        .addFields({
          name: ":outbox_tray: Output",
          value: `\`\`\`${output}\`\`\``,
          inline: false
        })
      msg.channel.send({
        embed
      });
    } else {
      msg.channel.send(`Sorry <@${msg.author.id}>, only my creator can execute this command.`)
    }
  } else if (miscCom === "update") {
    if (msg.author.id === process.env.ADMIN) {
      var arr, text;
      switch (command) {
        case "ultimatrix":
          arr = ultimatrixAliens;
          text = "|UA"
          break;
        case "og omnitrix":
          arr = omnitrix_OGAliens;
          text = "|OS"
          break;
        case "ov omnitrix":
          arr = omnitrix_OVAliens;
          text = "|OV"
          break;
        default:
          arr = ultimateAliens;
          break;
      }

      for (let i = 0; i < arr.length; i++) {
        let alienName = arr[i];
        let name = alienName
        if (alienCheck(omnitrixAliens, alienName) === true && alienCheck(arr, alienName) === true)
          alienName += "_(Classic)"

        console.log(alienName)
        let alienArr = await fetchAlienFromWikia(alienName, text)
        let [species, abilities, imgID] = alienArr;

        let pictureUrl = await openWebPage(`https://ben10.fandom.com/wiki/${alienName}?file=${imgID}`);
        writeAliens(aliens, setting, alienName, name, species, pictureUrl, abilities)


        if (command = "ultimate" && alienCheck(ultimateAliens, name) === true && setting == "Ultimatrix") {
          console.log("Ultimate" + " " + name)
          let alienArr = await fetchAlienFromWikia(`Ultimate_${name}`, "|UA")
          let [species, abilities, imgID] = alienArr;
          let temp = {};
          temp["image"] = await openWebPage(`https://ben10.fandom.com/wiki/Ultimate_${name}?file=${imgID}`);
          aliens["Ultimatrix"][alienName]["ultimate"] = temp;
          fs.writeFileSync("aliens.json", JSON.stringify(aliens, null, 2), (err) => {
            if (err) console.log("Error Writing data to 'aliens.json' file");
          })
        }
      }
    } else {
      msg.channel.send(`Sorry <@${msg.author.id}>, only my creator can execute this command.`)
    }
  } else if (miscCom === "test") {
    if (msg.author.id === process.env.ADMIN) {
      var arr, logo;
      switch (command) {
        case "ultimatrix":
          arr = ultimatrixAliens;
          logo = ultimatrix_author_img;
          break;
        case "og omnitrix":
          arr = omnitrix_OGAliens;
          logo = omnitrix_OG_author_img;
          break;
        case "ov omnitrix":
          arr = omnitrix_OVAliens;
          logo = omnitrix_OV_author_img;
          break;
        default:
          arr = ultimateAliens;
          logo = ultimatrix_author_img;
          break;
      }

      for (let i = 0; i < arr.length; i++) {
        let alienName = arr[i];
        let name = alienName
        if (alienCheck(omnitrixAliens, alienName) === true && alienCheck(arr, alienName) === true)
          alienName += "_(Classic)"

        setTimeout(() => {
          transform(logo, omnitrix_logo, omnicolor)(true, 0, setting, alienName)
        }, 5000)

        if (command = "ultimate" && alienCheck(ultimateAliens, name) === true && setting == "Ultimatrix") {
          if (aliens["Ultimatrix"][alienName].hasOwnProperty("ultimate") === true) {

            let pictureUrl = getUltimate(alienName);
            try {

              let embed = new Discord.MessageEmbed()
                .setTitle(`Ultimate ${alienName.replace("_(Classic)", "")}`)
                .setAuthor("Ultimatrix", `${ultimatrix_author_img}`)
                .setColor(`${omnicolor}`)
                .setFooter("© Ultimatrix", `${footer_img}`)
                .setImage(`${pictureUrl}`)
                .setThumbnail(`${omnitrix_logo}`)
                .setTimestamp()
              msg.channel.send({
                embed
              });
            } catch (err) {
              console.log("Embed Send Error");
            }
          } else {
            return;
          }
        }
      }

    } else {
      msg.channel.send(`Sorry <@${msg.author.id}>, only my creator can execute this command.`)
    }
  } else if (miscCom === "ls") {
    if (msg.author.id === process.env.ADMIN) {
      let guilds = "";

      client.guilds.cache.forEach((guild) => {
        guilds += guild.name + "\n";
      })

      fs.writeFileSync(`./guilds.txt`, guilds, (err) => {
        if (err) console.log(err);
      })

      const buffer = fs.readFileSync(`./guilds.txt`);
      const attachment = new MessageAttachment(buffer, 'guilds.txt');
      msg.channel.send(attachment);
    } else {
      msg.channel.send(`Sorry <@${msg.author.id}>, only my creator can execute this command.`)
    }
  }
});