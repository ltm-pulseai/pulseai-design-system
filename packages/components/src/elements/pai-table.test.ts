import { expect, fixture, fixtureCleanup, html, nextFrame } from '@open-wc/testing';
import { PaiTable } from './pai-table.js';

describe('pai-table', () => {
  afterEach(fixtureCleanup);

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

  it('actually stripes even rows when striped is set', async () => {
    const el = await fixture<PaiTable>(html`
      <pai-table striped>
        <table>
          <tbody>
            <tr><td>Row 1</td></tr>
            <tr><td>Row 2</td></tr>
          </tbody>
        </table>
      </pai-table>
    `);
    await nextFrame();
    expect(el).to.be.instanceOf(PaiTable);
    const rows = el.querySelectorAll('tbody tr');
    const oddBg = getComputedStyle(rows[0]).backgroundColor;
    const evenBg = getComputedStyle(rows[1]).backgroundColor;
    expect(evenBg).to.not.equal(oddBg);
  });

  it('applies real padding/border to th/td (::slotted() cannot reach descendants)', async () => {
    const el = await fixture<PaiTable>(html`
      <pai-table bordered>
        <table><tbody><tr><td>Row</td></tr></tbody></table>
      </pai-table>
    `);
    await nextFrame();
    expect(el).to.be.instanceOf(PaiTable);
    const td = el.querySelector('td')!;
    const cs = getComputedStyle(td);
    expect(cs.paddingTop).to.not.equal('0px');
    expect(cs.borderTopWidth).to.equal('1px');
  });

  it('highlights a row on mouseover and reverts on mouseout when hoverable is set', async () => {
    const el = await fixture<PaiTable>(html`
      <pai-table hoverable>
        <table><tbody><tr><td>Row</td></tr></tbody></table>
      </pai-table>
    `);
    await nextFrame();
    expect(el).to.be.instanceOf(PaiTable);
    const row = el.querySelector('tr')!;
    const before = getComputedStyle(row).backgroundColor;
    row.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const during = getComputedStyle(row).backgroundColor;
    expect(during).to.not.equal(before);
    row.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    expect(getComputedStyle(row).backgroundColor).to.equal(before);
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
