import React from "react";
import "../styles/Infografis.css";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function InfografisASN() {
  const genderData = {
    labels: ["Islam", "Kristen", "Katolik", "Buddha"],
    datasets: [
      {
        data: [267, 81, 15, 3],
        backgroundColor: ["#2e7d32", "#81c784"],
        borderWidth: 1,
      },
    ],
  };

  const golonganData = {
    labels: [ "Gol II", "Gol III", "Gol IV"],
    datasets: [
      {
        label: "Jumlah ASN",
        data: [113, 127, 126],
        backgroundColor: "#43a047",
        borderWidth: 1,
      },
    ],
  };

  const umurData = {
    labels: ["<30", "31–40", "41–50", ">50"],
    datasets: [
      {
        label: "Jumlah ASN",
        data: [29, 90, 123, 124],
        backgroundColor: ["#2e7d32", "#66bb6a", "#a5d6a7", "#c8e6c9"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12, font: { size: 10 } },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 20, font: { size: 10 } } },
    },
  };

  return (
    <div className="container-pegawai my-3">
      <h4 className="section-title text-dark">Data Pegawai</h4>

      {/* Grid 2x2 kecil */}
      <div className="row g-3">
        {/* Total ASN */}
        <div className="col-6">
          <div className="shadow-sm p-2 bg-white text-center rounded h-100 small-card">
            <i className="bi bi-people-fill icon-green fs-5"></i>
            <h6 className="fw-bold mb-1" style={{ fontSize: "1.2rem" }}>
              Total ASN
            </h6>
            <h4
              className="fw-bold text-success mb-0"
              style={{ fontSize: "1.6rem" }}
            >
              366
            </h4>
            <small className="text-muted">Keseluruhan</small>
          </div>
        </div>

        {/* Berdasarkan Agama */}
        <div className="col-6">
          <div className="shadow-sm p-2 bg-white rounded h-100 text-center small-card">
            <h6 className="mb-2" style={{ fontSize: "0.85rem" }}>
              Agama
            </h6>
            <div style={{ height: "140px" }}>
              <Doughnut data={genderData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Berdasarkan Golongan */}
        <div className="col-6">
          <div className="shadow-sm p-2 bg-white rounded h-100 text-center small-card">
            <h6 className="mb-2" style={{ fontSize: "0.85rem" }}>
              Golongan
            </h6>
            <div style={{ height: "140px" }}>
              <Bar data={golonganData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Berdasarkan Umur */}
        <div className="col-6">
          <div className="shadow-sm p-2 bg-white rounded h-100 text-center small-card">
            <h6 className="mb-2" style={{ fontSize: "0.85rem" }}>
              Umur
            </h6>
            <div style={{ height: "120px" }}>
              <Bar data={umurData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
