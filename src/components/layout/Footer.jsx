function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-(--color-background) p-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

        <h1 className="text-2xl font-bold tracking-widest text-red-500">
          CINEPLAS
        </h1>

        <p className="text-center text-sm text-red-100">
          &copy; {new Date().getFullYear()} CINEPLAS. All rights reserved.
        </p>

     
        <ul className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <li>
            <a
              className="text-white transition hover:text-red-500"
              href="/terms"
            >
              Terms
            </a>
          </li>

          <li>
            <a
              className="text-white transition hover:text-red-500"
              href="/privacy"
            >
              Privacy
            </a>
          </li>

          <li>
            <a
              className="text-white transition hover:text-red-500"
              href="/contact"
            >
              Contact
            </a>
          </li>
        </ul>

      </div>
    </footer>
  );
}

export default Footer;