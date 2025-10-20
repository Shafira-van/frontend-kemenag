import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/AboutSatker.css";
import InfografisASN from "../components/Infografis";
import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import NewsPage from "../components/NewsPage";
import InfografisCarousel from "../components/InfografisCarousel";
import { API_URL } from "../config";
import KuaSection from "../components/KuaSection";

function AboutSatker() {
  const { id } = useParams();
  const [satker, setSatker] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data satuan kerja berdasarkan ID
  useEffect(() => {
    const fetchSatker = async () => {
      try {
        const response = await fetch(`${API_URL}/satuankerja/${id}`);
        const data = await response.json();
        setSatker(data);
      } catch (error) {
        console.error("Gagal memuat data satuan kerja:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSatker();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Memuat data satuan kerja...</p>
      </div>
    );
  }

  if (!satker) {
    return (
      <div className="text-center py-5">
        <h3>Data tidak ditemukan</h3>
      </div>
    );
  }

  return (
    <>
      <div className="row satker">
        <div className="col-md-8">
          <div className="about-satker-page">
            <h1 className="section-title text-center">{satker.nama}</h1>

            <div className="about-section">
              <h2>Tugas</h2>
              <div
                className="about-card"
                dangerouslySetInnerHTML={{ __html: satker.tugas }}
              ></div>
            </div>

            <div className="about-section">
              <h2>Fungsi</h2>
              <div
                className="about-card"
                dangerouslySetInnerHTML={{ __html: satker.fungsi }}
              ></div>
            </div>

            {satker.singkatan === "Sekjend" && <InfografisASN />}
            {satker.singkatan === "Bimas Islam" && <KuaSection />}

            {/* 🔹 Tambahan komponen berita dan infografis */}
            <NewsPage categoryFilter={satker.singkatan} />
            <NewsSection categoryFilter={satker.singkatan} />
            <InfografisCarousel />
          </div>
        </div>

        <div className="col-md-4">
          <div className="news-section-container">
            <NewsLatest />
            <InfoBoard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutSatker;
