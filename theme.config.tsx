import React from 'react'
import { DocsThemeConfig,  } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>ETL</span>,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – etl.dev',
    };
  },
  editLink: {
    text: null,
  },  
  toc: {
    extraContent: false
  },
  feedback: {
    content: null
  },
  footer: {
    text: 'Sponsored by Supabase',
  },
}

export default config
