import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-tag.js';
import type { PaiTag } from './pai-tag.js';

describe('pai-tag', () => {
  it('renders slotted label', async () => {
    const el = await fixture<PaiTag>(html`<pai-tag>Beta</pai-tag>`);
    expect(el.textContent).to.include('Beta');
  });

  it('fires pai-dismiss when dismissible and the delete button is clicked', async () => {
    const el = await fixture<PaiTag>(html`<pai-tag dismissible>Beta</pai-tag>`);
    const del = el.shadowRoot!.querySelector('pai-delete')!.shadowRoot!.querySelector('button')!;
    setTimeout(() => del.click());
    const event = await oneEvent(el, 'pai-dismiss');
    expect(event).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiTag>(html`<pai-tag dismissible>Beta</pai-tag>`);
    await expect(el).to.be.accessible();
  });
});
