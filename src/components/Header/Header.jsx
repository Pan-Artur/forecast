export const Header = () => {
  return (
    <header>
      <div className="headerNavBox">
        <svg>
          <use></use>
        </svg>
        <nav className="headerNav">
          <a href="" className="headerNavItem">Who we are</a>
          <a href="" className="headerNavItem">Contacts</a>
          <a href="" className="headerNavItem">Menu</a>
        </nav>
      </div>
      <div className="headerLogInBox">
        <button type="button" className="headerBtn">Sing Up</button>
        <img src="" alt="Profile Picture" className="headerPP" />
      </div>
    </header>
  );
}