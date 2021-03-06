/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
const md5 = require('blueimp-md5');

const isValidLicenseKey = (licenseKey) => {
  try {
    if (!licenseKey) return false;

    const inputLicenseKey = licenseKey.trim();

    const parts = inputLicenseKey.split('-');
    const quantity = parts[0];
    const time = parts[1];
    const md5Str = parts.slice(2).join('').toUpperCase();

    return md5(process.env.REACT_APP_LICENSE_SECRET + quantity + time).toUpperCase()
      === md5Str
      // allow user to activate WebCatalog with Singlebox license
      || md5(process.env.REACT_APP_LICENSE_SECRET_SINGLEBOX_LEGACY + quantity + time).toUpperCase()
        === md5Str;
  } catch (err) {
    return false;
  }
};

module.exports = isValidLicenseKey;
