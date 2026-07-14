import { expect, fixture, html } from '@open-wc/testing';
import './pai-cell.js';
import type { PaiCell } from './pai-cell.js';

describe('pai-cell', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PaiCell>(html`<pai-cell>Content</pai-cell>`);
    expect(el.textContent).to.include('Content');
  });

  it('applies col-span/row-span as inline grid styles', async () => {
    const el = await fixture<PaiCell>(html`<pai-cell col-span="2" row-span="3"></pai-cell>`);
    expect(el.style.gridColumn).to.equal('span 2');
    expect(el.style.gridRow).to.equal('span 3');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiCell>(html`<pai-cell>Content</pai-cell>`);
    await expect(el).to.be.accessible();
  });
});
