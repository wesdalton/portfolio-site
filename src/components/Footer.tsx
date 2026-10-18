export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Wesley Dalton</p>
      <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  );
}
