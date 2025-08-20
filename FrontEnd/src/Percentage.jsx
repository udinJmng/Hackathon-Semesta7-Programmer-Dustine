import React, { useEffect, useState } from "react";

function Percentage() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventActive, setEventActive] = useState(true);

  const kandidat = [
    { Number: 1, Name: "Tiger" },
    { Number: 2, Name: "Wolf" },
    { Number: 3, Name: "Lion" },
  ];

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch("http://localhost:8081/get_votes");
        const data = await res.json();
        setVotes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchEventStatus = async () => {
      try {
        const res = await fetch("http://localhost:8081/event_status");
        const data = await res.json();
        setEventActive(data.active);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVotes();
    fetchEventStatus();
    const interval = setInterval(() => {
      fetchVotes();
      fetchEventStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading...</p>;

  // Hitung persentase
  const totalVotes = votes.length;
  const counts = kandidat.map(k => ({
    ...k,
    count: votes.filter(v => v.VotedWho === k.Number).length,
    reasons: votes
      .filter(v => v.VotedWho === k.Number)
      .map(v => v.Mengapa)
      .filter(r => r)
  }));

  // Nentuin siapa yang menang pada saat event di stop
  const winner = !eventActive && counts.length
    ? counts.reduce((prev, curr) => (curr.count > prev.count ? curr : prev), counts[0])
    : null;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h2 style={{ marginBottom: "20px" }}>Persentase Voting</h2>
      
      {counts.map(k => {
        const percent = totalVotes ? ((k.count / totalVotes) * 100).toFixed(1) : 0;
        return (
          <div key={k.Number} style={{ marginBottom: "24px", backgroundColor: "#111", padding: "16px", borderRadius: "12px", color: "#fff" }}>
            <h3>{k.Name} — {percent}% ({k.count} votes)</h3>
            <div style={{ backgroundColor: "#222", height: "16px", borderRadius: "8px", overflow: "hidden", margin: "8px 0" }}>
              <div style={{ width: `${percent}%`, backgroundColor: "#03AC0E", height: "100%" }}></div>
            </div>
            <p style={{ fontSize: "14px", color: "#ccc" }}>Alasan voter secara anonim:</p>
            <ul>
              {k.reasons.length ? (
                k.reasons.map((r, i) => <li key={i} style={{ fontSize: "13px", color: "#aaa" }}>{r}</li>)
              ) : (
                <li style={{ fontSize: "13px", color: "#555" }}>Belum ada alasan</li>
              )}
            </ul>
          </div>
        );
      })}

      {/* Insight Pemenang paslon nya :) */}
      {!eventActive && winner && (
        <div style={{ marginTop: "32px", backgroundColor: "#111", padding: "16px", borderRadius: "12px", color: "#fff" }}>
          <h3 style={{ marginBottom: "12px", color: "#03AC0E" }}>Pemenang Voting: {winner.Name}</h3>
          <p style={{ fontSize: "14px", color: "#ccc" }}>
            Jumlah vote: {winner.count} dari total {totalVotes} votes ({((winner.count / totalVotes) * 100).toFixed(1)}%)
          </p>
          <p style={{ fontSize: "14px", color: "#ccc", marginTop: "8px" }}>Alasan kemenangan (ringkasan alasan voter):</p>
          <ul>
            {winner.reasons.length ? (
              winner.reasons.map((r, i) => <li key={i} style={{ fontSize: "13px", color: "#aaa" }}>{r}</li>)
            ) : (
              <li style={{ fontSize: "13px", color: "#555" }}>Belum ada alasan</li>
            )}
          </ul>

          <p style={{ fontSize: "14px", color: "#ccc", marginTop: "12px" }}>Sejarah voting:</p>
          <ul>
            {counts.map(k => (
              <li key={k.Number} style={{ fontSize: "13px", color: "#aaa" }}>
                {k.Name}: {k.count} votes ({totalVotes ? ((k.count / totalVotes) * 100).toFixed(1) : 0}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Percentage;
