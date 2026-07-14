import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-radio.js';

const meta: Meta = {
  title: 'Form/Radio',
  tags: ['autodocs'],
  render: () => html`
    <div style="display:flex; gap: 1rem;">
      <pai-radio name="plan" value="free" checked>Free</pai-radio>
      <pai-radio name="plan" value="pro">Pro</pai-radio>
      <pai-radio name="plan" value="enterprise">Enterprise</pai-radio>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
