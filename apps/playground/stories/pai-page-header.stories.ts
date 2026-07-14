import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-page-header.js';
import '@pulseai/components/elements/pai-button.js';

const meta: Meta = {
  title: 'Patterns/Organisms/PageHeader',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Composed from `pai-breadcrumb` + `pai-title` — an organism for topping dashboard pages.',
      },
    },
  },
  render: () => html`
    <pai-page-header
      heading="Team settings"
      .breadcrumbs=${[{ label: 'Home', href: '#' }, { label: 'Settings', href: '#' }, { label: 'Team' }]}
    >
      <pai-button slot="actions" variant="outlined">Export</pai-button>
      <pai-button slot="actions" color="primary">Invite member</pai-button>
    </pai-page-header>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
