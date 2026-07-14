# PulseAI Design Language

A framework-agnostic, accessible, extensible Web Component library built with
[Lit](https://lit.dev) — layout primitives, elements, form controls, and interactive
components. Components are driven by two independent, typed props: `color` (semantic
intent) and `variant` (visual treatment — `filled` / `outlined` / `text` / `soft`), so
they compose freely instead of relying on combinable utility classes. Nine themes ship
out of the box, including presets that reskin the same components to sit alongside a
Bootstrap or Material app, and a gradient/glass "AI product" theme (`nova`) — see
[Theming](#theming).

## Packages

| Package | Description |
| --- | --- |
| [`@pulseai/tokens`](packages/tokens) | Design tokens as CSS custom properties (`tokens.css`) and TypeScript constants (color, spacing, typography, radius, shadow, breakpoints, z-index, motion) — both a numeric and a named (`xs`/`sm`/`md`/...) scale. |
| [`@pulseai/components`](packages/components) | ~40 Lit-based custom elements (`pai-*`), Shadow DOM encapsulated, themed via the tokens' CSS custom properties. |
| [`@pulseai/styles`](packages/styles) | Optional utility CSS classes (`m-*`, `has-text-*`, `is-flex`, ...) and a base reset, for plain HTML that isn't using the components. |
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

Switch themes with a `data-theme` attribute on `<html>` (or any ancestor):

```html
<html data-theme="dark">
```

Nine themes ship out of the box: `light`, `dark`, `ocean`, `sunset`, `forest`, `slate`,
`bootstrap`, `material`, `nova`. `bootstrap`/`material` reskin shadows, radius, and font
family to sit alongside those ecosystems' own apps; `nova` is a dark, gradient-accented,
glass-surfaced theme for an "AI product" look.

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
