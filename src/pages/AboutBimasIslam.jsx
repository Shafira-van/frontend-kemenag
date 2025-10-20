import React, { useState, useEffect } from "react";
import "../styles/AboutSatker.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";
import NewsLatest from "../components/NewsLatest";
import NewsPage from "../components/NewsPage";
import InfoBoard from "../components/InfoBoard";
import { API_URL } from "../config";

function AboutBimasIslam() {
  const [kuaList, setKuaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKuaList = async () => {
      try {
        const response = await fetch(`${API_URL}/kua`);
        if (!response.ok) throw new Error("Gagal mengambil data KUA");
        const data = await response.json();
        setKuaList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKuaList();
  }, []);

  // if (loading) return <p className="loading">Memuat data KUA...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="about-sekjen-page">
            <h1 className="section-title text-center">
              Tentang Bimbingan Masyarakat Islam
            </h1>

            <div className="about-section">
              <h2>Tugas</h2>
              <div className="about-card">
                <p>
                  Bimbingan Masyarakat Islam bertugas memberikan pelayanan
                  administrasi keagamaan, pembinaan umat, serta konsultasi
                  keluarga dan pernikahan.
                </p>
              </div>
            </div>

            <div className="about-section">
              <h2>Fungsi</h2>
              <div className="about-card">
                <ul>
                  <li>Pembinaan masyarakat Islam</li>
                  <li>Pelayanan pencatatan pernikahan</li>
                  <li>Konsultasi keluarga dan zakat</li>
                  <li>Pendidikan agama dan penyuluhan</li>
                </ul>
              </div>
            </div>

            <p className="bimas-subtitle">
              Bimas Islam menaungi {kuaList.length} KUA di wilayah Kota
              Pematangsiantar.
            </p>

            <div className="kua-grid four-cols">
              {kuaList.slice(0, 7).map((kua) => (
                <div key={kua.id} className="kua-card">
                  <h3>{kua.name}</h3>
                  <Link
                    to={`/bimas-islam/kua/${kua.id}`}
                    className="btn-detail"
                  >
                    Lihat Detail
                  </Link>
                </div>
              ))}
            </div>
          </div><NewsPage categoryFilter="Bimas Islam" />
            <NewsSection categoryFilter="Bimas Islam" />
        </div>
        <div className="col-md-4">
          <NewsLatest />
          <InfoBoard />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutBimasIslam;
