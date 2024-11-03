import { VersioningOptions, VersioningType } from '@nestjs/common';

export const versioningConfig: VersioningOptions = {
  type: VersioningType.URI,
  defaultVersion: '1'
};
