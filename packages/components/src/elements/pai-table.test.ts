import { expect, fixture, html } from '@open-wc/testing';
import './pai-table.js';
import type { PaiTable } from './pai-table.js';

describe('pai-table', () => {
  it('renders a slotted native table', async () => {
    const el = await fixture<PaiTable>(html`
      <pai-table>
        <table>
          <thead><tr><th>Name</th></tr></thead>
          <tbody><tr><td>Ada</td></tr></tbody>
        </table>
      </pai-table>
    `);
    expect(el.querySelector('table')).to.exist;
    expect(el.textContent).to.include('Ada');
  });

  it('reflects style modifiers', async () => {
    const el = await fixture<PaiTable>(html`<pai-table bordered striped hoverable></pai-table>`);
    expect(el.hasAttribute('bordered')).to.be.true;
    expect(el.hasAttribute('striped')).to.be.true;
    expect(el.hasAttribute('hoverable')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiTable>(html`
      <pai-table>
        <table><caption>Users</caption><tbody><tr><td>Ada</td></tr></tbody></table>
      </pai-table>
    `);
    await expect(el).to.be.accessible();
  });
});
