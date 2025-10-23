import { useEffect } from "react";
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

// Gambar ketua organisasi
import ketua from "../assets/ketua.png";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-clean container-fluid">
        <div className="hero-content row align-items-center">
          <div className="col-lg-7 hero-text">
            <h1 className="animate-slide">
              Wujudkan Umat yang Taat dan Berakhlak Mulia
            </h1>
            <p className="animate-fade">
              Pelayanan yang cepat, transparan, serta terpercaya di lingkungan Kementerian
              Agama Kota Pematangsiantar.
            </p>
            <Link to="/sejarah">
              <button className="btn btn-success btn-lg animate-fade">
                Selengkapnya
              </button>
            </Link>
          </div>

          <div className="col-lg-5 hero-image animate-zoom">
            <img src={ketua} alt="Ketua Kementerian Agama" />
            <div className="hero-label text-muted">
            <p>Dr. H. Al Ahyu, M.A.</p>
            <p>Kepala Kantor</p></div>
            
          </div>
        </div>
      </section>

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
