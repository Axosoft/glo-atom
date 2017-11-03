'use babel';

import config from '../config';

export const VIEW_URI = 'atom://glo' + (config.modeSuffix ? `-${config.modeSuffix}` : '');

export const DISPLAY_NAME = 'Glo' + (config.modeSuffix ? ` (${config.modeSuffix})` : '');
