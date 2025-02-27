describe('App', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173');
  })
  it('解析器测试', () => {
    cy.get('[data-testid="my-textarea"]').as('textarea');
    cy.get('[data-testid="result"]').as('result');

    const testText = `This is some test text.
**bold text**`;

    cy.get('@textarea').type(testText);

    cy.get('@result').find('p').eq(0).should('contain.text', 'This is some test text.');
    cy.get('@result').find('strong').should('contain.text','bold text');
  })

  it('加粗按钮测试', () => {
    cy.get('[data-testid="my-textarea"]').as('textarea');
    cy.get('[data-testid="result"]').as('result');
    cy.get('[data-testid="bold"]').as('bold');
    const testText = `This is some test text.`;

    cy.get('@textarea').type(testText).invoke('select');
    cy.get('@bold').click();

    cy.get('@result').find('strong').should('contain.text','This is some test text.');
  })
})