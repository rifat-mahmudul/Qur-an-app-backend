import { Router } from "express";
import { SurahController } from "./surah.controller";

const router = Router();

// 🔹 all surahs
router.get("/", SurahController.getSurah);

// 🔹 single surah
router.get("/:id", SurahController.getSurahById);

export const SurahRoutes = router;