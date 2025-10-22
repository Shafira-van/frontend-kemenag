import React, { useEffect, useState } from "react";
import "../styles/InformationList.css";
import { API_URL, API_UPLOADS } from "../config";
import { FileText } from "lucide-react";
import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";
import NewsLatest from "../components/NewsLatest";

const InformationList = () => {
  const [infoList, setInfoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/informasi`);
        const data = await res.json();
        if (Array.isArray(data)) setInfoList(data);
      } catch (err) {
        console.error("Gagal memuat informasi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  // 🦴 Skeleton shimmer mengikuti layout info-card
  const InfoSkeleton = () => (
    <div className="info-card skeleton-card">
      <div className="info-icon skeleton skeleton-icon"></div>
      <div className="info-content">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="row info-wrapper">
        {/* Kiri: daftar informasi */}
        <div className="col-md-8">
          <div className="text-center mb-3">
            <h2 className="section-title">Daftar Informasi</h2>
          </div>

          <div className="info-grid">
            {loading
              ? Array(6)
                  .fill()
                  .map((_, i) => <InfoSkeleton key={i} />)
              : infoList.map((item) => (
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
                            `${API_UPLOADS}/${item.file_path}`,
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

        {/* Kanan: berita terkini */}
        <div className="col-md-4">
          <NewsLatest />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default InformationList;
