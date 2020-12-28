export default {
  bitcoin: {
    addressTypes: {
      0x00: {
        type: 'p2pkh',
        network: 'mainnet',
      },

      0x6f: {
        type: 'p2pkh',
        network: 'testnet',
      },

      0x05: {
        type: 'p2sh',
        network: 'mainnet',
      },

      0xc4: {
        type: 'p2sh',
        network: 'testnet',
      }
    },
    prefixesNetwork: {
      bc: 'mainnet',
      tb: 'testnet',
      bcrt: 'regtest',
    },
  },
  litecoin: {
    addressTypes: {
      0x30: {
        type: 'p2pkh',
        network: 'mainnet',
      },

      0x6f: {
        type: 'p2pkh',
        network: 'testnet',
      },

      0x32: {
        type: 'p2sh',
        network: 'mainnet',
      },

      0xc4: {
        type: 'p2sh',
        network: 'testnet',
      }
    },
    prefixesNetwork: {
      ltc: 'mainnet',
      tltc: 'testnet',
    },
  },
};
