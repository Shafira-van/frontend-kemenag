import React from "react";
import "../../styles/PPID/ProfilPPID.css";
import Footer from "../../components/Footer";
import InfoBoard from "../../components/InfoBoard";
import NewsLatest from "../../components/NewsLatest";
import SurveyBoard from "../../components/SurveyBoard";

const TugasFungsi = () => {
  return (
    <>
      <div className="row visi-misi">
        <div className="col-md-8 ">
          <h2 className="section-title ">Tugas dan Fungsi</h2>

          <div className="tugas-pokok">
            <h3>Tugas</h3>
            <ul>
              <li>
                Mengkoordinasikan pengumpulan seluruh informasi public dan Unit
                Kerja pada Satker Kantor Kementerian Agama Kota Pematangsiantar
                yang meliputi informasi yang wajib disediakan dan diumumkan
                secara berkala; informasi yang wajib tersedia setiap saat;
                informasi terbuka lainnya yang diminta Pemohon Informasi Publik.
              </li>
              <li>
                Mengkoordinasikan pendataan Informasi Publik yang dikuasai oleh
                setiap Unit Kerja pada Kantor Kementerian Agama Kota
                Pematangsiantar dalam rangka pembuatan dan pemutakhiran Daftar
                Informasi Publik.
              </li>
              <li>
                Mengkoordinasikan pengklasifikasian seluruh Informasi Publik.
              </li>
              <li>
                Melakukan penyimpanan Informasi Publik sesuai dengan Peraturan
                Perundang-undangan di bidang kearsipan.
              </li>
              <li>
                Mengkoordinasikan penyediaan dan pelayanan seluruh Informasi
                Publik melalui pengumuman dan atau permohonan.
              </li>
              <li>
                Melakukan pengujian tentang konsekuensi sebagaimana dimaksud
                Pasal 17 Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan
                Informasi Publik dengan seksama dan penuh ketelitian sebelum
                menyatakan Informasi Publik tertentu dikecualikan.
              </li>
              <li>
                Menyertakan alasan tertulis pengecualian Informasi Publik secara
                jelas dan tegas dalam hal permohonan Informasi Publik ditolak.
              </li>
              <li>
                Menghitamkan atau mengaburkan Informasi Publik yang dikecualikan
                beserta alasannya.
              </li>
              <li>
                Menetapkan pertimbangan tertulis atas kebijakan yang diambil
                untuk memenuhi hak setiap permohonan informasi.
              </li>
              <li>
                Mengembangkan kapasitas pejabat fungsional dan atau petugas
                informasi dalam rangka peningkatan kualitas layanan Informasi
                Publik.
              </li>
            </ul>
          </div>
          <div className="visi">
            <h3>Fungsi</h3>
            <p>
              Pembinaan dan Pengelolaan Penjabat Pengelola Informasi dan
              Dokumentasi Unit di lingkungan Kantor Kementerian Agama Kota
              Pematangsiantar.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <NewsLatest />
          <SurveyBoard/>
        </div>
      </div>
    </>
  );
};

export default TugasFungsi;
