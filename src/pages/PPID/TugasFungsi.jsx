
import React from "react";
import "../../styles/PPID/TugasFungsi.css";
import Footer from "../../components/Footer";
import NewsLatest from "../../components/NewsLatest";
import SurveyBoard from "../../components/SurveyBoard";

import {
  ClipboardList,
  ShieldCheck,
  FileText,
  Users,
  CheckCircle2,
  Target,
} from "lucide-react";

const tugasPPID = [
  "Menyediakan, menyimpan, mendokumentasikan, dan mengamankan informasi publik.",
  "Memberikan pelayanan informasi publik yang cepat, tepat waktu, biaya ringan, dan dengan cara sederhana.",
  "Menyusun dan memperbarui daftar informasi publik secara berkala.",
  "Menetapkan prosedur operasional penyebarluasan informasi publik.",
  "Melakukan pengujian konsekuensi terhadap informasi yang dikecualikan sesuai ketentuan yang berlaku.",
  "Mengoordinasikan pengumpulan dan pendataan informasi publik dari setiap satuan kerja.",
  "Mengembangkan sistem penyediaan dan pelayanan informasi publik yang mudah diakses masyarakat.",
  "Menangani permohonan informasi publik serta memberikan tanggapan sesuai ketentuan.",
  "Melakukan evaluasi dan pemantauan terhadap pelaksanaan pelayanan informasi publik.",
  "Menyampaikan laporan pelaksanaan pelayanan informasi publik sesuai ketentuan peraturan perundang-undangan.",
];

const fungsiPPID = [
  {
    icon: FileText,
    title: "Pengelolaan Informasi",
    desc: "Mengumpulkan, mengolah, menyimpan, dan mendokumentasikan informasi publik dari seluruh satuan kerja.",
  },
  {
    icon: Users,
    title: "Pelayanan Informasi",
    desc: "Memberikan layanan informasi kepada masyarakat secara transparan, mudah, dan sesuai prosedur.",
  },
  {
    icon: ShieldCheck,
    title: "Perlindungan Informasi",
    desc: "Memastikan pengelolaan informasi sesuai ketentuan serta menjaga informasi yang dikecualikan.",
  },
  {
    icon: CheckCircle2,
    title: "Evaluasi Pelayanan",
    desc: "Memantau dan mengevaluasi pelaksanaan pelayanan informasi untuk meningkatkan kualitas layanan publik.",
  },
];

const TugasFungsi = () => {
  return (
    <>
      <main className="tugasFungsi">
        <section className="tugas-hero">
          <div className="tugas-container">
            {/* HEADER */}
            <div className="tugas-heading">
              <h1>
                Tugas & <span>Fungsi</span>
              </h1>

              <p>
                PPID Kementerian Agama Kota Pematangsiantar berperan dalam
                pengelolaan dan pelayanan informasi publik yang transparan,
                akuntabel, dan mudah diakses masyarakat.
              </p>
            </div>

            {/* KONTEN */}
            <div className="tugas-layout">
              <div className="tugas-content">
                {/* TUGAS PPID */}
                <article className="tugas-card">
                  <div className="tugas-card-heading">
                    <div className="tugas-icon">
                      <ClipboardList size={25} />
                    </div>

                    <div>
                      <span>TANGGUNG JAWAB</span>
                      <h2>Tugas PPID</h2>
                    </div>
                  </div>

                  <div className="tugas-divider" />

                  <p className="tugas-intro">
                    Dalam penyelenggaraan keterbukaan informasi publik,
                    PPID melaksanakan tugas-tugas berikut:
                  </p>

                  <ul className="tugas-list">
                    {tugasPPID.map((item, index) => (
                      <li key={index}>
                        <span className="tugas-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="tugas-item-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                {/* FUNGSI PPID */}
                <article className="tugas-card fungsi-card">
                  <div className="tugas-card-heading">
                    <div className="tugas-icon tugas-icon-gold">
                      <Target size={25} />
                    </div>

                    <div>
                      <span>PERAN DAN PELAKSANAAN</span>
                      <h2>Fungsi PPID</h2>
                    </div>
                  </div>

                  <div className="tugas-divider" />

                  <p className="tugas-intro">
                    Untuk mendukung keterbukaan informasi publik, PPID
                    menjalankan fungsi utama berikut:
                  </p>

                  <div className="fungsi-grid">
                    {fungsiPPID.map((fungsi) => {
                      const Icon = fungsi.icon;

                      return (
                        <div className="fungsi-item" key={fungsi.title}>
                          <div className="fungsi-icon">
                            <Icon size={21} />
                          </div>

                          <div>
                            <h3>{fungsi.title}</h3>
                            <p>{fungsi.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </div>

              {/* SIDEBAR */}
              <aside className="tugas-sidebar">
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

export default TugasFungsi;

