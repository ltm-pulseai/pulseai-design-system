import { expect, fixture, html } from '@open-wc/testing';
import './pai-section.js';
import type { PaiSection } from './pai-section.js';

describe('pai-section', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PaiSection>(html`<pai-section>Body</pai-section>`);
    expect(el.textContent).to.include('Body');
  });

  it('reflects size', async () => {
    const el = await fixture<PaiSection>(html`<pai-section size="large"></pai-section>`);
    expect(el.getAttribute('size')).to.equal('large');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiSection>(html`<pai-section>Body</pai-section>`);
    await expect(el).to.be.accessible();
  });
});
