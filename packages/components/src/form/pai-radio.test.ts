import { expect, fixture, html } from '@open-wc/testing';
import './pai-radio.js';
import type { PaiRadio } from './pai-radio.js';

describe('pai-radio', () => {
  it('renders a native radio wrapped in a label', async () => {
    const el = await fixture<PaiRadio>(html`<pai-radio name="plan" value="pro">Pro</pai-radio>`);
    const input = el.shadowRoot!.querySelector('input[type="radio"]')!;
    expect(input).to.exist;
    expect(el.textContent).to.include('Pro');
  });

  it('unchecks same-name siblings when checked', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div>
        <pai-radio name="plan" value="free" checked>Free</pai-radio>
        <pai-radio name="plan" value="pro">Pro</pai-radio>
      </div>
    `);
    const [free, pro] = Array.from(wrapper.querySelectorAll('pai-radio')) as PaiRadio[];
    pro.checked = true;
    await pro.updateComplete;
    await free.updateComplete;
    expect(pro.checked).to.be.true;
    expect(free.checked).to.be.false;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiRadio>(html`<pai-radio name="plan" value="pro">Pro</pai-radio>`);
    await expect(el).to.be.accessible();
  });
});
