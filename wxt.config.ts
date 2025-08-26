import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: [
      'storage',
      'scripting',
      'activeTab',
      'tabs'
    ],
    host_permissions: ['<all_urls>'],
  },
});