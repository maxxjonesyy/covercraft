import { Link } from "react-router-dom";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="text-sm md:text-base py-6 text-center bg-transparent">
      <div className="max-w-[75rem] mx-auto px-5">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center space-x-4 text-gray-600">
            <a
              href="https://tcxfl25krmr.typeform.com/to/EcPulg8v"
              target="_blank"
              className="hover:text-accentBlue transition-colors">
              Contact
            </a>

            <div className="text-gray-400">|</div>
            <Link
              to="/privacy"
              className="hover:text-accentBlue transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 mt-2 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} Covercraft</p>
            <div className="text-gray-400">-</div>
            <a
              href="https://github.com/maxxjonesyy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex gap-0.5 hover:text-accentBlue transition-colors">
              <Github className="w-4 h-4" />
              Built by maxxjonesyy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
