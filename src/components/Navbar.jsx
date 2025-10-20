import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { API_URL } from "../config";

function Navbar() {
  const [satuanKerja, setSatuanKerja] = useState([]);

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
            {/* Profil */}
            <li className="nav-item">
              <a className="nav-link" href="/">
                Beranda
              </a>
            </li>

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
                    Sejarah
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/visi-misi">
                    Visi & Misi
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/struktur-organisasi">
                    Struktur Organisasi
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/layanan">
                Layanan
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/berita">
                Berita
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/informasi">
                Informasi
              </a>
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

            <li className="nav-item">
              <a className="nav-link" href="/kontak">
                Pengaduan
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
