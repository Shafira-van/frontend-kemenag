import React, { useState } from "react";
import "../styles/Contact.css";
import Footer from "../components/Footer";
import { API_URL, API_UPLOADS } from "../config";
import NewsLatest from "../components/NewsLatest";
import SurveyBoard from "../components/SurveyBoard";
import Swal from "sweetalert2";

const Contact = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi field
    if (!nama.trim() || !email.trim() || !pesan.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Semua field wajib diisi.",
        confirmButtonText: "OK",
        confirmButtonColor: "#0b8043",
      });
      return;
    }

    // Konfirmasi sebelum kirim
    const result = await Swal.fire({
      title: "Kirim Pengaduan?",
      text: "Pastikan data dan pesan yang Anda masukkan sudah benar.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Kirim",
      cancelButtonText: "Batal",
      reverseButtons: true,
      confirmButtonColor: "#0b8043",
      cancelButtonColor: "#6c757d",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    // Popup loading
    Swal.fire({
      title: "Mengirim Pengaduan...",
      text: "Mohon tunggu sebentar.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch(`${API_URL}/pengaduan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: nama.trim(),
          email: email.trim(),
          pesan: pesan.trim(),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Gagal mengirim pengaduan.");
      }

      // Reset form
      setNama("");
      setEmail("");
      setPesan("");

      // Popup berhasil
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Pengaduan Anda berhasil dikirim.",
        html: `
    <p>Terima kasih atas pengaduan yang telah disampaikan.</p>
    <p>
      Kami akan menindaklanjuti pengaduan dan menghubungi Anda
      melalui email yang telah didaftarkan.
    <strong>Mohon untuk memeriksa email secara berkala.</strong>
    </p>
  `,
        confirmButtonText: "OK",
        confirmButtonColor: "#0b8043",
        timer: 2500,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("Error submit pengaduan:", err);

      Swal.fire({
        icon: "error",
        title: "Gagal Mengirim",
        text:
          err.message ||
          "Terjadi kesalahan saat mengirim pengaduan. Silakan coba lagi.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#d33",
      });
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
            <SurveyBoard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
