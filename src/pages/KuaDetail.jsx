import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/KuaDetail.css";
import { API_URL, API_UPLOADS } from "../config";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";

const KuaDetail = () => {
  const { id } = useParams();
  const [kua, setKua] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/kua/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();

        if (data.socialMedia && typeof data.socialMedia === "string") {
          try {
            data.socialMedia = JSON.parse(data.socialMedia);
          } catch {
            data.socialMedia = null;
          }
        }

        setKua(data);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🦴 Skeleton shimmer mengikuti struktur card
  const KuaSkeleton = () => (
    <div className="card-kua skeleton-card p-4">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line short"></div>
      <div className="skeleton skeleton-line short"></div>
      <div className="skeleton skeleton-social"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="row kua">
        {/* Kolom utama kiri */}
        <div className="container col-md-8 mt-10">
          <KuaSkeleton />
        </div>

        {/* Sidebar kanan */}
        <div className="col-md-4">
          <div className="skeleton skeleton-side"></div>
          <div className="skeleton skeleton-side"></div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="container mt-5 text-danger">Error: {error}</div>;

  if (!kua)
    return (
      <div className="container mt-5 text-center">
        <h4>Data KUA tidak ditemukan</h4>
      </div>
    );

  return (
    <>
      <div className="row kua">
        <div className="container col-md-8 mt-10">
          <div className="card-kua shadow p-4">
            <h2 className="card-title mb-4">{kua.name}</h2>

            {kua.img && (
              <img
                src={`${API_UPLOADS}/${kua.img}`}
                alt={kua.name}
                className="img-fluid mb-3 rounded shadow"
              />
            )}

            <p>
              {kua.desc}
              <br />
              <strong>Alamat:</strong> {kua.address}
              <br />
              <strong>Telepon:</strong> {kua.phone}
            </p>

            {kua.socialMedia && (
              <div className="social-icons mt-3">
                {kua.socialMedia.instagram && (
                  <a
                    href={kua.socialMedia.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="icon instagram"
                    title="Instagram"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                )}
                {kua.socialMedia.facebook && (
                  <a
                    href={kua.socialMedia.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="icon facebook"
                    title="Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                )}
                {kua.socialMedia.whatsapp && (
                  <a
                    href={kua.socialMedia.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="icon whatsapp"
                    title="WhatsApp"
                  >
                    <i className="bi bi-whatsapp"></i>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Berita terkait */}
          <NewsSection categoryFilter="Bimas Islam" />
        </div>

        {/* Sidebar kanan */}
        <div className="col-md-4">
          <NewsLatest />
          <InfoBoard />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default KuaDetail;
