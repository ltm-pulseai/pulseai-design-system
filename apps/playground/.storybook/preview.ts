import type { Preview } from '@storybook/web-components';
import '@pulseai/tokens/tokens.css';
import '@pulseai/styles';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {},
      options: { restoreScroll: true },
    },
    options: {
      storySort: {
        order: ['Getting Started', 'Elements', 'Layout', 'Form', 'Components', 'Patterns', ['Molecules', 'Organisms'], 'Utilities'],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'ocean', 'sunset', 'forest', 'slate', 'bootstrap', 'material', 'nova'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      document.documentElement.setAttribute('data-theme', context.globals.theme ?? 'light');
      return story();
    },
  ],
};

export default preview;
