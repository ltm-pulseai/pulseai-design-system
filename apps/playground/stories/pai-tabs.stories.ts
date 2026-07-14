import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-tabs.js';
import type { PaiTabItem } from '@pulseai/components';

const items: PaiTabItem[] = [
  { value: 'profile', label: 'Profile' },
  { value: 'security', label: 'Security' },
  { value: 'notifications', label: 'Notifications' },
];

const meta: Meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  render: () => html`
    <pai-tabs .items=${items}>
      <div data-tab="profile"><p>Profile settings go here.</p></div>
      <div data-tab="security"><p>Security settings go here.</p></div>
      <div data-tab="notifications"><p>Notification preferences go here.</p></div>
    </pai-tabs>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
