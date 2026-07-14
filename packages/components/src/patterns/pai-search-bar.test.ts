import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-search-bar.js';
import type { PaiSearchBar } from './pai-search-bar.js';

describe('pai-search-bar', () => {
  it('composes pai-input and pai-button', async () => {
    const el = await fixture<PaiSearchBar>(html`<pai-search-bar></pai-search-bar>`);
    expect(el.shadowRoot!.querySelector('pai-input')).to.exist;
    expect(el.shadowRoot!.querySelector('pai-button')).to.exist;
  });

  it('fires pai-search with the current value on submit', async () => {
    const el = await fixture<PaiSearchBar>(html`<pai-search-bar value="lit"></pai-search-bar>`);
    const form = el.shadowRoot!.querySelector('form')!;
    setTimeout(() => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    const event = await oneEvent(el, 'pai-search');
    expect((event as CustomEvent).detail.value).to.equal('lit');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiSearchBar>(html`<pai-search-bar></pai-search-bar>`);
    await expect(el).to.be.accessible();
  });
});
