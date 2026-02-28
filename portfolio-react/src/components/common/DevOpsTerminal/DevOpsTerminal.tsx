import { useState, useEffect, KeyboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTerminal } from '../../../contexts/TerminalContext';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './DevOpsTerminal.module.css';

const prompts = [
  "~$ Type 'ls info' to get in touch!",
  "~$ Type 'cd projects' to see my work!",
  "~$ Type 'ls skills' to explore my skills!",
];

const commandList = [
  "'ls help'",
  "'cd home'",
  "'cd projects'",
  "'cls' - to clear terminal",
  "'ls skills'",
  "'ls info'",
  "'cd about'",
];

export default function DevOpsTerminal() {
  const [command, setCommand] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [, setPromptIndex] = useState(0);
  const [enterUsername, setEnterUsername] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { logs, addLog, clearLogs } = useTerminal();
  const { login } = useAuth();

  // Get current path from URL
  const currentPath =
    location.pathname === '/' ? '/home' : location.pathname;

  // Rotate prompts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => {
        const newIndex = (prev + 1) % prompts.length;
        setCurrentPrompt(prompts[newIndex]);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !command.trim()) return;

    // Handle username entry
    if (enterUsername) {
      setUsername(command);
      addLog('[INFO] Username entered.');
      setEnterUsername(false);
      setEnterPassword(true);
      setCommand('');
      return;
    }

    // Handle password entry
    if (enterPassword) {
      addLog('[INFO] Authenticating...');
      setEnterPassword(false);

      const success = await login({ username, password: command });
      if (success) {
        addLog('[SUCCESS] Authentication successful! Redirecting to admin...');
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        addLog('[ERROR] Authentication failed. Incorrect username or password.');
      }

      setCommand('');
      return;
    }

    // Normal command handling
    const trimCommand = command.trim();
    const normalizedCommand = trimCommand.replace(/\s+/g, ' ').toLowerCase();
    addLog(`$ ${command}`);

    switch (normalizedCommand) {
      case 'cd projects':
        addLog('[INFO] Navigating to /projects...');
        navigate('/projects');
        break;

      case 'cd home':
        addLog('[INFO] Navigating to /home...');
        navigate('/');
        break;

      case 'ls skills':
        addLog('[INFO] Showing /skills...');
        navigate('/skills');
        break;

      case 'cd about':
        addLog('[INFO] Deploying Portfolio...');
        navigate('/about');
        break;

      case 'cls':
        clearLogs();
        break;

      case 'ls info':
        if (!logs.some((log) => log.includes('LinkedIn:'))) {
          addLog('[INFO] Displaying contact info...');
          addLog(
            "[INFO] LinkedIn: <a href='https://linkedin.com/in/dersimabbas' target='_blank'>linkedin.com/in/dersimabbas</a>"
          );
          addLog(
            "[INFO] GitHub: <a href='https://github.com/dersimabbas' target='_blank'>github.com/dersimabbas</a>"
          );
        }
        break;

      case 'ls help':
        addLog('[INFO] Available commands:');
        commandList.forEach((cmd) => addLog(`$ ${cmd}`));
        break;

      case 'sudo admin':
        addLog('[INFO] Enter UserName:');
        setEnterUsername(true);
        setCommand('');
        return;

      default:
        addLog(
          `[ERROR] Unknown command: '${command}', type ls help for all available commands.`
        );
        break;
    }

    setCommand('');
  };

  return (
    <div className="container-fluid p-0 fixed-bottom">
      <div className={`${styles.terminal} bg-dark text-success border-top border-dark w-100`}>
        {/* Path Display */}
        <div className={styles.pathDisplay}>
          [📂] Current Path: {currentPath}
        </div>

        {/* Rotating Prompt */}
        <div className="text text-center" style={{ color: '#00ffaa' }}>
          <span>{currentPrompt}</span>
        </div>

        {/* Log Output */}
        <div className={styles.logOutput}>
          {logs.map((log, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: log }}
            />
          ))}
        </div>

        {/* Command Input */}
        <div className="input-group">
          <span className="input-group-text bg-dark text-success border-0">
            $
          </span>
          <input
            type={enterPassword ? 'password' : 'text'}
            className="form-control bg-dark text-light border-0"
            style={{ color: '#00ffaa' }}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter command here..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
