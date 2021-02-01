import type { Dispatch, SetStateAction } from 'react';
import type { Country, UserGeolocation } from 'interfaces';
import { useEffect, useState } from 'react';
import { HTTPLocalTransport } from 'modules/HTTPTransport';

const success = async (
  position: Position,
  setGeolocation: Dispatch<SetStateAction<UserGeolocation | null>>,
): Promise<void> => {
  try {
    const country = await HTTPLocalTransport('geolocation', {
      searchParams: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    }).json<Country>();
    setGeolocation({ ...position, country });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

const error = (err: PositionError): void => {
  // eslint-disable-next-line no-console
  console.error(err.message);
};

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<UserGeolocation | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => success(position, setGeolocation),
        error,
      );
    }
  }, []);

  return { geolocation };
};
