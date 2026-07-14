import { expect, fixture, html } from '@open-wc/testing';
import './pai-hero.js';
import type { PaiHero } from './pai-hero.js';

describe('pai-hero', () => {
  it('renders head/default/foot slots', async () => {
    const el = await fixture<PaiHero>(html`
      <pai-hero>
        <nav slot="head">Nav</nav>
        <h1>Title</h1>
        <div slot="foot">Tabs</div>
      </pai-hero>
    `);
    expect(el.textContent).to.include('Nav');
    expect(el.textContent).to.include('Title');
    expect(el.textContent).to.include('Tabs');
  });

  it('reflects color and size', async () => {
    const el = await fixture<PaiHero>(html`<pai-hero color="primary" size="large"></pai-hero>`);
    expect(el.getAttribute('color')).to.equal('primary');
    expect(el.getAttribute('size')).to.equal('large');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiHero>(html`<pai-hero><h1>Title</h1></pai-hero>`);
    await expect(el).to.be.accessible();
  });
});
