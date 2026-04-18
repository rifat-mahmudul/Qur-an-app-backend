import { Request, Response } from "express";
import { SurahService } from "./surah.service";

const getSurah = async (req: Request, res: Response) => {
  const surahs = await SurahService.getAllSurah();
  res.json({ success: true, data: surahs });
};

const getSurahById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const surah = await SurahService.getSurahById(id);

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
