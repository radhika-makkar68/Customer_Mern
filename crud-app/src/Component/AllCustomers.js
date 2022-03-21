import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { getCustomers, deleteCustomer } from "../Service/api";
import { Link } from "react-router-dom";
import { Pagination, Container } from "@mui/material";

const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "30px 0 0 50px",
  },
  thead: {
    "& > *": {
      fontSize: 20,
      background: "#000000",
      color: "#FFFFFF",
    },
  },
  row: {
    "& > *": {
      fontSize: 18,
    },
  },
});

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserData = async (id) => {
    await deleteCustomer(id);
    getAllUsers();
  };

  const getAllUsers = async () => {
    let response = await getCustomers();
    setUsers(response.data);
  };

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    return users.filter((user) => user.name.includes(search));
  };

  return (
    <>
      <TextField
        style={{ marginTop: 30, width: "100%" }}
        label="Search for a Customer"
        variant="outlined"
        fullWidth
        onChange={(e) => {
          let value = e.target.value;
          value = value.replace(/[^A-Za-z]/gi, "");
          setSearch(value);
        }}
        value={search}
      />
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Image</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {handleSearch()
            .slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((user) => {
              console.log(user.image);
              return (
                <TableRow className={classes.row} key={user.id}>
                  <TableCell>{user._id}</TableCell>{" "}
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.image}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 10 }}
                      component={Link}
                      to={`/edit/${user._id}`}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => deleteUserData(user._id)}
                    >
                      Delete
                    </Button>{" "}
                    {/* change it to user.id to use JSON Server */}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination
        count={Number.parseInt((handleSearch()?.length / 10).toFixed(0))}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </>
  );
};

export default AllUsers;
