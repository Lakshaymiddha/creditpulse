import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { TransactionsPage } from './pages/TransactionsPage';
import { OffersPage } from './pages/OffersPage';
import { CardsPage } from './pages/CardsPage';
import { MilestonesPage } from './pages/MilestonesPage';
import { SettingsPage } from './pages/SettingsPage';

const navItems = [
  { to: '/', label: 'Cards' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/offers', label: 'Offers' },
  { to: '/milestones', label: 'Milestones' },
  { to: '/settings', label: 'Settings' },
];

export function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen">
        <nav className="w-56 border-r bg-muted/40 p-4">
          <h1 className="text-xl font-bold mb-6 text-primary">CreditPulse</h1>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<CardsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/milestones" element={<MilestonesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
