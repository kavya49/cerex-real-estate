# Normalization Rules Registry

This document describes the pure mapping functions that transform raw planner answers into normalized values. All functions are side-effect free and live in `src/modules/planner-intelligence/rules/mapping-registry.ts`.

---

## Registry Structure

```typescript
export const MAPPING_REGISTRY = {
  household: { ... },
  lifestyle: { ... },
  design: { ... },
  financial: { ... },
  preferences: { ... },
} as const;
```

Each category contains a map of question keys to mapping functions.

---

## Household

### `familySize`
```typescript
map: (value: string) => {
  const num = parseInt(value.replace(/\D/g, ''), 10);
  return isNaN(num) ? 2 : Math.max(1, Math.min(10, num));
}
```
- Extracts digits, clamps to 1–10, defaults to 2.

### `children`
```typescript
map: (value: string) => {
  if (value.toLowerCase().includes('none') || value.toLowerCase().includes('no')) return 0;
  const num = parseInt(value.replace(/\D/g, ''), 10);
  return isNaN(num) ? 0 : Math.max(0, Math.min(5, num));
}
```
- Handles "None"/"No" → 0.
- Extracts digits, clamps 0–5, defaults to 0.

---

## Lifestyle

### `workFromHome`
```typescript
map: (value: string) => {
  const n = value.toLowerCase().trim();
  if (n.includes('full')) return 'full-time';
  if (n.includes('sometimes') || n.includes('occasionally') || n.includes('hybrid')) return 'hybrid';
  if (n.includes('never') || n.includes('no')) return 'never';
  return 'hybrid';
}
```
- Normalizes to `full-time` | `hybrid` | `never`.

### `lifestyle`
```typescript
map: (value: string) => {
  const n = value.toLowerCase().trim();
  if (n.includes('quiet') || n.includes('peaceful')) return 'quiet';
  if (n.includes('social') || n.includes('party') || n.includes('entertain')) return 'social';
  if (n.includes('wellness') || n.includes('health') || n.includes('fitness') || n.includes('active')) return 'wellness';
  return 'balanced';
}
```
- Normalizes to `quiet` | `social` | `wellness` | `balanced`.

### `timeline`
```typescript
map: (value: string) => {
  const n = value.toLowerCase().trim();
  if (n.includes('immediate') || n.includes('now') || n.includes('asap')) return 0;
  if (n.includes('month') || n.includes('30 day')) return 1;
  if (n.includes('3 month') || n.includes('quarter')) return 3;
  if (n.includes('6 month') || n.includes('half year')) return 6;
  if (n.includes('year') || n.includes('12 month')) return 12;
  if (n.includes('2 year') || n.includes('24 month')) return 24;
  if (n.includes('3 year') || n.includes('36 month')) return 36;
  return 6;
}
```
- Returns months until move-in (0 = immediate).

---

## Design

### `style`
```typescript
map: (value: string) => {
  const n = value.toLowerCase().trim();
  if (n.includes('modern') && n.includes('luxury')) return 'modern-luxury';
  if (n.includes('modern') || n.includes('contemporary') || n.includes('minimal')) return 'modern-luxury';
  if (n.includes('classic') || n.includes('traditional') || n.includes('heritage')) return 'classic';
  if (n.includes('minimal') || n.includes('zen') || n.includes('scandinavian')) return 'minimalist';
  if (n.includes('warm') || n.includes('family') || n.includes('cozy') || n.includes('comfort')) return 'warm-family';
  return 'modern-luxury';
}
```
- Normalizes to `modern-luxury` | `classic` | `minimalist` | `warm-family`.

---

## Financial

### `budget`
```typescript
map: (value: number | string) => {
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^\d.]/g, '')) : value;
  if (isNaN(num)) return 25000000;
  if (num <= 10) return num * 10000000;      // Cr → minor units
  if (num <= 100) return num * 100000;        // Lakhs → minor units
  return num * 100000;                        // Assume already in minor units? fallback
}
```
- Accepts Cr, Lakhs, or raw minor units.
- Returns integer minor units (paise/100).

---

## Preferences

Derived from other answers:

| Preference | Source | Logic |
|---|---|---|
| `prefersBalcony` | `lifestyle` | `wellness` or `outdoor` or `balcony` or `terrace` keywords |
| `needsHomeOffice` | `workFromHome` | `full-time` or `hybrid` or `home` keywords |
| `preferredFloorLevel` | `lifestyle` | `wellness`/`quiet` → `high`; `social`/`family` → `mid`; else `mid` |
| `hasPets` | `children` | `children > 0` (proxy) |

---

## Versioning
- Registry version: `1`
- Increment when any mapping logic changes.
- Stored in `PlannerNormalizedData.version`.

---

## Extending
To add a new planner question:
1. Add raw key to `NormalizePlannerRequestDto` (if new).
2. Add mapping function in appropriate category in `mapping-registry.ts`.
3. Update `NormalizationService` to call the new mapping.
4. Add corresponding field to `NormalizedPlannerResultDto` (DTO).
5. Bump registry version.

---

## Testing
Each mapping function is a pure function → easily unit-testable with a table of input → expected output.