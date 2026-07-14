import { expect, fixture, html } from '@open-wc/testing';
import './pai-help.js';
import type { PaiHelp } from './pai-help.js';

describe('pai-help', () => {
  it('renders slotted text', async () => {
    const el = await fixture<PaiHelp>(html`<pai-help>Required field</pai-help>`);
    expect(el.textContent).to.include('Required field');
  });

  it('reflects color', async () => {
    const el = await fixture<PaiHelp>(html`<pai-help color="danger">Invalid</pai-help>`);
    expect(el.getAttribute('color')).to.equal('danger');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiHelp>(html`<pai-help>Required field</pai-help>`);
    await expect(el).to.be.accessible();
  });
});
