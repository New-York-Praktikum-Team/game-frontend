import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import ky from 'ky';
import { Country, UserGeolocation } from 'interfaces';

const success = async (
  position: Position,
  setGeolocation: Dispatch<SetStateAction<UserGeolocation | null>>,
): Promise<void> => {
  try {
    const country = await ky.get('http://api.geonames.org/countryCodeJSON', {
      searchParams: {
        username: 'elfexor',
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
