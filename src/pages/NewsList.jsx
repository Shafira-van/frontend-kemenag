import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NewsList.css";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import Footer from "../components/Footer";
import { API_URL, API_UPLOAD } from "../config";
import NewsSection from "../components/NewsSection"

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
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_URL}/berita`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setNewsData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 🔍 Filter berita
  useEffect(() => {
    let filtered = [...newsData];

    if (searchTerm) {
      filtered = filtered.filter((news) =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (category) {
      filtered = filtered.filter((news) => news.category === category);
    }

    if (month) {
      filtered = filtered.filter(
        (news) => new Date(news.date).getMonth() + 1 === parseInt(month),
      );
    }

    if (year) {
      filtered = filtered.filter(
        (news) => new Date(news.date).getFullYear() === parseInt(year),
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, category, month, year, newsData]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (loading) {
    return <p className="loading text-center">Sedang memuat berita...</p>;
  }

  // Ambil daftar kategori unik
  const categories = [
    ...new Set(newsData.map((n) => n.category).filter(Boolean)),
  ];

  return (
    <>
      <div className="row news-main news-list-container">
        <div className="col-md-8">
          <h2 className="section-title text-center">Daftar Berita</h2>

          {/* 🔍 Filter dan Pencarian */}
          <div className="filter-container">
            <input
              type="text"
              className="search-input"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

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

          {/* 📰 Daftar Berita */}
          <div className="news-list">
            {currentItems.map((news) => (
              <div key={news.id} className="news-card">
                <img
                  src={`${API_UPLOAD}/${news.image}`}
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
            ))}
          </div>

          {/* 📄 Pagination */}
          {totalPages > 1 && (
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
