# Chrome Extension with Next.js UI Components

This project has been converted from a Next.js application into a Chrome Extension that leverages modern UI components built with shadcn/ui, Radix UI primitives, and Tailwind CSS.

## Features

- **Modern Chrome Extension**: Built with Manifest V3 for the latest Chrome Extension standards
- **Popup Interface**: Clean, responsive popup with modern styling using Tailwind CSS
- **Content Script**: Interacts with web pages to highlight elements and extract information
- **Background Service Worker**: Handles extension lifecycle and messaging
- **TypeScript Support**: Full type safety with Chrome Extension APIs
- **UI Components**: Reusable components from shadcn/ui system
- **Error Handling**: Comprehensive error handling throughout the extension

## Chrome Extension Setup

### Prerequisites
- Node.js 18+
- Google Chrome browser
- npm / yarn / pnpm / bun

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the extension:**
   ```bash
   npm run build:extension
   ```

3. **Load the extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `public/` folder from this project
   - The extension should now appear in your extensions list

### Using the Extension

1. **Access the popup:**
   - Click the extension icon in the Chrome toolbar
   - The popup will open with various action buttons

2. **Available features:**
   - **Run Main Action**: Executes the main extension functionality
   - **Get Page Info**: Retrieves information about the current tab
   - **Highlight Elements**: Highlights key elements on the current page
   - **Remove Highlights**: Removes element highlights from the page

3. **Extension indicator:**
   - A small green dot appears briefly on pages where the content script is active

### Development

#### File Structure
```
public/
├── manifest.json          # Extension manifest (Manifest V3)
├── popup.html            # Popup interface (HTML version)
├── background.js         # Background service worker
└── content-script.js     # Content script for page interaction

src/
├── extension/
│   └── popup.tsx         # React popup component (for future bundling)
├── types/
│   └── chrome.d.ts       # Chrome Extension API type definitions
└── components/ui/        # Reusable UI components
```

#### Scripts
- `npm run build:extension` - Prepares extension files for Chrome
- `npm run dev` - Runs Next.js development server (for component development)
- `npm run build` - Builds Next.js application
- `npm run lint` - Runs ESLint

### Troubleshooting

#### Common Issues

1. **Extension not loading:**
   - Ensure you selected the `public/` folder when loading unpacked
   - Check the Chrome Extensions page for error messages
   - Verify `manifest.json` is valid JSON

2. **Popup not working:**
   - Check browser console for JavaScript errors
   - Ensure `popup.html` and related files are in the `public/` folder
   - Verify Chrome Extension permissions

3. **Content script not running:**
   - Check the browser console on the target webpage
   - Ensure the extension has permission to access the current site
   - Verify the content script is properly loaded in `manifest.json`

4. **Background script errors:**
   - Open Chrome Extensions page
   - Click "Inspect views: background page" for your extension
   - Check console for error messages

#### Debug Mode
- Open Chrome DevTools for the popup: Right-click the extension popup → "Inspect"
- View background script logs: Chrome Extensions page → "Inspect views: background page"
- Check content script logs: Open DevTools on any webpage

### Extension Permissions

The extension requests the following permissions:
- `storage`: For saving extension settings and data
- `activeTab`: For interacting with the currently active tab
- `<all_urls>`: For content script injection on all websites

### Customization

#### Modifying the Popup
- Edit `public/popup.html` for immediate changes
- Or modify `src/extension/popup.tsx` for React-based development (requires bundling setup)

#### Adding New Features
1. Update `public/manifest.json` with new permissions if needed
2. Add functionality to `public/background.js`
3. Extend `public/content-script.js` for page interactions
4. Update the popup interface accordingly

#### Styling
- The extension uses Tailwind CSS for styling
- Google Fonts (Inter) for typography
- Clean, modern design with no external icons or images

## Next.js Development (Optional)

If you want to develop UI components using the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

## Learn More

### Chrome Extensions
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/migrating/)

### Next.js & UI Components
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is open source and available under the [MIT License](LICENSE).
