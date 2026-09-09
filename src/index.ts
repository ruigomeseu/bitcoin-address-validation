import { base58_to_binary } from 'base58-js';
import { bech32, bech32m } from 'bech32';
import { createHash } from 'sha256-uint8array';

// Defensive parsing limit to bound Base58 decoding work; individual formats enforce their own limits.
const MAX_ADDRESS_INPUT_LENGTH = 500;

const sha256 = (payload: Uint8Array) => createHash().update(payload).digest();

enum Network {
  mainnet = 'mainnet',
  testnet = 'testnet',
  regtest = 'regtest',
  signet = 'signet',
}

enum AddressType {
  p2pkh = 'p2pkh',
  p2sh = 'p2sh',
  p2wpkh = 'p2wpkh',
  p2wsh = 'p2wsh',
  p2tr = 'p2tr',
  unknown = 'unknown',
}

type AddressInfo = {
  bech32: boolean;
  network: Network;
  address: string;
  type: AddressType;
};

const addressTypes: { [key: number]: { type: AddressType; network: Network } } = {
  0x00: {
    type: AddressType.p2pkh,
    network: Network.mainnet,
  },

  0x6f: {
    type: AddressType.p2pkh,
    network: Network.testnet,
  },

  0x05: {
    type: AddressType.p2sh,
    network: Network.mainnet,
  },

  0xc4: {
    type: AddressType.p2sh,
    network: Network.testnet,
  },
};

type Options = {
  castTestnetTo?: Network.regtest | Network.signet;
};

function castTestnetTo(fromNetwork: Network, toNetwork?: Network.regtest | Network.signet): Network {
  if (toNetwork === undefined) {
    return fromNetwork;
  }

  if (toNetwork !== Network.regtest && toNetwork !== Network.signet) {
    throw new Error('Invalid casting destination');
  }

  if (fromNetwork === Network.mainnet) {
    throw new Error('Cannot cast mainnet to non-mainnet');
  }

  return fromNetwork === Network.testnet ? toNetwork : fromNetwork;
}

const normalizeAddressInfo = (addressInfo: AddressInfo, options?: Options): AddressInfo => {
  return {
    ...addressInfo,
    network: castTestnetTo(addressInfo.network, options?.castTestnetTo),
  };
};

const parseBech32 = (address: string, options?: Options): AddressInfo => {
  // Reject non-ASCII input before the decoder normalizes case (e.g. Kelvin sign to k).
  if (/[^\x21-\x7e]/.test(address)) {
    throw new Error('Invalid address');
  }

  const decodedBech32 = bech32.decodeUnsafe(address);
  const decoded = decodedBech32 ?? bech32m.decodeUnsafe(address);

  if (!decoded) {
    throw new Error('Invalid address');
  }

  const mapPrefixToNetwork: { [key: string]: Network } = {
    bc: Network.mainnet,
    tb: Network.testnet,
    bcrt: Network.regtest,
  };

  const network: Network | undefined = mapPrefixToNetwork[decoded.prefix];

  if (network === undefined) {
    throw new Error('Invalid address');
  }

  const witnessVersion = decoded.words[0];

  if (witnessVersion === undefined || witnessVersion < 0 || witnessVersion > 16) {
    throw new Error('Invalid address');
  }

  const usesBech32 = decodedBech32 !== undefined;

  if ((witnessVersion === 0 && !usesBech32) || (witnessVersion > 0 && usesBech32)) {
    throw new Error('Invalid address');
  }

  const data = bech32.fromWords(decoded.words.slice(1));

  if (data.length < 2 || data.length > 40) {
    throw new Error('Invalid address');
  }

  if (witnessVersion === 0 && data.length !== 20 && data.length !== 32) {
    throw new Error('Invalid address');
  }

  let type = AddressType.unknown;

  if (witnessVersion === 0 && data.length === 20) {
    type = AddressType.p2wpkh;
  } else if (witnessVersion === 0 && data.length === 32) {
    type = AddressType.p2wsh;
  } else if (witnessVersion === 1 && data.length === 32) {
    type = AddressType.p2tr;
  }

  return normalizeAddressInfo(
    {
      bech32: true,
      network,
      address,
      type,
    },
    options,
  );
};

const getAddressInfo = (address: string, options?: Options): AddressInfo => {
  if (address.length > MAX_ADDRESS_INPUT_LENGTH) {
    throw new Error('Invalid address');
  }

  let decoded: Uint8Array;
  const prefix = address.slice(0, 2).toLowerCase();

  if (prefix === 'bc' || prefix === 'tb') {
    return parseBech32(address, options);
  }

  if (/[^1-9A-HJ-NP-Za-km-z]/.test(address)) {
    throw new Error('Invalid address');
  }

  try {
    decoded = base58_to_binary(address);
  } catch (error) {
    throw new Error('Invalid address');
  }

  const { length } = decoded;

  if (length !== 25) {
    throw new Error('Invalid address');
  }

  const version = decoded[0];

  const checksum = decoded.slice(length - 4, length);
  const body = decoded.slice(0, length - 4);

  const expectedChecksum = sha256(sha256(body)).slice(0, 4);

  if (checksum.some((value: number, index: number) => value !== expectedChecksum[index])) {
    throw new Error('Invalid address');
  }

  if (version === undefined) {
    throw new Error('Invalid address');
  }

  const addressType = addressTypes[version];

  if (!addressType) {
    throw new Error('Invalid address');
  }

  return normalizeAddressInfo(
    {
      ...addressType,
      address,
      bech32: false,
    },
    options,
  );
};

const validate = (address: string, network?: Network, options?: Options) => {
  try {
    const addressInfo = getAddressInfo(address, options);

    if (network) {
      return network === addressInfo.network;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export { getAddressInfo, Network, AddressType, validate };
export type { AddressInfo };
export default validate;
