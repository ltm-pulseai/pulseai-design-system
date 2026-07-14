import { expect, fixture, html } from '@open-wc/testing';
import './pai-breadcrumb.js';
import type { PaiBreadcrumb } from './pai-breadcrumb.js';

describe('pai-breadcrumb', () => {
  it('marks the last link aria-current=page', async () => {
    const el = await fixture<PaiBreadcrumb>(html`
      <pai-breadcrumb>
        <li><a href="/">Home</a></li>
        <li><a href="/docs">Docs</a></li>
        <li><a href="/docs/button">Button</a></li>
      </pai-breadcrumb>
    `);
    await new Promise((r) => requestAnimationFrame(r));
    const links = el.querySelectorAll('a');
    expect(links[2].getAttribute('aria-current')).to.equal('page');
    expect(links[0].hasAttribute('aria-current')).to.be.false;
  });

  it('wraps content in a labeled nav', async () => {
    const el = await fixture<PaiBreadcrumb>(html`<pai-breadcrumb><li><a href="/">Home</a></li></pai-breadcrumb>`);
    expect(el.shadowRoot!.querySelector('nav[aria-label="breadcrumb"]')).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiBreadcrumb>(html`
      <pai-breadcrumb><li><a href="/">Home</a></li><li><a href="/docs">Docs</a></li></pai-breadcrumb>
    `);
    await expect(el).to.be.accessible();
  });
});
