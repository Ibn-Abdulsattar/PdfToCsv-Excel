import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import Privacy from "./components/privacy/Privacy";
import NotFound from "./components/NOtFound";
import Pricing from "./components/pricing/Pricing";
import Register from "./components/register/Register";
import Terms from "./components/terms/terms";
import ResetPassword from "./components/register/ResetPassword";
import Profile from "./components/profile/Profile";
import Setting from "./components/setting/Setting";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import GlobalAlert from "./components/GlobalAlert";
import CheckoutPayment from "./components/CheckoutPayment/CheckoutPayment";
import Success from "./components/Success";
import CancelPage from "./components/Cancel";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <GlobalAlert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/checkoutpayment/:id" element={<CheckoutPayment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
