import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-field.js';
import '@pulseai/components/form/pai-control.js';
import '@pulseai/components/elements/pai-button.js';

const meta: Meta = {
  title: 'Form/Field',
  tags: ['autodocs'],
  render: () => html`
    <pai-field grouped>
      <span slot="label">Search</span>
      <pai-control>
        <input placeholder="Search…" style="padding:0.5em 0.75em; border-radius:4px; border:1px solid var(--pai-color-border);" />
      </pai-control>
      <pai-button color="primary">Go</pai-button>
      <span slot="help">Press Enter or click Go to search</span>
    </pai-field>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Horizontal: Story = {
  render: () => html`
    <pai-field horizontal>
      <span slot="label">Name</span>
      <input style="padding:0.5em 0.75em; border-radius:4px; border:1px solid var(--pai-color-border); width:100%;" />
    </pai-field>
  `,
};
