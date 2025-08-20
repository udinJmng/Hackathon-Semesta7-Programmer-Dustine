import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Profile from "./Profile.jsx";
import Kandidat from "./Kandidat.jsx";
import Percentage from "./Percentage.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/kandidat" element={<Kandidat user={user} />} />
        <Route path="/percentage" element={<Percentage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
