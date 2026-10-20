import React, { useEffect, useState } from "react";
import "../styles/KepalaKantor.css";
import Footer from "../components/Footer";
import KepalaKantorImg from "../assets/kepalakantor.png"; // ganti dengan gambar asli
import { API_URL } from "../config";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";
import SurveyBoard from "../components/SurveyBoard";

const KepalaKantor = () => {
  const [timelineData, setTimelineData] = useState([]);

  // Ambil data dari API
  useEffect(() => {
    fetch(`${API_URL}/profilKetua`)
      .then((res) => res.json())
      .then((data) => setTimelineData(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);


  // Efek animasi muncul saat scroll
  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [timelineData]);

  return (
    <>
      <div className="kepalaKantor container py-5">
        <h2 className="fw-bold section-title text-center mb-5">
          Kepala Kantor Kementerian Agama Kota Pematangsiantar
        </h2>

        {/* Sejarah Singkat */}
        <div className="kepalaKantor-content">
          <img src={KepalaKantorImg} alt="Kepala Kantor Kemenag" />
          <h1 className="kepala-name">H. TARMUJI SE., M.AP.</h1>
          <div className="row mt-4">
            <div className="col-md-6 mb-4">
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-calendar-event"></i>
                </div>
                <div className="info-content">
                  <h5>Tempat & Tanggal Lahir</h5>
                  <span>
                    Tumpatan Nibung
                    <br />
                    21 Januari 1970
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-mortarboard"></i>
                </div>
                <div className="info-content">
                  <h5>Pendidikan</h5>
                  <div className="education-item">
                    <strong>S2 - Universitas Medan Area</strong>
                    <span>Manajemen Administrasi Publik</span>
                  </div>
                  <div className="education-item">
                    <strong>S1 - Universitas Al Hikmah</strong>
                    <span>Manajemen</span>
                  </div>
                  <div className="education-item">
                    <strong>DIII - Universitas Budi Luhur</strong>
                    <span>Manajemen Informatika</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profil-wrapper">
            {/*RIWAYAT JABATAN*/}
            <div className="jabatan-box pt-0">
              <div className="title-box">
                <h2>RIWAYAT JABATAN</h2>
              </div>

              <div className="jabatan-timeline">
                <div className="jabatan-item left">
                  <div className="timeline-dot"></div>

                  <div className="jabatan-card">
                    <span>2019 - Sekarang</span>

                    <h5>
                      Kepala Sub Bagian Organisasi, Tata Laksana, dan Kepegawaian Bagian Tata
                      Usaha Kanwil Kementerian Agama Provinsi Sumatera Utara.
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="organisasi-box">
              <div className="title-organisasi">
                <h2>ORGANISASI</h2>
              </div>

              <div className="organisasi-item">
                <div className="organisasi-icon">
                  <i className="bi bi-people-fill"></i>
                </div>

                <div className="organisasi-content">
                  <span>1995</span>

                  <h5>Wakil Ketua Abang PMII Cab. Medan</h5>
                </div>
              </div>

              <div className="organisasi-item">
                <div className="organisasi-icon">
                  <i className="bi bi-person-fill"></i>
                </div>

                <div className="organisasi-content">
                  <span>1993</span>

                  <h5>
                    Sekretaris Umum Senat Mahasiswa Fakultas Ushuluddin IAIN SU
                  </h5>
                </div>
              </div>

              <div className="organisasi-item">
                <div className="organisasi-icon">
                  <i className="bi bi-flag-fill"></i>
                </div>

                <div className="organisasi-content">
                  <span>1990</span>

                  <h5>Ketua Komisariat PMII Fakultas Ushuluddin IAIN SU</h5>
                </div>
              </div>

              <div className="organisasi-item">
                <div className="organisasi-icon">
                  <i className="bi bi-bank"></i>
                </div>

                <div className="organisasi-content">
                  <span>2002</span>

                  <h5>Wakil Bendahara Nahdlatul Ulama (NU) PC Medan</h5>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {/* Timeline dari API */}
            <h2 className="section-title text-black text-center m-0">
              Urutan Periode Pejabat Kepala Kantor
            </h2>
            <div className="timeline-wrapper d-flex justify-content-center">
              <div className="timeline position-relative">
                <div className="timeline-line"></div>

                {timelineData.length > 0 ? (
                  timelineData.map((item, index) => (
                    <div
                      key={item.id}
                      className={`timeline-item mb-1 ${
                        index % 2 === 0 ? "left" : "right"
                      }`}
                    >
                      <div className="timeline-dot"></div>
                      <div className="timeline-content shadow-sm p-2 rounded bg-white">
                        {/* Sesuaikan field sesuai struktur API */}
                        <h5>{item.name}</h5>
                        <p>{item.year}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">
                    Memuat data timeline...
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <NewsLatest limit={6} />
            <InfoBoard />
            <SurveyBoard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KepalaKantor;
