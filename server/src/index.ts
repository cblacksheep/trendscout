import "dotenv/config";
import express from "express";
import cors from "cors";
import googleTrendsRouter from "./routes/googleTrends";
import youtubeTrendsRouter from "./routes/youtubeTrends";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 📌 Registrando as rotas
app.use("/api/google-trends", googleTrendsRouter);
app.use("/api/youtube-trends", youtubeTrendsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log("🛠️ Rotas disponíveis:");
  console.log("👉 /api/google-trends");
  console.log("👉 /api/youtube-trends");
});
