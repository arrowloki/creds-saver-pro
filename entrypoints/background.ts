// Background Script for Creds Saver Pro
// Handles cross-extension messaging and future advanced features

export default defineBackground(() => {
  console.log('Creds Saver Pro background script loaded');

  // Listen for installation
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      console.log('Creds Saver Pro installed successfully');
      
      // Show welcome notification (future feature)
      // Could open onboarding page or show setup instructions
    }
  });

  // Listen for messages between popup and content scripts
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background received message:', message);

    switch (message.type) {
      case 'GET_CURRENT_TAB_INFO':
        // Get current tab information
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            const url = new URL(tabs[0].url || '');
            sendResponse({
              domain: url.hostname,
              url: tabs[0].url,
              title: tabs[0].title
            });
          }
        });
        return true; // Keep message channel open for async response

      case 'AUTOFILL_CREDENTIALS':
        // Forward autofill request to content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
              type: 'FILL_CREDENTIALS',
              credentials: message.credentials
            });
          }
        });
        break;

      case 'CHECK_CONTENT_SCRIPT':
        // Check if content script is loaded on current tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'PING' }, (response) => {
              sendResponse({ contentScriptLoaded: !!response });
            });
          } else {
            sendResponse({ contentScriptLoaded: false });
          }
        });
        return true;

      default:
        console.log('Unknown message type:', message.type);
    }
  });

  // Handle tab updates to refresh content script state
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      // Tab finished loading, content script should be ready
      console.log('Tab updated:', tab.url);
    }
  });

  // Storage change listener for future sync features
  chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log('Storage changed:', changes, namespace);
    // Future: Could sync credentials across devices
  });

  // Future enhancement: Periodic security checks
  // setInterval(() => {
  //   // Check for suspicious activity
  //   // Validate stored credentials integrity
  //   // Clean up expired sessions
  // }, 60000); // Every minute

  // Future enhancement: Context menu integration
  // chrome.contextMenus.create({
  //   id: 'credsSaverPro',
  //   title: 'Fill with Creds Saver Pro',
  //   contexts: ['editable']
  // });

  // chrome.contextMenus.onClicked.addListener((info, tab) => {
  //   if (info.menuItemId === 'credsSaverPro' && tab?.id) {
  //     // Trigger autofill from context menu
  //   }
  // });
});