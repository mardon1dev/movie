import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Routers from "./routes/Routers";

function App() {
  const location = useLocation();

  return (
    <div
      className={`${
        location.pathname !== "/profile" ? "bg-[#101010]" : "bg-gray-600"
      }`}
    >
      <ConditionalHeader />
      <Routers />
    </div>
  );
}

const ConditionalHeader = () => {
  return location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/profile" ? (
    <Header />
  ) : null;
};

export default App;
