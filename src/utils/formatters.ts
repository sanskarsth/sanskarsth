export const sanitizeText = (value: string, maxLength: number): string => {
  return value.trim().slice(0, maxLength);
};

export const formatDate = (value: string): string => {
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return value;
  }
};

export const formatDateTime = (value: string): string => {
  try {
    return new Date(value).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return value;
  }
};
