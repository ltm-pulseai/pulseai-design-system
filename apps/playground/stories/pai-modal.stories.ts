import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-modal.js';
import '@pulseai/components/elements/pai-button.js';

const meta: Meta = {
  title: 'Components/Modal',
  tags: ['autodocs'],
  render: () => html`
    <pai-button
      color="primary"
      @pai-click=${(e: Event) => {
        const modal = (e.target as HTMLElement).nextElementSibling as HTMLElement & { show(): void };
        modal.show();
      }}
    >
      Open modal
    </pai-button>
    <pai-modal>
      Delete project?
      <p slot="body">This action cannot be undone. All project data will be permanently removed.</p>
      <pai-button slot="footer" @pai-click=${(e: Event) => (e.target as any).closest('pai-modal').close()}>
        Cancel
      </pai-button>
      <pai-button
        slot="footer"
        color="danger"
        @pai-click=${(e: Event) => (e.target as any).closest('pai-modal').close()}
      >
        Delete
      </pai-button>
    </pai-modal>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
