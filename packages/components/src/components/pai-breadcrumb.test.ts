import { expect, fixture, html } from '@open-wc/testing';
import './pai-breadcrumb.js';
import type { PaiBreadcrumb } from './pai-breadcrumb.js';

describe('pai-breadcrumb', () => {
  it('marks the last link aria-current=page', async () => {
    const el = await fixture<PaiBreadcrumb>(html`
      <pai-breadcrumb>
        <a href="/">Home</a>
        <a href="/docs">Docs</a>
        <a href="/docs/button">Button</a>
      </pai-breadcrumb>
    `);
    await new Promise((r) => requestAnimationFrame(r));
    const links = el.querySelectorAll('a');
    expect(links[2].getAttribute('aria-current')).to.equal('page');
    expect(links[0].hasAttribute('aria-current')).to.be.false;
  });

  it('wraps content in a labeled nav', async () => {
    const el = await fixture<PaiBreadcrumb>(html`<pai-breadcrumb><a href="/">Home</a></pai-breadcrumb>`);
    expect(el.shadowRoot!.querySelector('nav[aria-label="breadcrumb"]')).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiBreadcrumb>(html`
      <pai-breadcrumb><a href="/">Home</a><a href="/docs">Docs</a></pai-breadcrumb>
    `);
    await expect(el).to.be.accessible();
  });
});
