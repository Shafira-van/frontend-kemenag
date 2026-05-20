import React, { useEffect, useState } from "react";
import "../styles/KepalaKantor.css";
import Footer from "../components/Footer";
import KepalaKantorImg from "../assets/kepalakantor.png"; // ganti dengan gambar asli
import { API_URL } from "../config";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";

const KepalaKantor = () => {
  const [timelineData, setTimelineData] = useState([]);

  // Ambil data dari API
  useEffect(() => {
    fetch(`${API_URL}/profilKetua`)
      .then((res) => res.json())
      .then((data) => setTimelineData(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);
  console.log(timelineData);

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
          <h1 class="kepala-name">DR. H. AL AHYU, M. A</h1>
          <div class="row mt-4">
            <div class="col-md-6 mb-4">
              <div class="info-card">
                <div class="info-icon">
                  <i class="bi bi-calendar-event"></i>
                </div>
                <div class="info-content">
                  <h5>Tempat & Tanggal Lahir</h5>
                  <span>
                    Teluk Pulai Luar <br />
                    12 April 1971
                  </span>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-4">
              <div class="info-card">
                <div class="info-icon">
                  <i class="bi bi-mortarboard"></i>
                </div>

                <div class="info-content">
                  <h5>Pendidikan</h5>

                  <div class="education-item">
                    <strong>S2 - IAIN Medan</strong>
                    <span>Pengkajian Islam</span>
                  </div>

                  <div class="education-item">
                    <strong>S1 - IAIN Sumut</strong>
                    <span>Aqidah Filsafat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="profil-wrapper">
            {/*RIWAYAT JABATAN*/}
            <div class="jabatan-box">
              <div class="title-box">
                <h2>RIWAYAT JABATAN</h2>
              </div>

              <div class="jabatan-timeline">
                <div class="jabatan-item left">
                  <div class="timeline-dot"></div>

                  <div class="jabatan-card">
                    <span>2007 - 2009</span>

                    <h5>Kepala KUA Kec. Hamparan Perak Kab. Deli Serdang Prov. Sumut</h5>
                  </div>
                </div>

                <div class="jabatan-item right">
                  <div class="timeline-dot"></div>

                  <div class="jabatan-card">
                    <span>2018 - 2019</span>

                    <h5>Kakan Kemenag Kota Medan</h5>
                  </div>
                </div>

                <div class="jabatan-item left">
                  <div class="timeline-dot"></div>

                  <div class="jabatan-card">
                    <span>2009</span>

                    <h5>Ka Sub Bag Tata Usaha Kemenag Kota Medan</h5>
                  </div>
                </div>

                <div class="jabatan-item right">
                  <div class="timeline-dot"></div>

                  <div class="jabatan-card">
                    <span>2019 - 2024</span>

                    <h5>Kakan Kemenag Kota Tanjung Balai</h5>
                  </div>
                </div>

                <div class="jabatan-item left">
                  <div class="timeline-dot"></div>

                  <div class="jabatan-card">
                    <span>2009 - 2012</span>

                    <h5>Ka Sub Bag Tata Usaha Kemenag Kab. Deli Serdang</h5>
                  </div>
                </div>

                <div class="jabatan-item right">
                  <div class="timeline-dot"></div>

                  <div class="jabatan-card">
                    <span>2024 - Sekarang</span>

                    <h5>Kakan Kemenag Kota Pematangsiantar</h5>
                  </div>
                </div>
              </div>
            </div>

            <div class="organisasi-box">
              <div class="title-organisasi">
                <h2>ORGANISASI</h2>
              </div>

              <div class="organisasi-item">
                <div class="organisasi-icon">
                  <i class="bi bi-people-fill"></i>
                </div>

                <div class="organisasi-content">
                  <span>1995</span>

                  <h5>Wakil Ketua Abang PMII Cab. Medan</h5>
                </div>
              </div>

              <div class="organisasi-item">
                <div class="organisasi-icon">
                  <i class="bi bi-person-fill"></i>
                </div>

                <div class="organisasi-content">
                  <span>1993</span>

                  <h5>
                    Sekretaris Umum Senat Mahasiswa Fakultas Ushuluddin IAIN SU
                  </h5>
                </div>
              </div>

              <div class="organisasi-item">
                <div class="organisasi-icon">
                  <i class="bi bi-flag-fill"></i>
                </div>

                <div class="organisasi-content">
                  <span>1990</span>

                  <h5>Ketua Komisariat PMII Fakultas Ushuluddin IAIN SU</h5>
                </div>
              </div>

              <div class="organisasi-item">
                <div class="organisasi-icon">
                  <i class="bi bi-bank"></i>
                </div>

                <div class="organisasi-content">
                  <span>2002</span>

                  <h5>Wakil Bendahara Nahdlatul Ulama (NU) PC Medan</h5>
                </div>
              </div>
            </div>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KepalaKantor;
