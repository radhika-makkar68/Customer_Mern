import axios from "axios";

const customersUrl = "http://localhost:8080/api/customer";

export const getCustomers = async (id) => {
  id = id || "";
  return await axios.get(`${customersUrl}/${id}`);
};

export const addCustomer = async (customer) => {
  return await axios.post(`${customersUrl}/add`, customer);
};

export const deleteCustomer = async (id) => {
  return await axios.delete(`${customersUrl}/${id}`);
};

export const editCustomer = async (id, customer) => {
  return await axios.put(`${customersUrl}/${id}`, customer);
};
