import { expect, fixture, html } from '@open-wc/testing';
import './pai-column.js';
import type { PaiColumn } from './pai-column.js';

describe('pai-column', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PaiColumn>(html`<pai-column>Content</pai-column>`);
    expect(el.textContent).to.include('Content');
  });

  it('applies a fixed width for keyword sizes', async () => {
    const el = await fixture<PaiColumn>(html`<pai-column size="half">Content</pai-column>`);
    expect(el.style.width).to.equal('50%');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiColumn>(html`<pai-column>Content</pai-column>`);
    await expect(el).to.be.accessible();
  });
});
