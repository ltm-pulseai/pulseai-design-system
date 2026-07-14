import { expect, fixture, html } from '@open-wc/testing';
import './pai-box.js';
import type { PaiBox } from './pai-box.js';

describe('pai-box', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PaiBox>(html`<pai-box>Content</pai-box>`);
    expect(el.textContent).to.include('Content');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiBox>(html`<pai-box>Content</pai-box>`);
    await expect(el).to.be.accessible();
  });
});
