import React, { useEffect, useState } from "react";
import "../styles/NewsPage.css";
import { API_URL, API_UPLOADS } from "../config";
import { useNavigate } from "react-router-dom";

const NewsPage = ({ categoryFilter }) => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate(); // ✅ untuk navigasi ke halaman detail

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 🔹 Tentukan URL API berdasarkan kategori
        const url = categoryFilter
          ? `${API_URL}/berita/category/${encodeURIComponent(categoryFilter)}`
          : `${API_URL}/berita`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal memuat berita");

        const data = await res.json();

        if (Array.isArray(data)) {
          // 🔹 Urutkan berdasarkan tanggal terbaru
          const sorted = data.sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          );
          setNewsList(sorted);
        }
      } catch (err) {
        console.error("Gagal memuat berita:", err);
      }
    };

    fetchNews();
  }, [categoryFilter]); // depend on categoryFilter agar update otomatis

  if (!newsList || newsList.length === 0) {
    return null; // atau bisa return <></>
  }

  // 🔹 Berita utama (paling baru)
  const mainNews = newsList[0];

  const handleClick = () => {
    navigate(`/berita/${mainNews.id}`);
  };

  return (
    <div className="news-page container">
      {/* 🔸 Berita Utama */}
      <div
        className="main-news mb-4"
        onClick={handleClick}
        style={{ cursor: "pointer" }} // agar terasa bisa diklik
      >
        <img
          src={`${API_UPLOADS}/${mainNews.image}`}
          alt={mainNews.title}
          className="main-news-image"
        />
        <div className="main-news-overlay">
          <p className="main-news-category">
            {mainNews.category || "Berita Utama"}
          </p>
          <h2 className="main-news-title">{mainNews.title}</h2>
          <p className="main-news-date">
            {new Date(mainNews.date).toLocaleDateString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
