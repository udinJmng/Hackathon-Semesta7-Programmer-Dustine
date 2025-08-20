import React, { useState } from "react";

function Kandidat({ user }) {
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

  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleVoteClick = (k) => {
    if (!user) return alert("Silakan login dulu!");
    setSelected(k);
    setReason("");
    setShowModal(true);
    setSuccess("");
  };

const handleSubmitVote = async () => {
  if (!reason) return alert("Isi alasan kamu memilih kandidat ini!");
  setLoading(true);
  try {
    const res = await fetch("http://localhost:8081/add_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        KTA: user.KTA,
        PhotoUrl: null,
        voted: 1,
        VotedWho: selected.Number,
        why: reason,
      }),
    });

    // debug
    console.log("Response status:", res.status);
    const text = await res.text();
    console.log("Response text:", text);

    let data;
    try { data = JSON.parse(text); } catch { data = null; }

    if (data && data.success) {
      setSuccess("Vote berhasil dikirim!");
      setShowModal(false);
    } else {
      alert("Gagal vote: " + (data?.message || "Unknown error"));
    }
  } catch (err) {
    console.error(err);
    alert("Error saat mengirim vote.");
  }
  setLoading(false);
};

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
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
              backgroundColor: "#111",
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
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                k.Name[0]
              )}
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "6px" }}>
              {k.Name}
            </h2>
            <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "12px", color: "#ccc" }}>
              Nomor Urut <span style={{ color: "#fff" }}>#{k.Number}</span>
            </p>
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#aaa" }}>{k.Motto}</p>

            <button
              onClick={() => handleVoteClick(k)}
              style={{
                marginTop: "12px",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#03AC0E",
                color: "#fff",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Vote
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
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
          }}
        >
          <div
            style={{
              backgroundColor: "#111",
              padding: "24px",
              borderRadius: "12px",
              width: "320px",
              color: "#fff",
            }}
          >
            <h3 style={{ marginBottom: "12px" }}>Voting: {selected.Name}</h3>
            <textarea
              placeholder="Mengapa kamu memilih kandidat ini?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginBottom: "12px",
                backgroundColor: "#222",
                color: "#fff",
                resize: "none",
                height: "80px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#555",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitVote}
                disabled={loading}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#03AC0E",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {loading ? "Submitting..." : "Submit Vote"}
              </button>
            </div>
            {success && <p style={{ color: "#0f0", marginTop: "10px" }}>{success}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Kandidat;
