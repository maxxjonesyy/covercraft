function Navbar() {
  return (
    <nav className='container flex items-center justify-between mx-auto p-5 bg-white/20 rounded-md shadow-sm'>
      <h1 className='text-xl'>Covercraft</h1>

      <ul className='flex items-center gap-5 text-sm'>
        <li>
          <button className='px-4 py-2 border border-gray-300 rounded shadow-sm'>
            Sign in / Sign up
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
