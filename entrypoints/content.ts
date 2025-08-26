// Content Script for Creds Saver Pro
// Automatically detects and fills login fields on web pages

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('Creds Saver Pro content script loaded');

    let autofillButton: HTMLElement | null = null;

    // Security note: In a real-world scenario, credentials should be encrypted
    // and proper security measures should be implemented
    
    const detectLoginFields = (): { usernameField: HTMLInputElement | null, passwordField: HTMLInputElement | null } => {
      // Common selectors for username/email fields
      const usernameSelectors = [
        'input[type="email"]',
        'input[type="text"][name*="username"]',
        'input[type="text"][name*="email"]',
        'input[type="text"][id*="username"]',
        'input[type="text"][id*="email"]',
        'input[type="text"][placeholder*="email"]',
        'input[type="text"][placeholder*="username"]',
        'input[name="username"]',
        'input[name="email"]',
        'input[id="username"]',
        'input[id="email"]'
      ];

      // Common selectors for password fields
      const passwordSelectors = [
        'input[type="password"]'
      ];

      let usernameField: HTMLInputElement | null = null;
      let passwordField: HTMLInputElement | null = null;

      // Find username field
      for (const selector of usernameSelectors) {
        const field = document.querySelector(selector) as HTMLInputElement;
        if (field && field.offsetParent !== null) { // Check if visible
          usernameField = field;
          break;
        }
      }

      // Find password field
      for (const selector of passwordSelectors) {
        const field = document.querySelector(selector) as HTMLInputElement;
        if (field && field.offsetParent !== null) { // Check if visible
          passwordField = field;
          break;
        }
      }

      return { usernameField, passwordField };
    };

    const getCurrentDomain = (): string => {
      return window.location.hostname;
    };

    const getStoredCredentials = (domain: string): { username: string, password: string } | null => {
      try {
        const stored = localStorage.getItem('credsSaverPro');
        if (stored) {
          const credentials = JSON.parse(stored);
          return credentials[domain] || null;
        }
      } catch (error) {
        console.error('Error reading stored credentials:', error);
      }
      return null;
    };

    const fillCredentials = (username: string, password: string): void => {
      const { usernameField, passwordField } = detectLoginFields();

      if (usernameField && username) {
        usernameField.value = username;
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Add visual feedback
        usernameField.style.backgroundColor = '#dcfce7';
        setTimeout(() => {
          usernameField.style.backgroundColor = '';
        }, 1500);
      }

      if (passwordField && password) {
        passwordField.value = password;
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Add visual feedback
        passwordField.style.backgroundColor = '#dcfce7';
        setTimeout(() => {
          passwordField.style.backgroundColor = '';
        }, 1500);
      }

      // Show success notification
      showNotification('✓ Credentials auto-filled!', 'success');
    };

    const createAutofillButton = (): HTMLElement => {
      const button = document.createElement('button');
      button.innerHTML = '🔐';
      button.title = 'Autofill credentials with Creds Saver Pro';
      button.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 18px;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        transition: all 0.2s ease;
        font-family: system-ui;
      `;

      button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
      });

      button.addEventListener('click', (e) => {
        e.preventDefault();
        const domain = getCurrentDomain();
        const credentials = getStoredCredentials(domain);
        
        if (credentials) {
          fillCredentials(credentials.username, credentials.password);
        } else {
          showNotification('No credentials found for this domain', 'warning');
        }
      });

      return button;
    };

    const showNotification = (message: string, type: 'success' | 'warning' | 'error'): void => {
      const notification = document.createElement('div');
      notification.textContent = message;
      
      const colors = {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      };

      notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        z-index: 10001;
        font-family: system-ui;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
      `;

      // Add CSS animation
      if (!document.getElementById('credsSaverProStyles')) {
        const style = document.createElement('style');
        style.id = 'credsSaverProStyles';
        style.textContent = `
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    };

    const autoFillIfCredentialsExist = (): void => {
      const domain = getCurrentDomain();
      const credentials = getStoredCredentials(domain);
      
      if (credentials) {
        const { usernameField, passwordField } = detectLoginFields();
        
        // Only auto-fill if fields are empty and visible
        if (usernameField && passwordField && 
            !usernameField.value && !passwordField.value) {
          setTimeout(() => {
            fillCredentials(credentials.username, credentials.password);
          }, 1000); // Small delay to ensure page is fully loaded
        }
      }
    };

    const initializeAutofill = (): void => {
      const { usernameField, passwordField } = detectLoginFields();
      
      if (usernameField || passwordField) {
        // Create autofill button if login fields are detected
        if (!autofillButton) {
          autofillButton = createAutofillButton();
          document.body.appendChild(autofillButton);
        }

        // Auto-fill if credentials exist
        autoFillIfCredentialsExist();
      }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeAutofill);
    } else {
      // DOM already loaded
      setTimeout(initializeAutofill, 500);
    }

    // Also run when new content is dynamically loaded (SPAs)
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.querySelector('input[type="password"], input[type="email"]') ||
                  element.matches('input[type="password"], input[type="email"]')) {
                shouldCheck = true;
              }
            }
          });
        }
      });

      if (shouldCheck) {
        setTimeout(initializeAutofill, 1000);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      if (autofillButton) {
        autofillButton.remove();
      }
      observer.disconnect();
    });
  },
});