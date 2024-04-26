const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

const TicketModel = mongoose.model("ticket", ticketSchema);

module.exports = TicketModel;
