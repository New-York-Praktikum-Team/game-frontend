interface ApiError {
  code: number | null;
  message: string;
}

interface HTTPError {
  response: Response;
}

export const getErrorFromRequest = async (HTTPError: HTTPError): Promise<ApiError> => {
  const error: ApiError = { code: null, message: 'Client internal error' };

  if (HTTPError.response) {
    const json = await HTTPError.response.json();

    error.code = HTTPError.response.status;
    error.message = json.reason || '';
  }

  return error;
};
