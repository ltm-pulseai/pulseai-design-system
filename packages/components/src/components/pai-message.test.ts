import { expect, fixture, html } from '@open-wc/testing';
import './pai-message.js';
import type { PaiMessage } from './pai-message.js';

describe('pai-message', () => {
  it('renders header and body slots', async () => {
    const el = await fixture<PaiMessage>(html`
      <pai-message><span slot="header">Heads up</span>Something happened.</pai-message>
    `);
    expect(el.textContent).to.include('Heads up');
    expect(el.textContent).to.include('Something happened.');
  });

  it('hides itself when dismissed', async () => {
    const el = await fixture<PaiMessage>(html`
      <pai-message dismissible><span slot="header">Heads up</span>Body</pai-message>
    `);
    const close = el.shadowRoot!.querySelector('pai-delete')!.shadowRoot!.querySelector('button')!;
    close.click();
    await el.updateComplete;
    expect(el.hasAttribute('hidden')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiMessage>(html`
      <pai-message><span slot="header">Heads up</span>Body</pai-message>
    `);
    await expect(el).to.be.accessible();
  });
});
