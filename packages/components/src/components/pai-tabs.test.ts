import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-tabs.js';
import type { PaiTabs } from './pai-tabs.js';

const items = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

describe('pai-tabs', () => {
  it('shows only the panel matching the active tab', async () => {
    const el = await fixture<PaiTabs>(html`
      <pai-tabs .items=${items}>
        <div data-tab="one">Panel one</div>
        <div data-tab="two">Panel two</div>
      </pai-tabs>
    `);
    await el.updateComplete;
    const [panelOne, panelTwo] = Array.from(el.children) as HTMLElement[];
    expect(panelOne.hidden).to.be.false;
    expect(panelTwo.hidden).to.be.true;
  });

  it('switches tabs on click and fires pai-tab-change', async () => {
    const el = await fixture<PaiTabs>(html`
      <pai-tabs .items=${items}>
        <div data-tab="one">Panel one</div>
        <div data-tab="two">Panel two</div>
      </pai-tabs>
    `);
    const tabTwo = el.shadowRoot!.querySelector('[data-value="two"]') as HTMLButtonElement;
    setTimeout(() => tabTwo.click());
    const event = await oneEvent(el, 'pai-tab-change');
    expect((event as CustomEvent).detail.value).to.equal('two');
    expect(el.active).to.equal('two');
  });

  it('moves selection with ArrowRight', async () => {
    const el = await fixture<PaiTabs>(html`
      <pai-tabs .items=${items}>
        <div data-tab="one">Panel one</div>
        <div data-tab="two">Panel two</div>
      </pai-tabs>
    `);
    const tablist = el.shadowRoot!.querySelector('[role="tablist"]')!;
    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.active).to.equal('two');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiTabs>(html`
      <pai-tabs .items=${items}>
        <div data-tab="one">Panel one</div>
        <div data-tab="two">Panel two</div>
      </pai-tabs>
    `);
    await expect(el).to.be.accessible();
  });
});
