import React from "react";

function Credit() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          backgroundColor: "#111",
          color: "#fff",
          fontFamily: "'Poppins', sans-serif",
          padding: "12px 24px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0px 3px 8px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ color: "#03AC0E", fontWeight: "600" }}>Voting Kampus</span>{" "}
        Web ini dibuat dengan 💕
        <div style={{ display: "flex", gap: "8px", marginLeft: "12px" }}>
          <a
            href="https://github.com/UdinJmng"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              backgroundColor: "#222",
              padding: "4px 8px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "12px",
            }}
          >
            GitHub
          </a>
          <a
            href="https://instagram.com/dustinekcwx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              backgroundColor: "#222",
              padding: "4px 8px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "12px",
            }}
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

export default Credit;
