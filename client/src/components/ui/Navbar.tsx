"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed w-full top-0 z-50 shadow-md transition-colors duration-300"
      style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Nome da Aplicação */}
          <Link
            href="/"
            className="text-2xl font-bold transition-colors"
            style={{ color: "var(--text-color)" }}
          >
            TrendScout
          </Link>

          {/* Navegação Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="/dashboard"
              className="hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-color)" }}
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-color)" }}
            >
              About
            </Link>
          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            style={{ color: "var(--text-color)" }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div
          className="md:hidden shadow-md transition-colors"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <Link
            href="/dashboard"
            className="block px-4 py-2 transition-opacity hover:opacity-80"
            style={{ color: "var(--text-color)" }}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 transition-opacity hover:opacity-80"
            style={{ color: "var(--text-color)" }}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
