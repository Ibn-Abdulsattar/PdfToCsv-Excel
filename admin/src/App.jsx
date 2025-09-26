import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Files from "./components/files/Files";
import Payment from "./components/payments/Payment";
import Pricing from "./components/pricing/Pricing";
import Support from "./components/support/Support";
import Users from "./components/Users/Users";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />;
          <Route path="/files" element={<Files />} />;
          <Route path="/payment" element={<Payment />} />;
          <Route path="/pricing" element={<Pricing />} />;
          <Route path="/support" element={<Support />} />;
          <Route path="/users" element={<Users />} />;
        </Routes>
      </AdminLayout>
    </>
  );
}

export default App;
