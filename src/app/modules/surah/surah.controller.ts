import { Request, Response } from "express";
import { SurahService } from "./surah.service";

const getSurah = async (req: Request, res: Response): Promise<void> => {
  try {
    const q = (req.query.q as string)?.trim();

    if (q) {
      const results = await SurahService.searchAyah(q);

      res.status(200).json({
        success: true,
        type: "search",
        query: q,
        data: results,
      });
      return;
    }

    const surahs = await SurahService.getAllSurah();

    res.status(200).json({
      success: true,
      type: "surah-list",
      data: surahs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
};

const getSurahById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const lang = (req.query.lang as string) || "en.asad";

    if (!id || isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid surah id",
      });
      return;
    }

    const surah = await SurahService.getSurahById(id, lang);

    if (!surah) {
      res.status(404).json({
        success: false,
        message: "Surah not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: surah,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const SurahController = {
  getSurah,
  getSurahById,
};
