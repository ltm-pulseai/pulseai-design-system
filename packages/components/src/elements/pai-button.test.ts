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

  it('reflects variant independently of color', async () => {
    const el = await fixture<PaiButton>(
      html`<pai-button color="danger" variant="soft">Go</pai-button>`,
    );
    expect(el.getAttribute('color')).to.equal('danger');
    expect(el.getAttribute('variant')).to.equal('soft');
  });

  it('defaults to the filled variant', async () => {
    const el = await fixture<PaiButton>(html`<pai-button>Go</pai-button>`);
    expect(el.getAttribute('variant')).to.equal('filled');
  });

  it('is accessible', async () => {
    const el = await fixture<PaiButton>(html`<pai-button>Accessible button</pai-button>`);
    await expect(el).to.be.accessible();
  });

  it('is accessible in every variant', async () => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <pai-button color="primary" variant="filled">Filled</pai-button>
        <pai-button color="primary" variant="outlined">Outlined</pai-button>
        <pai-button color="primary" variant="soft">Soft</pai-button>
        <pai-button color="primary" variant="text">Text</pai-button>
      </div>
    `);
    await expect(el).to.be.accessible();
  });
});
