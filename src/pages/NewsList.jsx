import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/NewsList.css";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import Footer from "../components/Footer";
import { API_URL, API_UPLOADS } from "../config";
import NewsSection from "../components/NewsSection";

/* ============================================================
   🧹 Utility: Hapus tag HTML
============================================================ */
const stripHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [satkerList, setSatkerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSatker, setSelectedSatker] = useState(""); // id_satker yang dipilih
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalData / itemsPerPage) || 1;

  /* ============================================================
     📡 Fetch semua satker + KUA untuk dropdown kategori
  ============================================================ */
  useEffect(() => {
    const fetchSatker = async () => {
      try {
        const res = await fetch(`${API_URL}/satuankerja/satker/all`);
        const data = await res.json();
        setSatkerList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching satker:", err);
      }
    };
    fetchSatker();
  }, []);

  /* ============================================================
     📡 Fetch berita dari API
  ============================================================ */
  const fetchNews = async (page = currentPage) => {
    try {
      setLoading(true);

      let url = `${API_URL}/berita?page=${page}&limit=${itemsPerPage}`;
      if (selectedSatker) url += `&id_satker=${selectedSatker}`;
      if (month) url += `&month=${month}`;
      if (year) url += `&year=${year}`;

      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      const berita = Array.isArray(data) ? data : data.data || [];
      setNewsData(berita);
      setFilteredData(berita);
      setTotalData(data.total || berita.length);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     🚀 Fetch saat page / filter berubah
  ============================================================ */
  useEffect(() => {
    fetchNews(currentPage);

    const viewedId = localStorage.getItem("newsViewed");
    if (viewedId) {
      localStorage.removeItem("newsViewed");
      fetchNews(currentPage);
    }

    const handlePopState = () => {
      if (window.location.pathname === "/berita") fetchNews(currentPage);
    };
    const handleFocus = () => {
      if (window.location.pathname === "/berita") fetchNews(currentPage);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("focus", handleFocus);
    };
  }, [currentPage, selectedSatker, month, year, location.pathname]);

  /* ============================================================
     🔄 Reset halaman saat filter berubah
  ============================================================ */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSatker, month, year]);

  /* ============================================================
     ⬆️ Auto scroll ke atas tiap ganti halaman/filter
  ============================================================ */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, selectedSatker, month, year]);

  /* ============================================================
     🔍 Filter lokal berdasarkan search term saja
     (month & year sudah di-handle di API)
  ============================================================ */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(newsData);
      return;
    }
    const keyword = searchTerm.toLowerCase();
    setFilteredData(
      newsData.filter((n) => n.title.toLowerCase().includes(keyword)),
    );
  }, [searchTerm, newsData]);

  /* ============================================================
     📄 Generate nomor halaman dengan ellipsis
  ============================================================ */
  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter(
        (page) =>
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1),
      )
      .reduce((acc, page, idx, arr) => {
        if (idx > 0 && page - arr[idx - 1] > 1) acc.push("...");
        acc.push(page);
        return acc;
      }, []);
  };

  /* ============================================================
     💀 Skeleton Loader
  ============================================================ */
  const NewsSkeleton = () => (
    <div className="news-card skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="news-content">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line short"></div>
        <div className="skeleton skeleton-line short"></div>
      </div>
    </div>
  );

  /* ============================================================
     🧩 Render
  ============================================================ */
  return (
    <>
      <div className="row news-main news-list-container">
        {/* ================= KIRI: Daftar Berita ================= */}
        <div className="col-md-8">
          <h2 className="section-title text-center">Daftar Berita</h2>

          {/* 🔎 Filter & Pencarian */}
          <div className="filter-container">
            <input
              type="text"
              className="search-input"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="findBy">
              {/* Kategori / Satuan Kerja */}
              <select
                value={selectedSatker}
                onChange={(e) => {
                  setSelectedSatker(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Semua Kategori</option>
                {satkerList.map((s) => (
                  <option key={s.id_satker} value={s.id_satker}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* Bulan */}
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Bulan</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
                  </option>
                ))}
              </select>

              {/* Tahun */}
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Tahun</option>
                {[2023, 2024, 2025, 2026].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 📰 Daftar Berita */}
          <div className="news-list">
            {loading ? (
              Array(6)
                .fill()
                .map((_, i) => <NewsSkeleton key={i} />)
            ) : filteredData.length === 0 ? (
              <p className="text-center">Tidak ada berita ditemukan.</p>
            ) : (
              filteredData.map((news) => (
                <div key={news.id} className="news-card">
                  <img
                    src={`${API_UPLOADS}/uploads/berita/${news.image}`}
                    alt={news.title}
                    className="news-image"
                  />
                  <div className="news-content">
                    <p className="news-category">{news.category}</p>
                    <h3 className="news-title">{news.title}</h3>

                    <div className="news-meta">
                      <p className="news-date">
                        {new Date(news.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <span className="news-views">
                        <i className="bi bi-eye"></i> {news.view || 0}
                      </span>
                    </div>

                    <p className="news-description">
                      {stripHTML(news.content).length > 150
                        ? stripHTML(news.content).substring(0, 150) + "..."
                        : stripHTML(news.content)}
                    </p>

                    <Link to={`/berita/${news.id}`} className="read-more">
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 📄 Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {/* Prev */}
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>

              {/* Nomor halaman dengan ellipsis */}
              {getPageNumbers().map((item, idx) =>
                item === "..." ? (
                  <span key={`ellipsis-${idx}`} className="page-ellipsis">
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    className={`page-btn ${currentPage === item ? "active" : ""}`}
                    onClick={() => setCurrentPage(item)}
                  >
                    {item}
                  </button>
                ),
              )}

              {/* Next */}
              <button
                className="page-btn"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </div>
          )}

          {/* Info total */}
          {!loading && totalData > 0 && (
            <p className="pagination-info text-center">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, totalData)} dari {totalData}{" "}
              berita
            </p>
          )}

          <NewsSection />
        </div>

        {/* ================= KANAN: Berita Terbaru & Info ================= */}
        <div className="col-md-4">
          <NewsLatest limit={11} />
          <InfoBoard />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NewsList;
