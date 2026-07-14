import { expect, fixture, html } from '@open-wc/testing';
import './pai-panel.js';
import type { PaiPanel } from './pai-panel.js';

describe('pai-panel', () => {
  it('renders heading and slotted blocks', async () => {
    const el = await fixture<PaiPanel>(html`
      <pai-panel heading="Repositories">
        <a href="#">pulseai-design-system</a>
      </pai-panel>
    `);
    expect(el.shadowRoot!.textContent).to.include('Repositories');
    expect(el.textContent).to.include('pulseai-design-system');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiPanel>(html`<pai-panel heading="Repositories"><a href="#">Item</a></pai-panel>`);
    await expect(el).to.be.accessible();
  });
});
