function Navbar() {
  return (
    <nav className="max-w-[75rem] mx-auto flex items-center justify-between mx-auto p-5 bg-white/20 rounded-md shadow-sm">
      <h1 className="text-lg md:text-xl">Covercraft</h1>

      <ul className="flex items-center gap-5 text-sm">
        <li>
          <button className="px-4 py-2 border border-secondary rounded">
            Sign in / Sign up
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
