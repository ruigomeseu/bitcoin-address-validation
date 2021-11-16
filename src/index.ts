import baseX from 'base-x';
import { bech32, bech32m } from 'bech32';
import sha from 'sha.js';
import { Buffer } from 'buffer';

const base58 = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

const sha256 = (payload: string | Buffer) => Buffer.from(sha('sha256').update(payload).digest());

enum Network {
  mainnet = 'mainnet',
  testnet = 'testnet',
  regtest = 'regtest',
}

enum AddressType {
  p2pkh = 'p2pkh',
  p2sh = 'p2sh',
  p2wpkh = 'p2wpkh',
  p2wsh = 'p2wsh',
  p2tr = 'p2tr',
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

const parseBech32 = (address: string): AddressInfo => {
  let decoded;

  try {
    if (address.startsWith('bc1p') || address.startsWith('tb1p') || address.startsWith('bcrt1p')) {
      decoded = bech32m.decode(address);
    } else {
      decoded = bech32.decode(address);
    }
  } catch (error) {
    throw new Error('Invalid address');
  }

  const mapPrefixToNetwork: { [key: string]: Network } = {
    bc: Network.mainnet,
    tb: Network.testnet,
    bcrt: Network.regtest,
  };

  const network: Network = mapPrefixToNetwork[decoded.prefix];

  if (network === undefined) {
    throw new Error('Invalid address');
  }

  const witnessVersion = decoded.words[0];

  if (witnessVersion < 0 || witnessVersion > 16) {
    throw new Error('Invalid address');
  }
  const data = bech32.fromWords(decoded.words.slice(1));

  let type;

  if (data.length === 20) {
    type = AddressType.p2wpkh;
  } else if (witnessVersion === 1) {
    type = AddressType.p2tr;
  } else {
    type = AddressType.p2wsh;
  }

  return {
    bech32: true,
    network,
    address,
    type,
  };
};

const getAddressInfo = (address: string): AddressInfo => {
  let decoded;
  const prefix = address.substr(0, 2).toLowerCase();

  if (prefix === 'bc' || prefix === 'tb') {
    return parseBech32(address);
  }

  try {
    decoded = base58.decode(address);
  } catch (error) {
    throw new Error('Invalid address');
  }

  const { length } = decoded;

  if (length !== 25) {
    throw new Error('Invalid address');
  }

  const version = decoded.readUInt8(0);

  const checksum = decoded.slice(length - 4, length);
  const body = decoded.slice(0, length - 4);

  const expectedChecksum = sha256(sha256(body)).slice(0, 4);

  if (!checksum.equals(expectedChecksum)) {
    throw new Error('Invalid address');
  }

  const validVersions = Object.keys(addressTypes).map(Number);

  if (!validVersions.includes(version)) {
    throw new Error('Invalid address');
  }

  const addressType = addressTypes[version];

  return {
    ...addressType,
    address,
    bech32: false,
  };
};

const validate = (address: string, network?: Network) => {
  try {
    const addressInfo = getAddressInfo(address);

    if (network) {
      return network === addressInfo.network;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export { getAddressInfo, Network, AddressInfo, validate };
export default validate;
