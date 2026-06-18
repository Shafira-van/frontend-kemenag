import "../styles/SurveyBoard.css";
import { useState } from "react";
import {
  ClipboardCheck,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

function SurveyBoard() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`survey-fab ${open ? "open" : ""}`}>
      {/* Header */}
      <div className="survey-header" onClick={() => setOpen((prev) => !prev)}>
        <div className="survey-pulse"></div>

        <div className="survey-content-top">
          <div className="survey-icon">
            <ClipboardCheck size={20} />
          </div>

          <div className="survey-text">
            <span>SURVEI</span>
            <small>Survei Pelayanan</small>
          </div>

          <div className="survey-arrow">
            {open ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={`survey-body ${open ? "show" : ""}`}>
        <div className="survey-badge">SPKP & SPAK</div>

        <p>
          Bantu kami meningkatkan kualitas pelayanan dan integritas layanan.
        </p>

        <div className="survey-features">
          <div className="survey-feature">
            <BadgeCheck size={14} />
            <span>Pelayanan Berkualitas</span>
          </div>

          <div className="survey-feature">
            <ShieldCheck size={14} />
            <span>Anti Korupsi</span>
          </div>
        </div>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSckJFl4DDjT1dfzC5eMU5QnxM75QJkwv1WlB30VtvRiuEPBGw/viewform?usp=sharing&ouid=102186041765972498947"
          target="_blank"
          rel="noreferrer"
          className="survey-btn"
        >
          Isi Survei
        </a>
      </div>
    </div>
  );
}

export default SurveyBoard;
