import { Container } from "../Contaner/Container";

export const Footer = () => {
  return (
    <footer>
      <Container >
        
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
              <svg className="footerItem">
                <use></use>
              </svg>
            </li>
            <li className="footerContactsItem">
              <svg className="footerItem">
                <use></use>
              </svg>
            </li>
            <li className="footerContactsItem">
              <svg className="footerItem">
                <use></use>
              </svg>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}