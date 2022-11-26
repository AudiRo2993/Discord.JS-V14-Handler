const { Schema, model } = require('mongoose');

const memberCounter = new Schema({

    gID: { type: String },
    userCount: { type: Number },
    botCount: { type: Number },
    allCount: { type: Number },
    userCountChan: { type: String },
    botCountChan: { type: String },
    allCountChan: { type: String }

});

module.exports = model("Count", memberCounter, "Count"); 