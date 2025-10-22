import React, { useState } from "react";
import "../styles/Contact.css";
import SocialMedia from "../components/JadwalSholat";
import Footer from "../components/Footer";
import { API_URL, API_UPLOADS } from "../config";
import NewsLatest from "../components/NewsLatest";

const Contact = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !email || !pesan) {
      alert("Semua field wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/pengaduan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, pesan }),
      });

      if (!res.ok) throw new Error("Gagal mengirim pengaduan");

      alert("Pengaduan berhasil dikirim!");
      setNama("");
      setEmail("");
      setPesan("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="contact container py-4">
        <div className="row">
          {/* Form Kontak */}
          <div className="col-md-8">
            <h2 className="text-center section-title mb-1">Hubungi Kami</h2>
            <form
              className="contact-form p-4 shadow rounded bg-white h-80"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label className="form-label">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan nama Anda"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Pesan</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Tulis pesan Anda"
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Kirim"}
              </button>
            </form>
          </div>

          {/* Info Kontak */}
          <div className="col-md-4">
            <NewsLatest />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
