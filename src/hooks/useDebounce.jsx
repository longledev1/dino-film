import { useState, useEffect } from "react";

/**
 * Custom hook: useDebounce
 * @param {any} value - Giá trị cần debounce (ví dụ: input value)
 * @param {number} delay - Thời gian chờ (ms), mặc định 500ms
 * @returns {any} - Giá trị đã debounce
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // dọn dẹp khi value thay đổi
  }, [value, delay]);

  return debouncedValue;
}
