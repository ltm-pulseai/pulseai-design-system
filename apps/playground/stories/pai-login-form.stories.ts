import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-login-form.js';

const meta: Meta = {
  title: 'Patterns/Organisms/LoginForm',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Composed from `pai-input` + `pai-checkbox` + `pai-button` — a full organism assembled from primitives.',
      },
    },
  },
  render: () => html`
    <pai-login-form @pai-submit=${(e: CustomEvent) => console.log('pai-submit', e.detail)}></pai-login-form>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const WithError: Story = {
  render: () => html`<pai-login-form error="Invalid email or password."></pai-login-form>`,
};
