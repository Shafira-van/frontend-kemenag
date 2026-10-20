
import React from "react";
import "../../styles/PPID/ProfilPPID.css";
import Footer from "../../components/Footer";
import NewsLatest from "../../components/NewsLatest";
import SurveyBoard from "../../components/SurveyBoard";

const ProfilPPID = () => {
  return (
    <>
      <main className="profilPPID">
        <div className="profilPPID-container">
          <div className="row profilPPID-row">
            {/* =========================
                KONTEN UTAMA
            ========================== */}
            <div className="col-md-8 profilPPID-main">
              <h2 className="section-title">Profil PPID</h2>

              <div className="tugas-pokok">
                <p>
                  Keberadaan Undang-Undang Nomor 14 Tahun 2008 tentang
                  Keterbukaan Informasi Publik (UU KIP) sangat penting sebagai
                  landasan hukum yang berkaitan dengan:
                </p>

                <ul>
                  <li>
                    hak setiap orang untuk memperoleh informasi publik;
                  </li>
                  <li>
                    kewajiban badan publik dalam menyediakan dan melayani
                    permohonan informasi publik secara cepat, tepat waktu,
                    biaya ringan, dan cara sederhana.
                  </li>
                </ul>

                <p>
                  Untuk melaksanakan UU ini, badan publik wajib menunjuk
                  Pejabat Pengelola Informasi dan Dokumentasi (PPID). Informasi
                  dipandang sebagai kebutuhan pokok sekaligus hak asasi manusia,
                  serta wujud ciri negara demokratis yang menjunjung kedaulatan
                  rakyat.
                </p>

                <p>
                  PPID Kementerian Agama Kota Pematangsiantar berperan
                  menyediakan, menyimpan, mendokumentasikan, dan memberikan
                  layanan informasi bagi masyarakat.
                </p>
              </div>

              <div className="tugas-pokok">
                <h3>Peraturan Mengenai Pelayanan Informasi Publik</h3>

                <p>
                  Kebijakan terkait Pelayanan Informasi Publik berlandaskan
                  Undang-Undang Nomor 14 Tahun 2008 dan Peraturan Pemerintah
                  Nomor 61 Tahun 2010. Sebagai tindak lanjut, Kepala Kantor
                  Kementerian Agama Kota Pematangsiantar menerbitkan Surat
                  Keputusan Tahun 2024 yang menetapkan Kepala Subbagian Tata
                  Usaha sebagai Pejabat Pengelola Informasi dan Dokumentasi
                  (PPID) Unit, sebagai bentuk komitmen dalam menyediakan
                  layanan informasi publik yang mudah diakses, transparan, dan
                  akuntabel.
                </p>
              </div>
            </div>

            {/* =========================
                SIDEBAR
            ========================== */}
            <div className="col-md-4 profilPPID-sidebar">
              <NewsLatest />
            </div>
          </div>
        </div>
      </main>

      <SurveyBoard />

      <Footer />
    </>
  );
};

export default ProfilPPID;
