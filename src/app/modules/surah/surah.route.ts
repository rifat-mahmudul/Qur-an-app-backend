import { Router } from "express";
import { SurahController } from "./surah.controller";

const router = Router();

router.get("/", SurahController.getSurah);
router.get("/:id", SurahController.getSurahById);

export const SurahRoutes = router;