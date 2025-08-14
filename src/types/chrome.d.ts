// Chrome Extension API type definitions
declare namespace chrome {
  namespace runtime {
    interface LastError {
      message?: string;
    }
    
    const lastError: LastError | undefined;
    
    function sendMessage(
      message: any,
      responseCallback?: (response: any) => void
    ): void;
    
    function sendMessage(
      extensionId: string,
      message: any,
      responseCallback?: (response: any) => void
    ): void;
    
    interface MessageSender {
      tab?: chrome.tabs.Tab;
      frameId?: number;
      id?: string;
      url?: string;
      tlsChannelId?: string;
    }
    
    interface OnInstalledDetails {
      reason: string;
      previousVersion?: string;
      id?: string;
    }
    
    interface OnMessageEvent {
      addListener(
        callback: (
          message: any,
          sender: MessageSender,
          sendResponse: (response?: any) => void
        ) => boolean | void
      ): void;
    }
    
    interface OnInstalledEvent {
      addListener(callback: (details: OnInstalledDetails) => void): void;
    }
    
    const onMessage: OnMessageEvent;
    const onInstalled: OnInstalledEvent;
  }
  
  namespace tabs {
    interface Tab {
      id?: number;
      index: number;
      windowId: number;
      openerTabId?: number;
      selected: boolean;
      highlighted: boolean;
      active: boolean;
      pinned: boolean;
      audible?: boolean;
      discarded: boolean;
      autoDiscardable: boolean;
      mutedInfo?: MutedInfo;
      url?: string;
      title?: string;
      favIconUrl?: string;
      status?: string;
      incognito: boolean;
      width?: number;
      height?: number;
      sessionId?: string;
    }
    
    interface MutedInfo {
      muted: boolean;
      reason?: string;
      extensionId?: string;
    }
    
    interface QueryInfo {
      active?: boolean;
      pinned?: boolean;
      audible?: boolean;
      muted?: boolean;
      highlighted?: boolean;
      discarded?: boolean;
      autoDiscardable?: boolean;
      currentWindow?: boolean;
      lastFocusedWindow?: boolean;
      status?: string;
      title?: string;
      url?: string | string[];
      windowId?: number;
      windowType?: string;
      index?: number;
    }
    
    interface UpdateProperties {
      url?: string;
      active?: boolean;
      highlighted?: boolean;
      selected?: boolean;
      pinned?: boolean;
      muted?: boolean;
      openerTabId?: number;
    }
    
    interface OnUpdatedEvent {
      addListener(
        callback: (
          tabId: number,
          changeInfo: any,
          tab: Tab
        ) => void
      ): void;
    }
    
    function query(queryInfo: QueryInfo, callback: (result: Tab[]) => void): void;
    function sendMessage(
      tabId: number,
      message: any,
      responseCallback?: (response: any) => void
    ): void;
    function update(
      tabId: number,
      updateProperties: UpdateProperties,
      callback?: (tab?: Tab) => void
    ): void;
    
    const onUpdated: OnUpdatedEvent;
  }
  
  namespace storage {
    interface StorageArea {
      get(callback: (items: { [key: string]: any }) => void): void;
      get(
        keys: string | string[] | { [key: string]: any } | null,
        callback: (items: { [key: string]: any }) => void
      ): void;
      set(items: { [key: string]: any }, callback?: () => void): void;
      remove(keys: string | string[], callback?: () => void): void;
      clear(callback?: () => void): void;
    }
    
    const local: StorageArea;
    const sync: StorageArea;
    const managed: StorageArea;
  }
  
  namespace action {
    interface TabDetails {
      tabId?: number;
    }
    
    function setTitle(details: { title: string; tabId?: number }): void;
    function getTitle(details: TabDetails, callback: (result: string) => void): void;
    function setIcon(details: {
      imageData?: ImageData | { [size: number]: ImageData };
      path?: string | { [size: number]: string };
      tabId?: number;
    }): void;
    function setPopup(details: { popup: string; tabId?: number }): void;
    function getPopup(details: TabDetails, callback: (result: string) => void): void;
    function setBadgeText(details: { text: string; tabId?: number }): void;
    function getBadgeText(details: TabDetails, callback: (result: string) => void): void;
    function setBadgeBackgroundColor(details: {
      color: string | [number, number, number, number];
      tabId?: number;
    }): void;
    function getBadgeBackgroundColor(
      details: TabDetails,
      callback: (result: [number, number, number, number]) => void
    ): void;
    function enable(tabId?: number): void;
    function disable(tabId?: number): void;
  }
}

// Global chrome object
declare const chrome: typeof chrome;
