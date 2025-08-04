// src/utils/version.ts

// Declare global variables injected by build process
declare const BUILD_NUMBER: string;
declare const BUILD_DATE: string;
declare const IS_PRODUCTION: boolean;

export interface VersionInfo {
  buildNumber: string;
  buildDate: string;
  isProduction: boolean;
}

export const VERSION: VersionInfo = {
  buildNumber: (typeof BUILD_NUMBER !== 'undefined' ? BUILD_NUMBER : 'dev') as string,
  buildDate: (typeof BUILD_DATE !== 'undefined' ? BUILD_DATE : new Date().toISOString().split('T')[0]) as string,
  isProduction: (typeof IS_PRODUCTION !== 'undefined' ? IS_PRODUCTION : false) as boolean
};
