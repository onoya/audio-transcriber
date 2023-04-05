#!/usr/bin/env npx ts-node

import { AudioTranscriptionService } from './AudioTranscriptionService';

new AudioTranscriptionService(process.argv)
  .run()
  .then((exitCode) => process.exit(exitCode))
  .catch((error) => {
    if (error.isAxiosError) {
      console.error(error.response?.data ?? error);
    } else {
      console.error(error);
    }

    process.exit(1);
  });
