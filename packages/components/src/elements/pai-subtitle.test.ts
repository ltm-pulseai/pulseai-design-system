import { expect, fixture, html } from '@open-wc/testing';
import './pai-subtitle.js';
import type { PaiSubtitle } from './pai-subtitle.js';

describe('pai-subtitle', () => {
  it('renders the heading tag matching level', async () => {
    const el = await fixture<PaiSubtitle>(html`<pai-subtitle .level=${6}>Hello</pai-subtitle>`);
    expect(el.shadowRoot!.querySelector('h6')).to.exist;
    expect(el.textContent).to.include('Hello');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiSubtitle>(html`<pai-subtitle>Hello</pai-subtitle>`);
    await expect(el).to.be.accessible();
  });
});
