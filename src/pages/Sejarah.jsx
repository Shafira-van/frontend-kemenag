import React, { useEffect, useState } from "react";
import "../styles/Sejarah.css";
import Footer from "../components/Footer";
import sejarahImg from "../assets/sejarah.png"; // ganti dengan gambar asli
import { API_URL } from "../config";
import NewsLatest from "../components/NewsLatest";
import InfoBoard from "../components/InfoBoard";

const Sejarah = () => {
  const [timelineData, setTimelineData] = useState([]);

  // Ambil data dari API
  useEffect(() => {
    fetch(`${API_URL}/profilKetua`)
      .then((res) => res.json())
      .then((data) => setTimelineData(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);
  console.log(timelineData);

  // Efek animasi muncul saat scroll
  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [timelineData]);

  return (
    <>
      <div className="sejarah container py-5">
        <h2 className="fw-bold section-title text-center mb-5">
          Sejarah Kementerian Agama Kota Pematangsiantar
        </h2>

        {/* Sejarah Singkat */}
        <div className="sejarah-content">
          <img src={sejarahImg} alt="Sejarah Kemenag" />
          <p>
            Departemen Agama Republik Indonesia dibentuk pada tanggal 3 Januari
            1946. Pada tahun 1948, Pulau Sumatera dibagi menjadi tiga wilayah
            provinsi yaitu Provinsi Sumatera Utara, Sumatera Tengah dan Sumatera
            Selatan. H. Mukhtar Yahya ditunjuk menjadi Koordinator jawatan agama
            oleh pemerintah pusat yang berkedudukan di Bukit Tinggi.
          </p>
          <p>Kepala-kepala jawatan agama di tiga wilayah Provinsi Sumatera:</p>
          <ul className="kepala-jawatan">
            <li>Teuku Daud Beureuh – Sumatera Utara</li>
            <li>Nazaruddin Toha – Sumatera Tengah</li>
            <li>K. Azhari – Sumatera Selatan</li>
          </ul>
          <p>
            Sementara itu, pada tahun 1953 pusat pemerintahan Provinsi Sumatera
            Utara yang berkedudukan di Banda Aceh merupakan gabungan dari Aceh,
            Sumatera Timur dan Tapanuli. Pada tahun 1956 pemerintah Sumatera
            Utara bergabung menjadi satu keresidenan Sumatera Timur dan Tapanuli
            yang berkedudukan di Medan dengan K. H. Muchlis sebagai Kepala
            jawatan agama. Sejak saat itu, Provinsi Aceh dan Sumatera Utara
            berdiri sendiri.
          </p>
          <p>
            Selanjutnya, roda pemerintahan diatur berdasarkan peraturan yang
            ditetapkan oleh kementerian pusat. Sementara itu, kepemimpinan
            keagamaan masih berada di bawah kewenangan para raja yang jumlahnya
            cukup banyak, dengan peraturan yang disesuaikan menurut kondisi
            masyarakat pada masa tersebut. Setelah Indonesia merdeka, di setiap
            keresidenan dibentuk Komite Nasional Daerah Sumatera Timur yang
            berfungsi sebagai lembaga legislatif sekaligus membawahi berbagai
            badan keagamaan. Pada masa itu, jabatan qadhi juga telah dikenal dan
            berperan dalam urusan keagamaan masyarakat. Seiring dengan perubahan
            struktur ketatanegaraan, dua keresidenan — Sumatera Utara dan
            Tapanuli — digabung menjadi satu wilayah administratif, yaitu
            Provinsi Sumatera Utara. Penyesuaian ini turut berdampak pada
            pembentukan dan penataan Jawatan Agama di daerah. Sejak saat itu,
            struktur organisasi Departemen Agama terus mengalami penyempurnaan
            secara bertahap. Pelaksanaan tugas dan fungsi instansi ini kemudian
            disesuaikan dengan ketentuan yang tercantum dalam Peraturan Menteri
            Agama Nomor 10 Tahun 1952, yang menjadi dasar pembenahan kelembagaan
            dan tata kerja di lingkungan Departemen Agama.
          </p>
          <p>
            Dengan terbitnya Keputusan Menteri Agama Republik Indonesia Nomor 18
            Tahun 1976, pada tanggal 12 Desember 1976 secara resmi ditetapkan
            kemandirian berdirinya Kantor Departemen Agama Kota Pematangsiantar.
            Sebelumnya, Kantor Departemen Agama Kota Pematangsiantar masih
            merupakan bagian yang terintegrasi dengan Kantor Departemen Agama
            Kabupaten Simalungun, yang pada waktu itu beralamat di Jalan
            Thamrin, Kota Pematangsiantar. Selanjutnya, pada tahun 1978,
            domisili Kantor Departemen Agama Kota Pematangsiantar resmi
            dipindahkan ke Jalan Brigjend Purba, S.H. No. 122, yang menjadi
            lokasi tetap hingga saat ini.
          </p>
          <p>
            Adapun stuktur organisasi Kantor Kementerian agama Kota
            Pematangsiantar, berdasarkan Peraturan Menteri Agama Nomor 6 tahun
            2022, sebagai berikut:
          </p>
          <ul>
            <li>Subbagian Tata Usaha </li>
            <li>Seksi Bimbingan Masyarakat Islam</li>
            <li>Seksi Bimbingan Masyarakat Kristen</li>
            <li>Seksi Penyelenggaraan Haji dan Umrah</li>
            <li>Seksi Pendidikan Madrasah</li>
            <li>Seksi Pendidikan Agama dan Keagamaan Islam</li>
            <li>Penyelenggara Zakat dan Wakaf </li>
            <li>Penyelenggara Buddha</li>
            <li>Penyelenggara Katolik</li>
          </ul>
          <p>
            Kantor Kementerian Agama Kota Pematangsiantar membawahi delapan
            Kantor Urusan Agama (KUA) Kecamatan, serta tiga satuan pendidikan
            madrasah negeri, yaitu: Madrasah Ibtidaiyah Negeri (MIN), Madrasah
            Tsanawiyah Negeri (MTsN), dan Madrasah Aliyah Negeri (MAN)
            Pematangsiantar, yang seluruhnya berada di bawah koordinasi Kantor
            Kementerian Agama Kota Pematangsiantar. Sebagai instansi vertikal
            Kementerian Agama Republik Indonesia yang tidak diotonomikan
            berdasarkan Undang-Undang Nomor 22 Tahun 1999, Kantor Kementerian
            Agama Kota Pematangsiantar tetap melaksanakan tugas dan fungsi
            pemerintahan secara terkoordinasi dengan berbagai pihak. Koordinasi
            tersebut dilakukan melalui kerja sama lintas sektoral, meliputi
            Pemerintah Kota Pematangsiantar beserta jajarannya, Majelis Ulama
            Indonesia (MUI), lembaga keagamaan, Lembaga Swadaya Masyarakat
            (LSM), lembaga pendidikan, serta organisasi sosial dan kepemudaan
            lainnya, dalam rangka memperkuat pelayanan dan pembinaan kehidupan
            beragama di wilayah Kota Pematangsiantar.
          </p>
        </div>
        <div className="row">
          <div className="col-md-8">
            {/* Timeline dari API */}
            <h2 className="section-title text-black text-center m-0">
              Urutan Periode Pejabat Kepala Kantor
            </h2>
            <div className="timeline-wrapper d-flex justify-content-center">
              <div className="timeline position-relative">
                <div className="timeline-line"></div>

                {timelineData.length > 0 ? (
                  timelineData.map((item, index) => (
                    <div
                      key={item.id}
                      className={`timeline-item mb-1 ${
                        index % 2 === 0 ? "left" : "right"
                      }`}
                    >
                      <div className="timeline-dot"></div>
                      <div className="timeline-content shadow-sm p-2 rounded bg-white">
                        {/* Sesuaikan field sesuai struktur API */}
                        <h5>{item.name}</h5>
                        <p>{item.year}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">
                    Memuat data timeline...
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <NewsLatest limit={6} />
            <InfoBoard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sejarah;
