const { Schema, model } = require('mongoose');

const Guild = new Schema({

    gID: { type: String },
    gName: { type: String },
    modC: { type: String },
    verifiedRole: { type: String },
    welcomeC: { type: String },
    leaveC: { type: String },
    introC: { type: String },

});

module.exports = model("Guild", Guild, "Guild"); 