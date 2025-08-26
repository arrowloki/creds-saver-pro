const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Creds Saver Pro
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Chrome Extension Files Generated Successfully
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                ✓
              </span>
              Extension Files Created
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-200">📁 Generated Files:</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">📄</span>
                    <code className="text-slate-300">entrypoints/popup.tsx</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">🎨</span>
                    <code className="text-slate-300">entrypoints/popup.css</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">⚡</span>
                    <code className="text-slate-300">entrypoints/content.ts</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">🔧</span>
                    <code className="text-slate-300">entrypoints/background.ts</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">⚙️</span>
                    <code className="text-slate-300">wxt.config.ts</code>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-200">🚀 Key Features:</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    Auto-detects login fields
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    Secure localStorage storage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    Clean popup interface
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    Manual autofill button
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    Edit/delete credentials
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-amber-300 mb-4 flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              Important Notice
            </h2>
            <div className="text-amber-100 space-y-3">
              <p>
                <strong>This is a React web app project.</strong> The Chrome extension files have been created 
                but need to be used in a proper WXT framework setup to function as an actual Chrome extension.
              </p>
              <p>
                The generated files follow WXT conventions and include all the functionality you requested:
                popup UI, content script for autofilling, background script, and proper manifest configuration.
              </p>
            </div>
          </div>

          {/* Setup Instructions */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">🛠️ Setup Instructions</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">1. Create New WXT Project</h3>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                  <div className="text-slate-400"># Create new WXT extension project</div>
                  <div className="text-green-400">npx wxt@latest init my-extension</div>
                  <div className="text-green-400">cd my-extension</div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">2. Copy Generated Files</h3>
                <p className="text-slate-400 mb-3">Copy the generated files to your new WXT project:</p>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-slate-300">
                  <div>entrypoints/ → (copy all files)</div>
                  <div>wxt.config.ts → (replace existing)</div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">3. Install & Run</h3>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                  <div className="text-slate-400"># Install dependencies and run</div>
                  <div className="text-green-400">npm install</div>
                  <div className="text-green-400">npm run dev</div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">4. Load in Chrome</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Open Chrome → Extensions → Enable Developer mode</li>
                  <li>• Click "Load unpacked" → Select the <code className="bg-slate-700 px-2 py-1 rounded">dist</code> folder</li>
                  <li>• Extension will appear in toolbar!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Documentation Link */}
          <div className="text-center mt-8">
            <div className="inline-block bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 mb-2">📚 Complete setup guide available in:</p>
              <code className="text-blue-400 bg-blue-900/30 px-3 py-1 rounded">README-Extension.md</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
