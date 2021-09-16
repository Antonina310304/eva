const products = [
  'divan-dins-velvet-yellow',
  'matras-minli-140x200',
  'raspashnoj-shkaf-pronto-2-90-210-belyj',
];

describe('The page of product', () => {
  products.forEach((product) => {
    it(`successfully loads product: ${product}`, () => {
      cy.visit(`/product/${product}`);
    });
  });
});
