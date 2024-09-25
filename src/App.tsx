
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from "./Pages/Home";
import {Jobs} from "../src/Pages/orders";
import {Details} from  "./Pages/details";
import { CreateOrder } from "./Pages/CreateOrder";


function App() {
  return (
    
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/orders" element={<Jobs />} />
    <Route path="/orders/:id" element={<Details />} />
    <Route path="/CreateOrder" element={<CreateOrder />}/>
  </Routes>
</Router>
  );
} 

export default App;
