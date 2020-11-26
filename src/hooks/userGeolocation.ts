import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<Position | null>(null);

  const success = (position: Position) => {
    setGeolocation(position);
  };

  const error = (err: PositionError) => {
    // eslint-disable-next-line no-console
    console.error(err.message);
  };

  useEffect(() => {
    if (window && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return { geolocation };
};
