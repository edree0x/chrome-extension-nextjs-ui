// Background script for Chrome Extension
try {
  // Listen for extension installation
  chrome.runtime.onInstalled.addListener((details) => {
    console.log("Extension installed successfully.", details);
    
    // Set default storage values
    chrome.storage.local.set({
      extensionEnabled: true,
      lastUsed: Date.now()
    }, () => {
      console.log("Default storage values set.");
    });
  });

  // Listen for messages from popup or content scripts
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
      console.log("Message received in background:", request);
      
      switch (request.action) {
        case "performTask":
          console.log("Performing task from popup...");
          sendResponse({ success: true, message: "Task completed successfully!" });
          break;
          
        case "getStorageData":
          chrome.storage.local.get(null, (data) => {
            sendResponse({ success: true, data: data });
          });
          return true; // Keep message channel open for async response
          
        case "updateStorage":
          chrome.storage.local.set(request.data, () => {
            sendResponse({ success: true, message: "Storage updated!" });
          });
          return true; // Keep message channel open for async response
          
        default:
          sendResponse({ success: false, message: "Unknown action" });
      }
    } catch (error) {
      console.error("Error handling message:", error);
      sendResponse({ success: false, message: error.message });
    }
  });

  // Listen for tab updates
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    try {
      if (changeInfo.status === 'complete' && tab.url) {
        console.log("Tab updated:", tab.url);
        // Update last used timestamp
        chrome.storage.local.set({ lastUsed: Date.now() });
      }
    } catch (error) {
      console.error("Error in tab update listener:", error);
    }
  });

} catch (error) {
  console.error("Background script initialization error:", error);
}
