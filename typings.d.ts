declare module "bitcoin-address-validation" {
  export enum Network {
    mainnet = "mainnet",
    testnet = "testnet",
    regtest = "regtest"
  }
  export enum AddressType {
    p2pkh = "p2pkh",
    p2sh = "p2sh",
    p2wpkh = "p2wpkh"
  }
  export interface Validation {
    bech32: boolean;
    network: Network;
    address: string;
    type: AddressType;
  }
  export function validator(address: string, regtestAllowed?: boolean): false | Validation;
  export function strictValidator(address: string, network: Network, regtestAllowed?: boolean): boolean;
}
