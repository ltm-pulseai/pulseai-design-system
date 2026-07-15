import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-chat-shell.js';
import '@pulseai/components/elements/pai-chat-message.js';
import '@pulseai/components/elements/pai-tool-call.js';

const meta: Meta = {
  title: 'Patterns/Organisms/ChatShell',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Two-pane AI chat layout with message thread, composer, and context panel.' },
    },
  },
  render: () => html`
    <pai-chat-shell style="--pai-chat-height:480px;">
      <pai-chat-message slot="messages" role="received">
        Hello! I've analysed your pipeline. Everything looks healthy. What would you like to investigate?
      </pai-chat-message>
      <pai-chat-message slot="messages" role="sent">
        Show me the errors from the last hour.
      </pai-chat-message>
      <pai-chat-message slot="messages" role="received">
        I found <strong>3 errors</strong> in the last hour — all related to a Postgres connection retry.
        <pai-tool-call label="query_logs" style="margin-top:.5rem;">
          { "level": "ERROR", "window": "1h" }
        </pai-tool-call>
      </pai-chat-message>

      <div slot="composer" style="display:flex;gap:.5rem;">
        <input
          type="text"
          placeholder="Ask about your logs…"
          style="flex:1;padding:.5rem .75rem;border:1px solid var(--pai-color-border);border-radius:6px;background:var(--pai-color-surface);color:var(--pai-color-text);font:inherit;outline:none;"
        />
        <button style="padding:.5rem .9rem;border-radius:6px;background:var(--pai-color-primary);color:#fff;border:none;cursor:pointer;font:inherit;font-weight:600;">Send</button>
      </div>

      <div slot="panel" style="display:flex;flex-direction:column;gap:.5rem;">
        <div style="font-size:.65rem;text-transform:uppercase;letter-spacing:.07em;color:var(--pai-color-grey);font-weight:600;margin-bottom:.25rem;">Sources</div>
        <div style="font-size:.75rem;padding:.4rem .6rem;border:1px solid var(--pai-color-border);border-radius:6px;background:var(--pai-color-surface);">
          [1] cloudwatch/prod/errors — 3 matches
        </div>
        <div style="font-size:.75rem;padding:.4rem .6rem;border:1px solid var(--pai-color-border);border-radius:6px;background:var(--pai-color-surface);">
          [2] postgres-sink · retry log
        </div>
      </div>
    </pai-chat-shell>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
