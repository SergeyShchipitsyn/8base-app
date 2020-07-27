import { useRef, useEffect } from 'react';


export function useDocumentTitle(
  title: string,
  retainOnUnmount: boolean = false
): void {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    const previousTitle = defaultTitle.current

    return () => {
      if (!retainOnUnmount) {
        document.title = previousTitle
      }
    }
  }, [retainOnUnmount]);
}
