import React, { useEffect, useState } from "react";
import "../styles/NewsPage.css";
import { API_URL, API_UPLOADS } from "../config";
import { useNavigate } from "react-router-dom";

const NewsPage = ({ categoryFilter }) => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 🔹 Tentukan endpoint berdasarkan apakah ada kategori atau tidak
        const url = categoryFilter
          ? `${API_URL}/berita/category/${encodeURIComponent(categoryFilter)}?page=1&limit=6`
          : `${API_URL}/berita?page=1&limit=6`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal memuat berita");

        const result = await res.json();

        // 🔹 Controller baru mengembalikan data di dalam result.data
        const data = result.data || [];

        if (Array.isArray(data)) {
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
  }, [categoryFilter]);

  if (!newsList || newsList.length === 0) {
    return null; // bisa juga tampilkan loading indicator
  }

  // 🔹 Berita utama = berita terbaru
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
        style={{ cursor: "pointer" }}
      >
        <img
          src={`${API_UPLOADS}/uploads/berita/${mainNews.image}`}
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
