import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-pagination.js';
import type { PaiPagination } from './pai-pagination.js';

describe('pai-pagination', () => {
  it('marks the current page aria-current=page', async () => {
    const el = await fixture<PaiPagination>(html`<pai-pagination .page=${3} total-pages="5"></pai-pagination>`);
    const current = el.shadowRoot!.querySelector('[aria-current="page"]')!;
    expect(current.textContent!.trim()).to.equal('3');
  });

  it('disables Previous on page 1 and Next on the last page', async () => {
    const el = await fixture<PaiPagination>(html`<pai-pagination .page=${1} total-pages="1"></pai-pagination>`);
    const [prev, next] = el.shadowRoot!.querySelectorAll('.prev-next button');
    expect((prev as HTMLButtonElement).disabled).to.be.true;
    expect((next as HTMLButtonElement).disabled).to.be.true;
  });

  it('fires pai-page-change when a page button is clicked', async () => {
    const el = await fixture<PaiPagination>(html`<pai-pagination .page=${1} total-pages="3"></pai-pagination>`);
    const buttons = el.shadowRoot!.querySelectorAll('ul button');
    const pageTwo = Array.from(buttons).find((b) => b.textContent!.trim() === '2') as HTMLButtonElement;
    setTimeout(() => pageTwo.click());
    const event = await oneEvent(el, 'pai-page-change');
    expect((event as CustomEvent).detail.page).to.equal(2);
  });

  it('is accessible', async () => {
    const el = await fixture<PaiPagination>(html`<pai-pagination .page=${1} total-pages="5"></pai-pagination>`);
    await expect(el).to.be.accessible();
  });
});
