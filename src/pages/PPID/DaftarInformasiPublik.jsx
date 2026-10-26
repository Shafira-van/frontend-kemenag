
import React, { useEffect, useState } from "react";
import "../../styles/PPID/DaftarInformasiPublik.css";

import { API_URL, API_UPLOADS } from "../../config";
import { FileText, ExternalLink, CalendarDays } from "lucide-react";

import Footer from "../../components/Footer";
import NewsSection from "../../components/NewsSection";
import NewsLatest from "../../components/NewsLatest";
import SurveyBoard from "../../components/SurveyBoard";
import { useParams } from "react-router-dom";

const DaftarInformasiPublik = () => {
  const [infoList, setInfoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { type } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const fetchInfo = async () => {
      try {
        setLoading(true);
        setError("");

        const endpoint = type
          ? `${API_URL}/informasi/type/${encodeURIComponent(type)}`
          : `${API_URL}/informasi`;

        const res = await fetch(endpoint, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data informasi.");
        }

        const data = await res.json();
        setInfoList(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Gagal memuat informasi:", err);
          setError("Informasi belum dapat dimuat. Silakan coba kembali.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchInfo();

    return () => controller.abort();
  }, [type]);

  const formatDate = (date) => {
    if (!date) return "Tanggal tidak tersedia";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Tanggal tidak tersedia";
    }

    return parsedDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDocumentUrl = (filePath) => {
    if (!filePath) return "";

    // Mendukung path file yang disimpan dengan atau tanpa slash awal.
    const normalizedPath = filePath.replace(/^\/+/, "");

    return `${API_UPLOADS.replace(/\/+$/, "")}/${normalizedPath}`;
  };

  const pageTitle =
    type === "Setiap Saat"
      ? "Informasi Tersedia Setiap Saat"
      : type
        ? `Informasi ${type}`
        : "Daftar Informasi Publik";

  const InfoSkeleton = () => (
    <article className="dip-card dip-skeleton-card">
      <div className="dip-card-icon dip-skeleton dip-skeleton-icon" />
      <div className="dip-card-content">
        <div className="dip-skeleton dip-skeleton-title" />
        <div className="dip-skeleton dip-skeleton-line" />
        <div className="dip-skeleton dip-skeleton-button" />
      </div>
    </article>
  );

  return (
    <>
      <main className="daftarInformasiPublik">
        <section className="dip-hero">
          <div className="dip-container">
            {/* HEADER */}
            <header className="dip-heading">
              <h1>
                Daftar <span>{pageTitle}</span>
              </h1>

              <p>
                Temukan dan akses dokumen informasi publik Kantor Kementerian
                Agama Kota Pematangsiantar secara mudah, transparan, dan
                informatif.
              </p>
            </header>

            {/* KONTEN DAN SIDEBAR */}
            <div className="dip-layout">
              <section className="dip-main-content">

                {loading ? (
                  <div className="dip-grid">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InfoSkeleton key={index} />
                    ))}
                  </div>
                ) : error ? (
                  <div className="dip-state dip-error">
                    <FileText size={36} />
                    <h3>Gagal Memuat Informasi</h3>
                    <p>{error}</p>
                    <button
                      type="button"
                      className="dip-retry-button"
                      onClick={() => window.location.reload()}
                    >
                      Muat Ulang
                    </button>
                  </div>
                ) : infoList.length > 0 ? (
                  <div className="dip-grid">
                    {infoList.map((item) => {
                      const documentUrl = getDocumentUrl(item.file_path);

                      return (
                        <article className="dip-card" key={item.id}>
                          <div className="dip-card-icon">
                            <FileText size={30} strokeWidth={1.8} />
                          </div>

                          <div className="dip-card-content">
                            <h3 className="dip-card-title">
                              {item.title || "Dokumen Informasi Publik"}
                            </h3>

                            <p className="dip-card-date">
                              <CalendarDays size={15} />
                              <span>{formatDate(item.date)}</span>
                            </p>

                            {documentUrl ? (
                              <a
                                href={documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dip-document-button"
                              >
                                <span>Buka Dokumen</span>
                                <ExternalLink size={16} />
                              </a>
                            ) : (
                              <span className="dip-document-unavailable">
                                Dokumen belum tersedia
                              </span>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="dip-state">
                    <div className="dip-state-icon">
                      <FileText size={34} />
                    </div>
                    <h3>Belum Ada Dokumen</h3>
                    <p>
                      Saat ini belum ada dokumen informasi publik pada kategori
                      ini.
                    </p>
                  </div>
                )}

                {/* BERITA TERBARU */}
                <div className="dip-news-section">
                  <NewsSection />
                </div>
              </section>

              {/* SIDEBAR */}
              <aside className="dip-sidebar">
                <NewsLatest />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SurveyBoard />
      <Footer />
    </>
  );
};

export default DaftarInformasiPublik;
