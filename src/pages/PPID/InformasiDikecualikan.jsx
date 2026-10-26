import React from "react";
import "../../styles/PPID/InformasiDikecualikan.css";

import Footer from "../../components/Footer";
import NewsLatest from "../../components/NewsLatest";
import SurveyBoard from "../../components/SurveyBoard";

import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

import pdfUrl from "../../assets/DaftarInformasiYangDikecualikan.pdf";

const InformasiDikecualikan = () => {
  return (
    <>
      <main className="informasiDikecualikan">
        <section className="informasi-dikecualikan-hero">
          <div className="informasi-dikecualikan-container">
            {/* HEADER */}
            <div className="informasi-dikecualikan-heading">
              <h1>
                Daftar <span>Informasi Dikecualikan</span>
              </h1>

              <p>
                Informasi publik yang dikecualikan merupakan informasi yang
                tidak dapat diberikan kepada masyarakat berdasarkan ketentuan
                peraturan perundang-undangan yang berlaku.
              </p>
            </div>

            {/* KONTEN DAN SIDEBAR */}
            <div className="informasi-dikecualikan-layout">
              <div className="informasi-dikecualikan-content">
                {/* DOKUMEN PDF */}
                <article className="informasi-dikecualikan-card dokumen-card">
                  {/* PRATINJAU PDF */}
                  <div className="informasi-dikecualikan-pdf-viewer">
                    <div className="informasi-dikecualikan-pdf-viewer-heading">
                      <BookOpen size={18} />
                      <span>Pratinjau Dokumen</span>
                    </div>

                    <iframe
                      src={`${pdfUrl}#toolbar=1&navpanes=0`}
                      title="Dokumen Informasi yang Dikecualikan"
                      className="informasi-dikecualikan-iframe"
                    />

                    <p className="informasi-dikecualikan-pdf-caption">
                      Jika dokumen tidak tampil, gunakan tombol Buka PDF untuk
                      melihatnya di tab baru atau Unduh PDF untuk menyimpan
                      dokumen.
                    </p>
                    <div className="informasi-dikecualikan-pdf-button">
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="informasi-dikecualikan-btn informasi-dikecualikan-btn-primary"
                      >
                        <ExternalLink size={17} />
                        Buka PDF
                      </a>
                      <a
                        href={pdfUrl}
                        download="informasi-dikecualikan.pdf"
                        className="informasi-dikecualikan-btn informasi-dikecualikan-btn-secondary"
                      >
                        <Download size={17} />
                        Unduh PDF
                      </a>
                    </div>
                  </div>
                </article>
              </div>

              {/* SIDEBAR */}
              <aside className="informasi-dikecualikan-sidebar">
                <NewsLatest />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SurveyBoard />
      <Footer />
    </>
  );
};

export default InformasiDikecualikan;
