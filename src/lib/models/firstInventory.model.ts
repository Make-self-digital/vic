import mongoose from "mongoose";

// Inventory Schema & Model
const InventorySchema = new mongoose.Schema({
  item: { type: String, required: true },
  totalUsage: { type: Number, default: 0 },
  history: [
    {
      date: String,
      time: String,
      quantity: Number,
      spent: Number,
      isBase: Boolean,
    },
  ],
});

const FirstInventory =
  mongoose.models.FirstInventory ||
  mongoose.model("FirstInventory", InventorySchema);

export default FirstInventory;
