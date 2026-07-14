import { expect, fixture, html } from '@open-wc/testing';
import './pai-content.js';
import type { PaiContent } from './pai-content.js';

describe('pai-content', () => {
  it('renders slotted rich text', async () => {
    const el = await fixture<PaiContent>(html`<pai-content><h1>Title</h1><p>Body</p></pai-content>`);
    expect(el.textContent).to.include('Title');
    expect(el.textContent).to.include('Body');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiContent>(html`<pai-content><p>Body</p></pai-content>`);
    await expect(el).to.be.accessible();
  });
});
