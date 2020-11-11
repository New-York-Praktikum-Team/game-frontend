interface ApiError {
  code: number | null,
  message: string
}

interface HTTPError {
  response: Response
}

export const getErrorFromRequest = async (error: HTTPError): Promise<ApiError> => {
  const errorResponse: ApiError = { code: null, message: 'Client internal error' };

  if (error.response) {
    const json = await error.response.json();

    errorResponse.code = error.response.status;
    errorResponse.message = json.reason || '';
  }

  return errorResponse;
};
