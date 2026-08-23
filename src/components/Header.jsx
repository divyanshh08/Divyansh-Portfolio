function Header({ profile }) {
  const firstName = profile.name.split(' ')[0]

  return (
    <header className="site-header">
      <a className="brand" href="#hero" aria-label="Go to top">
        <span className="brand-mark">{profile.name.charAt(0)}</span>
        <span className="brand-text">{firstName}</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a className="nav-cta" href="#contact">Contact</a>
      </nav>
    </header>
  )
}

export default Header
