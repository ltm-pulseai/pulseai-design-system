import { expect, fixture, html } from '@open-wc/testing';
import './pai-data-table.js';
import type { PaiDataTable } from './pai-data-table.js';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
];
const rows = Array.from({ length: 12 }, (_, i) => ({ name: `Person ${i}`, role: i % 2 ? 'Engineer' : 'Designer' }));

describe('pai-data-table', () => {
  it('composes pai-search-bar, pai-table, and pai-pagination', async () => {
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table .columns=${columns} .rows=${rows}></pai-data-table>`,
    );
    expect(el.shadowRoot!.querySelector('pai-search-bar')).to.exist;
    expect(el.shadowRoot!.querySelector('pai-table')).to.exist;
    expect(el.shadowRoot!.querySelector('pai-pagination')).to.exist;
  });

  it('paginates rows according to pageSize', async () => {
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table .columns=${columns} .rows=${rows} page-size="5"></pai-data-table>`,
    );
    const trs = el.shadowRoot!.querySelectorAll('tbody tr');
    expect(trs.length).to.equal(5);
  });

  it('filters rows when the search bar fires pai-search', async () => {
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table .columns=${columns} .rows=${rows} page-size="20"></pai-data-table>`,
    );
    const searchBar = el.shadowRoot!.querySelector('pai-search-bar')!;
    searchBar.dispatchEvent(
      new CustomEvent('pai-search', { detail: { value: 'Engineer' }, bubbles: true, composed: true }),
    );
    await el.updateComplete;
    const trs = el.shadowRoot!.querySelectorAll('tbody tr');
    expect(trs.length).to.equal(6);
  });

  it('is accessible', async () => {
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table .columns=${columns} .rows=${rows}></pai-data-table>`,
    );
    await expect(el).to.be.accessible();
  });
});
