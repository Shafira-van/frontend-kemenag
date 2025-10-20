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
          <img
            src={sejarahImg}
            alt="Sejarah Kemenag"
          />
          <p>
            Setelah Indonesia Merdeka tanggal 17 Agustus 1945 Departemen Agama
            belum dibentuk, baru pada tanggal 3 Januari 1946 Departemen Agama
            resmi dibentuk oleh pemerintah. Pada tahun 1948 Sumatera dibagi
            menjadi tiga provinsi yaitu Provinsi Sumatera Utara, Sumatera Tengah
            dan Sumatera Selatan. Koordinator jawatan agama ditunjuk oleh
            pemerintah pusat H. Mukhtar Yahya berkedudukan di Bukit Tinggi.
          </p>
          <p>
            Kepala-kepala jawatan agama di tiga wilayah Provinsi Sumatera itu
            ialah:
          </p>
          <ul className="kepala-jawatan">
            <li>Teuku Daud Beureuh – Sumatera Utara</li>
            <li>Nazaruddin Toha – Sumatera Tengah</li>
            <li>K. Azhari – Sumatera Selatan</li>
          </ul>
          <p>
            Sementara itu pada tahun 1953 Provinsi Sumatera Utara merupakan
            gabungan dari Aceh, Sumatera Timur dan Tapanuli. Pusat pemerintahan
            di Banda Aceh. Tahun 1956 struktur pemerintahan berubah lagi,
            pemerintah Sumatera Utara sebagai gabungan keresidenan Sumatera
            Timur dan Tapanuli berkedudukan di Medan. Kepala jawatan agamanya
            adalah K. H. Muchlis. Sejak saat itu masing-masing daerah Aceh dan
            Sumatera Utara berdiri sendiri.
          </p>
          <p>
            Selanjutnya roda pemerintah diatur berdasarkan peraturan-peraturan
            ditetepkan oleh kementrian pusat.Sedangkan pimpinan keagamaan masih
            dipegang oleh raja-raja yang jumlahnya tidak sedikit dan
            peraturannya masing-masing sesuai dengan kondisi masyarakat pada
            waktu itu. Setelah Indonesia Merdeka di setiap keresidenan dibentuk
            Komite Nasional Daerah Sumatera Timur yang merupakan legilatif dan
            badan-badan agama. Saat itu juga sudah ada qadhi.Selanjutnya
            struktur ketatanegaraan berubah , kedua keresidenan Sumatera Utara
            dan Tapanulli digabung menjadi satu, menjadi Provinsi Sumatera Utara
            sehingga jawatan agama ikut menyesuaikan diri. Dengan demikian
            struktur Departemen agama berangsur-angsur disempurnakan dan
            pelaksanaannya baru bisa disesuaikan dengan Peraturan Menteri Agama
            Nomor:10 Tahun 1952
          </p>
          <p>
            Selanjutnya, dengan terbitnya Keputusan Menteri Agam RI Nomor: 18
            tahun 1976,tepat pada tanggal 12 Desember 1976 secara resmi
            ditetapkan kemandirian berdirinya Kantor Departemen Agama Kota
            Pematangsiantar, sebelumnya Kantor Departemen Agama Kota
            Pematangsiantar secara integral pada awalnya merupakan bagian dari
            kandep. Agama Kabupaten Simalungun, beralamat di Jalan Thamrin Kota
            Pematangsiantar. Kemudian pada tahun 1978 domisili Kantor Departemen
            Agama Kota Pematangsiantar secara resmi dipindahkan ke Jalan
            Brigjend Purba,SH NO.122 hingga sekarang.
          </p>
          <p>
            Adapun stuktur organisasi Kantor Departemen/Kementrian agama Kota
            Pematangsiantar, berdasarkan Keputusan Menteri Agama Nomor 373 tahun
            2002, disposisikan dengan mengikuti pola tipologi II.B yang terdiri
            dari:
          </p>
          <ul>
            <li>Sub Bagian Tata Usaha </li>
            <li>Seksi Urusan Agama Islam </li>
            <li>Seksi Penyelenggaraan Haji dan Umrah</li>
            <li>Seksi Mapenda</li>
            <li>Seksi Penamas dan Pekapontren </li>
            <li>Penyelenggara Bimbingan Zakat dan Wakaf </li>
          </ul>
          <p>
            Membawahi tujuh Kantor Urusan Agama Kecamatan, satu MIN dan satu
            MTsN serta MAN P.Siantar sebagai jajaran koordinasi Kandepag Kota
            Pematangsiantar Sebagai instansi vertikal yang tidak diotonomikan
            (UU Nomor 22 Tahun 1999), Kantor Kementrian Agama Kota
            Pematangsiantar juga berkoordinasi melalui aplikasi lintas sectoral
            dengan pihak pemerintah Kota dan jajarannya, MUI dan Lembaga
            keagamaan, LSM, lembaga pendidikan serta berbagai organisaisi
            sosial, pemuda dll.
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
