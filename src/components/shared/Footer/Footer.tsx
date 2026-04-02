const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-blue-800 p-8 text-neutral-50 tracking-widest">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Vivian
          Rion
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
