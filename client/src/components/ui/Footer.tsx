import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="w-full py-10 px-6 text-sm transition-colors"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        borderTop: "1px solid var(--card-border)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} TrendScout - O seu portal de tendências
          em tempo real.
        </p>

        {/* Links Úteis */}
        <nav className="flex space-x-6 mt-2 md:mt-0">
          <a href="/about" className="hover:opacity-75 transition-opacity">
            Sobre
          </a>
          <a href="/contact" className="hover:opacity-75 transition-opacity">
            Contato
          </a>
          <a href="/privacy" className="hover:opacity-75 transition-opacity">
            Privacidade
          </a>
        </nav>

        {/* Ícones Sociais */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
