import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-button.js';
import type { PaiButtonColor, PaiButtonVariant, PaiButtonSize } from '@pulseai/components';

interface PaiButtonArgs {
  label: string;
  color: PaiButtonColor;
  variant: PaiButtonVariant;
  size: PaiButtonSize;
  rounded: boolean;
  fullWidth: boolean;
  disabled: boolean;
  loading: boolean;
  href?: string;
}

const meta: Meta<PaiButtonArgs> = {
  title: 'Elements/Button',
  tags: ['autodocs'],
  render: (args) => html`
    <pai-button
      color=${args.color}
      variant=${args.variant}
      size=${args.size}
      ?rounded=${args.rounded}
      ?full-width=${args.fullWidth}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      href=${args.href || undefined}
    >
      ${args.label}
    </pai-button>
  `,
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'link', 'info', 'success', 'warning', 'danger'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text', 'soft'],
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'medium', 'large'],
    },
  },
  args: {
    label: 'Click me',
    color: 'default',
    variant: 'filled',
    size: 'normal',
    rounded: false,
    fullWidth: false,
    disabled: false,
    loading: false,
    href: '',
  },
};

export default meta;
type Story = StoryObj<PaiButtonArgs>;

export const Default: Story = {};

export const Primary: Story = {
  args: { color: 'primary', label: 'Primary' },
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <pai-button color="default">Default</pai-button>
      <pai-button color="primary">Primary</pai-button>
      <pai-button color="link">Link</pai-button>
      <pai-button color="info">Info</pai-button>
      <pai-button color="success">Success</pai-button>
      <pai-button color="warning">Warning</pai-button>
      <pai-button color="danger">Danger</pai-button>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <pai-button color="primary" variant="filled">Filled</pai-button>
      <pai-button color="primary" variant="outlined">Outlined</pai-button>
      <pai-button color="primary" variant="soft">Soft</pai-button>
      <pai-button color="primary" variant="text">Text</pai-button>
    </div>
  `,
};

export const Loading: Story = {
  args: { color: 'primary', loading: true, label: 'Saving' },
};

export const Disabled: Story = {
  args: { color: 'primary', disabled: true, label: 'Disabled' },
};

export const AsLink: Story = {
  args: { color: 'link', href: 'https://example.com', label: 'Go to example.com' },
};
