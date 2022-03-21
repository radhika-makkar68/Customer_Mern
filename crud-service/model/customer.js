import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

// how our document look like
const customerSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: Number,
  address: String,
  image: String,
});

autoIncrement.initialize(mongoose.connection);
customerSchema.plugin(autoIncrement.plugin, "customer");
// we need to turn it into a model
const postCustomer = mongoose.model("customer", customerSchema);

export default postCustomer;
