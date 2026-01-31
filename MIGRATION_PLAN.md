# Plan de migracion de dependencias

Estado actual: proyecto migrado y estable en `Next 16.x` + `ESLint 9.x` (CLI).
La siguiente major pendiente es `ESLint 10`, que aun requiere resolver peers del ecosistema.

## Fase 0 (hecha)

- Mantener stack estable:
  - `next@^15.5.12`
  - `eslint-config-next@^15.5.12`
  - `eslint@^9.39.3`
  - `@eslint/js@^9.39.3`
- Mantener `next lint` en esta fase para evitar ruptura con config legacy.
- Actualizar patches seguros:
  - `postcss@^8.5.8`
  - `@types/node@^22.19.15`
- Proteger `npm-check-updates` con `.ncurc.json` para bloquear majors sensibles.

## Fase 1 (upgrade a Next 16) - completada

1. Crear rama dedicada:
   - `upgrade/next16`
2. Actualizar dependencias acopladas en una sola tanda:
   - `next@latest`
   - `eslint-config-next@latest`
3. Ejecutar codemod oficial:
   - `npx @next/codemod@canary next-lint-to-eslint-cli .`
4. Una vez aplicado el codemod, migrar script:
   - `npm run lint -> eslint . --max-warnings=0`
5. Validar:
   - `npm run lint`
   - `npm run build`
   - smoke test manual (tema, i18n, middleware, navegacion)

## Fase 2 (ecosistema ESLint) - pendiente parcial

1. Subir `eslint`/`@eslint/js` a major compatible con `eslint-config-next` instalada.
2. Revisar reglas de lint y plugins:
   - `eslint-plugin-prettier`
   - `typescript-eslint`
3. Corregir reglas nuevas y warnings.

Nota: al intentar `eslint@latest` + `@eslint/js@latest` aparece conflicto de peer dependency (`ERESOLVE`). No se forzo instalacion para mantener estabilidad.

## Fase 3 (hardening de produccion) - completada

1. Validar build en entorno limpio:
   - `rm -rf node_modules package-lock.json && npm install`
   - `npm run lint && npm run build`
2. Verificar comportamiento i18n con cache/prefetch en produccion.
3. Deploy canary y QA visual.

## Regla operativa para futuras actualizaciones

- Correr `ncu` sin majors para evitar roturas:
  - `npx ncu -u --target minor`
- Si se quieren majors, hacerlo por grupos acoplados en rama de upgrade.
