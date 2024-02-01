const Navbar = () => {
    return (
      <nav className="bg-blue-500 p-5 mb-0">
        <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="flex items-center text-white text-logo font-bold">
                <img src="/images/Bakwan_SMP_5.png" alt="YourLogo" className="mr-2 h-14" />
                Bakwan Skyblock
            </a>
          <div className="space-x-4">   
            <a href="/contact" className="text-white text-lg">
              Discord Server
            </a>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;