import { expect, fixture, html } from '@open-wc/testing';
import './pai-label.js';
import type { PaiLabel } from './pai-label.js';

describe('pai-label', () => {
  it('renders slotted text', async () => {
    const el = await fixture<PaiLabel>(html`<pai-label>Name</pai-label>`);
    expect(el.textContent).to.include('Name');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiLabel>(html`<pai-label>Name</pai-label>`);
    await expect(el).to.be.accessible();
  });
});
