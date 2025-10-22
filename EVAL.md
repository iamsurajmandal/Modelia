| Feature/Test | Implemented | File/Path |
|---------------|--------------|-----------|
| JWT Auth (signup/login) | ✅ | /backend/src/routes/auth.ts |
| Image upload preview | ✅ | /frontend/src/components/GenerationStudio.tsx |
| Abort in-flight request | ✅ | /frontend/src/hooks/useGenerate.ts |
| Exponential retry logic | ✅ | /frontend/src/hooks/useGenerate.ts |
| 20% simulated overload | ✅ | /backend/src/controllers/generationsController.ts |
| GET last 5 generations | ✅ | /backend/src/controllers/generationsController.ts |
| Unit tests backend | ❌ | /backend/tests/generations.test.ts |
| Unit tests frontend | ❌ | /frontend/src/components/GenerationStudio.test.tsx |
| E2E flow | ❌ | /tests/e2e.spec.ts |
| ESLint + Prettier configured | ✅ | .eslintrc.js |
| CI + Coverage report | ❌ | .github/workflows/ci.yml |
