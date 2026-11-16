function Header({ count }) {
  return (
    <header className="header">
      <h1>دفترچه مخاطبین</h1>
      <p>
        مدیریت آسان مخاطبین شما
      </p>
      <div className="count">
        تعداد مخاطبین: {count}
      </div>
    </header>
  );
}
export default Header;
