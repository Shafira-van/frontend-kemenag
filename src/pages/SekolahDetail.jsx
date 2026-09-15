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
import { API_URL, API_UPLOADS } from "../config";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";
import SurveyBoard from "../components/SurveyBoard";
import "../styles/SekolahDetail.css";

export default function SekolahDetail() { 
  
  const { id } = useParams();
  const [sekolah, setSekolah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/sekolah/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();

        if (data.sosMed && typeof data.sosMed === "string") {
          try {
            data.sosMed = JSON.parse(data.sosMed);
          } catch {
            data.sosMed= null;
          }
        }

        setSekolah(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
      console.log(id)
    };

    fetchData();
  }, [id]);

  // 🦴 Skeleton shimmer mengikuti struktur card
  const SekolahSkeleton = () => (
    <div className="card-sekolah skeleton-card p-4">
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
      <div className="row sekolah">
        {/* Kolom utama kiri */}
        <div className="container col-md-8 mt-10">
          <SekolahSkeleton />
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

  if (!sekolah)
    return (
      <div className="container mt-5 text-center">
        <h4>Data sekolah tidak ditemukan</h4>
      </div>
    );

  return (
    <>
      <div className="row sekolah">
        <div className="container col-md-8 mt-10">
          <div className="card-sekolah shadow p-4">
            <h2 className="card-title mb-4">{sekolah.nama}</h2>
            <div className="sekolah-info-img">
              {sekolah.gambar && (
                <img
                  src={`${API_UPLOADS}/${sekolah.gambar}`}
                  alt={sekolah.nama}
                  className="img-fluid mb-3 rounded shadow"
                />
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: sekolah.deskripsi }}></div>

            <div className="sekolah-sosmed mt-4">
              <h5>Hubungi Kami</h5>
              <div className="sekolah-info-card">
                {/* Telepon */}
                <div className="sekolah-info-item">
                  <div className="sekolah-info-icon">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h6>Telepon</h6>
                    <p>{sekolah.telepon || "Belum tersedia"}</p>
                  </div>
                </div>

                {/* Sosial Media */}
                <div className="sekolah-info-item">
                  <div className="sekolah-info-icon">
                    <FaEnvelope />
                  </div>

                  <div>
                    <h6>Sosial Media</h6>
                    <div className="social-icons">
                      {sekolah.sosMed?.instagram && (
                        <a
                          href={sekolah.sosMed.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="instagram"
                        >
                          <i className="bi bi-instagram"></i>
                        </a>
                      )}

                      {sekolah.sosMed?.facebook && (
                        <a
                          href={sekolah.sosMed.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="facebook"
                        >
                          <i className="bi bi-facebook"></i>
                        </a>
                      )}

                      {sekolah.sosMed?.whatsapp && (
                        <a
                          href={sekolah.sosMed.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="whatsapp"
                        >
                          <i className="bi bi-whatsapp"></i>
                        </a>
                      )}

                      {!sekolah.sosMed?.instagram &&
                        !sekolah.sosMed?.facebook &&
                        !sekolah.sosMed?.whatsapp && (
                          <p className="mb-0 text-muted">Belum tersedia</p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {sekolah?.map &&
              sekolah.map.startsWith("https://www.google.com/maps/embed") && (
                <div className="sekolah-map mt-4">
                  <h5>Lokasi Kami</h5>

                  <div className="map-container">
                    <iframe
                      title="Lokasi KUA"
                      src={sekolah.map}
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
          <NewsSection categoryFilter={sekolah.id_satker} />
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
