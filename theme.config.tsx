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
    text: (
      <span>
        Sponsored by{' '}
        <a href="https://supabase.com" target="_blank">
          Supabase
        </a>
      </span>
    )
  }
}

export default config
