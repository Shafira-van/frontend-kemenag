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

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ============================================================
// ICON MARKER LEAFLET
// ============================================================
const locationIcon = L.divIcon({
  className: "custom-map-marker",
  html: '<div style="font-size:32px;line-height:32px;">📍</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// ============================================================
// AMBIL KOORDINAT DARI URL GOOGLE MAPS
// Mendukung:
// https://www.google.com/maps?q=2.9595,99.0687
// https://www.google.com/maps/@2.9595,99.0687,17z
// ============================================================
const extractCoordinatesFromMap = (mapValue) => {
  if (!mapValue || typeof mapValue !== "string") {
    return null;
  }

  const value = mapValue.trim();

  if (!value) {
    return null;
  }

  // Format:
  // ?q=2.9595,99.0687
  const qMatch = value.match(/[?&]q=(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);

  if (qMatch) {
    const lat = Number(qMatch[1]);
    const lng = Number(qMatch[2]);

    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      return { lat, lng };
    }
  }

  // Format:
  // /@2.9595,99.0687,17z
  const atMatch = value.match(/@(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);

  if (atMatch) {
    const lat = Number(atMatch[1]);
    const lng = Number(atMatch[2]);

    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      return { lat, lng };
    }
  }

  // Fallback:
  // mencari pasangan koordinat di dalam string
  const coordinateMatch = value.match(
    /(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/,
  );

  if (coordinateMatch) {
    const lat = Number(coordinateMatch[1]);
    const lng = Number(coordinateMatch[2]);

    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      return { lat, lng };
    }
  }

  return null;
};

export default function SekolahDetail() {
  const { id } = useParams();

  const [sekolah, setSekolah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================================
  // FETCH DATA SEKOLAH
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/sekolah/${id}`);

        if (!res.ok) {
          throw new Error("Gagal mengambil data");
        }

        const data = await res.json();

        // Parse sosial media
        if (data.sosMed && typeof data.sosMed === "string") {
          try {
            data.sosMed = JSON.parse(data.sosMed);
          } catch {
            data.sosMed = null;
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

      console.log(id);
    };

    fetchData();
  }, [id]);

  // ============================================================
  // SKELETON
  // ============================================================
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

  // ============================================================
  // LOADING
  // ============================================================
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

  // ============================================================
  // ERROR
  // ============================================================
  if (error) {
    return <div className="container mt-5 text-danger">Error: {error}</div>;
  }

  // ============================================================
  // DATA TIDAK DITEMUKAN
  // ============================================================
  if (!sekolah) {
    return (
      <div className="container mt-5 text-center">
        <h4>Data sekolah tidak ditemukan</h4>
      </div>
    );
  }

  // ============================================================
  // KOORDINAT MAP
  // ============================================================
  const coordinates = extractCoordinatesFromMap(sekolah.map);

  const hasMapLocation = !!coordinates;

  const googleMapsUrl = coordinates
    ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
    : "";

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      <div className="row sekolah">
        {/* ======================================================
            KOLOM UTAMA
        ====================================================== */}
        <div className="container col-md-8 mt-10">
          <div className="card-sekolah shadow p-4">
            {/* Judul */}
            <h2 className="card-title mb-4">{sekolah.nama}</h2>

            {/* Gambar */}
            <div className="sekolah-info-img">
              {sekolah.gambar && (
                <img
                  src={`${API_UPLOADS}/${sekolah.gambar}`}
                  alt={sekolah.nama}
                  className="img-fluid mb-3 rounded shadow"
                />
              )}
            </div>

            {/* Deskripsi */}
            <div
              dangerouslySetInnerHTML={{
                __html: sekolah.deskripsi,
              }}
            ></div>

            {/* ==================================================
                HUBUNGI KAMI
            ================================================== */}
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
                      {/* Instagram */}
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

                      {/* Facebook */}
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

                      {/* WhatsApp */}
                      {sekolah.sosMed?.whatsapp && (
                        <a
                          href={
                            String(sekolah.sosMed.whatsapp).startsWith("http")
                              ? sekolah.sosMed.whatsapp
                              : `https://wa.me/${String(
                                  sekolah.sosMed.whatsapp,
                                ).replace(/\D/g, "")}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="whatsapp"
                        >
                          <i className="bi bi-whatsapp"></i>
                        </a>
                      )}

                      {/* Tidak ada sosial media */}
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

            {/* ==================================================
                LOKASI SEKOLAH
            ================================================== */}
            <div className="sekolah-map mt-4">
              <h5>Lokasi Kami</h5>

              {hasMapLocation ? (
                <>
                  <div className="map-container">
                    <MapContainer
                      center={[coordinates.lat, coordinates.lng]}
                      zoom={16}
                      scrollWheelZoom={false}
                      style={{
                        width: "100%",
                        height: "160px",
                        border: 0,
                      }}
                    >
                      <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <Marker
                        position={[coordinates.lat, coordinates.lng]}
                        icon={locationIcon}
                      />
                    </MapContainer>
                  </div>

                  {/* Tombol Google Maps */}
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        textDecoration: "none",
                      }}
                    >
                      <FaDirections />
                      Buka di Google Maps
                    </a>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    minHeight: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "30px 20px",
                    background: "#f8f9fa",
                    borderRadius: "12px",
                    color: "#777",
                    fontSize: "16px",
                  }}
                >
                  Lokasi belum tersedia.
                </div>
              )}
            </div>
          </div>

          {/* ====================================================
              BERITA TERKAIT
          ==================================================== */}
          <NewsSection categoryFilter={sekolah.id_satker} />
        </div>

        {/* ======================================================
            SIDEBAR KANAN
        ====================================================== */}
        <div className="col-md-4">
          <NewsLatest />
          <InfoBoard />
          <SurveyBoard />
        </div>
      </div>

      {/* ========================================================
          FOOTER
      ======================================================== */}
      <Footer />
    </>
  );
}
