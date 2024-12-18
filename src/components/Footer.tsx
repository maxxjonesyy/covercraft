import { Link } from "react-router-dom";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="text-sm md:text-base py-6 text-center bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-6">
          {/* Need to create this when the site is live  */}

          {/* <Link
            to="/privacy"
            className="hover:text-[#3943B7] transition-colors">
            Privacy Policy
          </Link>
          <div className="text-gray-400">|</div> */}
          <a
            href="https://tcxfl25krmr.typeform.com/to/EcPulg8v"
            target="_blank"
            className="hover:text-accentBlue transition-colors">
            Contact
          </a>
          <div className="text-gray-400">|</div>

          <a
            href="https://github.com/maxxjonesyy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-accentBlue transition-colors"
            aria-label="GitHub Repository">
            <Github size={18} />
            <p>maxxjonesyy</p>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
