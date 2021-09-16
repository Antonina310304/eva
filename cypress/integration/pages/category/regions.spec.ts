describe('The page of category  products', () => {
  const regions = ['ufa', 'vladimir'];

  regions.forEach((region) => {
    it(`successfully loads category: divany-i-kresla, region: ${region}`, () => {
      cy.visit(`/${region}/category/divany-i-kresla`);
    });
  });
});
