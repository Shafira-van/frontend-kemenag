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
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "../styles/KuaDetail.css";
import { API_URL, API_UPLOADS } from "../config";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import Footer from "../components/Footer";
import NewsSection from "../components/NewsSection";
import SurveyBoard from "../components/SurveyBoard";

// ============================================================
// 📍 DEFAULT CENTER
// ============================================================
const DEFAULT_CENTER = {
  lat: 2.9595,
  lng: 99.0687,
};

// ============================================================
// 📍 ICON MARKER
// Menggunakan divIcon agar tidak perlu konfigurasi asset Leaflet
// ============================================================
const locationIcon = L.divIcon({
  className: "custom-map-marker",
  html: '<div style="font-size:32px;line-height:32px;">📍</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// ============================================================
// 📍 NORMALIZE MAP VALUE
// ============================================================
const normalizeMapValue = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  const normalized = String(value).trim();

  if (!normalized || normalized === "-") {
    return "";
  }

  return normalized;
};

// ============================================================
// 📍 AMBIL KOORDINAT DARI URL GOOGLE MAPS
//
// Mendukung:
// https://www.google.com/maps?q=2.9595,99.0687
//
// dan URL lama:
// https://www.google.com/maps/@2.9595,99.0687,17z
//
// serta:
// https://www.google.com/maps/embed?....&q=2.9595,99.0687
// ============================================================
const extractCoordinatesFromMap = (value) => {
  const mapValue = normalizeMapValue(value);

  if (!mapValue) {
    return null;
  }

  // ----------------------------------------------------------
  // Format ?q=LAT,LNG
  // ----------------------------------------------------------
  const qMatch = mapValue.match(
    /[?&]q=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
  );

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

  // ----------------------------------------------------------
  // Format /@LAT,LNG
  // ----------------------------------------------------------
  const atMatch = mapValue.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i);

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

  // ----------------------------------------------------------
  // Format umum koordinat langsung
  // ----------------------------------------------------------
  const coordinateMatch = mapValue.match(
    /(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,
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

const KuaDetail = () => {
  const { id } = useParams();

  const [kua, setKua] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================================
  // 📡 FETCH DATA KUA
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/kua/${id}`);

        if (!res.ok) {
          throw new Error("Gagal mengambil data");
        }

        const data = await res.json();

        // ------------------------------------------------------
        // NORMALIZE SOCIAL MEDIA
        // ------------------------------------------------------
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

  // ============================================================
  // 🦴 SKELETON
  // ============================================================
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

  // ============================================================
  // ⏳ LOADING
  // ============================================================
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

  // ============================================================
  // ❌ ERROR
  // ============================================================
  if (error) {
    return <div className="container mt-5 text-danger">Error: {error}</div>;
  }

  // ============================================================
  // ❌ DATA TIDAK DITEMUKAN
  // ============================================================
  if (!kua) {
    return (
      <div className="container mt-5 text-center">
        <h4>Data KUA tidak ditemukan</h4>
      </div>
    );
  }

  // ============================================================
  // 📍 AMBIL KOORDINAT LOKASI
  // ============================================================
  const mapValue = normalizeMapValue(kua.map);

  const coordinates = extractCoordinatesFromMap(kua.map);

  const hasMapLocation = !!coordinates;

  // ============================================================
  // 🗺️ LINK GOOGLE MAPS
  // Tetap menggunakan URL yang tersimpan di database
  // ============================================================
  const googleMapsUrl =
    mapValue ||
    (coordinates
      ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
      : "");

  return (
    <>
      <div className="row kua">
        <div className="container col-md-8 mt-10">
          <div className="card-kua shadow p-4">
            {/* ==================================================
                JUDUL
            ================================================== */}
            <h2 className="card-title mb-4">{kua.name}</h2>

            {/* ==================================================
                GAMBAR
            ================================================== */}
            <div className="kua-info-img">
              {kua.img && (
                <img
                  src={`${API_UPLOADS}/${kua.img}`}
                  alt={kua.name}
                  className="img-fluid mb-3 rounded shadow"
                />
              )}
            </div>

            {/* ==================================================
                DESKRIPSI
            ================================================== */}
            <div
              dangerouslySetInnerHTML={{
                __html: kua.desc || "",
              }}
            ></div>

            {/* ==================================================
                HUBUNGI KAMI
            ================================================== */}
            <div className="kua-sosmed mt-4">
              <h5>Hubungi Kami</h5>

              <div className="kua-info-card">
                {/* ------------------------------------------------
                    TELEPON
                ------------------------------------------------ */}
                <div className="kua-info-item">
                  <div className="kua-info-icon">
                    <FaPhoneAlt />
                  </div>

                  <div>
                    <h6>Telepon</h6>
                    <p>{kua.phone || "Belum tersedia"}</p>
                  </div>
                </div>

                {/* ------------------------------------------------
                    SOSIAL MEDIA
                ------------------------------------------------ */}
                <div className="kua-info-item">
                  <div className="kua-info-icon">
                    <FaEnvelope />
                  </div>

                  <div>
                    <h6>Sosial Media</h6>

                    <div className="social-icons">
                      {/* INSTAGRAM */}
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

                      {/* FACEBOOK */}
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

                      {/* WHATSAPP */}
                      {kua.socialMedia?.whatsapp && (
                        <a
                          href={
                            String(kua.socialMedia.whatsapp).startsWith("http")
                              ? kua.socialMedia.whatsapp
                              : `https://wa.me/${String(
                                  kua.socialMedia.whatsapp,
                                ).replace(/\D/g, "")}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="whatsapp"
                        >
                          <i className="bi bi-whatsapp"></i>
                        </a>
                      )}

                      {/* TIDAK ADA SOSMED */}
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

            {/* ==================================================
                MAP
                Tampilan/class tetap sama agar CSS lama tetap
                digunakan.
            ================================================== */}
            <div className="kua-map mt-4">
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

                  {/* ==================================================
                      TOMBOL ARAH / GOOGLE MAPS
                  ================================================== */}
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

          {/* ==================================================
              BERITA TERKAIT
          ================================================== */}
          <NewsSection categoryFilter={kua.id_satker} />
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
};

export default KuaDetail;
