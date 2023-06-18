module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {import("../../Structures/bot")} client
   */
  async execute(client) {
    /*
      different types for statuses can be a number and they as follows:
      Playing: 0
      Streaming: 1
      Listening: 2
      Watching: 3
      Competing: 5
          
      Want a changing status? Just change line 56 to `status: obj[key].status` and insert your own status into each object below.
      Different statuses include "online", "idle", "dnd", and "invisible"
    */
    let acts = [
      {
        name: "Made By -> site.tyrion.ml",
        type: 5,
        status: "dnd",
      },
      {
        name: `over ${client.guilds.cache.size} guild(s)`,
        type: 3,
        status: "idle",
      },
      // {
      //   name:"",
      //   type: Number,
      //   status: ""
      // }
    ];
    setInterval(async () => {
      const currentAct = acts.shift();
      client.user.setPresence({
        activities: [
          {
            name: currentAct.name.toString(),
            type: currentAct.type,
          },
        ],
        status: currentAct.status,
        /**
         * Don't want a changing status? Just change the line above to `status: "status"`. Different statuses include "online", "idle", "dnd", and "invisible"
         */
      });
      acts.push(currentAct);
    }, 15000);

    // const readyChannel = client.channels.cache.get("") //Channel id where the bot shows it STARTED (webhook)
    // readyChannel.createWebhook(`${client.user.username} Start - [ LOGS ]`, { // Webhook Name
    //   avatar: 'https://cdn.discordapp.com/avatars/674985858142699532/a_74d0fbce1385ade42d4e0e52d3577b84.gif?size=1024', // Webhook Avatar
    // })
    //   .then(webhook => {
    //     console.log(`Created webhook ${webhook}`)
    //     webhook.send({ content: `Started ${client.user.tag} Successfuly at ${new Date().toLocaleString()} ' [ <t:${Math.floor(Date.now() / 1000)}> ]`})
    //   })
    //   .catch(console.error + "Please report this error to the Developer now.");
  },
};
