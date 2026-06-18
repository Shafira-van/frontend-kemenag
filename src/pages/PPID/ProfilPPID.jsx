import React, { useState } from "react";
import "../../styles/PPID/ProfilPPID.css";
import Footer from "../../components/Footer";
import InfoBoard from "../../components/InfoBoard";
import NewsLatest from "../../components/NewsLatest";
import SurveyBoard from "../../components/SurveyBoard";

const ProfilPPID = () => {
  return (
    <>
      <div className="row profilPPID">
        <div className="col-md-8 ">
          <h2 className="section-title ">Profil PPID</h2>
          <div className="tugas-pokok">
            <p>
              Keberadaan Undang- Undang Nomor 14 Tahun 2008 tentang Keterbukaan
              Informasi Publik (UU KIP) sangat penting sebagai landasan hukum
              yang berkaitan dengan
              <ul>
                <li>hak setiap orang untuk memperoleh informasi publik;</li>
                <li>
                  kewajiban badan publik dalam menyediakan dan melayani
                  permohonan informasi publik secara cepat, tepat waktu,
                  biayaringan dan cara sederhana.
                </li>
              </ul>
            </p>
            <p>
              Untuk melaksanakan UU ini, badan publik wajib menunjuk Pejabat
              Pengelola Informasi dan Dokumentasi (PPID). Informasi dipandang
              sebagai kebutuhan pokok sekaligus hak asasi manusia, serta wujud
              ciri negara demokratis yang menjunjung kedaulatan rakyat.
            </p>
            <p>
              PPID Kementerian Agama Pematangsiantar berperan menyediakan,
              menyimpan, mendokumentasikan, dan memberikan layanan informasi
              bagi masyarakat.
            </p>
          </div>
          <div className="tugas-pokok">
            <h3>Peraturan Mengenai Pelayanan Informasi Publik</h3>
            <p>
              Kebijakan terkait Pelayanan Informasi Publik yang berlandaskan UU
              No. 14 Tahun 2008 dan PP No. 61 Tahun 2010. Sebagai tindak lanjut,
              Kepala Kantor Kementerian Agama Kota Pematangsiantar menerbitkan
              Surat Keputusan Tahun 2024 yang menetapkan Kepala Subbagian Tata
              Usaha sebagai Pejabat Pengelola Informasi dan Dokumentasi (PPID)
              Unit, sebagai bentuk komitmen dalam menyediakan layanan informasi
              publik yang mudah diakses, transparan, dan akuntabel.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <NewsLatest />
        </div>
      </div>
      <SurveyBoard/>
      <Footer />
    </>
  );
};

export default ProfilPPID;
