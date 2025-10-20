import React, { useEffect, useState } from "react";
import "../styles/InformationList.css";
import { API_URL } from "../config";
import { FileText } from "lucide-react"; // 🔹 ikon PDF elegan
import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";
import NewsLatest from "../components/NewsLatest";
import NewsPage from "../components/NewsPage";
import InfoBoard from "../components/InfoBoard";
const InformationList = () => {
  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${API_URL}/informasi`);
        const data = await res.json();
        if (Array.isArray(data)) setInfoList(data);
      } catch (err) {
        console.error("Gagal memuat informasi:", err);
      }
    };
    fetchInfo();
  }, []);

  if (infoList.length === 0)
    return <p className="loading-info">Memuat informasi...</p>;

  return (
    <>
    <div className="row info-wrapper">
      {/* Kiri: Daftar Informasi */}
      <div className="col-md-8">
        <div className="text-center mb-3">
          <h2 className="section-title">Daftar Informasi</h2>
        </div>

        <div className="info-grid">
          {infoList.map((item) => (
            <div className="info-card" key={item.id}>
              <div className="info-icon">
                <FileText size={36} strokeWidth={2.2} />
              </div>
              <div className="info-content">
                <h4 className="info-name">{item.title}</h4>
                <p className="info-date">
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <button
                  className="info-button"
                  onClick={() =>
                    window.open(
                      `http://localhost:3000/${item.file_path}`,
                      "_blank",
                    )
                  }
                >
                  Buka Dokumen
                </button>
              </div>
            </div>
          ))}
        </div>
        <NewsSection />
      </div>

      {/* Kanan: Berita Terbaru */}
      <div className="col-md-4">
        <NewsLatest />
      </div>
      
    </div>
    <Footer/></>
  );
};

export default InformationList;
