const regions = ['tula', 'kazan'];

describe('The page of product', () => {
  regions.forEach((region) => {
    it(`successfully loads product: divan-dins-velvet-yellow, region: ${region}`, () => {
      cy.visit(`/${region}/product/divan-dins-velvet-yellow`);
    });
  });
});
