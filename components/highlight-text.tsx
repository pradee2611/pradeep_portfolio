const HIGHLIGHT_TERMS = ['GenAI', 'Gen AI', 'Agentic AI', 'RAG'];
const HIGHLIGHT_REGEX = new RegExp(`(${HIGHLIGHT_TERMS.join('|')})`, 'gi');

export function HighlightText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(HIGHLIGHT_REGEX);

  return (
    <>
      {parts.map((part, index) =>
        HIGHLIGHT_TERMS.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
          <span key={index} className={className ?? 'text-gray-900 dark:text-white font-medium'}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
