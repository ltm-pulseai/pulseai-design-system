import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Utilities/Overview',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Bulma-equivalent utility classes from `@pulseai/styles`: spacing (`m-*`/`p-*`), ' +
          'color (`has-text-*`/`has-background-*`), typography (`is-size-*`), flexbox (`is-flex*`), ' +
          'visibility (`is-hidden*`), and misc helpers (`is-clickable`, `is-relative`, ...). ' +
          'Import once via `import \'@pulseai/styles\'` alongside `@pulseai/tokens/tokens.css`.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <section>
        <h3>Spacing (m-*, p-*)</h3>
        <div class="is-flex" style="gap: 0.5rem; align-items: flex-end;">
          <div class="p-1 has-background-white-ter">p-1</div>
          <div class="p-3 has-background-white-ter">p-3</div>
          <div class="p-6 has-background-white-ter">p-6</div>
          <div class="mt-6 has-background-white-ter p-2">mt-6</div>
        </div>
      </section>

      <section>
        <h3>Color (has-text-*, has-background-*)</h3>
        <div class="is-flex" style="gap: 0.5rem; flex-wrap: wrap;">
          <span class="has-text-primary">has-text-primary</span>
          <span class="has-text-danger">has-text-danger</span>
          <span class="p-2 has-background-info has-text-white">has-background-info</span>
          <span class="p-2 has-background-success has-text-white">has-background-success</span>
        </div>
      </section>

      <section>
        <h3>Typography (is-size-*, has-text-weight-*)</h3>
        <p class="is-size-3 has-text-weight-bold">is-size-3 has-text-weight-bold</p>
        <p class="is-size-6 is-uppercase">is-size-6 is-uppercase</p>
        <p class="is-italic has-text-grey">is-italic has-text-grey</p>
      </section>

      <section>
        <h3>Flexbox (is-flex, is-justify-content-*, is-align-items-*)</h3>
        <div
          class="is-flex is-justify-content-space-between is-align-items-center p-3 has-background-white-ter"
        >
          <span>Left</span>
          <span>Center</span>
          <span>Right</span>
        </div>
      </section>

      <section>
        <h3>Visibility (is-hidden-mobile, is-sr-only)</h3>
        <p>Resize the viewport below 769px to hide the box.</p>
        <div class="is-hidden-mobile p-2 has-background-white-ter">Hidden on mobile</div>
      </section>

      <section>
        <h3>Other (is-clickable, is-unselectable, is-relative)</h3>
        <div class="is-clickable is-unselectable p-2 has-background-white-ter">
          Clickable, unselectable text
        </div>
      </section>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
