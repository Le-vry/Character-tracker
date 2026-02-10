import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from "path";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: "postgresql://charactertrackerdb_user:A1ov2hMZuxVp25aoKaJEG50h3MUc6DoF@dpg-d64tl8ngi27c73bal8tg-a.frankfurt-postgres.render.com/charactertrackerdb",
  },
});
