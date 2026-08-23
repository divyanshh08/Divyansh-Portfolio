function Footer({ profile }) {
  return (
    <footer className="site-footer">
      <p>{profile.name}</p>
      <a href="#hero">Back to top</a>
    </footer>
  )
}

export default Footer
