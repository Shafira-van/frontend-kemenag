import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NewsLatest.css";
import { API_URL, API_UPLOADS } from "../config";

const NewsLatest = ({ limit = 6, categoryFilter }) => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const url = categoryFilter
          ? `${API_URL}/berita/category/${encodeURIComponent(categoryFilter)}?limit=${limit}`
          : `${API_URL}/berita?limit=${limit}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal memuat berita");

        const data = await res.json();
        const beritaArray = data.data || data;

        if (Array.isArray(beritaArray)) {
          const sorted = [...beritaArray].sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          );
          setNewsList(sorted);
        }
      } catch (err) {
        console.error("❌ Gagal memuat berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [categoryFilter, limit]);

  // 🦴 Skeleton Loading
  if (loading) {
    return (
      <div className="popular-section">
        <h3 className="popular-title">Terkini</h3>
        <ul className="popular-list">
          {Array(5)
            .fill()
            .map((_, index) => (
              <li key={index} className="popular-item skeleton-item">
                <span className="skeleton skeleton-number"></span>
                <div className="skeleton skeleton-thumb"></div>
                <div className="skeleton-info">
                  <div
                    className="skeleton skeleton-line"
                    style={{ width: "80%" }}
                  ></div>
                  <div
                    className="skeleton skeleton-line"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  if (newsList.length === 0) {
    return <p className="text-muted text-center">Tidak ada berita terkini.</p>;
  }

  const popularNews = newsList.slice(1, limit);

  return (
    <div className="popular-section">
      <h3 className="popular-title">Terkini</h3>
      <ul className="popular-list">
        {popularNews.map((item, index) => (
          <li
            key={item.id}
            className="popular-item"
            onClick={() => navigate(`/berita/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            <span className="popular-number">{index + 1}</span>
            <img
              src={`${API_UPLOADS}/uploads/berita/${item.image}`}
              alt={item.title}
              className="popular-thumb"
              onError={(e) => {
                e.target.src = "/fallback.jpg";
              }}
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
