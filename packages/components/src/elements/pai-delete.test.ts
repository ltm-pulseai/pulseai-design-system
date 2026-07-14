import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-delete.js';
import type { PaiDelete } from './pai-delete.js';

describe('pai-delete', () => {
  it('renders an accessible button', async () => {
    const el = await fixture<PaiDelete>(html`<pai-delete label="Dismiss"></pai-delete>`);
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-label')).to.equal('Dismiss');
  });

  it('fires pai-dismiss on click', async () => {
    const el = await fixture<PaiDelete>(html`<pai-delete></pai-delete>`);
    const btn = el.shadowRoot!.querySelector('button')!;
    setTimeout(() => btn.click());
    const event = await oneEvent(el, 'pai-dismiss');
    expect(event).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiDelete>(html`<pai-delete></pai-delete>`);
    await expect(el).to.be.accessible();
  });
});
