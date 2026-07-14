import { LitElement, css, type CSSResultGroup } from 'lit';

/**
 * Shared base class for all PulseAI Design System components.
 * Keeps a minimal box-sizing reset local to each component's shadow root
 * (light-DOM global reset lives in @pulseai/styles).
 */
export class PaiElement extends LitElement {
  /**
   * Delegates focus into the first focusable element in the shadow root when the
   * host itself is focused/`.focus()`-called — required so composite components
   * like `pai-modal`'s focus trap can move focus onto other `pai-*` elements
   * (whose real `<button>`/`<input>` lives in a separate shadow root that
   * `querySelectorAll` can't see from outside).
   */
  static shadowRootOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };

  static styles: CSSResultGroup = css`
    :host {
      box-sizing: border-box;
    }
    :host *,
    :host *::before,
    :host *::after {
      box-sizing: inherit;
    }
  `;
}
