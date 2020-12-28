import baseX from 'base-x';
import bech32 from 'bech32';
import sha from 'sha.js';
import { Buffer } from 'buffer';

import networks from './networks';

const base58 = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

const sha256 = payload => Buffer.from(sha('sha256').update(payload).digest());

const validateBech32 = (address, networkCurrency) => {
  let decoded;

  try {
    decoded = bech32.decode(address);
  } catch (error) {
    return false;
  }

  const network = networkCurrency.prefixesNetwork[decoded.prefix];

  if (network === undefined) {
    return false;
  }

  const witnessVersion = decoded.words[0];

  if (witnessVersion < 0 || witnessVersion > 16) {
    return false;
  }

  const data = bech32.fromWords(decoded.words.slice(1));

  let type;

  if (data.length === 20) {
    type = 'p2wpkh';
  } else if (data.length === 32) {
    type = 'p2wsh';
  }

  return {
    bech32: true,
    network,
    address,
    type
  };
};

export const validate = (address, currency = 'bitcoin') => {
  if (!address) {
    return false;
  }

  const networkCurrency = currency.constructor === String
    ? networks[currency]
    : currency;
  const networkPrefixes = Object.keys(networkCurrency.prefixesNetwork);

  let decoded;

  const prefix = networkPrefixes.find(pref => address.indexOf(pref) === 0);

  if (prefix) {
    return validateBech32(address, networkCurrency);
  }

  try {
    decoded = base58.decode(address);
  } catch (error) {
    return false;
  }

  const { length } = decoded;

  if (length !== 25) {
    return false;
  }

  const version = decoded.readUInt8(0);

  const checksum = decoded.slice(length - 4, length);
  const body = decoded.slice(0, length - 4);

  const expectedChecksum = sha256(sha256(body)).slice(0, 4);

  if (!checksum.equals(expectedChecksum)) {
    return false;
  }

  return networkCurrency.addressTypes[version]
    ? Object.assign({ address, bech32: false }, networkCurrency.addressTypes[version])
    : false;
};

const strictValidation = (address, network) => {
  const validated = validate(address);
  if (!validated) return false;
  if (network) {
    if (validated.network !== network) return false;
    return true;
  }
  return validated;
};

export default strictValidation;
