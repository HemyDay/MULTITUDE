export const highlightSubstring = (string: string, substring: string) => {
  if (!substring) {
    return string;
  }

  const matchIndex = string.toLowerCase().indexOf(substring.toLowerCase());
  if (matchIndex === -1) {
    return string;
  }

  const beforeMatch = string.slice(0, matchIndex);
  const match = string.slice(matchIndex, matchIndex + substring.length);
  const afterMatch = string.slice(matchIndex + substring.length);

  return `${beforeMatch}<span class="text-primary!">${match}</span>${afterMatch}`;
};
