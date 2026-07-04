/* usePageTitle — sets the document title for each page */
import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    const base = "Pathloom";
    document.title = title ? `${title} — ${base}` : base;
    return () => { document.title = base; };
  }, [title]);
}
