# PulseAI Design System

A framework-agnostic, accessible, extensible Web Component library covering the same
capability surface as [Bulma](https://bulma.io) — layout primitives, elements, form
controls, and interactive components — built with [Lit](https://lit.dev).

## Packages

| Package | Description |
| --- | --- |
| [`@pulseai/tokens`](packages/tokens) | Design tokens as CSS custom properties (`tokens.css`) and TypeScript constants (color, spacing, typography, radius, shadow, breakpoints, z-index, motion). |
| [`@pulseai/components`](packages/components) | ~36 Lit-based custom elements (`pai-*`), Shadow DOM encapsulated, themed via the tokens' CSS custom properties. |
| [`@pulseai/styles`](packages/styles) | Bulma-equivalent utility CSS classes (`m-*`, `has-text-*`, `is-flex`, ...) and a base reset, for use on plain HTML alongside the components. |
| [`apps/playground`](apps/playground) | Storybook — browse every component, its props/slots/events, and interactive controls. |

## Quick start

```bash
pnpm install
pnpm build          # builds @pulseai/tokens and @pulseai/components
pnpm playground      # starts Storybook at http://localhost:6006
```

In a consuming app:

```bash
pnpm add @pulseai/tokens @pulseai/components @pulseai/styles
```

```html
<link rel="stylesheet" href="node_modules/@pulseai/tokens/src/tokens.css" />
<link rel="stylesheet" href="node_modules/@pulseai/styles/src/index.css" />
<script type="module">
  import '@pulseai/components/elements/pai-button.js';
</script>

<pai-button color="primary">Click me</pai-button>
```

Or import the whole library from the barrel:

```ts
import '@pulseai/components'; // registers every element
import { PaiButton } from '@pulseai/components'; // types
```

## Theming

Every component reads color/spacing/typography from `@pulseai/tokens`' CSS custom
properties (`--pai-*`), which cross the Shadow DOM boundary naturally. Override them
globally or per-subtree:

```css
:root {
  --pai-color-primary: #7c3aed;
}
```

Dark mode is a `data-theme="dark"` attribute on `<html>` (or any ancestor):

```html
<html data-theme="dark">
```

## Accessibility

- Interactive components follow the relevant [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) pattern
  (modal: focus trap + `Escape` + focus return; dropdown: `aria-expanded` + arrow-key nav;
  tabs: roving tabindex + arrow/Home/End nav; etc.).
- Form controls (`pai-input`, `pai-select`, `pai-checkbox`, ...) are
  [form-associated custom elements](https://web.dev/articles/more-capable-form-controls) —
  they participate in native `<form>` submission and validation.
- Every component has an automated `axe-core` accessibility test (`pnpm --filter @pulseai/components test`).

## Development

```bash
pnpm --filter @pulseai/components test        # run the component test suite (Web Test Runner)
pnpm --filter @pulseai/components run analyze  # regenerate the custom-elements manifest
pnpm playground                                # Storybook dev server
```
