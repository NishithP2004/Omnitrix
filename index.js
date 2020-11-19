const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
const talkedRecently = new Set();

client.login(process.env.TOKEN);
client.on('ready', () => {
    console.log("It's Hero Time 👽 !!");
})

// Event Listener
client.on('message', (msg) => {
  if (talkedRecently.has(msg.author.id)) {
    if (msg.author.username !== "Omnitrix" && msg.content !== `${prefix}help` && msg.content !== `${prefix}it's hero time`) {
    msg.channel.send("The Omnitrix is in cooldown. \nPlease wait: " + msg.author.username);
    }
} else {
  if (msg.content === `${prefix}Fourarms` || msg.content === `${prefix}fourarms`) {
  let embed = new Discord.MessageEmbed()
  .setTitle("Four Arms")
  .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
  */
  .setColor("#b0f013")
  .setFooter("© Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FFour%20Arms.jpg?alt=media&token=1581c629-178c-4629-8318-f2720cf12f39")
  .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  // .setURL("https://nishithp.live")
  .addFields({ name: "Species", value: "Tetramand", inline: true })
  .addFields({ name: "Powers & Abilities",
      value: "Sonic Clap \nShock waves \nHeat resistance \nEnhanced strength, durability, agility, speed and reflexes"})
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  /*
   * Blank field, useful to create some space.
   */
      msg.channel.send({embed});
    } else if (msg.content === `${prefix}Heatblast` || msg.content === `${prefix}heatblast`) {

let embed = new Discord.MessageEmbed()
  .setTitle("Heatblast")
  .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
  */
  .setColor("#b0f013")
  .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FHeatblast.jpg?alt=media&token=57c0719f-954b-482f-8479-f88e8c644212")
  .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  // .setURL("https://nishithp.live")
  .addFields({ name: "Species", value: "Pyronite", inline: true })
  .addFields({ name: "Powers & Abilities",
      value: "Flight \nPyrokinesis \nPyro & Cryo Immunity \nEnhanced speed, strength and durability"})
    msg.channel.send({embed});

    } else if (msg.content === `${prefix}Cannonbolt` || msg.content === `${prefix}cannonbolt`) {
let embed = new Discord.MessageEmbed()
  .setTitle("Cannonbolt")
  .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
  */
  .setColor("#b0f013")
  .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FCannonbolt.jpg?alt=media&token=3c59b70c-03f0-478f-ae1b-7b515a749f59")
  .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  // .setURL("https://nishithp.live")
  .addFields({ name: "Species", value: "Arburian Pelarota", inline: true })
  .addFields({ name: "Powers & Abilities",
      value: "Transforms in to a sphere \nInvulnerable in sphere form \nSharp claws and teeth \nEnhanced strength, durability, agility and speed"})
    msg.channel.send({embed});

    } else if (msg.content === `${prefix}Stinkfly` || msg.content === `${prefix}stinkfly`) {
        let embed = new Discord.MessageEmbed()
  .setTitle("Stinkfly")
  .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
  */
  .setColor("#b0f013")
  .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FStinkfly.jpg?alt=media&token=42a8dc38-60b3-4df7-925a-a0b560eedd5c")
  .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  // .setURL("https://nishithp.live")
  .addFields({ name: "Species", value: "Lepidopterran", inline: true })
  .addFields({ name: "Powers & Abilities",
      value: "Flight \nSlime projection \nToxic gas & Saliva \nEnhanced strength, durability, agility and speed"})
    msg.channel.send({embed});

    } else if (msg.content === `${prefix}Diamondhead` || msg.content === `${prefix}diamondhead`) {
        let embed = new Discord.MessageEmbed()
  .setTitle("Diamondhead")
  .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
  */
  .setColor("#b0f013")
  .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FDiamondhead.jpg?alt=media&token=4bec870b-ce4c-4a10-9fca-ed9f346d17b0")
  .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  // .setURL("https://nishithp.live")
  .addFields({ name: "Species", value: "Petrosapien", inline: true })
  .addFields({ name: "Powers & Abilities",
      value: "Crystallokinesis \nWeapon manifestation, body alteration \nRegeneration \nEnhanced strength and durability"})
    msg.channel.send({embed});

    } else if (msg.content === `${prefix}Wildvine` || msg.content === `${prefix}wildvine`) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Wildvine")
        .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor("#b0f013")
        .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FWildvine.jpg?alt=media&token=5d8c267f-0e75-414b-822a-e32a58d3addd")
        .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        // .setURL("https://nishithp.live")
        .addFields({ name: "Species", value: "Florauna", inline: true })
        .addFields({ name: "Powers & Abilities",
            value: "Chlorokinesis \nElasticity and body alteration \nVine generation and tentacles \nEnhanced strength, flexibility, agility and digging"})
          msg.channel.send({embed});

    } else if (msg.content === `${prefix}Upgrade` || msg.content === `${prefix}upgrade`) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Upgrade")
        .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor("#b0f013")
        .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FUpgrade.jpg?alt=media&token=cd6aada6-742f-4100-9d35-aa72aa566b97")
        .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        // .setURL("https://nishithp.live")
        .addFields({ name: "Species", value: "Galvanic Mechamorph", inline: true })
        .addFields({ name: "Powers & Abilities",
            value: " Technokinesis \nOptic beam \nShapeshifting and regeneration \nEnhanced strength, flexibility, dexterity and durability"})
          msg.channel.send({embed});

    } else if (msg.content === `${prefix}Overflow` || msg.content === `${prefix}overflow`) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Overflow")
        .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor("#b0f013")
        .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FOverflow.jpg?alt=media&token=b4b75b4c-e298-4fd0-a255-1c2bd1b3dd63")
        .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        // .setURL("https://nishithp.live")
        .addFields({ name: "Species", value: "Cascan", inline: true })
        .addFields({ name: "Powers & Abilities",
            value: "Hydrokinesis \nWater blades & water absorption \nWater blades & water absorption \nEnhanced strength, durability, agility and speed"})
          msg.channel.send({embed});

    } else if (msg.content === `${prefix}Grey matter` || msg.content === `${prefix}grey matter`) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Grey Matter")
        .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor("#b0f013")
        .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FGrey%20Matter.jpg?alt=media&token=0a8b770b-cddd-4394-971d-63d6027372b0")
        .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        // .setURL("https://nishithp.live")
        .addFields({ name: "Species", value: "Galvan", inline: true })
        .addFields({ name: "Powers & Abilities",
            value: "Wall crawling \nSharp teeth, sticky skin \nUnderwater breathing \nEnhanced intelligence, agility, flexibility and jumping"})
          msg.channel.send({embed});

    } else if (msg.content === `${prefix}XLR8` || msg.content === `${prefix}xlr8`) {
        let embed = new Discord.MessageEmbed()
        .setTitle("XLR8")
        .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor("#b0f013")
        .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FXLR8.jpg?alt=media&token=1bc869d0-443f-46fa-b116-9d3da7ee6806")
        .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        // .setURL("https://nishithp.live")
        .addFields({ name: "Species", value: "Kineceleran", inline: true })
        .addFields({ name: "Powers & Abilities",
            value: "Accelerated Thinking \nWall and Water Running, sticky skin \nVortex Creation \nEnhanced strength, durability, agility, speed and reflexe"})
          msg.channel.send({embed});

    } else if (msg.content === `${prefix}Humungousaur` || msg.content === `${prefix}humungousaur`) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Humungousaur")
        .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor("#b0f013")
        .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FHumangasaur.jpg?alt=media&token=36da0d3a-a8cf-4cee-b452-2e0fcbcbd877")
        .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        // .setURL("https://nishithp.live")
        .addFields({ name: "Species", value: "Vaxasaurian", inline: true })
        .addFields({ name: "Powers & Abilities",
            value: "Stegosauride Features \nSonic Clap \nShock Waves \nEnhanced strength, flexibility, agility and digging"})
          msg.channel.send({embed});

    } else if (msg.content === `${prefix}Rath` || msg.content === `${prefix}rath`) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Rath")
        .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor("#b0f013")
        .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FRath.jpg?alt=media&token=6069a427-37c3-4603-94c0-2640b602ba2a")
        .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        // .setURL("https://nishithp.live")
        .addFields({ name: "Species", value: "Appoplexian", inline: true })
        .addFields({ name: "Powers & Abilities",
            value: "Shock Waves \nPowerful Roar \nExtendable Claws \nEnhanced strength, durability, agility, speed and reflexes"})
          msg.channel.send({embed});

    } else if (msg.content === `${prefix}Slapback` || msg.content === `${prefix}slapback`) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Slapback")
        .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor("#b0f013")
        .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FSlapback.jpg?alt=media&token=d0ce9d4b-6329-4fa7-a56c-7e409ba3f560")
        .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        // .setURL("https://nishithp.live")
        .addFields({ name: "Species", value: "Ekoplektoid", inline: true })
        .addFields({ name: "Powers & Abilities",
            value: "Kinetic Self-Duplication \nSize Alteration \nStrength Amplification \nDuplicate Assimilation"})
          msg.channel.send({embed});

    } else if (msg.content === `${prefix}Shock Rock` || msg.content === `${prefix}shock rock`) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Shock Rock")
        .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor("#b0f013")
        .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        .setImage("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2FShock%20Rock.jpg?alt=media&token=0ec497e8-76d9-416e-a116-6655ed232849")
        .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        // .setURL("https://nishithp.live")
        .addFields({ name: "Species", value: "Fulmini", inline: true })
        .addFields({ name: "Powers & Abilities",
            value: "Electrokinesis \nWeapon Manifestation \nForce Field Generation \nWormhole Generation"})
          msg.channel.send({embed});

    }
    if (msg.content !== `${prefix}help` || msg.content !== `${prefix}it's hero time`) {
    // Adds the user to the set so that they can't talk for 20 seconds
    talkedRecently.add(msg.author.id);
    setTimeout(() => {
      // Removes the user from the set after 20 seconds
      talkedRecently.delete(msg.author.id);
    }, 20000);
    if (msg.content === `${prefix}help` || msg.content === `${prefix}it's hero time` ) {
      setTimeout(() => {
        // Removes the user from the set after 20 seconds
        talkedRecently.delete(msg.author.id);
      }, 0);
    }
  }
  }
  // Help Embed - Commands List
  if (msg.content === `${prefix}help` || msg.content === `${prefix}its hero time`) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Omnitrix Commands list")
      .setAuthor("Omnitrix", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix.png?alt=media&token=d8e260cd-dfea-4d8a-a5fa-24bff798833c")
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor("#b0f013")
      .setFooter("© Nishith P", "https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
      .setThumbnail("https://firebasestorage.googleapis.com/v0/b/plastic-storage.appspot.com/o/Omnitrix-bot%2Fomnitrix-logo.png?alt=media&token=6f9d7a91-4b88-4408-8ab1-801abf7d627c")
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      .addFields({ name: "It's Hero time !!", value: "``!Fourarms`` \n``!Heatblast`` \n``!Cannonbolt`` \n``!Stinkfly`` \n``!Diamondhead`` \n``!Wildvine`` \n``!Upgrade`` \n``!Overflow`` \n``!Grey matter`` \n``!XLR8`` \n``!Humungousaur`` \n``!Rath`` \n``!Slapback`` \n``!Shockrock``", inline: true});
    msg.channel.send({ embed });
  }
});