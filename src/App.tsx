import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Jobs } from "../src/Pages/orders";
import { Order } from "./components/Order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Jobs />} />
        <Route path="/orders/:id" element={<Order type="View" />} />
        <Route path="/createorder" element={<Order type="Create" />} />
      </Routes>
    </Router>
  );
}

export default App;
