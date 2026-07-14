import { expect, fixture, html } from '@open-wc/testing';
import './pai-title.js';
import type { PaiTitle } from './pai-title.js';

describe('pai-title', () => {
  it('renders the heading tag matching level', async () => {
    const el = await fixture<PaiTitle>(html`<pai-title .level=${1}>Hello</pai-title>`);
    expect(el.shadowRoot!.querySelector('h1')).to.exist;
    expect(el.textContent).to.include('Hello');
  });

  it('defaults visual size to the semantic level', async () => {
    const el = await fixture<PaiTitle>(html`<pai-title .level=${2}>Hello</pai-title>`);
    expect(el.getAttribute('size')).to.equal('2');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiTitle>(html`<pai-title .level=${1}>Hello</pai-title>`);
    await expect(el).to.be.accessible();
  });
});
