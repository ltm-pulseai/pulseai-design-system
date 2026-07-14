import { expect, fixture, html } from '@open-wc/testing';
import './pai-tile.js';
import type { PaiTile } from './pai-tile.js';

describe('pai-tile', () => {
  it('renders nested tiles', async () => {
    const el = await fixture<PaiTile>(html`
      <pai-tile variant="ancestor">
        <pai-tile variant="parent">
          <pai-tile variant="child">Content</pai-tile>
        </pai-tile>
      </pai-tile>
    `);
    expect(el.textContent).to.include('Content');
  });

  it('reflects variant and size', async () => {
    const el = await fixture<PaiTile>(html`<pai-tile variant="parent" size="4"></pai-tile>`);
    expect(el.getAttribute('variant')).to.equal('parent');
    expect(el.getAttribute('size')).to.equal('4');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiTile>(html`<pai-tile>Content</pai-tile>`);
    await expect(el).to.be.accessible();
  });
});
