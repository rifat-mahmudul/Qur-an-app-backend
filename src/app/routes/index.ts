import express from "express";
import { SurahRoutes } from "../modules/surah/surah.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/surah",
    route: SurahRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
