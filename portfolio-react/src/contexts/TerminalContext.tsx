/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from 'react';

interface TerminalContextType {
  logs: string[];
  addLog: (message: string) => void;
  clearLogs: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<string[]>([
    '[INFO] DevOps Terminal Initialized.',
    "[INFO] Type commands like: cd projects, ls skills, cd about.",
  ]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

  const clearLogs = () => {
    setLogs(['[INFO] Terminal cleared.']);
  };

  return (
    <TerminalContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}
