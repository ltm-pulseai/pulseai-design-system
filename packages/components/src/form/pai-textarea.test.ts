import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-textarea.js';
import type { PaiTextarea } from './pai-textarea.js';

describe('pai-textarea', () => {
  it('associates the label with the textarea via for/id', async () => {
    const el = await fixture<PaiTextarea>(html`<pai-textarea label="Bio"></pai-textarea>`);
    const label = el.shadowRoot!.querySelector('label')!;
    const textarea = el.shadowRoot!.querySelector('textarea')!;
    expect(label.getAttribute('for')).to.equal(textarea.id);
  });

  it('fires pai-input and updates value', async () => {
    const el = await fixture<PaiTextarea>(html`<pai-textarea></pai-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;
    textarea.value = 'hello';
    setTimeout(() => textarea.dispatchEvent(new InputEvent('input', { bubbles: true })));
    const event = await oneEvent(el, 'pai-input');
    expect((event as CustomEvent).detail.value).to.equal('hello');
  });

  it('participates in native form submission', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form><pai-textarea name="bio" value="hi"></pai-textarea></form>
    `);
    const data = new FormData(form);
    expect(data.get('bio')).to.equal('hi');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiTextarea>(html`<pai-textarea label="Bio"></pai-textarea>`);
    await expect(el).to.be.accessible();
  });
});
