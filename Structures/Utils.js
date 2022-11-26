const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const Guild = require("./models/guild");
const { glob } = require("glob");
const { promisify } = require("util");
const PG = promisify(glob);
const { default: mongoose } = require("mongoose");
const { Connect } = process.env;
const { get } = require("axios");

module.exports = class Utils {
  /**
   *
   * @param {*} client
   * @param {ChatInputCommandInteraction} interaction
   */
  constructor(client, interaction) {
    this.client = client;
    interaction;
  }

  async guild(guildID, guildName) {
    const guild = await Guild.findOne({
      gID: guildID,
    });
    if (!guild) {
      const newData = new Guild({
        gID: guildID,
        gName: guildName,
      });
      newData.save();
      return newData;
    } else {
      return guild;
    }
  }

  async getSetup(guildID) {
    const setup = await Guild.findOne({
      gID: guildID,
    });
    return setup;
  }

  checkOwner(user) {
    return process.env.BotOwnerID !== user;
  }

  async dbConnect() {
    if (Connect) {
      const HOSTS_REGEX =
        /^(?<protocol>[^/]+):\/\/(?:(?<username>[^:@]*)(?::(?<password>[^@]*))?@)?(?<hosts>(?!:)[^/?@]*)(?<rest>.*)/;
      const match = Connect.match(HOSTS_REGEX);
      if (!match) {
        return console.error(
          chalk.red.bold(`[DATABASE]- Invalid connection string "${Connect}"`)
        );
      }
      const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        connectTimeoutMS: 10000,
        family: 4,
      };

      mongoose.connection.on("connecting", () => {
        console.log(chalk.yellow.italic("Mongoose is connecting..."));
      });

      mongoose.connect(Connect, dbOptions);
      mongoose.Promise = global.Promise;

      mongoose.connection.on("connected", () => {
        console.log(
          chalk.magenta.italic("Mongoose has successfully connected!")
        );
      });

      mongoose.connection.on("err", (err) => {
        console.error(
          chalk.red.bold(`Mongoose connection error: \n${err.stack}`)
        );
      });

      mongoose.connection.on("disconnected", () => {
        console.warn(chalk.red.italic("Mongoose connection lost"));
      });

      const dbModels = this.loadFiles("./Structures/models");
      let modelCount = 0;
      (await dbModels).forEach(async (file) => {
        modelCount++;
      });
      if (modelCount > 0) {
        console.log(
          chalk.blueBright(`[DATABASE]- Loaded ${modelCount} Model(s)!`)
        );
      }
    } else
      return console.log(
        `[DATABASE]- No connection string in your environment.`
      );
  }

  async getMeme() {
    let nonNSFW = null;

    while (nonNSFW === null) {
      const response = await get("https://reddit.com/r/memes.json");
      const { data } =
        response.data.data.children[
        Math.floor(Math.random() * response.data.data.children.length)
        ];
      if (data.over_18 === false) nonNSFW = data;
    }

    return new EmbedBuilder()
      .setColor("NotQuiteBlack")
      .setURL("https://reddit.com" + nonNSFW.permalink)
      .setTitle(nonNSFW.title)
      .setDescription(
        `🤖 **Sub-Reddit**: \`r/${nonNSFW.subreddit}\`\n⬆️ **Upvotes**: \`${nonNSFW.ups}\` - ⬇️ **Downvotes**: \`${nonNSFW.downs}\``
      )
      .setFooter({ text: `Meme by ${nonNSFW.author}` })
      .setImage(nonNSFW.url);
  }

  async loadFiles(dirName) {
    const Files = await PG(
      `${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`
    );
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
  }

  async logger() {
    const eventFiles = await this.loadFiles("./Events");
    let events = 0;
    eventFiles.forEach((file) => {
      const event = require(file);
      if (!event.name)
        return console.error(
          `Event: ${file.split("/").pop()} doesn't have a name`
        );
      events++;
    });
    console.log(chalk.blue(`[HANDLER] - ${events} Event(s) Loaded`));

    let devCommands = 0;
    let commands = 0;
    let subs = 0;

    const Files = await (
      await this.loadFiles("./Commands")
    );

    Files.forEach((file) => {
      const command = require(file);

      if (command.subCommand) {
        subs++;
      }

      if (command.developer) {
        devCommands++;
      } else {
        commands++;
      }
    });
    console.log(
      chalk.blueBright(`[HANDLER] - ${commands} Global Command(s) Loaded`)
    );

    console.log(
      chalk.blueBright(`[HANDLER] - ${devCommands} Developer Command(s) Loaded`)
    );

    console.log(chalk.blueBright(`[HANDLER] - ${subs} Sub Command(s) Loaded`));

    //Buttons
    let but = 0;
    const Buttons = await this.loadFiles("./Components/Buttons");
    Buttons.forEach((file) => {
      const button = require(file);
      if (!button.id)
        return console.error(
          chalk.redBright(
            `Button: ${button.split("/").pop()} doesn't have an id.`
          )
        );
      but++;
    });
    if (but > 0) {
      console.log(chalk.blueBright(`[HANDLER] - ${but} Button(s) Loaded`));
    }

    //Select Menus
    let sm = 0;
    const SelectMenus = await this.loadFiles("./Components/SelectMenus");
    SelectMenus.forEach((file) => {
      const selectMenu = require(file);
      if (!selectMenu.id)
        return console.error(
          chalk.redBright(`Select Menu: ${selectMenu} doesn't have an id.`)
        );
      sm++;
    });
    if (sm > 0) {
      console.log(chalk.blueBright(`[HANDLER] - ${sm} Select Menu(s) Loaded`));
    }

    //Modals
    let mod = 0;
    const Modals = await this.loadFiles("./Components/Modals");
    Modals.forEach((file) => {
      const modal = require(file);
      if (!modal.id)
        return console.error(
          chalk.redBright(`Modal: ${modal} doesn't have an id.`)
        );
      mod++;
    });
    if (mod > 0) {
      console.log(chalk.blueBright(`[HANDLER] - ${mod} Modal(s) Loaded`));
    }

    //Database
    await this.dbConnect();
    return this.logger;
  }

  errorEmbed(interaction, message) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`\\📛 **Error:** \\📛\n ${message} `)
          .setColor("Red"),
      ],
      ephemeral: true,
    });
  }

  successEmbed(interaction, message) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`\\✅ **Success:** \\✅\n ${message}  `)
          .setColor("Green"),
      ],
      ephemeral: true,
    });
  }
};
