import { expect, fixture, html } from '@open-wc/testing';
import './pai-select.js';
import type { PaiSelect } from './pai-select.js';

describe('pai-select', () => {
  it('renders options from the options property', async () => {
    const el = await fixture<PaiSelect>(html`<pai-select></pai-select>`);
    el.options = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ];
    await el.updateComplete;
    const options = el.shadowRoot!.querySelectorAll('option');
    expect(options.length).to.equal(2);
  });

  it('associates the label with the select via for/id', async () => {
    const el = await fixture<PaiSelect>(html`<pai-select label="Country"></pai-select>`);
    const label = el.shadowRoot!.querySelector('label')!;
    const select = el.shadowRoot!.querySelector('select')!;
    expect(label.getAttribute('for')).to.equal(select.id);
  });

  it('participates in native form submission', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form><pai-select name="country" value="us"></pai-select></form>
    `);
    const select = form.querySelector('pai-select') as PaiSelect;
    select.options = [{ value: 'us', label: 'United States' }];
    await select.updateComplete;
    const data = new FormData(form);
    expect(data.get('country')).to.equal('us');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiSelect>(html`<pai-select label="Country"></pai-select>`);
    await expect(el).to.be.accessible();
  });
});
