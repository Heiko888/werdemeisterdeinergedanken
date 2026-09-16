import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Node-Test-Dateien (laufen über `npm test`, nicht über den Next-Build).
    // Sie nutzen bewusst `.ts`-Importe für den nativen Node-Test-Runner.
    "src/**/*.test.ts",
    // Supabase Edge Functions laufen auf Deno (eigene Runtime/Globals),
    // nicht im Next-Build – daher hier ausgenommen.
    "supabase/functions/**",
  ]),
]);

export default eslintConfig;
