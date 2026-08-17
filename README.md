# CreditPulse

Open-source Chrome extension to track credit card transactions, offers, milestones, and due dates for Indian credit cards.

## Features

- **Transaction Tracking** — Automatically parse transaction alert emails from Gmail
- **Offers Discovery** — Community-curated offers database + bank page scraping
- **Spend Milestones** — Track progress toward fee waivers, lounge access, and reward bonuses
- **Bill & Due Dates** — Never miss a payment with due date reminders

## Supported Banks

HDFC, SBI Card, ICICI, Axis, Kotak Mahindra, RBL, IndusInd, American Express, Yes Bank, IDFC First

## Privacy

All data is stored locally on your device using IndexedDB. CreditPulse has **no backend server** — your financial data never leaves your browser.

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
git clone https://github.com/Lakshaymiddha/creditpulse.git
cd creditpulse
pnpm install
pnpm dev
```

### Load the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist/` folder

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Type-check and build for production |
| `pnpm test` | Run tests |
| `pnpm lint` | Lint source files |
| `pnpm format` | Format source files |
| `pnpm typecheck` | Run TypeScript type checking |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute, add new bank parsers, or submit credit card offers.

## License

[MIT](LICENSE)
