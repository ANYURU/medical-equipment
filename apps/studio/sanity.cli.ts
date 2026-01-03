import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 't1xfyfxz',
    dataset: 'production'
  },
  deployment: {
    appId: 'ptskt7r73e8kpvpj8wcbc891',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
