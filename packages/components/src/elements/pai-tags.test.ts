import { expect, fixture, html } from '@open-wc/testing';
import './pai-tags.js';
import './pai-tag.js';
import type { PaiTags } from './pai-tags.js';

describe('pai-tags', () => {
  it('renders tag children', async () => {
    const el = await fixture<PaiTags>(html`
      <pai-tags>
        <pai-tag>A</pai-tag>
        <pai-tag>B</pai-tag>
      </pai-tags>
    `);
    expect(el.textContent).to.include('A');
    expect(el.textContent).to.include('B');
  });

  it('reflects has-addons', async () => {
    const el = await fixture<PaiTags>(html`<pai-tags has-addons></pai-tags>`);
    expect(el.hasAttribute('has-addons')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiTags>(html`<pai-tags><pai-tag>A</pai-tag></pai-tags>`);
    await expect(el).to.be.accessible();
  });
});
