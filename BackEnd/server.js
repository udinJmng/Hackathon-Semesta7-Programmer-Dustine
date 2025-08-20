// bagian inisiasi lib
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

// get method

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

app.get('/data_token', (req,res) => { // get data admin auth
    const sql = "SELECT * FROM adminauth";
        db.query(sql, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/data_mahasiswa', (req,res) => { // get data mahasiswa
    const sql = "SELECT * FROM data_mahasiswa";
        db.query(sql, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// post method

app.post('/add_user', (req,res) => {
    const sql = "INSERT INTO user (KTA, PhotoUrl, Voted, VotedWho) VALUES (?,?,?,?)"
    const val = [
        req.body.KTA,
        req.body.url,
        req.body.Voted, // 0 = false | 1 = true (buat validasi aja biar gabisa vote 2 kali)
        req.body.VoteSiapa // 1 = paslon 1 | 2 = paslon 2 | 3 = paslon 3
    ]
})



app.listen(8081, ()=>{ // inisasi port listen (server backend)
    console.log("Listening");
})