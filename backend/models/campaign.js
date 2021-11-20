const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    // Manager is the one who create the campaign?
    manager: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    minAmount: {
        type: Number,
        required: true,
    },
    targetAmount: {
        type: Number,
        required: true,
    },
    /*
    contributedUsers: [{username, amountPaid, Date}, ...]
    */
    contributedUsers: [{
        type: Object
    }],
}, {
    timestamps: true,
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;