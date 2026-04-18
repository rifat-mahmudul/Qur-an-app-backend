import axios from "axios";

const BASE_URL = "https://api.alquran.cloud/v1";

export type SurahSummary = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

export type AyahSearchResult = {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
};

const getAllSurah = async (): Promise<SurahSummary[]> => {
  const res = await axios.get(`${BASE_URL}/surah`);

  const surahs = res.data?.data || [];

  return surahs.map(
    (surah: any): SurahSummary => ({
      number: surah.number,
      name: surah.name,
      englishName: surah.englishName,
      englishNameTranslation: surah.englishNameTranslation,
      numberOfAyahs: surah.numberOfAyahs,
      revelationType: surah.revelationType,
    }),
  );
};

const getSurahById = async (id: number, lang: string = "en.asad") => {
  const res = await axios.get(`${BASE_URL}/surah/${id}/${lang}`);

  return res.data?.data;
};

const searchSurah = async (query: string) => {
  const res = await axios.get(`${BASE_URL}/surah`);

  const surahs = res.data?.data || [];

  const q = query.toLowerCase();

  return surahs.filter((surah: any) => {
    return (
      surah.name.toLowerCase().includes(q) ||
      surah.englishName.toLowerCase().includes(q) ||
      surah.englishNameTranslation.toLowerCase().includes(q) ||
      surah.revelationType.toLowerCase().includes(q)
    );
  });
};

const searchAyah = async (query: string): Promise<AyahSearchResult[]> => {
  const res = await axios.get(`${BASE_URL}/quran/en.asad`);

  const surahs = res.data?.data?.surahs || [];

  const results: AyahSearchResult[] = [];

  const q = query.toLowerCase();

  for (const surah of surahs) {
    for (const ayah of surah.ayahs) {
      if (ayah.text.toLowerCase().includes(q)) {
        results.push({
          surahNumber: surah.number,
          surahName: surah.englishName,
          ayahNumber: ayah.numberInSurah,
          text: ayah.text,
        });
      }
    }
  }

  return results;
};

export const SurahService = {
  getAllSurah,
  getSurahById,
  searchSurah,
  searchAyah,
};
