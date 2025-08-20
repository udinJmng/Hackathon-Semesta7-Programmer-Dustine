import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ user, setUser }) {
  const [data, setData] = useState([]);
  const [kta, setKta] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/data_mahasiswa")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const found = data.find((mhs) => mhs.KTA === kta && mhs.Password === password);
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      setError("");
    } else {
      setError("KTA atau Password salah!");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "20px",
            width: "280px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            background: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>🔑 Login Mahasiswa</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="KTA"
              value={kta}
              onChange={(e) => setKta(e.target.value)}
              style={{
                width: "90%",
                padding: "6px",
                margin: "6px 0",
                borderRadius: "6px",
                border: "1px solid #ccc",
                textAlign: "center",
                fontSize: "13px",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "90%",
                padding: "6px",
                margin: "6px 0",
                borderRadius: "6px",
                border: "1px solid #ccc",
                textAlign: "center",
                fontSize: "13px",
              }}
            />
            <button
              type="submit"
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                width: "100%",
                fontSize: "13px",
                fontWeight: "600",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                background: "black",
                color: "white",
              }}
            >
              Login
            </button>
          </form>
          {error && (
            <p style={{ color: "red", marginTop: "10px", fontSize: "12px" }}>{error}</p>
          )}
        </div>
      </div>
    );
  }

  // jika user sudah login
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "20px",
          width: "300px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          background: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>🎓 Profil Mahasiswa</h2>
        <p><b>KTA:</b> {user.KTA}</p>
        <p><b>Nama:</b> {user.Nama}</p>
        <p><b>Tanggal Lahir:</b> {new Date(user.tLahir).toLocaleDateString()}</p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "15px",
            padding: "6px 12px",
            fontSize: "13px",
            fontWeight: "600",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: "black",
            color: "white",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
