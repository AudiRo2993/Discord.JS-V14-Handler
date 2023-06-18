require("dotenv/config");
const { ClusterManager  } = require("discord-hybrid-sharding");

const manager = new ClusterManager(`${__dirname}/index.js`, {
    totalShards: 8, // or 'auto'
    shardsPerClusters: 2,
    mode: 'process', // you can also choose "worker"
    token: process.env.BotToken,
});

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id + 1} #${cluster.id}`));
manager.spawn({ timeout: -1 });