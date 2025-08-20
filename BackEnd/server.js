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

app.get('/get_votes', (req, res) => {
    const sql = "SELECT KTA, VotedWho, Mengapa FROM user WHERE Voted = 1";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json(results);
    });
});


app.get("/data_token", (req, res) => { // get data admin auth
  const password = req.query.password;
  db.query("SELECT token FROM adminauth WHERE token = ?", [password], (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Error database" });
    }
    if (results.length > 0) {
      res.json({ success: true, token: results[0].token });
    } else {
      res.json({ success: false });
    }
  });
});

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

let isVotingActive = false; // controller

app.post("/start_event", (req, res) => {
  if (isVotingActive) return res.json({ success: false, message: "Event sudah berjalan" });
  isVotingActive = true;
  console.log("Voting event dimulai");
  res.json({ success: true, message: "Event dimulai" });
});

app.post("/stop_event", (req, res) => {
  if (!isVotingActive) return res.json({ success: false, message: "Event belum dimulai" });
  isVotingActive = false;
  console.log("Voting event dihentikan");
  res.json({ success: true, message: "Event dihentikan" });
});

app.get("/event_status", (req, res) => {
  res.json({ active: isVotingActive });
});

app.listen(8081, ()=>{ // inisasi port listen (server backend)
    console.log("Listening");
})