import { expect, fixture, html } from '@open-wc/testing';
import './pai-navbar.js';
import type { PaiNavbar } from './pai-navbar.js';

describe('pai-navbar', () => {
  it('renders brand/start/end slots', async () => {
    const el = await fixture<PaiNavbar>(html`
      <pai-navbar>
        <strong slot="brand">PulseAI</strong>
        <a slot="start" href="#">Docs</a>
        <a slot="end" href="#">Sign in</a>
      </pai-navbar>
    `);
    expect(el.textContent).to.include('PulseAI');
    expect(el.textContent).to.include('Docs');
    expect(el.textContent).to.include('Sign in');
  });

  it('toggles aria-expanded on the burger button', async () => {
    const el = await fixture<PaiNavbar>(html`<pai-navbar></pai-navbar>`);
    const burger = el.shadowRoot!.querySelector('.burger') as HTMLButtonElement;
    expect(burger.getAttribute('aria-expanded')).to.equal('false');
    burger.click();
    await el.updateComplete;
    expect(burger.getAttribute('aria-expanded')).to.equal('true');
    expect(el.open).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiNavbar>(html`<pai-navbar><strong slot="brand">PulseAI</strong></pai-navbar>`);
    await expect(el).to.be.accessible();
  });
});
