export function Popup() {
  const openDashboard = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/dashboard/index.html') });
  };

  return (
    <div className="w-[380px] min-h-[400px] p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold text-foreground">CreditPulse</h1>
        <button
          onClick={openDashboard}
          className="text-sm text-primary hover:underline"
        >
          Open Dashboard
        </button>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border bg-card p-3">
          <h2 className="text-sm font-medium text-muted-foreground mb-1">Upcoming Due Dates</h2>
          <p className="text-sm text-foreground">No cards added yet</p>
        </div>

        <div className="rounded-lg border bg-card p-3">
          <h2 className="text-sm font-medium text-muted-foreground mb-1">Milestone Progress</h2>
          <p className="text-sm text-foreground">No milestones tracked</p>
        </div>

        <div className="rounded-lg border bg-card p-3">
          <h2 className="text-sm font-medium text-muted-foreground mb-1">This Month</h2>
          <p className="text-2xl font-bold text-foreground">₹0</p>
          <p className="text-xs text-muted-foreground">Total spend</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        All data stored locally on your device
      </p>
    </div>
  );
}
