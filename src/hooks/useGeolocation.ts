import { useEffect, useState } from 'react';
import ky from 'ky';
import { Country, UserGeolocation } from 'interfaces';

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<UserGeolocation | null>(null);

  const success: PositionCallback = async (position: Position) => {
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

  const error: PositionErrorCallback = (err: PositionError) => {
    // eslint-disable-next-line no-console
    console.error(err.message);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return { geolocation };
};
