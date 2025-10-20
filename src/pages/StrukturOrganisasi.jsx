import React from "react";
import "../styles/StrukturOrganisasi.css";
import Footer from "../components/Footer";
import NewsLatest from "../components/NewsLatest";

import imgStrukturOrganisasi from "../assets/strukturkankemenag.png";
import imgStrukturPTSP from "../assets/strukturptsp.png";
import imgStrukturHaji from "../assets/strukturhaji.png";
import InfoBoard from "../components/InfoBoard";

const StrukturOrganisasi = () => {
  return (
    <>
      <div className="row struktur-organisasi">
            {/* === Konten Utama === */}
            <div className="col-md-8">
              <h2 className="section-title">Struktur Organisasi</h2>
              <div className="struktur-item">
                <img
                  src={imgStrukturOrganisasi}
                  alt="Struktur Kantor Kemenag"
                  className="struktur-img"
                />
              </div>

              <div className="struktur-item">
                <h4 className="sub-title">
                  Struktur Pengelolaan Pelayanan Terpadu Satu Pintu (PTSP)
                </h4>
                <img
                  src={imgStrukturPTSP}
                  alt="Struktur PTSP"
                  className="struktur-img"
                />
              </div>

              <div className="struktur-item">
                <h4 className="sub-title">
                  Struktur Seksi Penyelenggaraan Haji dan Umrah (PHU)
                </h4>
                <img
                  src={imgStrukturHaji}
                  alt="Struktur Haji dan Umrah"
                  className="struktur-img"
                />
              </div>
            </div>

            {/* === Sidebar: Berita Terbaru === */}
            <div className="col-md-4 sidebar">
              <NewsLatest limit={8}/>
              <InfoBoard/>
            </div>
      </div>

      <Footer />
    </>
  );
};

export default StrukturOrganisasi;
