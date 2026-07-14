import { expect, fixture, html } from '@open-wc/testing';
import './pai-file.js';
import type { PaiFile } from './pai-file.js';

describe('pai-file', () => {
  it('renders a visually-hidden native file input wrapped in a label', async () => {
    const el = await fixture<PaiFile>(html`<pai-file label="Upload avatar"></pai-file>`);
    const input = el.shadowRoot!.querySelector('input[type="file"]')!;
    expect(input).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Upload avatar');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiFile>(html`<pai-file label="Upload avatar"></pai-file>`);
    await expect(el).to.be.accessible();
  });
});
