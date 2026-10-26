import React from "react";
import "../../styles/PPID/StrukturOrganisasi.css";

import {
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

import Footer from "../../components/Footer";
import NewsLatest from "../../components/NewsLatest";
import SurveyBoard from "../../components/SurveyBoard";

import pdfUrl from "../../assets/SKPPID2026.pdf";

const StrukturOrganisasi = () => {
  return (
    <>
      <main className="strukturOrganisasi">
        <section className="struktur-organisasi-hero">
          <div className="struktur-organisasi-container">
            {/* HEADER */}
            <header className="struktur-organisasi-heading">
              <h1>
                Struktur <span>Organisasi</span>
              </h1>

              <p>
                Struktur organisasi Kantor Kementerian Agama Kota
                Pematangsiantar sebagai gambaran susunan organisasi, kedudukan,
                dan hubungan kerja dalam pelaksanaan tugas serta pelayanan
                kepada masyarakat.
              </p>
            </header>

            {/* KONTEN DAN SIDEBAR */}
            <div className="struktur-organisasi-layout">
              <div className="struktur-organisasi-content">
                {/* INFORMASI DOKUMEN */}
                <article className="struktur-organisasi-card">
                  {/* PRATINJAU PDF */}
                  <div className="struktur-organisasi-pdf-heading">
                    <BookOpen size={19} />
                    <h3>Pratinjau Dokumen SK</h3>
                  </div>

                  <div className="struktur-organisasi-pdf-frame">
                    <iframe
                      src={`${pdfUrl}#toolbar=1&navpanes=0`}
                      title="SK Struktur Organisasi Kementerian Agama"
                      className="struktur-organisasi-iframe"
                    />
                  </div>

                  <p className="struktur-organisasi-caption">
                    Apabila dokumen tidak tampil, silakan buka PDF di tab baru
                    atau unduh dokumen untuk membacanya.
                  </p>

                  {/* TOMBOL */}
                  <div className="struktur-organisasi-actions">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="struktur-organisasi-btn struktur-organisasi-btn-primary"
                    >
                      <ExternalLink size={17} />
                      Buka PDF
                    </a>

                    <a
                      href={pdfUrl}
                      download="SK-Struktur-Organisasi.pdf"
                      className="struktur-organisasi-btn struktur-organisasi-btn-secondary"
                    >
                      <Download size={17} />
                      Unduh SK
                    </a>
                  </div>
                </article>
              </div>

              {/* SIDEBAR BERITA */}
              <aside className="struktur-organisasi-sidebar">
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

export default StrukturOrganisasi;
