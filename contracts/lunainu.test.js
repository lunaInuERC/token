// LUNAINU.test.js

const LUNAINU = artifacts.require('LUNAINU');

contract('LUNAINU', (accounts) => {
  let lunaInu;

  before(async () => {
    lunaInu = await LUNAINU.deployed();
  });

  it('should have correct initial values', async () => {
    const name = await lunaInu.name();
    const symbol = await lunaInu.symbol();
    const totalSupply = await lunaInu.totalSupply();

    assert.equal(name, 'LUNA INU', 'Incorrect token name');
    assert.equal(symbol, '$LUNAINU', 'Incorrect token symbol');
    assert.equal(totalSupply, web3.utils.toWei('10000000000', 'ether'), 'Incorrect total supply');
  });

  it('should apply initial tax correctly', async () => {
    const taxRateBuy = await lunaInu.getTaxRateBuy();
    const taxRateSell = await lunaInu.getTaxRateSell();

    assert.equal(taxRateBuy.toNumber(), 25, 'Incorrect initial tax rate on buy');
    assert.equal(taxRateSell.toNumber(), 25, 'Incorrect initial tax rate on sell');
  });

  it('should apply final tax correctly', async () => {
    await lunaInu.setTaxRateBuy(1);
    await lunaInu.setTaxRateSell(1);

    const taxRateBuy = await lunaInu.getTaxRateBuy();
    const taxRateSell = await lunaInu.getTaxRateSell();

    assert.equal(taxRateBuy.toNumber(), 1, 'Incorrect final tax rate on buy');
    assert.equal(taxRateSell.toNumber(), 1, 'Incorrect final tax rate on sell');
  });

  it('should set and apply maximum wallet and tax swap limits correctly', async () => {
    const maxWalletLimit = await lunaInu.getMaxWalletLimit();
    const maxTaxSwapLimit = await lunaInu.getMaxTaxSwapLimit();
    const taxSwapThreshold = await lunaInu.getTaxSwapThreshold();

    assert.equal(maxWalletLimit.toNumber(), 2, 'Incorrect maximum wallet limit');
    assert.equal(maxTaxSwapLimit.toNumber(), 1, 'Incorrect maximum tax swap limit');
    assert.equal(taxSwapThreshold.toNumber(), 1000, 'Incorrect tax swap threshold');
  });

  it('should calculate LP tokens correctly', async () => {
    const ethAmount = web3.utils.toWei('1', 'ether');
    const tokenAmount = await lunaInu.calculateLPAmount(ethAmount);

    assert.equal(tokenAmount.toString(), '990000000000000000000', 'Incorrect LP token amount');
  });
});
