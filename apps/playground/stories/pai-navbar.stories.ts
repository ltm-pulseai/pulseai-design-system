import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-navbar.js';
import '@pulseai/components/elements/pai-button.js';

const meta: Meta = {
  title: 'Components/Navbar',
  tags: ['autodocs'],
  render: () => html`
    <pai-navbar>
      <strong slot="brand" style="padding: 0 0.75rem;">PulseAI</strong>
      <a slot="start" href="#" style="padding: 0.5rem 0.75rem; display:inline-block;">Docs</a>
      <a slot="start" href="#" style="padding: 0.5rem 0.75rem; display:inline-block;">Components</a>
      <pai-button slot="end" color="primary" size="small">Sign in</pai-button>
    </pai-navbar>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
