
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Eye, X } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import "../styles/InfografisCarousel.css";
import { API_URL, API_UPLOADS } from "../config";

const InfografisCarousel = () => {
  const [infografisData, setInfografisData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchInfografis = async () => {
      try {
        const response = await fetch(`${API_URL}/infografis`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Pastikan data selalu berupa array
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];

        setInfografisData(list);
      } catch (error) {
        console.error("Gagal memuat infografis:", error);
        setInfografisData([]);
      }
    };

    fetchInfografis();
  }, []);

  // ============================================================
  // Ambil maksimal 5 infografis
  // ============================================================
  const slides = infografisData
    .filter((item) => item && item.image)
    .slice(0, 5);

  // ============================================================
  // Loop hanya digunakan jika jumlah slide mencukupi.
  //
  // Karena:
  // mobile     = 1.3
  // tablet     = 2.3
  // desktop    = 2.3
  //
  // Minimal 4 slide dibuat agar loop aman di seluruh breakpoint.
  // ============================================================
  const enableLoop = slides.length >= 4;

  // Autoplay juga hanya aktif jika ada minimal 2 slide.
  const enableAutoplay = slides.length >= 2;

  return (
    <>
      <section className="infografis-highlight-section">
        <div className="d-flex mb-4">
          <h2 className="section-title text-center text-dark fw-bold mb-0">
            Infografis
          </h2>
        </div>

        {slides.length > 0 ? (
          <Swiper
            centeredSlides={slides.length > 1}
            loop={enableLoop}
            grabCursor={slides.length > 1}
            autoplay={
              enableAutoplay
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            pagination={
              slides.length > 1
                ? {
                    clickable: true,
                    dynamicBullets: true,
                  }
                : false
            }
            breakpoints={{
              320: {
                slidesPerView: 1.3,
                spaceBetween: 10,
              },

              768: {
                slidesPerView: 2.3,
                spaceBetween: 20,
              },

              1200: {
                slidesPerView: 2.3,
                spaceBetween: 30,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="infografis-highlight-swiper"
          >
            {slides.map((item) => {
              const imageUrl = `${API_UPLOADS}/uploads/infografis/${item.image}`;

              return (
                <SwiperSlide
                  key={item.id}
                  className="infografis-highlight-slide"
                >
                  <div
                    className="infografis-highlight-card"
                    onClick={() => setSelectedImage(imageUrl)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedImage(imageUrl);
                      }
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={item.desc || `Infografis ${item.id}`}
                      className="infografis-highlight-img"
                      loading="lazy"
                    />

                    <div className="infografis-overlay">
                      <div className="infografis-eye">
                        <Eye size={36} strokeWidth={2.3} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="text-center py-5 text-muted">
            Tidak ada infografis tersedia
          </div>
        )}
      </section>

      {/* =========================================================
          MODAL PREVIEW
      ========================================================== */}
      {selectedImage && (
        <div
          className="infografis-modal"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="infografis-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="infografis-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Tutup preview"
            >
              <X size={22} />
            </button>

            <img
              src={selectedImage}
              alt="Preview infografis"
              className="infografis-modal-img"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InfografisCarousel;

