import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { User } from "./Pages/user";
import { Jobs } from "../src/Pages/orders";
import { Order } from "./components/Order";
import { CreateOrder } from "./Pages/CreateOrder";
import { useAppContext } from "../src/contexts/AppContext";
import { SignIn } from "./Pages/SignIn";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={
            
              <SignIn />
            
          }
        />
        <Route
          path="/register"
          element={
            
              <Register />
            
          }
        />
        {isLoggedIn && (
          <>
            <Route path="/user" element={<User />} />
            <Route path="/orders" element={<Jobs />} />
            <Route path="/orders/:id" element={<Order type="View" />} />
            <Route path="/createorder" element={<CreateOrder/>} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
