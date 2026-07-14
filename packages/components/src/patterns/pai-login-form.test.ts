import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './pai-login-form.js';
import type { PaiLoginForm } from './pai-login-form.js';
import type { PaiInput } from '../form/pai-input.js';

describe('pai-login-form', () => {
  it('composes email/password/remember/submit', async () => {
    const el = await fixture<PaiLoginForm>(html`<pai-login-form></pai-login-form>`);
    expect(el.shadowRoot!.querySelector('#email')).to.exist;
    expect(el.shadowRoot!.querySelector('#password')).to.exist;
    expect(el.shadowRoot!.querySelector('#remember')).to.exist;
    expect(el.shadowRoot!.querySelector('pai-button')).to.exist;
  });

  it('fires pai-submit with field values when valid', async () => {
    const el = await fixture<PaiLoginForm>(html`<pai-login-form></pai-login-form>`);
    const email = el.shadowRoot!.querySelector('#email') as PaiInput;
    const password = el.shadowRoot!.querySelector('#password') as PaiInput;
    email.value = 'a@b.com';
    password.value = 'secret';
    const form = el.shadowRoot!.querySelector('form')!;
    setTimeout(() => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    const event = await oneEvent(el, 'pai-submit');
    expect((event as CustomEvent).detail).to.deep.equal({
      email: 'a@b.com',
      password: 'secret',
      remember: false,
    });
  });

  it('does not submit when required fields are empty', async () => {
    const el = await fixture<PaiLoginForm>(html`<pai-login-form></pai-login-form>`);
    const form = el.shadowRoot!.querySelector('form')!;
    let fired = false;
    el.addEventListener('pai-submit', () => (fired = true));
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(fired).to.be.false;
  });

  it('is accessible', async () => {
    const el = await fixture<PaiLoginForm>(html`<pai-login-form></pai-login-form>`);
    await expect(el).to.be.accessible();
  });
});
