'use strict';

import { publish as ovsxPublish } from 'ovsx';
import { publishVSIX as vscePublishVSIX, IPublishVSIXOptions as VSCEPublishOptions } from 'vsce';
import { ActionOptions } from './types';

async function publish(ovsxOptions: ActionOptions): Promise<void> {
    if (ovsxOptions.registryUrl === 'https://marketplace.visualstudio.com') {
        const vsceOptions = _convertToVSCEPublishOptions(ovsxOptions);
        await vscePublishVSIX(ovsxOptions.extensionFile, vsceOptions);
    } else {
        await ovsxPublish(ovsxOptions);
    }
}

function _convertToVSCEPublishOptions(options: ActionOptions): VSCEPublishOptions {
    // Shallow copy of options
    const { baseContentUrl, baseImagesUrl, pat, yarn: useYarn, noVerify } = { ...options };
    const result = {
        baseContentUrl,
        useYarn,
        pat,
        baseImagesUrl,
        noVerify,
    };
    return result;
}

export { publish };
