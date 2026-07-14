import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-modal.js';
import type { PaiModal } from './pai-modal.js';

describe('pai-modal', () => {
  it('renders a dialog with aria-modal when open', async () => {
    const el = await fixture<PaiModal>(html`<pai-modal open>Title<button slot="body">Focus me</button></pai-modal>`);
    const dialog = el.shadowRoot!.querySelector('[role="dialog"]')!;
    expect(dialog.getAttribute('aria-modal')).to.equal('true');
  });

  it('moves focus into the dialog on open', async () => {
    const el = await fixture<PaiModal>(html`
      <pai-modal><button slot="body" id="target">Focus me</button></pai-modal>
    `);
    el.show();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(document.activeElement?.id).to.equal('target');
  });

  it('closes on Escape and restores focus, firing pai-close', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const el = await fixture<PaiModal>(html`<pai-modal><button slot="body">Focus me</button></pai-modal>`);
    el.show();
    await el.updateComplete;

    setTimeout(() =>
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })),
    );
    const event = await oneEvent(el, 'pai-close');
    expect(event).to.exist;
    expect(el.open).to.be.false;
    expect(document.activeElement).to.equal(trigger);

    trigger.remove();
  });

  it('is accessible', async () => {
    const el = await fixture<PaiModal>(html`<pai-modal open>Title<button slot="body">OK</button></pai-modal>`);
    await expect(el).to.be.accessible();
  });
});
