import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import "../styles/InfoBoard.css";
import { API_URL, API_UPLOADS } from "../config";

function InfoBoard({ limit = 5 }) {
  const [infoItems, setInfoItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ============================================================
        // GET INFORMASI
        // Public API otomatis hanya mengembalikan status APPROVED
        // ============================================================
        const res = await fetch(`${API_URL}/informasi?limit=${limit}&page=1`);

        if (!res.ok) {
          throw new Error("Gagal mengambil data informasi");
        }

        const response = await res.json();

        // ============================================================
        // RESPONSE BARU:
        // {
        //   page,
        //   limit,
        //   total,
        //   data: [...]
        // }
        // ============================================================
        const data = Array.isArray(response) ? response : response?.data || [];

        // ============================================================
        // BACKEND SUDAH ORDER BY:
        // date DESC, id DESC
        //
        // Tetapi tetap dilakukan sorting di frontend
        // sebagai pengaman.
        // ============================================================
        const sorted = [...data]
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (dateB - dateA !== 0) {
              return dateB - dateA;
            }

            return Number(b.id || 0) - Number(a.id || 0);
          })
          .slice(0, limit);

        setInfoItems(sorted);
      } catch (error) {
        console.error("Gagal memuat data informasi:", error);

        setInfoItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  // ============================================================
  // FORMAT TANGGAL
  // ============================================================
  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ============================================================
  // FILE URL
  // ============================================================
  const getFileUrl = (item) => {
    // Prioritas file_url dari backend
    if (item?.file_url) {
      return item.file_url;
    }

    // Fallback menggunakan API_UPLOADS
    if (item?.file_path) {
      return `${API_UPLOADS}/${String(item.file_path).replace(/^\/+/, "")}`;
    }

    return "#";
  };

  return (
    <div className="papan-info">
      {/* ==========================================================
          HEADER
          ========================================================== */}
      <div className="papan-header">
        <FileText size={24} className="text-success" />

        <h4>Papan Informasi</h4>
      </div>

      {/* ==========================================================
          LOADING
          ========================================================== */}
      {loading ? (
        <ul className="papan-list">
          <li className="papan-item">
            <div className="info-link">
              <span className="info-title">Memuat informasi...</span>

              <span className="info-date">...</span>
            </div>
          </li>
        </ul>
      ) : infoItems.length === 0 ? (
        /* ========================================================
           EMPTY
           ======================================================== */
        <p className="text-center text-muted">Belum ada informasi.</p>
      ) : (
        /* ========================================================
           DATA INFORMASI
           ======================================================== */
        <ul className="papan-list">
          {infoItems.map((item) => {
            const fileUrl = getFileUrl(item);

            return (
              <li key={item.id} className="papan-item">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-link"
                >
                  <span className="info-title">{item.title}</span>

                  <span className="info-date">{formatDate(item.date)}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {/* ==========================================================
          FOOTER
          ========================================================== */}
      <div className="papan-footer">
        <a href="/informasi" className="lihat-semua">
          Lihat Semua Informasi
        </a>
      </div>
    </div>
  );
}

export default InfoBoard;
