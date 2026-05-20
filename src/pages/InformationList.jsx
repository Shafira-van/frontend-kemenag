import React, { useEffect, useState } from "react";
import "../styles/InformationList.css";

import { API_URL, API_UPLOADS } from "../config";

import { FileText } from "lucide-react";

import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";
import NewsLatest from "../components/NewsLatest";

import { useParams } from "react-router-dom";

const InformationList = () => {
  const [infoList, setInfoList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil parameter type dari URL
  const { type } = useParams();

  // ======================
  // FETCH DATA
  // ======================

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);

        // API FILTER BY TYPE
        const endpoint = type
          ? `${API_URL}/informasi/type/${encodeURIComponent(type)}`
          : `${API_URL}/informasi`;

        console.log("FETCH:", endpoint);

        const res = await fetch(endpoint);

        if (!res.ok) {
          throw new Error("Gagal mengambil data");
        }

        const data = await res.json();

        console.log("DATA:", data);

        setInfoList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gagal memuat informasi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [type]);

  // ======================
  // SKELETON LOADING
  // ======================

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

  // ======================
  // RENDER
  // ======================

  return (
    <>
      <div className="row info-wrapper">
        {/* LEFT CONTENT */}
        <div className="col-md-8">
          {/* TITLE */}
          <div className="text-center mb-3">
            <h2 className="section-title">
              {type === "Setiap Saat"
                ? "Informasi Tersedia Setiap Saat"
                : type
                  ? `Informasi ${decodeURIComponent(type)}`
                  : "Daftar Informasi"}
            </h2>
          </div>

          {/* GRID */}
          <div className="info-grid">
            {loading ? (
              Array(6)
                .fill()
                .map((_, i) => <InfoSkeleton key={i} />)
            ) : infoList.length > 0 ? (
              infoList.map((item) => (
                <div className="info-card" key={item.id}>
                  {/* ICON */}
                  <div className="info-icon">
                    <FileText size={36} strokeWidth={2.2} />
                  </div>

                  {/* CONTENT */}
                  <div className="info-content">
                    {/* TITLE */}
                    <h4 className="info-name">{item.title}</h4>

                    {/* DATE */}
                    <p className="info-date">
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    {/* BUTTON */}
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
              ))
            ) : (
              <div className="text-center py-5">
                <p>Tidak ada data informasi.</p>
              </div>
            )}
          </div>

          {/* NEWS */}
          <NewsSection />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-md-4">
          <NewsLatest />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default InformationList;
