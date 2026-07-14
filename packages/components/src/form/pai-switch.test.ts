import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-switch.js';
import type { PaiSwitch } from './pai-switch.js';

describe('pai-switch', () => {
  it('renders an input with role=switch', async () => {
    const el = await fixture<PaiSwitch>(html`<pai-switch>Notifications</pai-switch>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('role')).to.equal('switch');
  });

  it('fires pai-change on toggle', async () => {
    const el = await fixture<PaiSwitch>(html`<pai-switch></pai-switch>`);
    const input = el.shadowRoot!.querySelector('input')!;
    input.checked = true;
    setTimeout(() => input.dispatchEvent(new Event('change', { bubbles: true })));
    const event = await oneEvent(el, 'pai-change');
    expect((event as CustomEvent).detail.checked).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiSwitch>(html`<pai-switch>Notifications</pai-switch>`);
    await expect(el).to.be.accessible();
  });
});
