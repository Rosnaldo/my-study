import { env } from '~/helpers/env';

export const ImageFromLocal = env.IS_COMPANION || env.IS_IPAD;
