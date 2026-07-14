import { expect, fixture, html } from '@open-wc/testing';
import './pai-media.js';
import type { PaiMedia } from './pai-media.js';

describe('pai-media', () => {
  it('renders left/default/right slots', async () => {
    const el = await fixture<PaiMedia>(html`
      <pai-media>
        <img slot="left" alt="avatar" />
        <p>Body</p>
        <button slot="right">Reply</button>
      </pai-media>
    `);
    expect(el.textContent).to.include('Body');
    expect(el.textContent).to.include('Reply');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiMedia>(html`<pai-media><p>Body</p></pai-media>`);
    await expect(el).to.be.accessible();
  });
});
