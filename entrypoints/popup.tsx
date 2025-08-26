import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css';

interface Credential {
  domain: string;
  username: string;
  password: string;
}

const Popup: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [currentDomain, setCurrentDomain] = useState('');
  const [formData, setFormData] = useState({
    domain: '',
    username: '',
    password: ''
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    loadCredentials();
    getCurrentDomain();
  }, []);

  const loadCredentials = () => {
    const stored = localStorage.getItem('credsSaverPro');
    if (stored) {
      const parsed = JSON.parse(stored);
      const credList: Credential[] = Object.entries(parsed).map(([domain, cred]: [string, any]) => ({
        domain,
        username: cred.username,
        password: cred.password
      }));
      setCredentials(credList);
    }
  };

  const getCurrentDomain = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.url) {
        const url = new URL(tab.url);
        const domain = url.hostname;
        setCurrentDomain(domain);
        setFormData(prev => ({ ...prev, domain }));
      }
    } catch (error) {
      console.error('Error getting current domain:', error);
    }
  };

  const saveCredential = () => {
    if (!formData.domain || !formData.username || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    const stored = localStorage.getItem('credsSaverPro') || '{}';
    const credentials = JSON.parse(stored);
    
    // Security note: In a real-world scenario, passwords should be encrypted before storage
    credentials[formData.domain] = {
      username: formData.username,
      password: formData.password
    };

    localStorage.setItem('credsSaverPro', JSON.stringify(credentials));
    loadCredentials();
    setFormData({ domain: currentDomain, username: '', password: '' });
    setEditingIndex(null);
  };

  const deleteCredential = (domain: string) => {
    const stored = localStorage.getItem('credsSaverPro') || '{}';
    const credentials = JSON.parse(stored);
    delete credentials[domain];
    localStorage.setItem('credsSaverPro', JSON.stringify(credentials));
    loadCredentials();
  };

  const editCredential = (index: number) => {
    const cred = credentials[index];
    setFormData({
      domain: cred.domain,
      username: cred.username,
      password: cred.password
    });
    setEditingIndex(index);
  };

  const autofillNow = async (credential: Credential) => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.id) {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (username: string, password: string) => {
            // Find and fill username/email fields
            const usernameFields = document.querySelectorAll('input[type="email"], input[type="text"], input[name*="username"], input[name*="email"]');
            const passwordFields = document.querySelectorAll('input[type="password"]');

            if (usernameFields.length > 0) {
              (usernameFields[0] as HTMLInputElement).value = username;
              usernameFields[0].dispatchEvent(new Event('input', { bubbles: true }));
            }

            if (passwordFields.length > 0) {
              (passwordFields[0] as HTMLInputElement).value = password;
              passwordFields[0].dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Show success notification
            const notification = document.createElement('div');
            notification.textContent = '✓ Credentials filled!';
            notification.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: #10b981;
              color: white;
              padding: 12px 16px;
              border-radius: 8px;
              z-index: 10000;
              font-family: system-ui;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
          },
          args: [credential.username, credential.password]
        });
      }
    } catch (error) {
      console.error('Error autofilling:', error);
      alert('Error autofilling credentials');
    }
  };

  return (
    <div className="popup-container">
      <header className="header">
        <div className="header-content">
          <h1 className="title">🔐 Creds Saver Pro</h1>
          <p className="subtitle">Secure Credential Manager</p>
        </div>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2 className="section-title">
            {editingIndex !== null ? 'Edit Credential' : 'Add New Credential'}
          </h2>
          
          <div className="form-group">
            <label className="label">Domain</label>
            <input
              type="text"
              className="input"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              placeholder="example.com"
            />
          </div>

          <div className="form-group">
            <label className="label">Username/Email</label>
            <input
              type="text"
              className="input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="your-email@example.com"
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button className="btn btn-primary" onClick={saveCredential}>
            {editingIndex !== null ? 'Update Credential' : 'Save Credential'}
          </button>
        </section>

        <section className="credentials-section">
          <h2 className="section-title">Saved Credentials ({credentials.length})</h2>
          
          {credentials.length === 0 ? (
            <div className="empty-state">
              <p>No credentials saved yet</p>
              <p className="empty-subtitle">Add your first credential above</p>
            </div>
          ) : (
            <div className="credentials-table">
              {credentials.map((cred, index) => (
                <div key={`${cred.domain}-${index}`} className="credential-row">
                  <div className="credential-info">
                    <div className="domain">{cred.domain}</div>
                    <div className="username">{cred.username}</div>
                  </div>
                  
                  <div className="credential-actions">
                    <button 
                      className="btn btn-small btn-success"
                      onClick={() => autofillNow(cred)}
                      title="Autofill on current tab"
                    >
                      Fill
                    </button>
                    <button 
                      className="btn btn-small btn-secondary"
                      onClick={() => editCredential(index)}
                      title="Edit credential"
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-small btn-danger"
                      onClick={() => deleteCredential(cred.domain)}
                      title="Delete credential"
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">
          ⚠️ Demo version - passwords stored in plain text
        </p>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Popup />);