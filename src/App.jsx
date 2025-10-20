import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Sejarah from "./pages/Sejarah";
import Navbar from "./components/Navbar";
import "./index.css";
import VisiMisi from "./pages/VisiMisi";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import Layanan from "./pages/Layanan";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import InformationList from "./pages/InformationList";
import KuaDetail from "./pages/KuaDetail";
import AboutSatker from "./pages/AboutSatker";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="/sejarah" element={<Sejarah />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/berita" element={<NewsList />} />
        <Route path="/berita/:id" element={<NewsDetail />} />
        <Route path="/bimas-islam/kua/:id" element={<KuaDetail />} />
        <Route path="/informasi" element={<InformationList />} />
        <Route path="/satuankerja/:id" element={<AboutSatker />} />
      </Routes>
    </Router>
  );
}

export default App;
