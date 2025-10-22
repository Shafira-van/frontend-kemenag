import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NewsList.css";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import Footer from "../components/Footer";
import { API_URL, API_UPLOADS } from "../config";
import NewsSection from "../components/NewsSection";

const stripHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  const categories = [
    "Bimas Islam",
    "Sekretariat Jenderal",
    "Bimas Kristen",
    "Pendidikan",
    "Penyelenggara Katolik",
    "Penyelenggara Buddha",
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        let url = `${API_URL}/berita?page=${currentPage}&limit=${itemsPerPage}`;
        if (category) {
          url = `${API_URL}/berita/category/${category.toLowerCase()}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal mengambil data berita");
        const data = await res.json();

        const berita = Array.isArray(data) ? data : data.data || [];
        setNewsData(berita);
        setFilteredData(berita);

        if (!category && data.total) {
          setTotalPages(Math.ceil(data.total / itemsPerPage));
        } else {
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [currentPage, category]);

  useEffect(() => {
    let filtered = [...newsData];
    if (searchTerm)
      filtered = filtered.filter((n) =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    if (month)
      filtered = filtered.filter(
        (n) => new Date(n.date).getMonth() + 1 === parseInt(month),
      );
    if (year)
      filtered = filtered.filter(
        (n) => new Date(n.date).getFullYear() === parseInt(year),
      );
    setFilteredData(filtered);
  }, [searchTerm, month, year, newsData]);

  // ============================
  // 🦴 SKELETON COMPONENT DALAM FILE INI
  // ============================
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

  // ============================
  // 📰 HALAMAN BERITA
  // ============================
  return (
    <>
      <div className="row news-main news-list-container">
        {/* Kolom kiri: daftar berita */}
        <div className="col-md-8">
          <h2 className="section-title text-center">Daftar Berita</h2>

          {/* Filter & pencarian */}
          <div className="filter-container">
            <input
              type="text"
              className="search-input"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="findBy">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Bulan</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
                  </option>
                ))}
              </select>

              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Tahun</option>
                {[2023, 2024, 2025].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Daftar berita / skeleton */}
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

          {!category && totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          <NewsSection />
        </div>

        {/* Kolom kanan: berita terkini & info */}
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
