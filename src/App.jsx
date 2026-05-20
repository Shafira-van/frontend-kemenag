import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Sejarah from "./pages/Sejarah";
import KepalaKantor from "./pages/KepalaKantor";
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
import PPIDProfil from "./pages/PPID/ProfilPPID";
import PPIDTugasFungsi from "./pages/PPID/TugasFungsi";
import PPIDVisiMisi from "./pages/PPID/VisiMisi";
import DaftarInformasiPublik from "./pages/PPID/DaftarInformasiPublik";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="/kepala-kantor" element={<KepalaKantor />} />
        <Route path="/sejarah" element={<Sejarah />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/berita" element={<NewsList />} />
        <Route path="/berita/:id" element={<NewsDetail />} />
        <Route path="/bimas-islam/kua/:id" element={<KuaDetail />} />
        <Route path="/informasi" element={<InformationList />} />
        <Route path="/informasi/:type" element={<InformationList />} />
        <Route path="/satuankerja/:id" element={<AboutSatker />} />
        <Route
          path="/daftarinformasipublik"
          element={<DaftarInformasiPublik />}
        />
        <Route path="/profilppid" element={<PPIDProfil />} />
        <Route path="/tugasfungsippid" element={<PPIDTugasFungsi />} />
        <Route path="/visimisippid" element={<PPIDVisiMisi />} />
      </Routes>
    </Router>
  );
}

export default App;
