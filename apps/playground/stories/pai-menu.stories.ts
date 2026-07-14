import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-menu.js';

const meta: Meta = {
  title: 'Components/Menu',
  tags: ['autodocs'],
  render: () => html`
    <pai-menu style="max-width: 200px;">
      <p>General</p>
      <ul>
        <li><a href="#" aria-current="page">Dashboard</a></li>
        <li><a href="#">Customers</a></li>
      </ul>
      <p>Administration</p>
      <ul>
        <li><a href="#">Team settings</a></li>
        <li><a href="#">Billing</a></li>
      </ul>
    </pai-menu>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
