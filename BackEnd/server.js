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

app.post('/add_user', (req, res) => {
    const sql = "INSERT INTO user (KTA, PhotoUrl, Voted, VotedWho, Mengapa) VALUES (?,?,?,?,?)";
    const val = [
        req.body.KTA,
        req.body.PhotoUrl || null,
        req.body.voted,
        req.body.VotedWho,
        req.body.why || ""
    ];

    db.query(sql, val, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.json({
                    success: false,
                    message: `Anda sebelumnya sudah ngevote (Nomor urut ${req.body.VotedWho})`
                });
            }
            return res.json({ success: false, message: err.message });
        }
        res.json({ success: true });
    });
});


app.listen(8081, ()=>{ // inisasi port listen (server backend)
    console.log("Listening");
})