const categories = ['divany-i-kresla', 'rasprodazha-divanov', 'matrasy', 'kovry'];

describe('The page of category  products', () => {
  categories.forEach((category) => {
    it(`successfully loads category: ${category}`, () => {
      cy.visit(`/category/${category}`);
    });
  });
});
