import { expect, fixture, html } from '@open-wc/testing';
import './pai-page-header.js';
import type { PaiPageHeader } from './pai-page-header.js';

describe('pai-page-header', () => {
  it('composes breadcrumb and title with an actions slot', async () => {
    const el = await fixture<PaiPageHeader>(html`
      <pai-page-header
        heading="Team settings"
        .breadcrumbs=${[{ label: 'Home', href: '/' }, { label: 'Settings' }]}
      >
        <button slot="actions">Invite</button>
      </pai-page-header>
    `);
    expect(el.shadowRoot!.querySelector('pai-breadcrumb')).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Team settings');
    expect(el.textContent).to.include('Invite');
  });

  it('omits the breadcrumb when none are given', async () => {
    const el = await fixture<PaiPageHeader>(html`<pai-page-header heading="Dashboard"></pai-page-header>`);
    expect(el.shadowRoot!.querySelector('pai-breadcrumb')).to.not.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiPageHeader>(html`<pai-page-header heading="Dashboard"></pai-page-header>`);
    await expect(el).to.be.accessible();
  });
});
