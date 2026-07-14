import { expect, fixture, html } from '@open-wc/testing';
import './pai-level.js';
import type { PaiLevel } from './pai-level.js';

describe('pai-level', () => {
  it('renders left/default/right slots', async () => {
    const el = await fixture<PaiLevel>(html`
      <pai-level>
        <span slot="left">Left</span>
        <span>Center</span>
        <span slot="right">Right</span>
      </pai-level>
    `);
    expect(el.textContent).to.include('Left');
    expect(el.textContent).to.include('Center');
    expect(el.textContent).to.include('Right');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiLevel>(html`<pai-level><span>Center</span></pai-level>`);
    await expect(el).to.be.accessible();
  });
});
