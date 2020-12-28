const { assert } = require('chai');
const { default: strictValidation, validate } = require('../lib/index.cjs.js');

describe('Validator (default Bitcoin)', () => {
  it('validates Mainnet P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2pkh', network: 'mainnet', bech32: false });
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2pkh', network: 'testnet', bech32: false });
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    assert.isFalse(validate(address));
  });

  it('validates Mainnet P2SH', () => {
    const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2sh', network: 'mainnet', bech32: false });
  });

  it('validates Testnet P2SH', () => {
    const address = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2sh', network: 'testnet', bech32: false });
  });

  it('fails on invalid P2SH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem';

    assert.isFalse(validate(address));
  });

  it('handles null address', () => {
    const address = null;

    assert.isFalse(validate(address));
  });

  it('handles bogus address', () => {
    const address = 'x';

    assert.isFalse(validate(address));
  });

  it('validates Mainnet Bech32 P2WPKH', () => {
    const addresses = [
      'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
      'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s',
    ];

    assert.isNotFalse(validate(addresses[0]));
    assert.include(validate(addresses[0]), { bech32: true, type: 'p2wpkh', network: 'mainnet' });

    assert.isNotFalse(validate(addresses[1]));
    assert.include(validate(addresses[1]), { bech32: true, type: 'p2wpkh', network: 'mainnet' });
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wpkh', network: 'testnet' });
  });

  it('validates Regtest Bech32 P2WPKH', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wpkh', network: 'regtest' });
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wsh', network: 'mainnet' });
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wsh', network: 'testnet' });
  });

  it('validates Regtest Bech32 P2WSH', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wsh', network: 'regtest' });
  });

  it('fails on invalid Bech32', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';

    assert.isFalse(validate(address));
  });
});

describe('Strict Validator (default Bitcoin)', () => {
  it('validates Mainnet P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    assert.isTrue(strictValidation(address, 'mainnet'));
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';

    assert.isTrue(strictValidation(address, 'testnet'));
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    assert.isFalse(strictValidation(address, 'mainnet'));
  });

  it('validates Mainnet P2SH', () => {
    const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';

    assert.isTrue(strictValidation(address, 'mainnet'));
  });

  it('validates Testnet P2SH', () => {
    const address = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc';

    assert.isTrue(strictValidation(address, 'testnet'));
  });

  it('fails on invalid P2SH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem';

    assert.isFalse(strictValidation(address, 'mainnet'));
  });

  it('handles null address', () => {
    const address = null;

    assert.isFalse(strictValidation(address, 'mainnet'));
  });

  it('handles bogus address', () => {
    const address = 'x';

    assert.isFalse(strictValidation(address, 'mainnet'));
  });

  it('validates Mainnet Bech32 P2WPKH', () => {
    const addresses = [
      'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
      'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s',
    ];

    assert.isTrue(strictValidation(addresses[0], 'mainnet'));

    assert.isTrue(strictValidation(addresses[1], 'mainnet'));
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';

    assert.isTrue(strictValidation(address, 'testnet'));
  });

  it('validates Regtest Bech32 P2WPKH', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    assert.isTrue(strictValidation(address, 'regtest'));
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3';

    assert.isTrue(strictValidation(address, 'mainnet'));
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    assert.isTrue(strictValidation(address, 'testnet'));
  });

  it('validates Regtest Bech32 P2WSH', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    assert.isTrue(strictValidation(address, 'regtest'));
  });

  it('fails on invalid Bech32', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';

    assert.isFalse(strictValidation(address, 'mainnet'));
  });
});

describe('Validator (Litecoin)', () => {
  const network = 'litecoin';

  it('validates Mainnet P2PKH', () => {
    const address = 'LajyQBeZaBA1NkZDeY8YT5RYYVRkXMvb2T';

    assert.isNotFalse(validate(address, network));
    assert.include(validate(address, network), { type: 'p2pkh', network: 'mainnet', bech32: false });
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mgEAXL5tWc8mUFFjM7ehYKdo3zugBp6zDC';

    assert.isNotFalse(validate(address, network));
    assert.include(validate(address, network), { type: 'p2pkh', network: 'testnet', bech32: false });
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    assert.isFalse(validate(address, network));
  });

  it('validates Mainnet P2SH', () => {
    const address = 'MKx1exZ4R9kSxcWCbXczcWFAdaoocybGhr';

    assert.isNotFalse(validate(address, network));
    assert.include(validate(address, network), { type: 'p2sh', network: 'mainnet', bech32: false });
  });

  it('validates Testnet P2SH', () => {
    const address = '2N2PJEucf6QY2kNFuJ4chQEBoyZWszRQE16';

    assert.isNotFalse(validate(address, network));
    assert.include(validate(address, network), { type: 'p2sh', network: 'testnet', bech32: false });
  });

  it('fails on invalid P2SH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem';

    assert.isFalse(validate(address, network));
  });

  it('handles null address', () => {
    const address = null;

    assert.isFalse(validate(address, network));
  });

  it('handles bogus address', () => {
    const address = 'x';

    assert.isFalse(validate(address, network));
  });

  it('validates Mainnet Bech32 P2WPKH', () => {
    const addresses = [
      'ltc1q9z4ggz09z5m64n7d4pnlyhpx8g3tcy8veyhvlx',
      'ltc1qtngnt7xky99slluuaz44tq58e0fc2sv0qn8msz',
    ];

    assert.isNotFalse(validate(addresses[0], network));
    assert.include(validate(addresses[0], network), { bech32: true, type: 'p2wpkh', network: 'mainnet' });

    assert.isNotFalse(validate(addresses[1], network));
    assert.include(validate(addresses[1], network), { bech32: true, type: 'p2wpkh', network: 'mainnet' });
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tltc1q6u7k65v09479jt7x3z3hm5js5zyj6z4rslml5g';

    assert.isNotFalse(validate(address, network));
    assert.include(validate(address, network), { bech32: true, type: 'p2wpkh', network: 'testnet' });
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'ltc1qgttu0m0yk9vymyj28vzd3dxuhr8wp644plp734zsetvtzklqdgkq2z3xqg';

    assert.isNotFalse(validate(address, network));
    assert.include(validate(address, network), { bech32: true, type: 'p2wsh', network: 'mainnet' });
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wsh', network: 'testnet' });
  });

  it('fails on invalid Bech32', () => {
    const address = 'tltc1qtjk6dq6vx0xrmd98gsc4a53hp8fpv508fjukfr';

    assert.isFalse(validate(address));
  });
});
