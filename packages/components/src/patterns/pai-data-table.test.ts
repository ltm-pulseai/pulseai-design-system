import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-data-table.js';
import type { PaiDataTable, PaiDataTableColumn } from './pai-data-table.js';

const columns: PaiDataTableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
];
const rows = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: `Person ${i}`,
  role: i % 2 ? 'Engineer' : 'Designer',
}));

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

  it('sorts rows ascending then descending then back to unsorted on repeated header clicks', async () => {
    const sortableColumns: PaiDataTableColumn[] = [{ key: 'name', label: 'Name', sortable: true }];
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table .columns=${sortableColumns} .rows=${rows} page-size="20"></pai-data-table>`,
    );
    const header = el.shadowRoot!.querySelector('th button') as HTMLButtonElement;
    const cellText = () =>
      Array.from(el.shadowRoot!.querySelectorAll('tbody tr td')).map((td) => td.textContent!.trim());

    const unsorted = cellText();
    header.click();
    await el.updateComplete;
    const ascending = cellText();
    expect(ascending).to.deep.equal([...unsorted].sort());
    expect(el.shadowRoot!.querySelector('th')!.getAttribute('aria-sort')).to.equal('ascending');

    header.click();
    await el.updateComplete;
    const descending = cellText();
    expect(descending).to.deep.equal([...unsorted].sort().reverse());

    header.click();
    await el.updateComplete;
    expect(cellText()).to.deep.equal(unsorted);
    expect(el.shadowRoot!.querySelector('th')!.getAttribute('aria-sort')).to.equal('none');
  });

  it('renders custom cell content via column.render', async () => {
    const renderColumns: PaiDataTableColumn[] = [
      {
        key: 'role',
        label: 'Role',
        render: (value) => html`<strong class="role-cell">${value}</strong>`,
      },
    ];
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table .columns=${renderColumns} .rows=${rows} page-size="20"></pai-data-table>`,
    );
    expect(el.shadowRoot!.querySelectorAll('.role-cell').length).to.equal(rows.length);
  });

  it('selectable shows a checkbox column and fires pai-selection-change', async () => {
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table .columns=${columns} .rows=${rows} page-size="20" selectable></pai-data-table>`,
    );
    const firstRowCheckbox = el.shadowRoot!.querySelector('tbody tr pai-checkbox') as HTMLElement & {
      checked: boolean;
    };
    expect(firstRowCheckbox).to.exist;

    const inner = firstRowCheckbox.shadowRoot!.querySelector('input')!;
    inner.checked = true;
    setTimeout(() => inner.dispatchEvent(new Event('change', { bubbles: true })));
    const event = await oneEvent(el, 'pai-selection-change');
    expect((event as CustomEvent).detail.selectedRows).to.deep.equal([rows[0]]);
  });

  it('header select-all selects every filtered row', async () => {
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table .columns=${columns} .rows=${rows} page-size="20" selectable></pai-data-table>`,
    );
    const headerCheckbox = el.shadowRoot!.querySelector('thead pai-checkbox') as HTMLElement;
    const inner = headerCheckbox.shadowRoot!.querySelector('input')!;
    inner.checked = true;
    setTimeout(() => inner.dispatchEvent(new Event('change', { bubbles: true })));
    const event = await oneEvent(el, 'pai-selection-change');
    expect((event as CustomEvent).detail.selectedRows.length).to.equal(rows.length);
  });

  it('is accessible', async () => {
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table .columns=${columns} .rows=${rows}></pai-data-table>`,
    );
    await expect(el).to.be.accessible();
  });

  it('is accessible when selectable and sortable', async () => {
    const el = await fixture<PaiDataTable>(
      html`<pai-data-table
        .columns=${[{ key: 'name', label: 'Name', sortable: true }] as PaiDataTableColumn[]}
        .rows=${rows}
        selectable
      ></pai-data-table>`,
    );
    await expect(el).to.be.accessible();
  });
});
