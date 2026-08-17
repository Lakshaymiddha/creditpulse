chrome.runtime.onInstalled.addListener(() => {
  console.log('CreditPulse extension installed');

  chrome.alarms.create('gmail-sync', { periodInMinutes: 30 });
  chrome.alarms.create('offers-sync', { periodInMinutes: 1440 });
  chrome.alarms.create('due-date-check', { periodInMinutes: 60 });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  switch (alarm.name) {
    case 'gmail-sync':
      console.log('Gmail sync triggered');
      break;
    case 'offers-sync':
      console.log('Offers sync triggered');
      break;
    case 'due-date-check':
      console.log('Due date check triggered');
      break;
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case 'TRIGGER_GMAIL_SYNC':
      console.log('Manual Gmail sync requested');
      sendResponse({ status: 'ok' });
      break;
    case 'TRIGGER_OFFERS_SYNC':
      console.log('Manual offers sync requested');
      sendResponse({ status: 'ok' });
      break;
    default:
      sendResponse({ status: 'unknown_message' });
  }
  return true;
});

export {};
