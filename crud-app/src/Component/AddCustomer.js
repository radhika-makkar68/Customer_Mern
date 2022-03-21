import react, { useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { addCustomer } from "../Service/api";
import { useNavigate } from "react-router-dom";

const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  address: "",
  image: "",
};

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

const AddCustomer = () => {
  const [customer, setCustomer] = useState(initialValue);
  const { name, username, email, phone, address, image } = customer;
  const classes = useStyles();
  const navigate = useNavigate();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const addCustomerDetails = async () => {
    let response = await addCustomer(customer);
    console.log(response);
    navigate("/");
  };

  const imageUpload = (e) => {
    setCustomer({ ...customer, image: e.target.value });
  };

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Add Customer</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={email}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={phone}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Address</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="address"
          value={address}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <input
          onChange={imageUpload}
          name="customerImage"
          value={image}
          id="my-input"
          type="file"
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addCustomerDetails()}
        >
          Add Customer
        </Button>
      </FormControl>
    </FormGroup>
  );
};

export default AddCustomer;
