describe('The page of product', () => {
  const regions = ['tula', 'kazan'];

  regions.forEach((region) => {
    it(`successfully loads product: divan-dins-velvet-yellow, region: ${region}`, () => {
      cy.visit(`/${region}/product/divan-dins-velvet-yellow`);
    });
  });
});
