import { expect, fixture, html } from '@open-wc/testing';
import './pai-container.js';
import type { PaiContainer } from './pai-container.js';

describe('pai-container', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PaiContainer>(html`<pai-container>Hello</pai-container>`);
    expect(el.textContent).to.include('Hello');
  });

  it('reflects the fluid attribute', async () => {
    const el = await fixture<PaiContainer>(html`<pai-container fluid></pai-container>`);
    expect(el.hasAttribute('fluid')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiContainer>(html`<pai-container>Content</pai-container>`);
    await expect(el).to.be.accessible();
  });
});
