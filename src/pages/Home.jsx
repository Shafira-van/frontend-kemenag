import { useEffect, useState } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsPage from "../components/NewsPage";
import NewsSection from "../components/NewsSection";
import NewsLatest from "../components/NewsLatest";
import MenuSection from "../components/MenuSection";
import InfoBoard from "../components/InfoBoard";
import InfografisCarousel from "../components/InfografisCarousel";
import InfografisASN from "../components/Infografis";
import { Link } from "react-router-dom";

// Gambar-gambar tempat ibadah (bisa kamu ganti sendiri)
import islam from "../assets/islam.png";
import kristen from "../assets/kristen.png";
import hindu from "../assets/hindu.png";
import buddha from "../assets/buddha.png";
import katolik from "../assets/katolik.png";

function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  // Array gambar tempat ibadah (pastikan file-nya ada)
  const backgroundImages = [islam, kristen, buddha, katolik, hindu];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // ganti setiap 4 detik
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <>
      <Navbar />

      <div
        className="hero row align-items-center"
        style={{
          backgroundImage: `url(${backgroundImages[currentImage]})`,
        }}
      >
        <div className="hero-text">
          <h1>Wujudkan Umat yang Taat dan Berakhlak Mulia</h1>
          <p>
            Pelayanan yang cepat, transparan, dan terpercaya di lingkungan Kota
            Pematangsiantar.
          </p>

          <Link to="/sejarah">
            <button className="btn btn-success btn-lg">Selengkapnya</button>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <NewsPage />
          <MenuSection />
          <NewsSection />
          <InfografisASN />
          <InfografisCarousel />
        </div>
        <div className="col-md-4">
          <NewsLatest limit={11} />
          <InfoBoard />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
