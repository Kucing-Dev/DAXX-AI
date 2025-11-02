import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ChatContext = createContext();

const initialState = {
  chats: [{ id: 1, title: 'New Chat', messages: [], createdAt: new Date() }],
  currentChatId: 1,
  apiKeys: [],
  settings: {
    theme: 'dark',
    fontSize: 'medium',
    streamResponse: true,
    soundEnabled: false
  },
  currentMode: 'general',
  currentModel: 'gpt-4'
};

function chatReducer(state, action) {
  switch (action.type) {
    case 'ADD_CHAT':
      return {
        ...state,
        chats: [action.payload, ...state.chats],
        currentChatId: action.payload.id
      };
    
    case 'SET_CURRENT_CHAT':
      return {
        ...state,
        currentChatId: action.payload
      };
    
    case 'DELETE_CHAT':
      if (state.chats.length <= 1) return state;
      
      const filteredChats = state.chats.filter(chat => chat.id !== action.payload);
      let newCurrentChatId = state.currentChatId;
      
      if (state.currentChatId === action.payload) {
        newCurrentChatId = filteredChats[0]?.id || null;
      }
      
      return {
        ...state,
        chats: filteredChats,
        currentChatId: newCurrentChatId
      };
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        chats: state.chats.map(chat => 
          chat.id === action.payload.chatId 
            ? { ...chat, messages: [...chat.messages, action.payload.message] }
            : chat
        )
      };
    
    case 'UPDATE_CHAT_TITLE':
      return {
        ...state,
        chats: state.chats.map(chat => 
          chat.id === action.payload.chatId 
            ? { ...chat, title: action.payload.title }
            : chat
        )
      };
    
    case 'CLEAR_HISTORY':
      const newChat = { 
        id: Date.now(), 
        title: 'New Chat', 
        messages: [], 
        createdAt: new Date() 
      };
      return {
        ...state,
        chats: [newChat],
        currentChatId: newChat.id
      };
    
    case 'ADD_API_KEY':
      if (state.apiKeys.length >= 10) return state;
      return {
        ...state,
        apiKeys: [...state.apiKeys, action.payload]
      };
    
    case 'REMOVE_API_KEY':
      return {
        ...state,
        apiKeys: state.apiKeys.filter(key => key.id !== action.payload)
      };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    
    case 'SET_CURRENT_MODE':
      return {
        ...state,
        currentMode: action.payload
      };
    
    case 'SET_CURRENT_MODEL':
      return {
        ...state,
        currentModel: action.payload
      };
    
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState, (initial) => {
    const savedState = localStorage.getItem('chatGPTCloneState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        return {
          ...initial,
          ...parsed,
          currentMode: parsed.currentMode || initial.currentMode,
          currentModel: parsed.currentModel || initial.currentModel,
          chats: parsed.chats?.map(chat => ({
            ...chat,
            createdAt: chat.createdAt ? new Date(chat.createdAt) : new Date()
          })) || initial.chats
        };
      } catch (e) {
        console.error('Failed to parse saved state:', e);
      }
    }
    return initial;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      ...state,
      chats: state.chats.map(chat => ({
        ...chat,
        createdAt: chat.createdAt.toISOString()
      }))
    };
    localStorage.setItem('chatGPTCloneState', JSON.stringify(stateToSave));
  }, [state]);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}