// bagian initialize lib
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json());
// bagian database