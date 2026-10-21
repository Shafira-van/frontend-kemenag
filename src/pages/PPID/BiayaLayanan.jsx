import React from "react";
import "../../styles/PPID/BiayaLayanan.css";
import Footer from "../../components/Footer";
import SurveyBoard from "../../components/SurveyBoard";

import {
  ShieldCheck,
  FileText,
  Wallet,
  CheckCircle2,
  Landmark,
  BadgeCheck,
  Sparkles,
  CircleCheck,
} from "lucide-react";

const BiayaLayanan = () => {
  return (
    <>
      <main className="biayaLayanan">
        <section className="ppid-hero biaya-hero">
          <div className="ppid-hero-container biaya-hero-container">
            {/* KONTEN UTAMA */}
            <div className="ppid-hero-content biaya-hero-content">
              <h1>
                Akses Informasi Publik
                <br />
                <span className="biaya-highlight">GRATIS, TARIF Rp0!</span>
              </h1>

              <p className="biaya-description">
                Mendapatkan informasi publik kini lebih mudah.
                <strong> Tidak ada biaya layanan </strong>
                untuk permohonan informasi publik. Kami berkomitmen memberikan
                pelayanan yang transparan, mudah diakses, dan sesuai ketentuan
                peraturan perundang-undangan.
              </p>

              <div className="biaya-zero-banner">
                <div className="biaya-zero-icon">
                  <Wallet size={25} />
                </div>

                <div className="biaya-zero-text">
                  <span>BIAYA LAYANAN</span>
                  <strong>Rp0</strong>
                </div>

                <div className="biaya-zero-check">
                  <BadgeCheck size={30} />
                </div>
              </div>

              <div className="ppid-hero-points biaya-points">
                <span>
                  <CheckCircle2 size={18} />
                  Tanpa Biaya Layanan
                </span>
                <span>
                  <CheckCircle2 size={18} />
                  Transparan
                </span>
                <span>
                  <CheckCircle2 size={18} />
                  Mudah Diakses
                </span>
              </div>
            </div>

            {/* VISUAL TARIF RP0 */}
            <div className="ppid-hero-visual biaya-hero-visual">
              <div className="ppid-visual-glow biaya-visual-glow" />

              <div className="biaya-zero-visual">
                <div className="biaya-visual-top">
                  <div className="biaya-visual-logo">
                    <Landmark size={23} />
                  </div>

                  <div>
                    <strong>PPID Kemenag</strong>
                    <span>Kota Pematangsiantar</span>
                  </div>

                  <div className="biaya-verified">
                    <ShieldCheck size={21} />
                  </div>
                </div>

                <div className="biaya-visual-divider" />

                <div className="biaya-visual-label">
                  <span>BIAYA LAYANAN INFORMASI</span>
                  <div className="biaya-visual-check">
                    <CircleCheck size={17} />
                    <span>TRANSPARAN</span>
                  </div>
                </div>

                <div className="biaya-price">
                  <span>Rp</span>
                  <strong>0</strong>
                </div>

                <div className="biaya-gratis-label">
                  <Sparkles size={17} />
                  GRATIS BIAYA LAYANAN
                </div>

                <p className="biaya-visual-description">
                  Informasi publik untuk masyarakat
                </p>

                <div className="biaya-visual-features">
                  <div>
                    <CheckCircle2 size={17} />
                    <span>Tanpa biaya layanan</span>
                  </div>
                  <div>
                    <CheckCircle2 size={17} />
                    <span>Prosedur sesuai ketentuan</span>
                  </div>
                  <div>
                    <CheckCircle2 size={17} />
                    <span>Pelayanan transparan</span>
                  </div>
                </div>

                <div className="biaya-visual-footer">
                  <ShieldCheck size={18} />
                  <span>Komitmen Keterbukaan Informasi Publik</span>
                </div>
              </div>

              <div className="biaya-floating-card biaya-floating-one">
                <div className="biaya-floating-icon">
                  <Wallet size={22} />
                </div>
                <div>
                  <strong>Rp0</strong>
                  <span>Biaya layanan</span>
                </div>
              </div>

              <div className="biaya-floating-card biaya-floating-two">
                <div className="biaya-floating-check">
                  <CheckCircle2 size={21} />
                </div>
                <span>Transparan & Terpercaya</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SurveyBoard />
      <Footer />
    </>
  );
};

export default BiayaLayanan;
