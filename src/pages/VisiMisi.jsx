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
              “Terwujudnya Masyarakat Kota Pematangsiantar yang taat beragama,
              maju, sejahtera dan cerdas serta saling menghormati antar sesame
              pemeluk agama dalam kehidupan bermasyarakat, berbangsa dan
              bernegara dalam wadah Negara Kesatuan Republik Indonesia.”
            </p>
          </div>

          <div className="misi">
            <h3>Misi</h3>
            <ul>
              <li>
                Meningkatkan kualitas bimbingan , pemahaman, pengamalan, dan
                pelayanan kehidupan beragama.
              </li>
              <li>Meningkatkan penghayatan moral dan etika keagamaan.</li>
              <li>Meningkatkan kualiutas Pendidikan umat beragama.</li>
              <li>Meningkatkan kualitas penyelenggaraan haji.</li>
              <li>Memberdayakan umat beragama dan lembaga keagamaan.</li>
              <li>Memperkokoh kerukunan umat beragama.</li>
            </ul>
          </div>

          <div className="tugas-pokok">
            <h3>Tugas Pokok</h3>
            <p>
              Eksistensi Kementrian Agama bertugas untuk menyelenggarakan
              sebagian tugas umum pemerintahan dan Pembangunan di bidang agama.
              Dalam hal ini, Kantor Wilayah Kementrian Agama Provinsi Sumatera
              Utara. Kemudian untuk menyelenggarakan tugas dimaksud, Kantor
              Kementrian Agama Kota Pematangsiantar mempuunyai fungsi yang
              disesuaikan dan berpijak pada KMA Nomor 373 Bab II Pasal 38.
            </p>
            <ul>
              <li>
                Merumuskan visi, misi serta kebijakan teknis dibidang pelayanan
                dan bimbingan kehidupan beragama di Kota Pematangsiantar;
              </li>
              <li>
                Melaksanakan kebijakan teknis dibidang penngelolaan administrasi
                dan informasi keagamaan;
              </li>
              <li>
                Pembinaan, pelayanan dan bimbingan dibidang Masyarakat Islam
                pelayanan Haji dan Umrah, pengembangan Zakat dan Wakaf ,
                Pendidikan agama islam pada Masyarakat dan pemberdayaan masjid,
                urusan agama, bimbingan Masyarakat Kristen, Katolik, Hindu dan
                Buddha;
              </li>
              <li>Pelayanan dan bimbingan krukunan umat beragama;</li>
              <li>
                Mengkoordinasikan perencanaan, pengendalian, dan pengawasan
                program;
              </li>
              <li>
                Melaksanakan hubungan dengan pemerintah daerah, instansi terkait
                dan lembaga Masyarakat dalam rangka pelaksanaan tugas Kementrian
                Agama Kota Pematangsiantar.
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <NewsLatest />
          <InfoBoard/>
        </div>
      </div>
        <Footer />
      
    </>
  );
};

export default VisiMisi;
