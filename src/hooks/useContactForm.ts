import { useState, useRef } from 'react';

const RATE_LIMIT_MS = 15000;
const MAX_RETRIES = 3;

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lastSubmitRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const submitWithRetry = async (body: object, retries: number): Promise<Response> => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      if (attempt > 0) {
        const delay = Math.min(1000 * 2 ** attempt, 8000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      try {
        abortRef.current = new AbortController();
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: abortRef.current.signal,
        });
        if (response.ok) return response;
        if (!response.ok && attempt < retries && response.status >= 500) continue;
        return response;
      } catch (err) {
        if ((err as Error).name === 'AbortError') throw err;
        if (attempt === retries) throw err;
      }
    }
    throw new Error('All retry attempts failed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const now = Date.now();
    if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
      const remaining = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitRef.current)) / 1000);
      setError(`Please wait ${remaining}s before sending another message.`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitWithRetry({
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }, MAX_RETRIES);

      const result = await response.json();

      if (result.success) {
        lastSubmitRef.current = Date.now();
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    isSubmitted,
    activeField,
    error,
    setActiveField,
    handleInputChange,
    handleSubmit
  };
}