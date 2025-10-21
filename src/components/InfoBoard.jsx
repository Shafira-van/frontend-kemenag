import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import "../styles/InfoBoard.css";
import { API_URL, API_UPLOADS} from "../config";

function InfoBoard({limit = 5}) {
  const [infoItems, setInfoItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/informasi`);
        const data = await res.json();

        // 🔹 Urutkan berdasarkan tanggal terbaru, ambil 5 teratas
        const sorted = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, limit);

        setInfoItems(sorted);
      } catch (error) {
        console.error("Gagal memuat data informasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="papan-info">
      <div className="papan-header">
        <FileText size={24} className="text-success" />
        <h4>Papan Informasi</h4>
      </div>

      {loading ? (
        <ul className="papan-list">
            <li className="papan-item">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="info-link"
              >
                <span className="info-title"></span>
                <span className="info-date">
                </span>
              </a>
            </li>
        </ul>
      ) : infoItems.length === 0 ? (
        <p className="text-center text-muted">Belum ada informasi.</p>
      ) : (
        <ul className="papan-list">
          {infoItems.map((item, i) => (
            <li key={i} className="papan-item">
              <a
                href={`${API_UPLOADS}/${item.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="info-link"
              >
                <span className="info-title">{item.title}</span>
                <span className="info-date">
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="papan-footer">
        <a href="/informasi" className="lihat-semua">
          Lihat Semua Informasi
        </a>
      </div>
    </div>
  );
}

export default InfoBoard;
