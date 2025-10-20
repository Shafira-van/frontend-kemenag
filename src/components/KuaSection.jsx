import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/MenuSection.css";
import { API_URL } from "../config";

const KuaSection = () => {
  const [kuaList, setKuaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKuaList = async () => {
      try {
        const response = await fetch(`${API_URL}/kua`);
        if (!response.ok) throw new Error("Gagal mengambil data KUA");
        const data = await response.json();
        setKuaList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKuaList();
  }, []);

  // if (loading) return <p className="loading">Memuat data KUA...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="kua-grid four-cols">
      {kuaList.slice(0, 7).map((kua) => (
        <div key={kua.id} className="kua-card">
          <h3>{kua.name}</h3>
          <Link to={`/bimas-islam/kua/${kua.id}`} className="btn-detail">
            Lihat Detail
          </Link>
        </div>
      ))}
    </div>
  );
};

export default KuaSection;
