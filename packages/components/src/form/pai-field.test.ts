import { expect, fixture, html } from '@open-wc/testing';
import './pai-field.js';
import type { PaiField } from './pai-field.js';

describe('pai-field', () => {
  it('renders label/default/help slots', async () => {
    const el = await fixture<PaiField>(html`
      <pai-field>
        <span slot="label">Name</span>
        <input />
        <span slot="help">Required</span>
      </pai-field>
    `);
    expect(el.textContent).to.include('Name');
    expect(el.textContent).to.include('Required');
    expect(el.querySelector('input')).to.exist;
  });

  it('wraps the control in a native label for implicit association', async () => {
    const el = await fixture<PaiField>(html`<pai-field><span slot="label">Name</span><input /></pai-field>`);
    const label = el.shadowRoot!.querySelector('label')!;
    expect(label).to.exist;
  });

  it('reflects horizontal/grouped', async () => {
    const el = await fixture<PaiField>(html`<pai-field horizontal grouped></pai-field>`);
    expect(el.hasAttribute('horizontal')).to.be.true;
    expect(el.hasAttribute('grouped')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiField>(html`
      <pai-field><span slot="label">Name</span><input aria-label="Name" /></pai-field>
    `);
    await expect(el).to.be.accessible();
  });
});
