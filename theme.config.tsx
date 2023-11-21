import React from 'react'
import { DocsThemeConfig,  } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>ETL</span>,
  toc: {
    extraContent: false
  },
  footer: {
    text: 'Sponsored by Supabase',
  },
}

export default config
