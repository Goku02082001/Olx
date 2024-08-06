const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createItem,
  getAllUnsoldItems,
  getUserItems,
  getUserPurchases,
  addToFavourites,
  getItemById,
  getAllItems,
  getAllSoldItems,
  searchItemsByName,
  getAllItemsByCategory,
  searchItemsByLocation,
} = require("../controllers/items");

const itemRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

itemRouter.post("/", authMiddleware, upload.single("image"), createItem);
itemRouter.get("/:id", getItemById);
itemRouter.get("/", getAllItems);
itemRouter.post("/search", searchItemsByName);
itemRouter.post("/location", searchItemsByLocation)
itemRouter.post("/unSold", getAllUnsoldItems);
itemRouter.post("/sold", getAllSoldItems);
itemRouter.post("/category", getAllItemsByCategory);
itemRouter.post("/user", authMiddleware, getUserItems);
itemRouter.get("/purchases", authMiddleware, getUserPurchases);
itemRouter.post("/favourites", authMiddleware, addToFavourites);

module.exports = itemRouter;
