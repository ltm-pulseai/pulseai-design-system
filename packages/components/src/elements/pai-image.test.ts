import { expect, fixture, html } from '@open-wc/testing';
import './pai-image.js';
import type { PaiImage } from './pai-image.js';

describe('pai-image', () => {
  it('renders an img with src/alt', async () => {
    const el = await fixture<PaiImage>(html`<pai-image src="/cat.png" alt="A cat"></pai-image>`);
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('src')).to.equal('/cat.png');
    expect(img.getAttribute('alt')).to.equal('A cat');
  });

  it('applies a custom aspect ratio', async () => {
    const el = await fixture<PaiImage>(html`<pai-image src="/x.png" alt="" ratio="16x9"></pai-image>`);
    expect(el.style.getPropertyValue('--pai-image-ratio')).to.equal('16 / 9');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiImage>(html`<pai-image src="/cat.png" alt="A cat"></pai-image>`);
    await expect(el).to.be.accessible();
  });
});
