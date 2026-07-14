import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-input.js';
import type { PaiInput } from './pai-input.js';

describe('pai-input', () => {
  it('associates the label with the input via for/id', async () => {
    const el = await fixture<PaiInput>(html`<pai-input label="Name"></pai-input>`);
    const label = el.shadowRoot!.querySelector('label')!;
    const input = el.shadowRoot!.querySelector('input')!;
    expect(label.getAttribute('for')).to.equal(input.id);
  });

  it('sets aria-describedby and aria-invalid when errorText is set', async () => {
    const el = await fixture<PaiInput>(html`<pai-input error-text="Required"></pai-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
    expect(input.getAttribute('aria-describedby')).to.equal('desc');
  });

  it('fires pai-input on keystroke and updates value', async () => {
    const el = await fixture<PaiInput>(html`<pai-input></pai-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'hi';
    setTimeout(() => input.dispatchEvent(new InputEvent('input', { bubbles: true })));
    const event = await oneEvent(el, 'pai-input');
    expect((event as CustomEvent).detail.value).to.equal('hi');
    expect(el.value).to.equal('hi');
  });

  it('participates in native form submission', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <pai-input name="email" value="a@b.com"></pai-input>
      </form>
    `);
    const data = new FormData(form);
    expect(data.get('email')).to.equal('a@b.com');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiInput>(html`<pai-input label="Name"></pai-input>`);
    await expect(el).to.be.accessible();
  });
});
