import React from 'react';
import { IntlProvider } from 'react-intl';

export const mockResponse = (status, statusText, response) => new window.Response(response, {
  status,
  statusText,
  headers: {
    'Content-type': 'application/json',
  },
});

export const withIntlProvider = (children, props = { locale: 'en' }) => (
  <IntlProvider {...props}>
    {children}
  </IntlProvider>
);
