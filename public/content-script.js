// Content script for Chrome Extension
try {
  console.log("Content script loaded and running on:", window.location.href);

  // Initialize content script functionality
  function initializeContentScript() {
    try {
      // Add a subtle indicator that the extension is active
      const indicator = document.createElement('div');
      indicator.id = 'chrome-extension-indicator';
      indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 8px;
        height: 8px;
        background-color: #22c55e;
        border-radius: 50%;
        z-index: 10000;
        opacity: 0.7;
        pointer-events: none;
        transition: opacity 0.3s ease;
      `;
      
      // Only add if not already present
      if (!document.getElementById('chrome-extension-indicator')) {
        document.body.appendChild(indicator);
        
        // Fade out after 3 seconds
        setTimeout(() => {
          if (indicator && indicator.parentNode) {
            indicator.style.opacity = '0';
            setTimeout(() => {
              if (indicator && indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
              }
            }, 300);
          }
        }, 3000);
      }

      // Listen for messages from popup or background
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        try {
          console.log("Content script received message:", request);
          
          switch (request.action) {
            case "getPageInfo":
              const pageInfo = {
                title: document.title,
                url: window.location.href,
                domain: window.location.hostname,
                timestamp: Date.now()
              };
              sendResponse({ success: true, data: pageInfo });
              break;
              
            case "highlightElements":
              highlightPageElements();
              sendResponse({ success: true, message: "Elements highlighted" });
              break;
              
            case "removeHighlights":
              removeHighlights();
              sendResponse({ success: true, message: "Highlights removed" });
              break;
              
            default:
              sendResponse({ success: false, message: "Unknown action" });
          }
        } catch (error) {
          console.error("Error handling message in content script:", error);
          sendResponse({ success: false, message: error.message });
        }
      });

    } catch (error) {
      console.error("Error initializing content script:", error);
    }
  }

  // Function to highlight page elements (example functionality)
  function highlightPageElements() {
    try {
      const elements = document.querySelectorAll('h1, h2, h3, p, a, button');
      elements.forEach((element, index) => {
        if (index < 10) { // Limit to first 10 elements
          element.style.outline = '2px solid #3b82f6';
          element.style.outlineOffset = '2px';
          element.classList.add('extension-highlighted');
        }
      });
    } catch (error) {
      console.error("Error highlighting elements:", error);
    }
  }

  // Function to remove highlights
  function removeHighlights() {
    try {
      const highlightedElements = document.querySelectorAll('.extension-highlighted');
      highlightedElements.forEach(element => {
        element.style.outline = '';
        element.style.outlineOffset = '';
        element.classList.remove('extension-highlighted');
      });
    } catch (error) {
      console.error("Error removing highlights:", error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContentScript);
  } else {
    initializeContentScript();
  }

  // Send page load notification to background
  chrome.runtime.sendMessage({
    action: "pageLoaded",
    url: window.location.href,
    title: document.title
  }).catch(error => {
    console.log("Could not send message to background (extension may not be ready):", error.message);
  });

} catch (error) {
  console.error("Content script failed to execute:", error);
}
