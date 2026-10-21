import React from "react";
import "../../styles/PPID/JadwalLayanan.css";
import Footer from "../../components/Footer";
import SurveyBoard from "../../components/SurveyBoard";

import { Clock3, CalendarDays, Coffee, Sun } from "lucide-react";

const JadwalLayanan = () => {
  return (
    <>
      <main className="jadwalLayanan">
        <section className="jadwal-hero">
          <div className="jadwal-container">
            {/* JUDUL */}
            <div className="jadwal-heading">
              <h1>
                Jadwal <span>Jam Layanan</span>
              </h1>

              <p>
                Informasi waktu pelayanan PPID Kementerian Agama Kota
                Pematangsiantar.
              </p>
            </div>

            {/* KARTU JADWAL */}
            <div className="jadwal-cards">
              {/* SENIN - KAMIS */}
              <article className="jadwal-card">
                <div className="jadwal-card-header">
                  <div className="jadwal-icon">
                    <CalendarDays size={25} />
                  </div>

                  <div>
                    <span>JADWAL PELAYANAN</span>
                    <h2>Senin – Kamis</h2>
                  </div>
                </div>

                <div className="jadwal-divider" />

                <div className="jadwal-time">
                  <Clock3 size={21} />
                  <div>
                    <span>Jam Pelayanan</span>
                    <strong>08.00 – 15.00 WIB</strong>
                  </div>
                </div>

                <div className="jadwal-time">
                  <Coffee size={21} />
                  <div>
                    <span>Jam Istirahat</span>
                    <strong>12.00 – 13.00 WIB</strong>
                  </div>
                </div>
              </article>

              {/* JUMAT */}
              <article className="jadwal-card jadwal-card-jumat">
                <div className="jadwal-card-header">
                  <div className="jadwal-icon jadwal-icon-gold">
                    <CalendarDays size={25} />
                  </div>

                  <div>
                    <span>JADWAL PELAYANAN</span>
                    <h2>Jumat</h2>
                  </div>
                </div>

                <div className="jadwal-divider" />

                <div className="jadwal-time">
                  <Clock3 size={21} />
                  <div>
                    <span>Jam Pelayanan</span>
                    <strong>08.00 – 15.00 WIB</strong>
                  </div>
                </div>

                <div className="jadwal-time">
                  <Coffee size={21} />
                  <div>
                    <span>Jam Istirahat</span>
                    <strong>11.30 – 13.30 WIB</strong>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <SurveyBoard />
      <Footer />
    </>
  );
};

export default JadwalLayanan;
