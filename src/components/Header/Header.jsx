import logo from '../../assets/images/Header/logo.webp'
import user from '../../assets/images/Header/user.webp'

export const Header = () => {
  return (
    <header>
      <div className="headerNavBox">
        <img src={logo} alt="Profile Picture" className="headerPP" />
        <nav className="headerNav">
          <a href="" className="headerNavItem">Who we are</a>
          <a href="" className="headerNavItem">Contacts</a>
          <a href="" className="headerNavItem">Menu</a>
        </nav>
      </div>
      <div className="headerLogInBox">
        <button type="button" className="headerBtn">Sing Up</button>
        <img src={user} alt="Profile Picture" className="headerPP" />
      </div>
    </header>
  );
}