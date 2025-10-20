import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/KuaDetail.css";
import { API_URL } from "../config";
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
        const res = await fetch(`${API_URL}/kua/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();

        // 🧩 Cek apakah socialMedia berupa string JSON
        if (data.socialMedia) {
          if (typeof data.socialMedia === "string") {
            try {
              data.socialMedia = JSON.parse(data.socialMedia);
            } catch (err) {
              console.warn("Gagal parse socialMedia JSON:", err);
              data.socialMedia = null;
            }
          }
        }

        console.log("Data dari API:", data); // 👉 untuk debugging
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

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5">Error: {error}</div>;
  if (!kua) return <div className="container mt-5">KUA tidak ditemukan</div>;

  return (
    <>
      <div className="row kua">
        <div className="container col-md-8 mt-10">
          <div className="card-kua shadow p-4">
            <h2 className="card-title mb-6">{kua.name}</h2>

            {/* 🖼️ Gambar KUA */}
            {kua.img && (
              <img
                src={`http://localhost:3000/${kua.img}`}
                alt={kua.name}
                className="img-fluid mb-3 rounded shadow"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}

            {/* 📋 Deskripsi dan Kontak */}
            <p>
              {kua.desc}
              <br />
              <strong>Alamat:</strong> {kua.address}
              <br />
              <strong>Telepon:</strong> {kua.phone}
            </p>

            {/* 🌐 Social Media */}
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

          {/* 📰 Berita Terkait */}
          <NewsSection categoryFilter="Bimas Islam" />
        </div>

        {/* 🧾 Sidebar */}
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
