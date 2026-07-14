import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-dropdown.js';
import '@pulseai/components/elements/pai-button.js';

const meta: Meta = {
  title: 'Components/Dropdown',
  tags: ['autodocs'],
  render: () => html`
    <pai-dropdown>
      <pai-button slot="trigger" color="primary">Options</pai-button>
      <a role="menuitem" href="#">Edit</a>
      <a role="menuitem" href="#">Duplicate</a>
      <a role="menuitem" href="#">Delete</a>
    </pai-dropdown>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
