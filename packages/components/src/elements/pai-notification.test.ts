import { expect, fixture, html } from '@open-wc/testing';
import './pai-notification.js';
import type { PaiNotification } from './pai-notification.js';

describe('pai-notification', () => {
  it('renders slotted content with role status', async () => {
    const el = await fixture<PaiNotification>(html`<pai-notification>Saved!</pai-notification>`);
    expect(el.textContent).to.include('Saved!');
    expect(el.shadowRoot!.querySelector('[role="status"]')).to.exist;
  });

  it('hides itself when the built-in close button is activated', async () => {
    const el = await fixture<PaiNotification>(
      html`<pai-notification dismissible>Saved!</pai-notification>`,
    );
    const close = el.shadowRoot!.querySelector('pai-delete')!.shadowRoot!.querySelector('button')!;
    close.click();
    await el.updateComplete;
    expect(el.hasAttribute('hidden')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiNotification>(html`<pai-notification>Saved!</pai-notification>`);
    await expect(el).to.be.accessible();
  });
});
