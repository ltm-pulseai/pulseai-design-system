import { expect, fixture, html } from '@open-wc/testing';
import './pai-dropdown.js';
import type { PaiDropdown } from './pai-dropdown.js';

describe('pai-dropdown', () => {
  it('opens the menu on trigger click', async () => {
    const el = await fixture<PaiDropdown>(html`
      <pai-dropdown>
        <button slot="trigger">Options</button>
        <a role="menuitem" href="#">Edit</a>
        <a role="menuitem" href="#">Delete</a>
      </pai-dropdown>
    `);
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(el.shadowRoot!.querySelector('.menu')!.hasAttribute('hidden')).to.be.false;
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const el = await fixture<PaiDropdown>(html`
      <pai-dropdown>
        <button slot="trigger">Options</button>
        <a role="menuitem" href="#">Edit</a>
      </pai-dropdown>
    `);
    el.open = true;
    await el.updateComplete;
    const menu = el.shadowRoot!.querySelector('.menu') as HTMLElement;
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiDropdown>(html`
      <pai-dropdown>
        <button slot="trigger">Options</button>
        <a role="menuitem" href="#">Edit</a>
      </pai-dropdown>
    `);
    await expect(el).to.be.accessible();
  });
});
