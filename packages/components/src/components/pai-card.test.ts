import { expect, fixture, html } from '@open-wc/testing';
import './pai-card.js';
import type { PaiCard } from './pai-card.js';

describe('pai-card', () => {
  it('renders image/header/default/footer slots', async () => {
    const el = await fixture<PaiCard>(html`
      <pai-card>
        <span slot="header">Title</span>
        <p>Body</p>
        <button slot="footer">Action</button>
      </pai-card>
    `);
    expect(el.textContent).to.include('Title');
    expect(el.textContent).to.include('Body');
    expect(el.textContent).to.include('Action');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiCard>(html`<pai-card><p>Body</p></pai-card>`);
    await expect(el).to.be.accessible();
  });
});
