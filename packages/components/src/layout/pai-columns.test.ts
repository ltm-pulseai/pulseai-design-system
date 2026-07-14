import { expect, fixture, html } from '@open-wc/testing';
import './pai-columns.js';
import './pai-column.js';
import type { PaiColumns } from './pai-columns.js';

describe('pai-columns', () => {
  it('renders column children', async () => {
    const el = await fixture<PaiColumns>(html`
      <pai-columns>
        <pai-column>A</pai-column>
        <pai-column>B</pai-column>
      </pai-columns>
    `);
    expect(el.textContent).to.include('A');
    expect(el.textContent).to.include('B');
  });

  it('reflects layout modifiers', async () => {
    const el = await fixture<PaiColumns>(html`<pai-columns gapless vcentered centered></pai-columns>`);
    expect(el.hasAttribute('gapless')).to.be.true;
    expect(el.hasAttribute('vcentered')).to.be.true;
    expect(el.hasAttribute('centered')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiColumns>(html`<pai-columns><pai-column>A</pai-column></pai-columns>`);
    await expect(el).to.be.accessible();
  });
});
