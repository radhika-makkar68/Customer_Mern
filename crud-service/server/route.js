import express from "express";
import {
  getCustomers,
  addCustomer,
  getCustomerById,
  editCustomer,
  deleteCustomer,
} from "../controller/customer-controller.js";
import multer from "multer";
const app = express();

const storage = multer.diskStorage({
  destination: "../../crud-app/public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/customer", getCustomers);
router.post("/customer/add", upload.single("customerImage"), addCustomer);
router.get("/customer/:id", getCustomerById);
router.put("/customer/:id", upload.single("customerImage"), editCustomer);
router.delete("/customer/:id", deleteCustomer);

export default router;
