import React, { useState, useEffect, useCallback } from 'react';
import styles from './AskAI.module.css';

const AskAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');

  const close = useCallback(() => {
    setIsOpen(false);
    setUserInput('');
  }, []);

  const handleAskAI = () => {
    const currentUrl = window.location.href;
    const query = encodeURIComponent(`${currentUrl} ${userInput}`);
    const chatGPTUrl = `https://chatgpt.com/?hints=search&q=${query}`;
    window.open(chatGPTUrl, '_blank');
    close();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      handleAskAI();
    }
  };

  /** Close on Esc while the modal is open */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  return (
    <>
      <button
        className={styles.askAIButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask AI about this page"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
        Ask AI
      </button>

      {isOpen && (
        /* Click on backdrop to close */
        <div className={styles.modal} onClick={close}>
          {/* Stop propagation so clicks inside the dialog do not close it */}
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Ask AI about this page</h3>
              <button
                className={styles.closeButton}
                onClick={close}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <p>What would you like to know about this documentation page?</p>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your question..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <div className={styles.modalActions}>
                <button
                  className={styles.cancelButton}
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  className={styles.submitButton}
                  onClick={handleAskAI}
                  disabled={!userInput.trim()}
                >
                  Ask ChatGPT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AskAI;
