import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 Tambahkan ini
import "../styles/NewsLatest.css";
import { API_URL, API_UPLOAD } from "../config";

const NewsLatest = ({ limit = 6, categoryFilter }) => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate(); // 🔹 Hook untuk pindah halaman

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 🔹 Cek apakah ada filter kategori
        const url = categoryFilter
          ? `${API_URL}/berita/category/${encodeURIComponent(categoryFilter)}`
          : `${API_URL}/berita`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal memuat berita");

        const data = await res.json();

        if (Array.isArray(data)) {
          // 🔹 Urutkan berdasarkan tanggal terbaru
          const sorted = [...data].sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          );
          setNewsList(sorted);
        }
      } catch (err) {
        console.error("Gagal memuat berita:", err);
      }
    };

    fetchNews();
  }, [categoryFilter]); // ← Tambahkan dependency agar refetch jika kategori berubah

  if (newsList.length === 0) return <p>Memuat berita...</p>;

  const popularNews = newsList.slice(1, limit);

  return (
    <div className="popular-section">
      <h3 className="popular-title">Terkini</h3>
      <ul className="popular-list">
        {popularNews.map((item, index) => (
          <li
            key={item.id}
            className="popular-item"
            onClick={() => navigate(`/berita/${item.id}`)} // 🔹 klik => ke halaman detail
            style={{ cursor: "pointer" }} // 🔹 agar terlihat bisa diklik
          >
            <span className="popular-number">{index + 1}</span>
            <img
              src={`${API_UPLOAD}/${item.image}`}
              alt={item.title}
              className="popular-thumb"
            />
            <div className="popular-info">
              <h4 className="popular-headline">{item.title}</h4>
              <p className="popular-date">
                {new Date(item.date).toLocaleDateString("id-ID")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsLatest;
