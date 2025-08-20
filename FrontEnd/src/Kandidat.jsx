import React from "react";
import Navbar from "./Navbar.jsx";

function Kandidat() {
  const kandidat = [
    {
      Name: "Tiger",
      Number: 1,
      PhotoUrl: null,
      Motto: "Bisa menyejahterakan masyarakat Kampus dengan baik",
    },
    {
      Name: "Wolf",
      Number: 2,
      PhotoUrl: null,
      Motto: "Ingin menjaga fasilitas Kampus",
    },
    {
      Name: "Lion",
      Number: 3,
      PhotoUrl: null,
      Motto:
        "Ingin membuat masyarakat kampus taat dengan kebersihan dan kesehatan",
    },
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Navbar muncul di atas */}

      {/* Grid Kandidat */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          padding: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {kandidat.map((k) => (
          <div
            key={k.Number}
            style={{
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
              backgroundColor: "#111", // nuansa gelap
              color: "#fff",
              boxShadow: "0px 4px 16px rgba(0,0,0,0.2)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0px 8px 20px rgba(0,0,0,0.35)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0px 4px 16px rgba(0,0,0,0.2)";
            }}
          >
            {/* Foto Kandidat */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#222",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: "700",
                color: "#eee",
                border: "3px solid #fff",
                overflow: "hidden",
              }}
            >
              {k.PhotoUrl ? (
                <img
                  src={k.PhotoUrl}
                  alt={k.Name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                k.Name[0]
              )}
            </div>

            {/* Nama & Nomor */}
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "6px",
              }}
            >
              {k.Name}
            </h2>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "12px",
                color: "#ccc",
              }}
            >
              Nomor Urut <span style={{ color: "#fff" }}>#{k.Number}</span>
            </p>

            {/* Motto */}
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#aaa",
              }}
            >
              {k.Motto}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kandidat;
