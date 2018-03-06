'use babel';

import config from './config';

export const VIEW_URI = 'atom://glo' + (config.mode ? `-${config.mode}` : '');

export const DISPLAY_NAME = 'Glo' + (config.mode ? ` (${config.mode})` : '');
