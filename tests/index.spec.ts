import validate, { getAddressInfo, Network } from '../src/index';

interface ITestParams {
  network: string;
  address: string | string[];
  expect_valid: boolean;
}

describe.each([['Parsing'], ['Network']])('Validation & %s', (validationAndX) => {
  describe('Bech32 = false', () => {
    describe.each([['P2PKH'], ['P2SH']])('%s', (type) => {
      // prettier-ignore-start
      it.each`
        network      | address                                                                                            | expect_valid
        ${'Mainnet'} | ${type === 'P2PKH' ? '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem' : '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'}  | ${true}
        ${'Testnet'} | ${type === 'P2PKH' ? 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn' : '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc'} | ${true}
        ${'fails'}   | ${type === 'P2PKH' ? '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem' : '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem'}  | ${false}
      `(
        // prettier-ignore-end
        'validates $network for address=$address',
        ({ network, address, expect_valid }: ITestParams) => {
          address = address as string; // assign proper type
          [type, network] = [type, network].map((x) => x.toLowerCase());

          if (validationAndX === 'Parsing') {
            expect(validate(address)).toBe(expect_valid);
            if (expect_valid) {
              expect(getAddressInfo(address)).toEqual({ type, network, bech32: false, address });
            }
          } else {
            expect(validate(address, Network[network])).toBe(expect_valid);
          }
        },
      );
    });

    describe('Errors/Fails', () => {
      it('handles bogus address', () => {
        expect(validate('x', validationAndX === 'Network' ? Network.mainnet : undefined)).toBe(false);
      });
    });
  });

  describe('Bech32 = true', () => {
    describe.each([['P2WPKH'], ['P2WSH']])('%s', (type) => {
      // prettier-ignore-start
      it.each`
        network      | address                                                                                                                                                                                | expect_valid
        ${'Mainnet'} | ${type === 'P2WPKH' ? ['bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4', 'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s'] : 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3'} | ${true}
        ${'Testnet'} | ${type === 'P2WPKH' ? 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx' : 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7'}                                                 | ${true}
        ${'Regtest'} | ${type === 'P2WPKH' ? 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp' : 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt'}                                             | ${true}
      `(
        // prettier-ignore-end
        'validates $network for address=$address',
        ({ network, address, expect_valid }: ITestParams) => {
          address = Array.isArray(address) ? address : [address]; // convert all addresses to arrays for easy handling
          [type, network] = [type, network].map((x) => x.toLowerCase());

          if (validationAndX === 'Parsing') {
            address.forEach((address_item) => {
              expect(validate(address_item)).toBe(expect_valid);
              expect(getAddressInfo(address_item)).toEqual({ type, network, bech32: true, address: address_item });
            });
          } else {
            address.forEach((address_item) => {
              expect(validate(address_item, Network[network])).toBe(expect_valid);
            });
          }
        },
      );
    });

    describe('Errors/Fails', () => {
      test('invalid Bech32', () => {
        const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';
        expect(validate(address, validationAndX === 'Network' ? Network.mainnet : undefined)).toBe(false);
      });

      if (validationAndX === 'Parsing') {
        test('non-base58 encoded', () => expect(() => getAddressInfo('???')).toThrow());
      }
    });
  });
});
