import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Kandidat", path: "/kandidat" },
    { name: "Percentage", path: "/percentage" },
  ];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleLoginRedirect = () => {
    navigate("/profile"); // arah ke halaman login/profile
  };

  return (
    <div
      style={{
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
      }}
    >
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={() => navigate(item.path)}
          style={{
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
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#fff";
            e.target.style.color = "#000";
            e.target.style.borderColor = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#222";
            e.target.style.color = "#fff";
            e.target.style.borderColor = "#444";
          }}
        >
          {item.name}
        </button>
      ))}

      {/* Auth handling */}
      {!user ? (
        <button
          onClick={handleLoginRedirect}
          style={{
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#222",
            padding: "6px 12px",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
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
            }}
          >
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              user.Nama.charAt(0)
            )}
          </div>
          <span style={{ color: "#fff", fontSize: "15px", fontWeight: "500" }}>
            Welcome, {user.Nama}
          </span>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#aaa",
              cursor: "pointer",
              fontSize: "13px",
              marginLeft: "6px",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
