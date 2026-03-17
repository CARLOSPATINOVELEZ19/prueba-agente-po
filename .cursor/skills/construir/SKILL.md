---
name: construir-deploy
description: Sube el proyecto a producción siguiendo los pasos: 1) Ejecutar build, 2) Revisar que no haya errores, 3) Hacer commit, 4) Ejecutar push.
---

# Skill de Construcción y Deploy

## Objetivo

Preparar y subir el proyecto a producción (o a la rama remota) de forma ordenada.

## Instrucciones

### Paso 1: Ejecutar build

```bash
# Si el proyecto tiene script de build
npm run build
```

**Nota**: Este proyecto (prueba-agente-po) no tiene `build` en package.json. El portal usa `npm start` directamente. Si se añade build en el futuro, ejecutarlo aquí.

Para proyectos con build:
- Frontend: `npm run build` o `npm run build:prod`
- Backend: compilar si aplica (TypeScript, etc.)

### Paso 2: Revisar que no haya errores

- Revisar la salida del build: no debe haber errores ni warnings críticos
- Opcional: ejecutar `npm test` para validar tests E2E
- Opcional: ejecutar `npm run lint` para verificar estilo

Si hay errores, **detenerse** y corregir antes de continuar.

### Paso 3: Hacer commit

```bash
git add .
git status   # Verificar qué se va a commitear
git commit -m "mensaje descriptivo del cambio"
```

Usar mensajes de commit claros (ej. `feat: añadir endpoint X`, `fix: corregir error en webhook`).

### Paso 4: Ejecutar push

```bash
git push origin <rama>
```

Ejemplo: `git push origin main` o `git push origin develop`.

## Checklist

- [ ] Build ejecutado sin errores
- [ ] Tests pasan (opcional pero recomendado)
- [ ] Commit realizado con mensaje descriptivo
- [ ] Push ejecutado a la rama correcta

## Restricciones

- **No hacer build en cada cambio** durante el desarrollo. Este skill es para el flujo de deploy explícito.
- Si el usuario no quiere hacer commit/push automático, detenerse después del build y preguntar.
