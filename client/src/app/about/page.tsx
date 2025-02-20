"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ToggleButton from "@/components/ui/ToggleButton";

const faqs = [
  {
    question: "O TrendScout é gratuito?",
    answer:
      "Sim! O TrendScout é uma plataforma gratuita que organiza e apresenta informações públicas de forma acessível.",
  },
  {
    question: "Como as tendências são coletadas?",
    answer:
      "Utilizamos APIs oficiais e fontes abertas como Google Trends, YouTube Trending e Reddit para garantir dados confiáveis e sempre atualizados.",
  },
  {
    question: "Posso personalizar as tendências que vejo?",
    answer:
      "Sim! Você pode filtrar por categoria, país e período, garantindo que veja apenas as tendências que realmente importam para você.",
  },
  {
    question:
      "O TrendScout coleta dados de redes sociais como Twitter e TikTok?",
    answer:
      "Estamos estudando a melhor forma de integrar essas plataformas. Algumas redes possuem restrições de API, mas buscamos trazer sempre as fontes mais relevantes.",
  },
  {
    question: "Como posso apoiar o projeto?",
    answer:
      "Se você gosta do TrendScout, pode apoiar o projeto compartilhando com seus amigos ou sugerindo novas funcionalidades!",
  },
];

export default function About() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="container mx-auto px-4 py-8 transition-colors"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">
          🚀 Sobre o TrendScout
        </h1>
        <ToggleButton />
      </div>

      {/* Introdução */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          🔍 O Que é o TrendScout?
        </h2>
        <p className="text-lg leading-relaxed">
          O <strong>TrendScout</strong> é uma plataforma inovadora que permite
          acompanhar as tendências mais quentes da internet em tempo real. Com
          uma interface dinâmica e intuitiva, reunimos dados de Google Trends,
          YouTube Trending, Reddit, Twitch e outras fontes para que você possa
          identificar padrões e tomar decisões estratégicas rapidamente.
        </p>
      </section>

      {/* Propósito */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🎯 Nosso Propósito</h2>
        <p className="text-lg leading-relaxed">
          O mundo digital está sempre mudando, e acompanhar essas mudanças pode
          ser um desafio. Nosso objetivo é simplificar esse processo, reunindo
          tudo o que você precisa saber em um único lugar.
        </p>
        <ul className="mt-4 list-disc list-inside space-y-2">
          <li>
            ✅ Descobrir tendências virais e criar conteúdos altamente
            engajadores.
          </li>
          <li>
            ✅ Monitorar mercados emergentes e se antecipar a novas
            oportunidades.
          </li>
          <li>
            ✅ Filtrar informações por categoria, país e período para análises
            precisas.
          </li>
          <li>
            ✅ Observar padrões de crescimento e prever tendências futuras.
          </li>
        </ul>
      </section>

      {/* Insights com IA */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          💡 Destaque: Geração de Insights com IA
        </h2>
        <p className="text-lg leading-relaxed">
          O <strong>TrendScout</strong> vai além de simplesmente mostrar
          tendências. Nossa tecnologia baseada em Inteligência Artificial
          analisa os dados coletados e gera insights detalhados sobre cada
          tendência.
        </p>
        <ol className="mt-4 list-decimal list-inside space-y-2">
          <li>1️⃣ Coletamos informações de diversas fontes em tempo real.</li>
          <li>
            2️⃣ A IA analisa os dados para entender o que está impulsionando a
            tendência.
          </li>
          <li>
            3️⃣ Criamos resumos inteligentes, destacando o impacto e relevância
            de cada tema.
          </li>
          <li>
            4️⃣ O usuário pode visualizar um resumo direto ou expandir para uma
            análise mais profunda.
          </li>
        </ol>
      </section>

      {/* Quem pode se beneficiar */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          📈 Quem Pode se Beneficiar do TrendScout?
        </h2>
        <ul className="mt-4 list-disc list-inside space-y-2">
          <li>
            🚀 <strong>Criadores de Conteúdo</strong> → Encontre os temas certos
            antes de todo mundo e crie conteúdos virais.
          </li>
          <li>
            📊 <strong>Empreendedores e Marketeiros</strong> → Descubra
            tendências que podem impactar o seu mercado.
          </li>
          <li>
            🎮 <strong>Fãs de Entretenimento</strong> → Acompanhe as novidades
            sobre filmes, séries, games e cultura pop.
          </li>
          <li>
            📰 <strong>Curiosos e Informados</strong> → Saiba o que está
            acontecendo no mundo em um só clique.
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          ❓ Perguntas Frequentes (FAQ)
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-lg font-semibold transition-all"
                onClick={() => toggleFAQ(index)}
                style={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-color)",
                }}
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  openIndex === index
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="p-4">{faq.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-center mt-6 text-lg font-semibold">
        📍{" "}
        <strong>
          TrendScout – O Seu Portal de Tendências Inteligentes! 🚀
        </strong>
      </p>
    </div>
  );
}
