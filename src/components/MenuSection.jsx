import React from "react";
import { Link } from "react-router-dom";
import "../styles/MenuSection.css";

const MenuSection = () => {
  return (
    <div className="menu-section py-2">
      <div className="container row">
        {/* <div className="row"> */}
          {/* Profil */}
          <div
            className="col-5 col-md-6
"
          >
            <Link to="/sejarah" className="menu-card d-flex ">
              <i className="bi bi-people-fill icon-green me-3"></i>
              <div>
                <h5>Profil</h5>
                <p className="">
                  Berisi informasi tentang sejarah, visi misi dan struktur
                  organisasi.
                </p>
              </div>
            </Link>
          </div>

          {/* Layanan */}
          <div className="col-5 col-md-6">
            <Link to="/layanan" className="menu-card d-flex">
              <i className="bi bi-globe icon-green me-3"></i>
              <div>
                <h5>Layanan</h5>
                <p className="">
                  Menyediakan akses pelayanan masyarakat berbasis digital.
                </p>
              </div>
            </Link>
          </div>

          {/* Berita */}
          <div
            className="col-5 col-md-6
 "
          >
            <Link to="/berita" className="menu-card d-flex ">
              <i className="bi bi-newspaper icon-green me-3"></i>
              <div>
                <h5>Berita</h5>
                <p className="">
                  Kumpulan berita terkini mengenai kegiatan dan program kerja.
                </p>
              </div>
            </Link>
          </div>

          {/* Kontak */}
          <div
            className="col-5 col-md-6 
"
          >
            <Link to="/kontak" className="menu-card d-flex ">
              <i className="bi bi-phone icon-green me-3"></i>
              <div>
                <h5>Pengaduan</h5>
                <p className="">
                  Informasi tentang pengaduan masyarakat.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default MenuSection;
