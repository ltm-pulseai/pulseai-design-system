import { expect, fixture, html } from '@open-wc/testing';
import './pai-alert-banner.js';
import type { PaiAlertBanner } from './pai-alert-banner.js';

describe('pai-alert-banner', () => {
  it('renders icon/default/actions slots', async () => {
    const el = await fixture<PaiAlertBanner>(html`
      <pai-alert-banner color="warning">
        <svg slot="icon"></svg>
        Storage almost full.
        <button slot="actions">Upgrade</button>
      </pai-alert-banner>
    `);
    expect(el.textContent).to.include('Storage almost full.');
    expect(el.textContent).to.include('Upgrade');
  });

  it('hides itself when dismissed', async () => {
    const el = await fixture<PaiAlertBanner>(
      html`<pai-alert-banner dismissible>Message</pai-alert-banner>`,
    );
    const close = el.shadowRoot!.querySelector('pai-delete')!.shadowRoot!.querySelector('button')!;
    close.click();
    await el.updateComplete;
    expect(el.hasAttribute('hidden')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiAlertBanner>(html`<pai-alert-banner>Message</pai-alert-banner>`);
    await expect(el).to.be.accessible();
  });
});
