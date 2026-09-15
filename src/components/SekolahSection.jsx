import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/MenuSection.css";
import { API_URL } from "../config";

export default function SekolahSection() { 

  const [sekolahList, setSekolahList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKuaList = async () => {
      try {
        const response = await fetch(`${API_URL}/sekolah`);
        if (!response.ok) throw new Error("Gagal mengambil data Madrasah");
        const data = await response.json();
        setSekolahList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      
    };
    fetchKuaList();
  }, []);

  // if (loading) return <p className="loading">Memuat data Sekolah...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="sekolah-grid four-cols">
      {sekolahList.slice(0, 7).map((sekolah) => (
        <div key={sekolah.id} className="sekolah-card">
          <h3>{sekolah.nama}</h3>
          <Link
            to={`/pendidikan-madrasah/madrasah/${sekolah.id}`}
            className="btn-detail"
          >
            Lihat Detail
          </Link>
        </div>
      ))}
    </div>
  );
}
