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
import heroImg from "../assets/becaksiantar.png";
import islam from "../assets/islam.png";
import kristen from "../assets/kristen.png";
import hindu from "../assets/hindu.png";
import buddha from "../assets/buddha.png";
import katolik from "../assets/katolik.png";
// import konghucu from "../assets/konghucu.png";
import { Link } from "react-router-dom";
import InfografisASN from "../components/Infografis";

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  const agamaImages = [islam, kristen, buddha, katolik, hindu];

  useEffect(() => {
    const heroText = document.querySelector(".hero-text");
    heroText.classList.add("fade-in");

    const interval = setInterval(() => {
      // fade out dulu
      setFade(false);

      setTimeout(() => {
        // ganti gambar setelah fade out
        setCurrentImage((prev) => (prev + 1) % agamaImages.length);
        // lalu fade in lagi
        setFade(true);
      }, 500); // waktu transisi setengah detik
    }, 3000); // ganti setiap 3 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div className="hero row align-items-center">
        <div className="col-md-6 hero-text">
          {/* SLIDE OTOMATIS DENGAN ANIMASI */}
          <h1 className="fw-bold">
            Wujudkan Umat yang Taat dan Berakhlak Mulia
          </h1>
          <p className="lead">
            Pelayanan yang cepat,
            transparan, dan terpercaya di lingkungan Kota Pematangsiantar.
          </p>
          <div className="agama text-center">
            <img
              src={agamaImages[currentImage]}
              alt="Agama"
              className={`agama-img ${fade ? "fade-in" : "fade-out"}`}
            />
          </div>
          <Link to="/sejarah">
            <button className="btn btn-success btn-lg">Selengkapnya</button>
          </Link>
        </div>

        <div className="col-md-6">
          <img src={heroImg} className="img-fluid" alt="Hero" />
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
