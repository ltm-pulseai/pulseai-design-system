import { expect, fixture, html } from '@open-wc/testing';
import './pai-stat-card.js';
import type { PaiStatCard } from './pai-stat-card.js';

describe('pai-stat-card', () => {
  it('composes pai-box and shows value/label', async () => {
    const el = await fixture<PaiStatCard>(
      html`<pai-stat-card value="12,489" label="Active users"></pai-stat-card>`,
    );
    expect(el.shadowRoot!.querySelector('pai-box')).to.exist;
    expect(el.shadowRoot!.textContent).to.include('12,489');
    expect(el.shadowRoot!.textContent).to.include('Active users');
  });

  it('shows a trend tag when trend is set', async () => {
    const el = await fixture<PaiStatCard>(
      html`<pai-stat-card value="1" label="x" .trend=${12.5} trend-direction="up"></pai-stat-card>`,
    );
    const tag = el.shadowRoot!.querySelector('pai-tag')!;
    expect(tag.getAttribute('color')).to.equal('success');
    expect(tag.textContent).to.include('12.5%');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiStatCard>(html`<pai-stat-card value="1" label="x"></pai-stat-card>`);
    await expect(el).to.be.accessible();
  });
});
