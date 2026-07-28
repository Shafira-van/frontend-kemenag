import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkedAlt,
  FaDirections,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/KuaDetail.css";
import { API_URL, API_UPLOADS } from "../config";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";
import SurveyBoard from "../components/SurveyBoard";

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
            <div className="kua-info-img">
              {kua.img && (
                <img
                  src={`${API_UPLOADS}/${kua.img}`}
                  alt={kua.name}
                  className="img-fluid mb-3 rounded shadow"
                />
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: kua.desc }}></div>

            <div className="kua-sosmed mt-4">
              <h5>Hubungi Kami</h5>
              <div className="kua-info-card">
                {/* Telepon */}
                <div className="kua-info-item">
                  <div className="kua-info-icon">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h6>Telepon</h6>
                    <p>{kua.phone || "Belum tersedia"}</p>
                  </div>
                </div>

                {/* Sosial Media */}
                <div className="kua-info-item">
                  <div className="kua-info-icon">
                    <FaEnvelope />
                  </div>

                  <div>
                    <h6>Sosial Media</h6>
                    <div className="social-icons">
                      {kua.socialMedia?.instagram && (
                        <a
                          href={kua.socialMedia.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="instagram"
                        >
                          <i className="bi bi-instagram"></i>
                        </a>
                      )}

                      {kua.socialMedia?.facebook && (
                        <a
                          href={kua.socialMedia.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="facebook"
                        >
                          <i className="bi bi-facebook"></i>
                        </a>
                      )}

                      {kua.socialMedia?.whatsapp && (
                        <a
                          href={kua.socialMedia.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="whatsapp"
                        >
                          <i className="bi bi-whatsapp"></i>
                        </a>
                      )}

                      {!kua.socialMedia?.instagram &&
                        !kua.socialMedia?.facebook &&
                        !kua.socialMedia?.whatsapp && (
                          <p className="mb-0 text-muted">Belum tersedia</p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {kua?.address &&
              kua.address.startsWith("https://www.google.com/maps/embed") && (
                <div className="kua-map mt-4">
                  <h5>Lokasi Kami</h5>

                  <div className="map-container">
                    <iframe
                      title="Lokasi KUA"
                      src={kua.address}
                      width="100%"
                      height="160"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}
          </div>

          {/* Berita terkait */}
          <NewsSection categoryFilter={kua.id_satker} />
        </div>

        {/* Sidebar kanan */}
        <div className="col-md-4">
          <NewsLatest />
          <InfoBoard />
          <SurveyBoard />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default KuaDetail;
