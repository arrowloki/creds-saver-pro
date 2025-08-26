# 🔐 Creds Saver Pro - Chrome Extension

A secure, minimalist credential manager Chrome extension built with the WXT framework.

## 🚀 Features

- **Automatic Login Detection**: Detects username/email and password fields on any website
- **Secure Storage**: Stores credentials locally using localStorage (demo version)
- **Clean UI**: Modern, security-focused popup interface 
- **Auto-fill**: Automatically fills login fields when credentials are available
- **Manual Trigger**: Floating autofill button for manual credential insertion
- **Domain-based**: Organizes credentials by website domain
- **Edit/Delete**: Full CRUD operations for stored credentials

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Chrome browser (for testing)

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Development Mode**
   ```bash
   npm run dev
   ```
   This will start the WXT development server and create a `dist` folder.

3. **Load Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked" and select the `dist` folder
   - The extension should now appear in your extensions list

4. **Production Build**
   ```bash
   npm run build
   npm run zip
   ```

## 📁 Project Structure

```
├── entrypoints/
│   ├── popup.tsx          # React popup UI
│   ├── popup.html         # Popup HTML template  
│   ├── popup.css          # Popup styles
│   ├── content.ts         # Content script for autofill
│   └── background.ts      # Background script for messaging
├── wxt.config.ts          # WXT configuration
└── package.json           # Dependencies and scripts
```

## 🔒 Security Notes

**⚠️ IMPORTANT: This is a demo version for educational purposes**

- **Plain Text Storage**: Passwords are stored in localStorage without encryption
- **No Secure Communication**: No encrypted messaging between scripts
- **Local Only**: No cloud sync or backup features

### For Production Use:
- Implement AES encryption for password storage
- Use Chrome's `chrome.storage.local` with encryption
- Add master password protection
- Implement secure key derivation (PBKDF2/Argon2)
- Add auto-lock functionality
- Use CSP headers for security
- Implement secure password generation

## 🎯 Usage

### Adding Credentials
1. Click the extension icon in Chrome toolbar
2. The popup will auto-detect the current domain
3. Enter username/email and password
4. Click "Save Credential"

### Auto-filling
- **Automatic**: Extension detects login fields and auto-fills if credentials exist
- **Manual**: Click the floating 🔐 button on any page with login fields
- **From Popup**: Click "Fill" button next to any saved credential

### Managing Credentials
- **Edit**: Click "Edit" button, modify fields, and save
- **Delete**: Click "Del" button to remove credentials
- **View All**: See all saved credentials in the popup table

## 🔧 Technical Details

### Permissions Required
- `storage`: For storing credentials
- `scripting`: For injecting autofill scripts
- `activeTab`: For accessing current tab information
- `tabs`: For tab management

### Browser Compatibility
- Chrome 88+ (Manifest V3)
- Edge 88+ (Chromium-based)
- Other Chromium browsers

### Content Script Features
- Smart field detection using multiple selectors
- Visual feedback on successful autofill
- Mutation observer for SPA compatibility
- Clean DOM injection with proper cleanup

## 🚀 Future Enhancements

- [ ] AES-256 encryption for stored passwords
- [ ] Master password protection
- [ ] Secure password generator
- [ ] Cloud sync with E2E encryption
- [ ] Biometric authentication support
- [ ] Auto-lock after inactivity
- [ ] Import/export functionality
- [ ] Two-factor authentication support
- [ ] Advanced form detection (multi-step forms)
- [ ] Context menu integration

## 🐛 Known Limitations

- Works with standard HTML forms only
- May not detect fields in complex SPAs
- No support for multi-step authentication flows
- Limited to Chrome/Chromium browsers
- No offline/sync capabilities

## 📝 Development Notes

Built with modern web technologies:
- **WXT Framework**: Modern WebExtension development
- **React 18**: Component-based UI
- **TypeScript**: Type safety and better DX
- **Modern CSS**: Gradients, animations, and responsive design
- **Manifest V3**: Latest Chrome extension standards

## 🤝 Contributing

This is a demo project. For production use, please implement proper security measures and conduct thorough security audits.

## 📄 License

MIT License - See LICENSE file for details.

---

**⚠️ Disclaimer**: This extension is for educational purposes only. Do not use in production without implementing proper security measures. Always encrypt sensitive data and follow security best practices.