import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminToken, setAdminToken] = useState(null);

  const menuItems = [
    { name: "Kandidat", path: "/kandidat" },
    { name: "Hasil", path: "/percentage" },
  ];

  const handleLogout = () => {
    setUser(null);
    setAdminToken(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleLoginRedirect = () => {
    navigate("/profile"); // login/profile user
  };

  const handleAdminLogin = async () => {
    try {
      const res = await fetch(`http://localhost:8081/data_token?password=${adminPassword}`);
      const data = await res.json();
      if (data.success) {
        setAdminToken(data.token);
        setUser({ Nama: "Admin" });
        setShowAdminModal(false);
      } else {
        alert("Password admin salah!");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal login admin.");
    }
  };

const handleStartEvent = async () => {
  try {
    const res = await fetch("http://localhost:8081/start_event", { method: "POST" });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
    alert("Gagal memulai event");
  }
};

const handleStopEvent = async () => {
  try {
    const res = await fetch("http://localhost:8081/stop_event", { method: "POST" });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
    alert("Gagal menghentikan event");
  }
};

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      backgroundColor: "#111",
      padding: "10px 24px",
      width: "fit-content",
      margin: "20px auto",
      borderRadius: "14px",
      boxShadow: "0px 3px 8px rgba(0,0,0,0.3)",
      fontFamily: "'Poppins', sans-serif",
    }}>
      {menuItems.map((item, idx) => (
        <button key={idx} onClick={() => navigate(item.path)} style={{
          backgroundColor: "#222",
          color: "#fff",
          border: "1px solid #444",
          borderRadius: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.25s ease",
        }}
          onMouseOver={e => { e.target.style.backgroundColor = "#fff"; e.target.style.color = "#000"; e.target.style.borderColor = "#fff"; }}
          onMouseOut={e => { e.target.style.backgroundColor = "#222"; e.target.style.color = "#fff"; e.target.style.borderColor = "#444"; }}
        >
          {item.name}
        </button>
      ))}

      {!user && (
        <>
          <button onClick={handleLoginRedirect} style={{
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }}>Sign In</button>

          <button onClick={() => setShowAdminModal(true)} style={{
            backgroundColor: "#444",
            color: "#fff",
            border: "1px solid #666",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }}>Admin Panel</button>
        </>
      )}

      {user && user.Nama === "Admin" && (
        <>
          <span style={{ color: "#fff", fontSize: "15px", fontWeight: "500" }}>Welcome, Admin</span>
          <button onClick={handleStartEvent} style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#03AC0E",
            cursor: "pointer",
            fontWeight: "600",
          }}>Start Event</button>
          <button onClick={handleStopEvent} style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#E63946",
            cursor: "pointer",
            fontWeight: "600",
          }}>Stop Event</button>
          <button onClick={handleLogout} style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#aaa",
            cursor: "pointer",
            fontSize: "13px",
            marginLeft: "6px",
          }}>Logout</button>
        </>
      )}

      {user && user.Nama !== "Admin" && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#222",
          padding: "6px 12px",
          borderRadius: "12px",
        }}>
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "#555",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
            fontSize: "15px",
            overflow: "hidden",
          }}>
            {user.photoUrl ? <img src={user.photoUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : user.Nama.charAt(0)}
          </div>
          <span style={{ color: "#fff", fontSize: "15px", fontWeight: "500" }}>Welcome, {user.Nama}</span>
          <button onClick={handleLogout} style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#aaa",
            cursor: "pointer",
            fontSize: "13px",
            marginLeft: "6px",
          }}>Logout</button>
        </div>
      )}

      {showAdminModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}>
          <div style={{
            backgroundColor: "#111",
            padding: "24px",
            borderRadius: "12px",
            width: "320px",
            color: "#fff",
          }}>
            <h3>Admin Login</h3>
            <input type="password" placeholder="Password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} style={{
              width: "100%",
              padding: "8px",
              margin: "12px 0",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#222",
              color: "#fff",
            }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setShowAdminModal(false)} style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#555",
                cursor: "pointer",
                fontWeight: "600",
              }}>Cancel</button>
              <button onClick={handleAdminLogin} style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#03AC0E",
                cursor: "pointer",
                fontWeight: "600",
              }}>Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
