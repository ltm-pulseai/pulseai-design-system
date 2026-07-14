import { expect, fixture, html } from '@open-wc/testing';
import './pai-grid.js';
import './pai-cell.js';
import type { PaiGrid } from './pai-grid.js';

describe('pai-grid', () => {
  it('renders cell children', async () => {
    const el = await fixture<PaiGrid>(html`
      <pai-grid>
        <pai-cell>A</pai-cell>
        <pai-cell>B</pai-cell>
      </pai-grid>
    `);
    expect(el.textContent).to.include('A');
    expect(el.textContent).to.include('B');
  });

  it('applies min-col-width as a custom property', async () => {
    const el = await fixture<PaiGrid>(html`<pai-grid min-col-width="12rem"></pai-grid>`);
    expect(el.style.getPropertyValue('--pai-grid-min-col-width')).to.equal('12rem');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiGrid>(html`<pai-grid><pai-cell>A</pai-cell></pai-grid>`);
    await expect(el).to.be.accessible();
  });
});
