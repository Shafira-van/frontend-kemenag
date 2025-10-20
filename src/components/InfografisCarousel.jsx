import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/InfografisCarousel.css";
import { API_URL, API_UPLOADS } from "../config";

const InfografisCarousel = () => {
  const [infografisData, setInfografisData] = useState([]);

  // 🔹 Ambil data dari API
  useEffect(() => {
    const fetchInfografis = async () => {
      try {
        const response = await fetch(`${API_URL}/infografis`);
        const data = await response.json();
        setInfografisData(data);
      } catch (error) {
        console.error("Gagal memuat infografis:", error);
      }
    };

    fetchInfografis();
  }, []);

  return (
    <div className="infografis-highlight-section">
      <div className="d-flex mb-4">
        <h2 className="section-title text-center text-dark fw-bold mb-0">Infografis</h2>
      </div>

      <Swiper
        centeredSlides={true}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1.3, spaceBetween: 10 },
          768: { slidesPerView: 2.3, spaceBetween: 20 },
          1200: { slidesPerView: 2.3, spaceBetween: 30 },
        }}
        modules={[Autoplay, Pagination]}
        className="infografis-highlight-swiper"
      >
        {infografisData.length > 0 ? (
          // 🔹 Batasi hanya 5 item
          infografisData.slice(0, 5).map((item) => (
            <SwiperSlide key={item.id} className="infografis-highlight-slide">
              <div className="infografis-highlight-card">
                <img
                  src={`${API_UPLOADS}/uploads/infografis/${item.image}`}
                  alt={`Infografis ${item.id}`}
                  className="infografis-highlight-img"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="text-center py-5 text-muted">
              Tidak ada infografis tersedia
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default InfografisCarousel;
