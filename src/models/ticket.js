const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  code: { type: String, require: true },
  purchase_datetime: { type: String },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

const TicketModel = mongoose.model("ticket", ticketSchema);

module.exports = TicketModel;
