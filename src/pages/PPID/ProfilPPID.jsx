import React from "react";
import {
  ShieldCheck,
  FileText,
  Wallet,
  Clock,
  CheckCircle2,
  Search,
  ArrowRight,
  Users,
  Landmark,
  ClipboardList,
  Headset,
  Eye,
  BookOpen,
} from "lucide-react";

import "../../styles/PPID/ProfilPPID.css";
import Footer from "../../components/Footer";
import NewsLatest from "../../components/NewsLatest";
import SurveyBoard from "../../components/SurveyBoard";

const ProfilPPID = () => {
  const keunggulan = [
    {
      icon: <Wallet size={24} />,
      title: "Tarif Transparan",
      desc: "Informasi biaya layanan disampaikan secara terbuka sesuai ketentuan yang berlaku.",
    },
    {
      icon: <Clock size={24} />,
      title: "Pelayanan Terukur",
      desc: "Permohonan informasi ditangani sesuai prosedur dan jangka waktu pelayanan.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Informasi Akuntabel",
      desc: "Informasi publik dikelola secara bertanggung jawab dan dapat dipertanggungjawabkan.",
    },
    {
      icon: <Users size={24} />,
      title: "Mudah Diakses",
      desc: "Masyarakat dapat memperoleh informasi melalui mekanisme pelayanan PPID.",
    },
  ];

  const langkah = [
    {
      nomor: "01",
      icon: <ClipboardList size={25} />,
      judul: "Ajukan Permohonan",
      deskripsi:
        "Sampaikan informasi yang dibutuhkan melalui saluran pelayanan PPID.",
    },
    {
      nomor: "02",
      icon: <Search size={25} />,
      judul: "Proses Informasi",
      deskripsi:
        "Petugas memeriksa permohonan dan menyiapkan informasi sesuai ketentuan.",
    },
    {
      nomor: "03",
      icon: <CheckCircle2 size={25} />,
      judul: "Terima Informasi",
      deskripsi:
        "Pemohon memperoleh tanggapan atau informasi sesuai prosedur pelayanan.",
    },
  ];

  return (
    <>
      <main className="profilPPID">
        {/* HERO */}
        <section className="ppid-hero">
          <div className="ppid-hero-container">
            <div className="ppid-hero-content">

              <h1>
                Profil PPID
                <br />
                <span>Transparan dan Akuntabel</span>
              </h1>

              <p>
                Pejabat Pengelola Informasi dan Dokumentasi (PPID)
                hadir untuk mendukung keterbukaan informasi publik
                melalui pelayanan yang mudah diakses, tertib, dan
                bertanggung jawab.
              </p>

              <div className="ppid-hero-actions">
                <a
                  href="#profil-ppid"
                  className="ppid-btn ppid-btn-primary"
                >
                  Pelajari Profil
                  <ArrowRight size={18} />
                </a>

                <a
                  href="#alur-ppid"
                  className="ppid-btn ppid-btn-outline"
                >
                  Alur Pelayanan
                </a>
              </div>

              <div className="ppid-hero-points">
                <span>
                  <CheckCircle2 size={17} />
                  Informasi Terbuka
                </span>
                <span>
                  <CheckCircle2 size={17} />
                  Prosedur Jelas
                </span>
                <span>
                  <CheckCircle2 size={17} />
                  Akuntabel
                </span>
              </div>
            </div>

            {/* VISUAL PPID */}
            <div className="ppid-hero-visual">
              <div className="ppid-visual-glow" />

              <div className="ppid-document-card">
                <div className="ppid-document-top">
                  <div className="ppid-document-logo">
                    <Landmark size={22} />
                  </div>

                  <div>
                    <strong>PPID Kemenag</strong>
                    <span>Kota Pematangsiantar</span>
                  </div>
                </div>

                <div className="ppid-document-line" />
                <div className="ppid-document-line short" />

                <div className="ppid-document-icon">
                  <FileText size={38} />
                </div>

                <h3>Informasi Publik</h3>

                <p>
                  Hak masyarakat untuk memperoleh informasi publik
                  yang transparan dan bertanggung jawab.
                </p>

                <div className="ppid-document-status">
                  <CheckCircle2 size={16} />
                  Pelayanan Informasi
                </div>
              </div>

              <div className="ppid-tarif-card">
                <div className="ppid-tarif-icon">
                  <Wallet size={22} />
                </div>

                <span>Tarif layanan gratis</span>
                <strong>Rp0</strong>
                <p>Untuk layanan yang ditetapkan gratis</p>
              </div>

              <div className="ppid-floating-icon ppid-floating-one">
                <ShieldCheck size={24} />
              </div>

              <div className="ppid-floating-icon ppid-floating-two">
                <BookOpen size={23} />
              </div>
            </div>
          </div>
        </section>

        {/* KEUNGGULAN */}
        <section className="ppid-benefits">
          <div className="ppid-section-container">
            <div className="ppid-section-heading">
              <span className="ppid-section-label">
                KOMITMEN PELAYANAN
              </span>

              <h2>Informasi Publik untuk Semua</h2>

              <p>
                Mendorong pelayanan informasi yang transparan,
                mudah dijangkau, dan sesuai dengan ketentuan
                peraturan perundang-undangan.
              </p>
            </div>

            <div className="ppid-benefit-grid">
              {keunggulan.map((item) => (
                <article
                  className="ppid-benefit-card"
                  key={item.title}
                >
                  <div className="ppid-benefit-icon">
                    {item.icon}
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROFIL DAN REGULASI */}
        <section
          className="ppid-content-section"
          id="profil-ppid"
        >
          <div className="ppid-section-container">
            <div className="ppid-content-layout">
              <div className="ppid-main-content">
                <div className="ppid-content-heading">
                  <span className="ppid-section-label">
                    TENTANG PPID
                  </span>

                  <h2 className="section-title">
                    Profil PPID
                  </h2>

                  <p>
                    Mengenal peran dan landasan hukum pelayanan
                    informasi publik di lingkungan Kementerian
                    Agama Kota Pematangsiantar.
                  </p>
                </div>

                {/* PROFIL */}
                <article className="tugas-pokok">
                  <div className="ppid-card-heading">
                    <div className="ppid-card-icon">
                      <Landmark size={23} />
                    </div>

                    <div>
                      <span>01 — PROFIL</span>
                      <h3>Pengelolaan Informasi Publik</h3>
                    </div>
                  </div>

                  <p>
                    Keberadaan Undang-Undang Nomor 14 Tahun 2008
                    tentang Keterbukaan Informasi Publik (UU KIP)
                    sangat penting sebagai landasan hukum yang
                    berkaitan dengan:
                  </p>

                  <ul>
                    <li>
                      Hak setiap orang untuk memperoleh informasi
                      publik.
                    </li>

                    <li>
                      Kewajiban badan publik dalam menyediakan
                      dan melayani permohonan informasi publik
                      secara cepat, tepat waktu, biaya ringan,
                      dan cara sederhana.
                    </li>
                  </ul>

                  <p>
                    Untuk melaksanakan UU tersebut, badan publik
                    wajib menunjuk Pejabat Pengelola Informasi
                    dan Dokumentasi (PPID). Informasi dipandang
                    sebagai kebutuhan pokok sekaligus hak asasi
                    manusia, serta bagian dari kehidupan
                    demokratis yang menjunjung keterbukaan.
                  </p>

                  <p>
                    PPID Kementerian Agama Kota Pematangsiantar
                    berperan menyediakan, menyimpan,
                    mendokumentasikan, dan memberikan layanan
                    informasi bagi masyarakat.
                  </p>
                </article>

                {/* REGULASI */}
                <article className="tugas-pokok">
                  <div className="ppid-card-heading">
                    <div className="ppid-card-icon ppid-card-icon-gold">
                      <FileText size={23} />
                    </div>

                    <div>
                      <span>02 — REGULASI</span>
                      <h3>Peraturan Pelayanan Informasi Publik</h3>
                    </div>
                  </div>

                  <p>
                    Kebijakan terkait pelayanan informasi publik
                    berlandaskan Undang-Undang Nomor 14 Tahun
                    2008 tentang Keterbukaan Informasi Publik
                    dan Peraturan Pemerintah Nomor 61 Tahun 2010
                    tentang Pelaksanaan Undang-Undang Nomor 14
                    Tahun 2008 tentang Keterbukaan Informasi Publik.
                  </p>

                  <p>
                    Sebagai tindak lanjut, Kepala Kantor
                    Kementerian Agama Kota Pematangsiantar
                    menerbitkan Surat Keputusan Tahun 2024 yang
                    menetapkan Kepala Subbagian Tata Usaha
                    sebagai PPID Unit, sebagai bentuk komitmen
                    dalam menyediakan layanan informasi publik
                    yang mudah diakses, transparan, dan akuntabel.
                  </p>
                </article>
              </div>

              {/* SIDEBAR */}

                <div className="ppid-news-wrapper">
                  <NewsLatest />
                </div>
            </div>
          </div>
        </section>

        {/* ALUR PELAYANAN */}
        <section
          className="ppid-process"
          id="alur-ppid"
        >
          <div className="ppid-section-container">
            <div className="ppid-section-heading">
              <span className="ppid-section-label">
                LANGKAH PELAYANAN
              </span>

              <h2>Bagaimana Cara Mengajukan Permohonan?</h2>

              <p>
                Ikuti tahapan pelayanan informasi publik sesuai
                prosedur yang berlaku.
              </p>
            </div>

            <div className="ppid-process-grid">
              {langkah.map((item, index) => (
                <article
                  className="ppid-process-card"
                  key={item.nomor}
                >
                  <div className="ppid-process-top">
                    <span className="ppid-process-number">
                      {item.nomor}
                    </span>

                    <div className="ppid-process-icon">
                      {item.icon}
                    </div>
                  </div>

                  <h3>{item.judul}</h3>
                  <p>{item.deskripsi}</p>

                  {index < langkah.length - 1 && (
                    <div className="ppid-process-arrow">
                      <ArrowRight size={21} />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PENUTUP */}
        <section className="ppid-transparency">
          <div className="ppid-section-container">
            <div className="ppid-transparency-inner">
              <div className="ppid-transparency-icon">
                <ShieldCheck size={34} />
              </div>

              <div className="ppid-transparency-content">
                <h2>
                  Komitmen terhadap Keterbukaan Informasi
                </h2>

                <p>
                  Kami berkomitmen mendukung pelayanan informasi
                  publik yang transparan, sesuai prosedur, dan
                  mengutamakan kemudahan akses bagi masyarakat.
                </p>
              </div>

              <a
                href="#profil-ppid"
                className="ppid-btn ppid-btn-light"
              >
                Kembali ke Profil
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SurveyBoard />
      <Footer />
    </>
  );
};

export default ProfilPPID;
