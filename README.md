# bitcoin-address-validation

[![Build Status](https://img.shields.io/travis/ruigomeseu/bitcoin-address-validation.svg)](https://travis-ci.org/ruigomeseu/bitcoin-address-validation)
[![npm version](https://badge.fury.io/js/bitcoin-address-validation.svg)](https://www.npmjs.com/package/bitcoin-address-validation)
[![David](https://img.shields.io/david/ruigomeseu/bitcoin-address-validation.svg)](https://www.npmjs.com/package/bitcoin-address-validation)
[![npm](https://img.shields.io/npm/dt/bitcoin-address-validation.svg)](https://www.npmjs.com/package/bitcoin-address-validation)
[![Twitter Follow](https://img.shields.io/twitter/follow/8bitgomes.svg?style=social)](https://twitter.com/8bitgomes)

Validate Bitcoin addresses - P2WSH, P2WPKH, P2PKH and P2SH.

```js
validate('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4');
==> true

getAddressInfo('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4');
==> { 
  bech32: true,
  network: 'mainnet',
  address: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
  type: 'p2wpkh'
}
```

## Installation
Add `bitcoin-address-validation` to your Javascript project dependencies using Yarn:
```bash
yarn add bitcoin-address-validation
```
Or NPM:
```bash
npm install bitcoin-address-validation --save
```

## Usage

### Importing
Import using ES6:

```js
import { validate, getAddressInfo } from 'bitcoin-address-validation';
```

Or AMD:

```js
const { validate, getAddressInfo } = require('bitcoin-address-validation');
```

### Validating addresses

`validate(address)` returns `true` for valid Bitcoin addresses or `false` for invalid Bitcoin addresses.

```js
validate('17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem')
==> true

validate('invalid')
==> false
```

#### Network validation

`validate(address, network)` allows you to validate whether an address is valid and belongs to `network`.

```js
validate('36bJ4iqZbNevh9b9kzaMEkXb28Gpqrv2bd', 'mainnet')
==> true

validate('36bJ4iqZbNevh9b9kzaMEkXb28Gpqrv2bd', 'testnet')
==> false

validate('2N4RsPe5F2fKssy2HBf2fH2d7sHdaUjKk1c', 'testnet')
==> true
```

### Address information

`getAddressInfo(address)` parses the input address and returns information about its type and network.

If the input address is invalid, an exception will be thrown.

```js
getAddressInfo('17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem')
==> {
  address: '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem',
  type: 'p2pkh',
  network: 'mainnet',
  bech32: false
}
```

### Networks

This library supports the following Bitcoin networks: `mainnet`, `testnet` and `regtest`.

> **Note:** When dealing with non-bech32 addresses, all `regtest` addresses will be recognized as `testnet` addresses.


### TypeScript support

If you're using TypeScript, the following types are provided with this library:

```ts
enum Network {
  mainnet = "mainnet",
  testnet = "testnet",
  regtest = "regtest",
}

type AddressInfo = {
  bech32: boolean;
  network: Network;
  address: string;
  type: AddressType;
}
```

#### TypeScript usage

```ts
import { validate, getAddressInfo, Network, AddressInfo } from 'bitcoin-address-validation';

validate('36nGbqV7XCNf2xepCLAtRBaqzTcSjF4sv9', Network.mainnet);
==> true

const addressInfo: AddressInfo = getAddressInfo('2Mz8rxD6FgfbhpWf9Mde9gy6w8ZKE8cnesp');
addressInfo.network;

==> 'testnet'
```

## Author

Rui Gomes  
https://ruigomes.me  

## License

The MIT License (MIT). Please see [LICENSE file](https://github.com/ruigomeseu/bitcoin-address-validation/blob/master/LICENSE.md) for more information.
