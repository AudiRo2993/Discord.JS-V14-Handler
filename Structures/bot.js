require("dotenv/config");
const { Client, Collection, Partials } = require("discord.js");
const {
  Channel,
  GuildMember,
  GuildScheduledEvent,
  Message,
  Reaction,
  ThreadMember,
  User,
} = Partials;
const Util = require("./Utils");
const { BotToken } = process.env;
const { loadEvents } = require("../Handlers/Events");
const { loadCommands } = require("../Handlers/Commands");
const { loadComponents } = require("../Handlers/Components");
const chalk = require("chalk");

class BOT extends Client {
  constructor() {
    super({
      intents: 3276799,
      partials: [
        Channel,
        GuildMember,
        GuildScheduledEvent,
        Message,
        Reaction,
        ThreadMember,
        User,
      ],
    });
    this.config = require("./config.json");
    this.commands = new Collection();
    this.subCommands = new Collection();
    this.events = new Collection();
    this.components = {
      buttons: new Collection(),
      selectMenus: new Collection(),
      modals: new Collection(),
    };

    this.token = BotToken;
    this.utils = new Util(this);
    global.chalk = chalk;
  }

  async init(token) {
    await loadEvents(this);
    if(!BotToken) return console.log(chalk.bold.yellowBright(
      `[this] -  Please add a Discord Token.  -  [file]: ".env"`
    ))
    await this.login(BotToken).then(() => {
      console.log(
        chalk.bold.yellowBright(
          `[this] - ${this.user.tag} has logged into Discord. `
        )
      );
      console.log(
        chalk.bold.yellowBright(
          `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ `
        ),
        
      );
      console.log(
        chalk.bold.yellowBright(
          `ONLINE `
        ),
        
      );
      
    });
    await loadCommands(this);
    await loadComponents(this);
    await this.utils.logger();
  }
}
process.on('unhandledRejection', (reason, p) => {
  console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase());
  console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
  console.log('Reason: ', reason.path ? String(reason.path).gray : String(reason).gray);
  console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase());
});
process.on("uncaughtException", (err, origin) => {
  console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase());
  console.log('Exception: ', err.stack ? err.stack : err)
  console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase());
})

process.on('beforeExit', (code) => {
  console.log('\n\n\n\n\n=== before Exit ==='.toUpperCase());
  console.log('Code: ', code);
  console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase());
});
process.on('exit', (code) => {
  console.log('\n\n\n\n\n=== exit ==='.toUpperCase());
  console.log('Code: ', code);
  console.log('=== exit ===\n\n\n\n\n'.toUpperCase());
});


module.exports = BOT;
