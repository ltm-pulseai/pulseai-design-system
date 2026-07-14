import { expect, fixture, html } from '@open-wc/testing';
import './pai-control.js';
import type { PaiControl } from './pai-control.js';

describe('pai-control', () => {
  it('renders slotted control and icons', async () => {
    const el = await fixture<PaiControl>(html`
      <pai-control>
        <span slot="icon-left">L</span>
        <input />
        <span slot="icon-right">R</span>
      </pai-control>
    `);
    expect(el.querySelector('input')).to.exist;
    expect(el.textContent).to.include('L');
    expect(el.textContent).to.include('R');
  });

  it('reflects loading', async () => {
    const el = await fixture<PaiControl>(html`<pai-control loading></pai-control>`);
    expect(el.hasAttribute('loading')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiControl>(html`<pai-control><input aria-label="Search" /></pai-control>`);
    await expect(el).to.be.accessible();
  });
});
