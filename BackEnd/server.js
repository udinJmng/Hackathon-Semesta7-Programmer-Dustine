// bagian initialize lib
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json());
// bagian database

const db = mysql.createConnection({ // inisiasi jaringan database
    host : "localhost",
    user : 'root',
    password: '',
    database: 'pemilihan'
})

app.get('/data_kandidat', (req,res) => { // get data kandidat
    const sql = "SELECT * FROM kandidat";
    db.query(sql, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/data_user', (req,res) => { // get data user (bisa buat cek kta mahasiswa / buat nantinya get data yang dia pilih)
    const sql = "SELECT * FROM user";
        db.query(sql, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})