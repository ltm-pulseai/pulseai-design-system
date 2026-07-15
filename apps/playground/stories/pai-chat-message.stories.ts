import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-chat-message.js';

const meta: Meta = {
  title: 'Elements/Molecules/ChatMessage',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`role="received"` — left-aligned incoming message. `role="sent"` — right-aligned outgoing. `role="system"` — centered muted notice. Works for any chat UI: human-to-human, support, AI assistant, comments.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:560px;padding:1rem;">
      <pai-chat-message role="system">
        Conversation started · 14 Jul 2025
      </pai-chat-message>

      <pai-chat-message role="received">
        Hi! How can I help you today?
      </pai-chat-message>

      <pai-chat-message role="sent">
        I'd like to understand what happened between 09:00 and 10:00 this morning.
      </pai-chat-message>

      <pai-chat-message role="received" avatar="S">
        I've reviewed the timeline. There were <strong>3 retries</strong> on the write step
        between 09:12 and 09:14 — all recovered successfully.
      </pai-chat-message>

      <pai-chat-message role="sent" avatar="JD">
        Thanks, can you show me the details?
      </pai-chat-message>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
