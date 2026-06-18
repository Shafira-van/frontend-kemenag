import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { API_URL } from "../config";

function Navbar() {
  const [satuanKerja, setSatuanKerja] = useState([]);
  const [showInfoPublik, setShowInfoPublik] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchSatuanKerja = async () => {
      try {
        const response = await fetch(`${API_URL}/satuankerja`);
        const data = await response.json();
        setSatuanKerja(data);
      } catch (error) {
        console.error("Gagal memuat data satuan kerja:", error);
      }
    };

    fetchSatuanKerja();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div className="container">
          {/* Logo + Text */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Seal_of_the_Ministry_of_Religious_Affairs_of_the_Republic_of_Indonesia.svg"
              alt="Logo Kemenag"
              className="logo"
            />
            <div className="brand-text">
              <div className="fw-bold text-uppercase">Kementerian Agama</div>
              <div className="text-muted small-text">Kota Pematangsiantar</div>
            </div>
          </a>

          {/* Burger Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {/* Beranda */}
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Beranda
                </a>
              </li>

              {/* Profil */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/profil"
                  id="profilDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profil
                </a>
                <ul className="dropdown-menu" aria-labelledby="profilDropdown">
                  <li>
                    <a className="dropdown-item" href="/sejarah">
                      Sejarah Kantor
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/kepala-kantor">
                      Kepala Kantor
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/visi-misi">
                      Visi &amp; Misi
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/struktur-organisasi">
                      Struktur Organisasi
                    </a>
                  </li>
                </ul>
              </li>

              {/* Layanan */}
              <li className="nav-item">
                <a className="nav-link" href="/layanan">
                  Layanan
                </a>
              </li>

              {/* Berita */}
              <li className="nav-item">
                <a className="nav-link" href="/berita">
                  Berita
                </a>
              </li>

              {/* PPID — dengan Informasi Publik sebagai nested submenu */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="ppidDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  PPID
                </a>
                <ul className="dropdown-menu" aria-labelledby="ppidDropdown">
                  <li>
                    <a className="dropdown-item" href="/profilppid">
                      Profil PPID
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/strukturorganisasippid">
                      Struktur Organisasi PPID
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/tugasfungsippid">
                      Tugas dan Fungsi PPID
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/visimisippid">
                      Visi, Misi, dan Motto PPID
                    </a>
                  </li>

                  {/* Divider sebelum Informasi Publik */}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  {/* Informasi Publik sebagai nested submenu */}
                  <li className="dropdown-submenu">
                    <button
                      type="button"
                      className="dropdown-item d-flex justify-content-between align-items-center border-0 bg-transparent w-100"
                      onClick={(e) => {
                        if (!isMobile) return;

                        e.preventDefault();
                        e.stopPropagation();

                        setShowInfoPublik((prev) => !prev);
                      }}
                    >
                      Informasi Publik
                      <span
                        className={`info-arrow ${showInfoPublik ? "open" : ""}`}
                      >
                        ▶
                      </span>
                    </button>

                    <ul
                      className={`dropdown-menu ${
                        showInfoPublik ? "submenu-open" : ""
                      }`}
                    >
                      <li>
                        <a className="dropdown-item" href="/informasi/Berkala">
                          Informasi Berkala
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/informasi/Serta%20Merta"
                        >
                          Informasi Serta Merta
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/informasi/Setiap%20Saat"
                        >
                          Informasi Tersedia Setiap Saat
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* Satuan Kerja (Dari API) */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="satuanKerjaDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Satuan Kerja
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="satuanKerjaDropdown"
                >
                  {satuanKerja.length > 0 ? (
                    satuanKerja.map((item) => (
                      <li key={item.id}>
                        <a
                          className="dropdown-item"
                          href={`/satuankerja/${item.id}`}
                        >
                          {item.nama}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li>
                      <span className="dropdown-item text-muted">
                        Memuat data...
                      </span>
                    </li>
                  )}
                </ul>
              </li>

              {/* Pengaduan */}
              <li className="nav-item">
                <a className="nav-link" href="/kontak">
                  Pengaduan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
