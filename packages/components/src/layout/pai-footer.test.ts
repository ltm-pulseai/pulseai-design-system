import { expect, fixture, html } from '@open-wc/testing';
import './pai-footer.js';
import type { PaiFooter } from './pai-footer.js';

describe('pai-footer', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PaiFooter>(html`<pai-footer>© 2026</pai-footer>`);
    expect(el.textContent).to.include('© 2026');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiFooter>(html`<pai-footer>© 2026</pai-footer>`);
    await expect(el).to.be.accessible();
  });
});
