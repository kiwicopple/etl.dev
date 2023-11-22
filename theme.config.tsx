import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>ETL</span>,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – etl.dev',
    }
  },
  editLink: {
    text: null,
  },
  toc: {
    extraContent: false,
  },
  feedback: {
    content: null,
  },
  footer: {
    text: (
      <span>
        Sponsored by{' '}
        <a href="https://supabase.com" target="_blank">
          Supabase
        </a>
      </span>
    ),
  },
  i18n: [
    { locale: 'en-US', text: '🇺🇸 English' },
    { locale: 'zh-CN', text: '🇨🇳 Chinese (Simplified)' },
    { locale: 'es-ES', text: '🇪🇸 Spanish' },
    { locale: 'hi-IN', text: '🇮🇳 Hindi' },
    { locale: 'ar-SA', text: '🇸🇦 Arabic' },
    { locale: 'bn-IN', text: '🇮🇳 Bengali' },
    { locale: 'pt-BR', text: '🇧🇷 Portuguese (Brazil)' },
    { locale: 'ru-RU', text: '🇷🇺 Russian' },
    { locale: 'ja-JP', text: '🇯🇵 Japanese' },
    { locale: 'de-DE', text: '🇩🇪 German' },
    { locale: 'jv-ID', text: '🇮🇩 Javanese' },
    { locale: 'ko-KR', text: '🇰🇷 Korean' },
    { locale: 'fr-FR', text: '🇫🇷 French' },
    { locale: 'tr-TR', text: '🇹🇷 Turkish' },
    { locale: 'vi-VN', text: '🇻🇳 Vietnamese' },
    { locale: 'ta-IN', text: '🇮🇳 Tamil' },
    { locale: 'ur-PK', text: '🇵🇰 Urdu' },
    { locale: 'fa-IR', text: '🇮🇷 Persian' },
    { locale: 'it-IT', text: '🇮🇹 Italian' },
    { locale: 'pl-PL', text: '🇵🇱 Polish' },
    { locale: 'uk-UA', text: '🇺🇦 Ukrainian' },
    { locale: 'ro-RO', text: '🇷🇴 Romanian' },
    { locale: 'nl-NL', text: '🇳🇱 Dutch' },
    { locale: 'id-ID', text: '🇮🇩 Indonesian' },
    { locale: 'th-TH', text: '🇹🇭 Thai' },
    { locale: 'el-GR', text: '🇬🇷 Greek' },
    { locale: 'hu-HU', text: '🇭🇺 Hungarian' },
    { locale: 'sv-SE', text: '🇸🇪 Swedish' },
    { locale: 'cs-CZ', text: '🇨🇿 Czech' },
    { locale: 'bg-BG', text: '🇧🇬 Bulgarian' },
  ],
}

export default config
