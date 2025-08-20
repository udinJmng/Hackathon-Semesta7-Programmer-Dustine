import React from 'react'

function Navbar() {
  return (
<div style={{
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  backgroundColor: "#757575a1",
  padding: "8px",
  width: "fit-content",
  margin: "0 auto",
  borderRadius: "10px",
}}>
        <button>Kandidat</button>
        <button>Sign In</button>
        <button>Percentage</button>
    </div>
  )
}

export default Navbar