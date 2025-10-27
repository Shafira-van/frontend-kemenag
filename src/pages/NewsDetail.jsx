import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/NewsDetail.css";
import { API_URL, API_UPLOADS } from "../config";
import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import { FaEye } from "react-icons/fa";

const NewsDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Ambil detail berita (backend otomatis naikkan view)
        const res = await fetch(`${API_URL}/berita/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setItem(data);

        // 🔹 Tandai berita sudah dilihat (untuk trigger refresh di NewsList)
        localStorage.setItem("newsViewed", id);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="loading text-center">Sedang memuat data...</p>;
  }

  if (!item) {
    return <p className="text-center mt-5">Berita tidak ditemukan.</p>;
  }

  return (
    <>
      <div className="row news-detail-card">
        <div className="col-md-8">
          <article className="news-detail-container">
            <img
              src={`${API_UPLOADS}/uploads/berita/${item.image}`}
              alt={item.title}
              className="news-detail-image"
            />

            <div className="news-detail-content">
              <h1 className="news-detail-title">{item.title}</h1>

              {/* ✅ Kategori berita */}
              {item.category && (
                <span className="news-category-badge">{item.category}</span>
              )}

              <p className="news-detail-date d-flex align-items-center gap-3 text-muted">
                <span className="d-flex align-items-center gap-1">
                  <i className="bi bi-calendar"></i>
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>

                <span className="separator">•</span>

                <span className="d-flex align-items-center gap-1">
                  <FaEye />
                  {item.view || 0}
                </span>
              </p>

              <div
                className="news-detail-body"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>

              <div className="news-back-wrapper">
                <Link to="/berita" className="back-link">
                  ← Kembali ke daftar berita
                </Link>
              </div>
            </div>
          </article>
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

export default NewsDetail;
