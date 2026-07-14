import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-button.js';
import type { PaiButton } from './pai-button.js';

describe('pai-button', () => {
  it('renders a native <button> by default', async () => {
    const el = await fixture<PaiButton>(html`<pai-button>Click me</pai-button>`);
    const inner = el.shadowRoot!.querySelector('button');
    expect(inner).to.exist;
    expect(inner!.type).to.equal('button');
  });

  it('renders an <a> when href is set', async () => {
    const el = await fixture<PaiButton>(html`<pai-button href="/docs">Docs</pai-button>`);
    const inner = el.shadowRoot!.querySelector('a');
    expect(inner).to.exist;
    expect(inner!.getAttribute('href')).to.equal('/docs');
  });

  it('reflects color and size to attributes', async () => {
    const el = await fixture<PaiButton>(
      html`<pai-button color="primary" size="large">Go</pai-button>`,
    );
    expect(el.getAttribute('color')).to.equal('primary');
    expect(el.getAttribute('size')).to.equal('large');
  });

  it('disables the inner button and blocks pai-click when disabled', async () => {
    const el = await fixture<PaiButton>(html`<pai-button disabled>Go</pai-button>`);
    const inner = el.shadowRoot!.querySelector('button')!;
    expect(inner.disabled).to.be.true;

    let fired = false;
    el.addEventListener('pai-click', () => (fired = true));
    inner.click();
    expect(fired).to.be.false;
  });

  it('sets aria-busy and shows a spinner when loading', async () => {
    const el = await fixture<PaiButton>(html`<pai-button loading>Go</pai-button>`);
    const inner = el.shadowRoot!.querySelector('button')!;
    expect(inner.getAttribute('aria-busy')).to.equal('true');
    expect(el.shadowRoot!.querySelector('.spinner')).to.exist;
  });

  it('fires a pai-click event on click when enabled', async () => {
    const el = await fixture<PaiButton>(html`<pai-button>Go</pai-button>`);
    const inner = el.shadowRoot!.querySelector('button')!;
    setTimeout(() => inner.click());
    const event = await oneEvent(el, 'pai-click');
    expect(event).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiButton>(html`<pai-button>Accessible button</pai-button>`);
    await expect(el).to.be.accessible();
  });
});
