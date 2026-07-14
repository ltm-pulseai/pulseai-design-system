import { expect, fixture, html } from '@open-wc/testing';
import './pai-icon.js';
import type { PaiIcon } from './pai-icon.js';

describe('pai-icon', () => {
  it('is hidden from assistive tech by default', async () => {
    const el = await fixture<PaiIcon>(html`<pai-icon><svg></svg></pai-icon>`);
    const span = el.shadowRoot!.querySelector('span')!;
    expect(span.getAttribute('aria-hidden')).to.equal('true');
  });

  it('exposes an accessible name when label is set', async () => {
    const el = await fixture<PaiIcon>(html`<pai-icon label="Warning"><svg></svg></pai-icon>`);
    const span = el.shadowRoot!.querySelector('span')!;
    expect(span.getAttribute('aria-hidden')).to.equal('false');
    expect(span.getAttribute('aria-label')).to.equal('Warning');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiIcon>(html`<pai-icon label="Info"><svg></svg></pai-icon>`);
    await expect(el).to.be.accessible();
  });
});
