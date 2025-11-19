import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
