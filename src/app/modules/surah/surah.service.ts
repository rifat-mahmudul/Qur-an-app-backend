import axios from "axios";

const BASE_URL = "https://api.alquran.cloud/v1";

const getAllSurah = async () => {
  const res = await axios.get(`${BASE_URL}/surah`);

  console.log("res: ", res.data);

  return res.data.data.map((surah: any) => ({
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    numberOfAyahs: surah.numberOfAyahs,
    revelationType: surah.revelationType,
  }));
};

const getSurahById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/surah/${id}/en.asad`);

  return res.data.data;
};

export const SurahService = {
  getAllSurah,
  getSurahById,
};
