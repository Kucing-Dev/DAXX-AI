# 🤖 DAXX AI - Advanced AI Assistant Interface

A modern AI assistant application built with React, Vite, and Tailwind CSS. This application features a complete chat interface with multi-chat support, file attachments, AI model selection, deep research tools, and API key management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-cyan.svg)

---

## ✨ Key Features

### 💬 **Chat Management**
- ✅ Multi-chat support with unlimited conversations
- ✅ Rename chats with double-click or edit button
- ✅ Delete individual chats
- ✅ Clear all history with confirmation
- ✅ Auto-save chat history using localStorage
- ✅ Automatic chat titles from first message

### 📎 **File Attachments**
- ✅ Upload various file types:
  - 📷 **Images** (JPG, PNG, GIF)
  - 📄 **Documents** (PDF, DOC, TXT)
  - 🎬 **Videos** (MP4, MOV, AVI)
  - 🎵 **Audio** (MP3, WAV, OGG)
  - 📁 **Other files** (All types)
- ✅ Multi-file upload
- ✅ File preview with icons and sizes
- ✅ Remove attached files before sending

### 🎯 **Mode & Model Selection**
- ✅ **6 Chat Modes:**
  - 📝 General Mode - General conversation
  - 💻 Coding Mode - Programming focused
  - ✍️ Writing Mode - Creative writing and content
  - 🔍 Research Mode - Academic research
  - 🌍 Translation Mode - Language translation
  - 📊 Analysis Mode - Data analysis
- ✅ **12 AI Models:**
  - GPT-4 (OpenAI)
  - GPT-3.5 Turbo (OpenAI)
  - Claude 3 (Anthropic)
  - Claude 2 (Anthropic)
  - Gemini Pro (Google)
  - Llama 2 (Meta)
  - Mistral 7B (Mistral AI)
  - Mixtral 8x7B (Mistral AI)
  - PaLM 2 (Google)
  - Llama 3 (Meta)
  - Command R (Cohere)
  - Command R+ (Cohere)

### 🔍 **Deep Research Tools**
- ✅ Research Assistant - Advanced query tool
- ✅ Data Analysis - Research data processing
- ✅ Knowledge Base - Information repository
- ✅ Ideas Generator - Creative brainstorming

### 🔑 **API Keys Management**
- ✅ Store up to 10 API keys
- ✅ Support for multiple providers (OpenAI, Anthropic, Google, etc)
- ✅ API key masking for security
- ✅ Add/Delete API keys
- ✅ Display creation date

### ⚙️ **Settings & Customization**
- ✅ Theme selector (Dark/Light/Auto)
- ✅ Font size adjustment (Small/Medium/Large)
- ✅ Stream response toggle
- ✅ Sound effects toggle

---

## 🚀 Installation

### Prerequisites
Make sure you have installed:
- **Node.js** (v14 or newer)
- **npm** or **yarn**

### Installation Steps

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/daxx-ai.git
cd daxx-ai
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the Development Server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
daxx-ai/
├── src/
│   ├── components/
│   │   ├── modals/
│   │   │   ├── ApiKeysModal.jsx
│   │   │   └── SettingsModal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ChatArea.jsx
│   │   └── ChatInterface.jsx
│   ├── context/
│   │   └── ChatContext.jsx
│   ├── hooks/
│   │   └── useAttachedFiles.js
│   ├── utils/
│   │   └── helpers.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🎨 Technologies Used

| Technology | Version | Description |
|------------|---------|-------------|
| **React** | 18.x | UI Framework |
| **Vite** | 4.x | Build Tool |
| **Tailwind CSS** | 3.x | Utility-first CSS |
| **Lucide React** | Latest | Icon library |
| **React Hooks** | - | State & Effect management |

---

## 💡 Usage

### 1. **Create New Chat**
- Click the **"New Chat"** button in the left sidebar
- A new chat opens automatically with the title "New Chat"

### 2. **Send Message**
- Type your message in the input box
- Press **Enter** or click the **Send** button (✈️)
- DAXX will respond in 1 second (simulation)

### 3. **Attach File**
- Click the **Paperclip** icon (📎)
- Choose the file type you want to upload
- Files will appear above the input box
- Click **X** to remove files

### 4. **Change Mode**
- Click the mode dropdown (📝 General by default)
- Select the desired mode
- Icon and color will change according to mode

### 5. **Select AI Model**
- Click the model dropdown below the input (default: GPT-4)
- Choose from 12 available AI models
- Active model is marked with a checkmark ✓

### 6. **Deep Research Tools**
- Click **"Research Assistant"** in the sidebar
- Enter your research query
- Select data sources and analysis tools

### 7. **Manage API Keys**
- Click **"API Keys"** in the bottom sidebar
- Enter provider name and API key
- Click **"Add API Key"**
- Maximum of 10 keys

### 8. **Clear History**
- Click the **3 dots** (⋮) next to "New Chat"
- Select **"Clear History"**
- Confirm deletion

### 9. **Settings**
- Click **"Settings"** in the bottom sidebar
- Adjust theme, font size, and other preferences
- Click **"Save Settings"**

---

## 🔧 Customization

### Changing Theme Colors
Edit in `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#yourcolor',
      }
    }
  }
}
```

### Adding New AI Models
Edit the `aiModels` array in [ChatInterface.jsx](src/components/ChatInterface.jsx):
```javascript
const aiModels = [
  { 
    id: 'new-model', 
    name: 'Model Name', 
    provider: 'Provider', 
    description: 'Description' 
  }
];
```

### Adding New Modes
Edit the `modes` array in [ChatInterface.jsx](src/components/ChatInterface.jsx):
```javascript
const modes = [
  { 
    id: 'new-mode', 
    name: 'Mode Name', 
    icon: IconComponent, 
    color: 'color-class' 
  }
];
```

### Integrating with Real AI APIs
Replace the `handleSend()` function in [ChatInterface.jsx](src/components/ChatInterface.jsx):
```javascript
const handleSend = async () => {
  // ... existing code
  
  const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ message: input })
  });
  
  const data = await response.json();
  // Handle response
};
```

---

## 🎯 Upcoming Features

- [ ] Markdown support for AI messages
- [ ] Code syntax highlighting
- [ ] Export chat to PDF/TXT
- [ ] Search in chat history
- [ ] Voice input
- [ ] Image generation integration
- [ ] Multi-language support
- [ ] Dark/Light theme auto-switch
- [ ] Keyboard shortcuts
- [ ] Chat folders/categories

---

## 🐛 Known Issues

1. **File Upload** - Currently only simulation, files are not actually uploaded
2. **AI Response** - Still using dummy/simulation responses
3. **API Keys** - Not persistently stored (lost on reload)
4. **Settings** - No persistence storage yet

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork this repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Rasya Andrean**
- GitHub: [@rasyaandrean](https://github.com/rasyaandrean)
- Email: rasya.andrean@example.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [OpenAI](https://openai.com/) - Inspiration
- [Anthropic](https://anthropic.com/)

---

## 📞 Support

If you have questions or issues:
- 🐛 [Report Bug](https://github.com/username/daxx-ai/issues)
- 💡 [Request Feature](https://github.com/username/daxx-ai/issues)
- 📧 Email: support@example.com

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/username/daxx-ai?style=social)
![GitHub forks](https://img.shields.io/github/forks/username/daxx-ai?style=social)
![GitHub issues](https://img.shields.io/github/issues/username/daxx-ai)

---

**⭐ Don't forget to give a star if this project helps you!**

Made with ❤️ by [Rasya Andrean]