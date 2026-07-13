import { WebpayPlus, Options, IntegrationCommerceCodes, IntegrationApiKeys, Environment } from 'transbank-sdk';

// Usamos las credenciales de prueba por defecto de Transbank
const commerceCode = process.env.WEBPAY_COMMERCE_CODE || IntegrationCommerceCodes.WEBPAY_PLUS;
const apiKey = process.env.WEBPAY_API_KEY || IntegrationApiKeys.WEBPAY;
const environment = process.env.NODE_ENV === 'production' && process.env.WEBPAY_COMMERCE_CODE
  ? Environment.Production
  : Environment.Integration;

export const webpay = new WebpayPlus.Transaction(
  new Options(commerceCode, apiKey, environment)
);
