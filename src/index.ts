import baseX from 'base-x';
import { bech32 } from 'bech32';
import sha from 'sha.js';
import { Buffer } from 'buffer';

const base58 = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

const sha256 = payload => Buffer.from(sha('sha256').update(payload).digest());

const addressTypes = {
  0x00: {
    type: 'p2pkh',
    network: 'mainnet'
  },

  0x6f: {
    type: 'p2pkh',
    network: 'testnet'
  },

  0x05: {
    type: 'p2sh',
    network: 'mainnet'
  },

  0xc4: {
    type: 'p2sh',
    network: 'testnet'
  }
};

const validateBech32 = (address) => {
  let decoded;

  try {
    decoded = bech32.decode(address);
  } catch (error) {
    return false;
  }

  const prefixesNetwork = {
    bc: 'mainnet',
    tb: 'testnet',
    bcrt: 'regtest'
  }

  const network = prefixesNetwork[decoded.prefix];

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

const validateBtcAddress = (address) => {
  if (!address) {
    return false;
  }

  let decoded;
  const prefix = address.substr(0, 2);

  if (prefix === 'bc' || prefix === 'tb') {
    return validateBech32(address);
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

  return addressTypes[version]
    ? Object.assign({ address, bech32: false }, addressTypes[version])
    : false;
};

const strictValidation = (address, network) => {
  const validated = validateBtcAddress(address);
  if (!validated) return false;
  if (network) {
    if (validated.network !== network) return false;
    return true;
  }
  return validated;
};

export default strictValidation;
