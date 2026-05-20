import React from "react";
import "../styles/VisiMisi.css";
import Footer from "../components/Footer";
import InfoBoard from "../components/InfoBoard";
import NewsLatest from "../components/NewsLatest";

const VisiMisi = () => {
  return (
    <>
      <div className="row visi-misi">
        <div className="col-md-8 ">
          <h2 className="section-title ">Visi & Misi</h2>
          <div className="visi">
            <h3>Visi</h3>
            <p>
              Kementerian Agama Yang Profesional Dan Andal Dalam Membangun
              Masyarakat Yang Soleh, Moderat, Cerdas Dan Unggul. Untuk
              Mewujudkan Indonesia Maju Yang Berdaulat, Mandiri Dan
              Berkepribadian Berdasarkan Gotong Royong
            </p>
          </div>

          <div className="misi">
            <h3>Misi</h3>
            <ul>
              <li>Meningkatkan kualitas kesalehan umat beragama.</li>
              <li>Memperkuat moderasi beragama & kerukunan umat beragama.</li>
              <li>Meningkatkan layanan keagamaan yang adil, mudah & merata.</li>
              <li>Meningkatkan layanan pendidikan yang merata dan bermutu.</li>
              <li>Meningkatkan produktivitas dan daya saing pendidikan.</li>
              <li>
                Memantapkan tata kelola pemerintahan yang baik{" "}
                <i>(good governance)</i>.
              </li>
            </ul>
          </div>

          <div className="tugas-pokok">
            <h3>Tugas dan Fungsi</h3>
            <p>
              Eksistensi Kementrian Agama bertugas untuk menyelenggarakan
              sebagian tugas umum pemerintahan dan Pembangunan di bidang agama.
              Kantor Kementrian Agama Kota Pematangsiantar mempunyai fungsi yang
              disesuaikan dan berpijak pada Peraturan Menteri Agama RI Nomor 19
              Tahun 2019 dan Peraturan Menteri Agama RI Nomor 42 Tahun 2016.
            </p>
            <ul>
              <li>
                Perumusan dan penetapan visi, misi, dan kebijakan teknis
                dibidang pelayanan dan bimbingan kehidupan beragama kepada
                masyarakat.
              </li>
              <li>Pelayanan, bimbingan, dan pembinaan kehidupan beragama.</li>
              <li>
                Pelayanan, bimbingan, dan pembinaan haji dan umrah, serta zakat
                dan wakaf.
              </li>
              <li>Pelayanan, bimbingan, dan pembinaan kehidupan beragama</li>
              <li>Pembinaan kerukunan umat beragama.</li>
              <li>
                Perumusan kebijakan teknis di bidang pengelolaan administrasi
                dan informasi.
              </li>
              <li>
                Pengoordinasian perencanaan, pengendalian program, pengawasan.
              </li>
              <li>
                Pelaksanaan hubungan dengan pemerintah daerah, instansi terkait,
                dan lembaga masyarakat dalam rangka pelaksanaan tugas
                Kementerian Agama.
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <NewsLatest />
          <InfoBoard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VisiMisi;
