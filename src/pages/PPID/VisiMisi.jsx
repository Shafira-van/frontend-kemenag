
import React from "react";
import "../../styles/PPID/VisiMisi.css";
import Footer from "../../components/Footer";
import NewsLatest from "../../components/NewsLatest";
import SurveyBoard from "../../components/SurveyBoard";

import {
  Eye,
  Target,
  CheckCircle2,
  Landmark,
  ShieldCheck,
} from "lucide-react";

const VisiMisi = () => {
  return (
    <>
      <main className="visiMisi">
        <section className="visi-hero">
          <div className="visi-container">
            {/* HEADER */}
            <div className="visi-heading">
              <h1>
                Visi & <span>Misi</span>
              </h1>

              <p>
                Komitmen PPID Kementerian Agama Kota Pematangsiantar
                dalam mewujudkan pelayanan informasi publik yang
                transparan dan akuntabel.
              </p>
            </div>

            {/* KONTEN */}
            <div className="visi-layout">
              <div className="visi-content">
                {/* VISI */}
                <article className="visi-card">
                  <div className="visi-card-heading">
                    <div className="visi-icon">
                      <Eye size={25} />
                    </div>

                    <div>
                      <span>ARAH DAN HARAPAN</span>
                      <h2>Visi</h2>
                    </div>
                  </div>

                  <div className="visi-divider" />

                  <p className="visi-statement">
                    Terwujudnya pelayanan informasi yang akuntabel
                  </p>
                </article>

                {/* MISI */}
                <article className="visi-card misi-card">
                  <div className="visi-card-heading">
                    <div className="visi-icon visi-icon-gold">
                      <Target size={25} />
                    </div>

                    <div>
                      <span>LANGKAH PENCAPAIAN</span>
                      <h2>Misi</h2>
                    </div>
                  </div>

                  <div className="visi-divider" />

                  <ul className="misi-list">
                    <li>
                      <CheckCircle2 size={20} />
                      <span>
                        Meningkatkan layanan informasi yang cepat,
                        tepat, dan transparan.
                      </span>
                    </li>

                    <li>
                      <CheckCircle2 size={20} />
                      <span>
                        Meningkatkan kompetensi SDM pelayan informasi.
                      </span>
                    </li>

                    <li>
                      <CheckCircle2 size={20} />
                      <span>
                        Penguatan koordinasi antar PPID lintas sektoral.
                      </span>
                    </li>
                  </ul>
                </article>
              </div>

              {/* SIDEBAR */}
              <aside className="visi-sidebar">
                <NewsLatest />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SurveyBoard />
      <Footer />
    </>
  );
};

export default VisiMisi;

