import React, { useState, useEffect } from "react";
import "../styles/Layanan.css";
import Footer from "../components/Footer";
import { API_URL } from "../config";

const Layanan = () => {
  const [layananData, setLayananData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/layanan`)
      .then((res) => res.json())
      .then((data) => {
        setLayananData(data);
        if (Array.isArray(data) && data.length > 0) {
          setSelected(data[0]);
        }
      })
      .catch((err) => console.error("Gagal memuat data layanan:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="layanan container">
        <div className="text-center mb-2">
          <h2 className="section-title">Layanan Kami</h2>
          <p className="text-muted">
            Pilih salah satu layanan untuk melihat detail
          </p>
        </div>

        <div className="row">
          {/* Sidebar daftar layanan */}
          <div className="col-md-4 layanan-list-container">
            <div className="list-group layanan-scroll">
              {loading
                ? Array(5)
                    .fill()
                    .map((_, i) => (
                      <div
                        key={i}
                        className="skeleton skeleton-list mb-2"
                      ></div>
                    ))
                : layananData.map((item) => (
                    <button
                      key={item.id}
                      className={`list-group-item list-group-item-action ${
                        selected?.id === item.id ? "active" : ""
                      }`}
                      onClick={() => setSelected(item)}
                    >
                      {item.title}
                    </button>
                  ))}
            </div>
          </div>

          {/* Detail layanan */}
          <div className="col-md-8">
            {loading ? (
              <div className="card p-4 shadow-sm">
                <div className="skeleton skeleton-title mb-3"></div>
                <div className="skeleton skeleton-text mb-2"></div>
                <div className="skeleton skeleton-text mb-2"></div>
                <div className="skeleton skeleton-text w-75"></div>
              </div>
            ) : selected ? (
              <div className="card shadow-lg p-4 border-success">
                <h4 className="fw-bold text-success mb-2">{selected.title}</h4>
                <p className="text-muted">{selected.desc}</p>

                {selected.requirements && (
                  <>
                    <h6 className="fw-bold text-success mt-3">Persyaratan</h6>
                    <div
                      className="text-muted"
                      dangerouslySetInnerHTML={{
                        __html: selected.requirements,
                      }}
                    />
                  </>
                )}
                {selected.procedure && (
                  <>
                    <h6 className="fw-bold text-success mt-3">Prosedur</h6>
                    <div
                      className="text-muted"
                      dangerouslySetInnerHTML={{
                        __html: selected.procedure,
                      }}
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center text-center p-5 card shadow-sm">
                <p className="text-muted">
                  Silakan pilih layanan dari daftar di sebelah kiri.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Layanan;
