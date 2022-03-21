import AllUsers from "./Component/AllCustomers";
import AddUser from "./Component/AddCustomer";
import EditUser from "./Component/EditCustomer";
import NavBar from "./Component/Navbar";
import NotFound from "./Component/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<AllUsers />} />
        <Route exact path="/add" element={<AddUser />} />
        <Route exact path="/edit/:id" element={<EditUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
