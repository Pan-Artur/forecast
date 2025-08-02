import { Container } from "../Container/Container.jsx";
import wasap from "../../assets/images/Header/wasap.webp";
import instagram from "../../assets/images/Header/instagram.webp";
import facbuk from "../../assets/images/Header/facbuk.webp";


export const Footer = () => {
  return (
    <footer>
      <Container>
        <svg>
          <use></use>
        </svg>
        <ul className="footerList">
          <li className="footerItem">Address</li>
          <li className="footerItem">Svobody str. 35</li>
          <li className="footerItem">Kyiv</li>
          <li className="footerItem">Ukraine</li>
        </ul>
        <div className="footerContacts">
          <h3 className="footerSuptitle">Contact us</h3>
          <ul className="footerContactsList">
            <li className="footerContactsItem">
              <img className="footerImg" src={wasap} alt="" />
            </li>
            <li className="footerContactsItem">
              <img className="footerImg" src={instagram} alt="" />
            </li>
            <li className="footerContactsItem">
              <img className="footerImg" src={facbuk} alt="" />
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};
