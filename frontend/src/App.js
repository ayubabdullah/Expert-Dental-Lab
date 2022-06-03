import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Case from "./pages/Case";
import Cases from "./pages/Cases";
import Costs from "./pages/Costs";
import Doctor from "./pages/Doctor";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import Lab from "./pages/Lab";
import Labs from "./pages/Labs";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cases" element={<Cases />} />
        <Route path="cases/:caseId" element={<Case />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/:doctorId" element={<Doctor />} />
        <Route path="labs" element={<Labs />} />
        <Route path="labs/:labId" element={<Lab />} />
        <Route path="costs" element={<Costs />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </div>
  );
}

export default App;
