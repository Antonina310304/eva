const categories = ['divany-i-kresla', 'rasprodazha-divanov', 'matrasy', 'kovry'];
const regions = ['ufa', 'vladimir'];

describe('The page of category  products', () => {
  categories.forEach((category) => {
    it(`successfully loads category: ${category}`, () => {
      cy.visit(`/category/${category}`);
    });
  });

  regions.forEach((region) => {
    it(`successfully loads category: divany-i-kresla, region: ${region}`, () => {
      cy.visit(`/${region}/category/divany-i-kresla`);
    });
  });
});
