import React from 'react'

function Kandidat() {
    const kandidat = [ // Mock Data (Data ril ada di mysql)
        {
            Name : "Tiger",
            Number : 1,
        },
        {
            Name : "Wolf",
            Number : 2,
        },
        {
            Name : "Lion",
            Number : 3,
        },
    ]
  return (
    <div>
        {kandidat.map (k => (
            <button key={k.Number}>
                <h1>{k.Name} - {k.Number}</h1>
            </button>
        ))}
    </div>
  )
}

export default Kandidat