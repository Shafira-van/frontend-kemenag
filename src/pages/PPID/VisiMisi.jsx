import React from "react";
import "../../styles/PPID/VisiMisi.css";
import Footer from "../../components/Footer";
import InfoBoard from "../../components/InfoBoard";
import NewsLatest from "../../components/NewsLatest";

const VisiMisi = () => {
  return (
    <>
      <div className="row visi-misi">
        <div className="col-md-8 ">
          <h2 className="section-title ">Visi & Misi</h2>
          <div className="visi">
            <h3>Visi</h3>
            <p>Terwujudnya pelayanan informasi yang akuntabel</p>
          </div>

          <div className="misi">
            <h3>Misi</h3>
            <ul>
              <li>
                Meningkatkan layanan informasi yang cepat, tepat, dan
                transparan.
              </li>
              <li>Meningkatkan kompetensi SDM pelayan informasi.</li>
              <li>Penguatan koordinasi antar PPID lintas sektoral.</li>
            </ul>
          </div>

          <div className="motto"></div>
        </div>
        <div className="col-md-4">
          <NewsLatest />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VisiMisi;
