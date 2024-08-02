const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const analysisRoutes = require("./analysis");
const resultRoutes = require('./result');
const memoRoutes = require("./memo");
const connectToOracle = require("../config/db.js")

router.use("/user", userRoutes);
router.use("/analysis", analysisRoutes);
router.use("/memo", memoRoutes);
router.use("/result", resultRoutes);

router.get("/", async (req, res) => {
  const connection = await connectToOracle();
  if (connection) {
    try {
      const result = await connection.execute(`SELECT SYSDATE FROM DUAL`);
      console.log("연결")
      res.send(`Current date and time: ${result.rows[0]}`);
      await connection.close();
    } catch (err) {
      res.status(500).send("Error executing query");
      console.error("Error executing query: ", err);
    }
  } else {
    res.status(500).send("Error connecting to database");
  }
});

module.exports = router;
