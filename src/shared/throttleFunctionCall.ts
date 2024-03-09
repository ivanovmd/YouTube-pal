export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let shouldWait = false;
  let waitingArgs: Parameters<T> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const timeoutCallback = () => {
    if (waitingArgs) {
      shouldWait = false;
      const args = waitingArgs;
      waitingArgs = null;
      func(...args);
    }
  };

  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    func(...args);
    shouldWait = true;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(timeoutCallback, delay);
  };
}