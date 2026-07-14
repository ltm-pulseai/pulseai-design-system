import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-checkbox.js';
import type { PaiCheckbox } from './pai-checkbox.js';

describe('pai-checkbox', () => {
  it('renders a native checkbox wrapped in a label', async () => {
    const el = await fixture<PaiCheckbox>(html`<pai-checkbox>Accept terms</pai-checkbox>`);
    const input = el.shadowRoot!.querySelector('input[type="checkbox"]')!;
    expect(input).to.exist;
    expect(el.textContent).to.include('Accept terms');
  });

  it('fires pai-change and updates checked on toggle', async () => {
    const el = await fixture<PaiCheckbox>(html`<pai-checkbox></pai-checkbox>`);
    const input = el.shadowRoot!.querySelector('input')!;
    input.checked = true;
    setTimeout(() => input.dispatchEvent(new Event('change', { bubbles: true })));
    const event = await oneEvent(el, 'pai-change');
    expect((event as CustomEvent).detail.checked).to.be.true;
    expect(el.checked).to.be.true;
  });

  it('participates in native form submission only when checked', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form><pai-checkbox name="agree" value="yes" checked></pai-checkbox></form>
    `);
    const data = new FormData(form);
    expect(data.get('agree')).to.equal('yes');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiCheckbox>(html`<pai-checkbox>Accept terms</pai-checkbox>`);
    await expect(el).to.be.accessible();
  });
});
