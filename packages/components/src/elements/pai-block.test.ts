import { expect, fixture, html } from '@open-wc/testing';
import './pai-block.js';
import type { PaiBlock } from './pai-block.js';

describe('pai-block', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PaiBlock>(html`<pai-block>Item</pai-block>`);
    expect(el.textContent).to.include('Item');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiBlock>(html`<pai-block>Item</pai-block>`);
    await expect(el).to.be.accessible();
  });
});
