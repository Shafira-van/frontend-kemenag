import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* Bagian Atas */}
      <div className="footer-top container">
        <div className="row align-items-start gy-4">
          {/* Kolom 1 - Info Singkat */}
          <div className="col-md-4 mb-1 footer-info">
            <h5>Jam Pelayanan</h5>
            <table className="table table-borderless footer-table">
              <tbody>
                <tr>
                  <td>Senin</td>
                  <td>07.30 - 16.00</td>
                </tr>
                <tr>
                  <td>Selasa</td>
                  <td>07.30 - 16.00</td>
                </tr>
                <tr>
                  <td>Rabu</td>
                  <td>07.30 - 16.00</td>
                </tr>
                <tr>
                  <td>Kamis</td>
                  <td>07.30 - 16.00</td>
                </tr>
                <tr>
                  <td>Jumat</td>
                  <td>07.30 - 16.30</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kolom 2 - Kontak */}
          <div className="col-md-4 mb-4 footer-contact">
            <h5>Kontak Kami</h5>
            <ul className="list-unstyled footer-contact-list">
              <li>
                <FaPhone /> <span>+62 851-2303-2236</span>
              </li>
              <li>
                <FaEnvelope /> <span>kotapematangsiantar@kemenag.go.id</span>
              </li>
              <li>
                <FaMapMarkerAlt />{" "}
                <span>
                  Jl. Rajamin Purba No.119, Bukit Sofa, Kec. Siantar Sitalasari
                </span>
              </li>
            </ul>

            <div className="social-icons">
              <a
                href="https://m.facebook.com/kemenagsiantar/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/kemenag_pematangsiantar/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/+6285123032236"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Kolom 3 - Peta Lokasi */}
          <div className="col-md-4 footer-map">
            <h5>Lokasi Kami</h5>
            <div className="map-container">
              <iframe
                title="Kantor Kementerian Agama Kota Pematangsiantar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.4896189429987!2d99.0499901!3d2.9615571000000163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031848cc004c0f7%3A0xf0b6e949b090c7cc!2sKantor%20Kementrian%20Agama!5e0!3m2!1sid!2sid!4v1758871141095!5m2!1sid!2sid"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Garis Pemisah */}
      <div className="footer-divider"></div>

      {/* Bagian Bawah */}
      <div className="footer-bottom text-center">
        <p>
          © 2025 Kementerian Agama Kota Pematangsiantar — Semua Hak Dilindungi
        </p>
      </div>
    </footer>
  );
}

export default Footer;
