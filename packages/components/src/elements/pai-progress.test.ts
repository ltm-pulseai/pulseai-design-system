import { expect, fixture, html } from '@open-wc/testing';
import './pai-progress.js';
import type { PaiProgress } from './pai-progress.js';

describe('pai-progress', () => {
  it('renders a native progress element with value/max', async () => {
    const el = await fixture<PaiProgress>(html`<pai-progress value="40" max="100"></pai-progress>`);
    const progress = el.shadowRoot!.querySelector('progress')!;
    expect(progress.value).to.equal(40);
    expect(progress.max).to.equal(100);
  });

  it('renders indeterminate when value is unset', async () => {
    const el = await fixture<PaiProgress>(html`<pai-progress></pai-progress>`);
    const progress = el.shadowRoot!.querySelector('progress')!;
    expect(progress.hasAttribute('value')).to.be.false;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiProgress>(html`<pai-progress value="40" label="Loading"></pai-progress>`);
    await expect(el).to.be.accessible();
  });
});
