"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-6">
      {/* Container da imagem com animação */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Imagem do Braid */}
        <Image
          src="/images/Braid-Castle2.gif"
          alt="Erro 404 - Página não encontrada"
          width={640}
          height={360}
          className="rounded-lg shadow-lg"
        />

        {/* Texto no centro da imagem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="bg-black bg-opacity-60 p-4 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold">⚠️ Ops! ⚠️</h1>
            <p className="mt-2 text-lg">
              Acho que esta página está em outro castelo...
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Erro 404 - Estamos trabalhando nisso!
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Botão para voltar à home */}
      <Link href="/">
        <motion.button
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔙 Voltar ao Início
        </motion.button>
      </Link>
    </div>
  );
}
