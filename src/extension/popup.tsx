"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

interface PageInfo {
  title: string;
  url: string;
  domain: string;
  timestamp: number;
}

interface ExtensionStatus {
  enabled: boolean;
  lastUsed: number;
}

const Popup: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready to use');
  const [statusType, setStatusType] = useState<'default' | 'success' | 'error'>('default');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [extensionStatus, setExtensionStatus] = useState<ExtensionStatus | null>(null);

  // Update status display
  const updateStatus = (message: string, type: 'default' | 'success' | 'error' = 'default') => {
    setStatus(message);
    setStatusType(type);
  };

  // Load extension status on mount
  useEffect(() => {
    loadExtensionStatus();
  }, []);

  const loadExtensionStatus = async () => {
    try {
      const response = await new Promise<any>((resolve) => {
        chrome.runtime.sendMessage({ action: 'getStorageData' }, resolve);
      });
      
      if (response && response.success) {
        setExtensionStatus(response.data);
      }
    } catch (error) {
      console.error('Error loading extension status:', error);
    }
  };

  // Main action handler
  const handleMainAction = async () => {
    setIsLoading(true);
    updateStatus('Executing main action...', 'default');
    
    try {
      const response = await new Promise<any>((resolve) => {
        chrome.runtime.sendMessage({ action: 'performTask' }, resolve);
      });
      
      if (chrome.runtime.lastError) {
        updateStatus(`Error: ${chrome.runtime.lastError.message}`, 'error');
      } else if (response && response.success) {
        updateStatus(response.message || 'Action completed successfully!', 'success');
        await loadExtensionStatus(); // Refresh status
      } else {
        updateStatus('Action failed. Please try again.', 'error');
      }
    } catch (error) {
      updateStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Get page info handler
  const handleGetPageInfo = async () => {
    setIsLoading(true);
    
    try {
      const tabs = await new Promise<chrome.tabs.Tab[]>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, resolve);
      });
      
      if (tabs[0]) {
        const response = await new Promise<any>((resolve) => {
          chrome.tabs.sendMessage(tabs[0].id!, { action: 'getPageInfo' }, resolve);
        });
        
        if (chrome.runtime.lastError) {
          updateStatus('Could not get page info', 'error');
        } else if (response && response.success) {
          setPageInfo(response.data);
          updateStatus('Page info retrieved', 'success');
        } else {
          updateStatus('Failed to get page info', 'error');
        }
      }
    } catch (error) {
      updateStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Highlight elements handler
  const handleHighlightElements = async () => {
    setIsLoading(true);
    
    try {
      const tabs = await new Promise<chrome.tabs.Tab[]>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, resolve);
      });
      
      if (tabs[0]) {
        const response = await new Promise<any>((resolve) => {
          chrome.tabs.sendMessage(tabs[0].id!, { action: 'highlightElements' }, resolve);
        });
        
        if (response && response.success) {
          updateStatus('Elements highlighted on page', 'success');
        } else {
          updateStatus('Could not highlight elements', 'error');
        }
      }
    } catch (error) {
      updateStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove highlights handler
  const handleRemoveHighlights = async () => {
    setIsLoading(true);
    
    try {
      const tabs = await new Promise<chrome.tabs.Tab[]>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, resolve);
      });
      
      if (tabs[0]) {
        const response = await new Promise<any>((resolve) => {
          chrome.tabs.sendMessage(tabs[0].id!, { action: 'removeHighlights' }, resolve);
        });
        
        if (response && response.success) {
          updateStatus('Highlights removed from page', 'success');
        } else {
          updateStatus('Could not remove highlights', 'error');
        }
      }
    } catch (error) {
      updateStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusCardClass = () => {
    switch (statusType) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusTextClass = () => {
    switch (statusType) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-80 min-h-96 p-5 bg-white font-sans">
      {/* Header */}
      <div className="text-center pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Chrome Extension
        </h1>
        <p className="text-sm text-gray-500">
          Modern UI with Next.js Components
        </p>
      </div>

      {/* Status Card */}
      <Card className={`mb-4 ${getStatusCardClass()}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Extension Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-sm ${getStatusTextClass()}`}>
            {status}
          </p>
          {extensionStatus && (
            <div className="flex gap-2 mt-2">
              <Badge variant={extensionStatus.enabled ? "default" : "secondary"}>
                {extensionStatus.enabled ? "Enabled" : "Disabled"}
              </Badge>
              {extensionStatus.lastUsed && (
                <Badge variant="outline" className="text-xs">
                  Last used: {new Date(extensionStatus.lastUsed).toLocaleTimeString()}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-2 mb-4">
        <Button 
          onClick={handleMainAction}
          disabled={isLoading}
          className="w-full bg-gray-900 hover:bg-gray-700 text-white"
        >
          {isLoading ? 'Processing...' : 'Run Main Action'}
        </Button>
        
        <Button 
          onClick={handleGetPageInfo}
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          Get Page Info
        </Button>
        
        <Button 
          onClick={handleHighlightElements}
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          Highlight Elements
        </Button>
        
        <Button 
          onClick={handleRemoveHighlights}
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          Remove Highlights
        </Button>
      </div>

      {/* Page Info Display */}
      {pageInfo && (
        <>
          <Separator className="mb-4" />
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-800">
                Current Page
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-yellow-700 space-y-1">
                <div className="font-medium truncate">{pageInfo.title}</div>
                <div className="break-all">{pageInfo.url}</div>
                <div className="text-yellow-600">
                  Domain: {pageInfo.domain}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Popup;
