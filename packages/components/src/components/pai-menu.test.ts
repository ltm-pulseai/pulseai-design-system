import { expect, fixture, html } from '@open-wc/testing';
import './pai-menu.js';
import type { PaiMenu } from './pai-menu.js';

describe('pai-menu', () => {
  it('renders slotted labels and lists in a labeled nav', async () => {
    const el = await fixture<PaiMenu>(html`
      <pai-menu>
        <p>General</p>
        <ul>
          <li><a href="#" aria-current="page">Dashboard</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </pai-menu>
    `);
    expect(el.shadowRoot!.querySelector('nav[aria-label="Menu"]')).to.exist;
    expect(el.textContent).to.include('Dashboard');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiMenu>(html`
      <pai-menu><ul><li><a href="#">Dashboard</a></li></ul></pai-menu>
    `);
    await expect(el).to.be.accessible();
  });
});
