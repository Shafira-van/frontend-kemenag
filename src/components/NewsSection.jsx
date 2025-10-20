import React, { useState, useEffect } from "react";
import "../styles/NewsSection.css";
import { API_URL, API_UPLOAD } from "../config";
import { FaEye } from "react-icons/fa";

const NewsSection = ({ categoryFilter }) => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [newsPerPage, setNewsPerPage] = useState(4);
  const [fade, setFade] = useState(false);

  // 📱 Responsif
  useEffect(() => {
    const updateNewsPerPage = () => {
      if (window.innerWidth < 768) setNewsPerPage(1);
      else if (window.innerWidth < 992) setNewsPerPage(2);
      else setNewsPerPage(3);
    };
    updateNewsPerPage();
    window.addEventListener("resize", updateNewsPerPage);
    return () => window.removeEventListener("resize", updateNewsPerPage);
  }, []);

  // 🔹 Fetch berita dari backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 🔹 Tentukan URL API berdasarkan props
        const url = categoryFilter
          ? `${API_URL}/berita/category/${encodeURIComponent(categoryFilter.trim())}`
          : `${API_URL}/berita`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal memuat berita");

        const data = await res.json();

        if (Array.isArray(data)) {
          // 🔹 Urutkan berdasarkan tanggal terbaru
          const sortedByDate = [...data].sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          );

          // 🔹 Ambil berita utama (yang paling baru)
          const mainNews = sortedByDate[0];

          // 🔹 Urutkan berdasarkan view untuk berita populer (kecuali berita utama)
          const sortedByView = [...data]
            .sort((a, b) => b.view - a.view)
            .filter((item) => item.id !== mainNews?.id);

          // 🔹 Ambil maksimal 12 berita populer
          const limitedData = sortedByView.slice(0, 12);

          setNewsData(limitedData);
        }
      } catch (error) {
        console.error("Error memuat data berita:", error);
      }
    };

    fetchNews();
  }, [categoryFilter]);

  if (!newsData || newsData.length === 0) {
    return null; // atau bisa return <></>
  }

  const totalPages = Math.ceil(newsData.length / newsPerPage);

  const changePage = (next) => {
    setFade(true);
    setTimeout(() => {
      setCurrentPage((prev) =>
        next
          ? prev === totalPages - 1
            ? 0
            : prev + 1
          : prev === 0
            ? totalPages - 1
            : prev - 1,
      );
      setFade(false);
    }, 300);
  };

  const handleNext = () => changePage(true);
  const handlePrev = () => changePage(false);

  const startIndex = currentPage * newsPerPage;
  const currentNews = newsData.slice(startIndex, startIndex + newsPerPage);

  return (
    <div className="container news-section">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title text-dark fw-bold mb-0">
          Berita Terpopuler
        </h2>
        <a
          href="/berita"
          className="text-success text-decoration-none fw-semibold"
        >
          Lihat Semua <i className="bi bi-arrow-right"></i>
        </a>
      </div>

      {/* Daftar Berita */}
      <div
        className={`row g-4 fade-container ${fade ? "fade-out" : "fade-in"}`}
      >
        {currentNews.map((news) => (
          <div className="col-sm-6 col-lg-4 col-md-6" key={news.id}>
            <a
              href={`/berita/${news.id}`}
              className="news-card-clean text-decoration-none text-dark"
            >
              <div className="news-img-container">
                <img
                  src={`${API_UPLOAD}/${news.image}`}
                  alt={news.title}
                  className="news-img-clean"
                />
              </div>

              <div className="news-body-clean text-start mt-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <small className="text-muted">
                    {new Date(news.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </small>
                  <small className="text-muted d-flex align-items-center">
                    <FaEye className="me-1" />
                    {news.view || 0}
                  </small>
                </div>
                <h6 className="fw-semibold">{news.title}</h6>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Tombol Navigasi */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <button className="btn-nav" onClick={handlePrev}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <div className="text-muted small">
            {currentPage + 1} / {totalPages}
          </div>
          <button className="btn-nav" onClick={handleNext}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
