import Customer from "../model/customer.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./crud-app/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Get all customers
export const getCustomers = async (request, response) => {
  try {
    const customers = await Customer.find();
    response.status(200).json(customers);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of the customer in database
export const addCustomer = async (request, response) => {
  // retreive the info of customer from frontend
  const customer = request.body;

  const newCustomer = new Customer(customer);
  try {
    await newCustomer.save();
    response.status(201).json(newCustomer);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Get a customer by id
export const getCustomerById = async (request, response) => {
  try {
    const customer = await Customer.findById(request.params.id);
    response.status(200).json(customer);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of edited customer in the database
export const editCustomer = async (request, response) => {
  let customer = await Customer.findById(request.params.id);
  customer = request.body;

  const editCustomer = new Customer(customer);
  try {
    await Customer.updateOne({ _id: request.params.id }, editCustomer);
    response.status(201).json(editCustomer);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// deleting data of customer from the database
export const deleteCustomer = async (request, response) => {
  try {
    await Customer.deleteOne({ _id: request.params.id });
    response.status(201).json("Customer deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
