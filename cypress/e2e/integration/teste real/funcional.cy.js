/// <reference types='cypress'/>
import loc from '../../../support/locators';
import '../../../support/commandsContas';

describe('Should test at a funcional level', () => {
  beforeEach(() => {
    cy.login('testewp@a', 'a');
    cy.resetApp()
    cy.get(loc.MENU.HOME).click()
  });

  it('should create account', () => {
    cy.acessaMenuConta();
    cy.InserirConta('Conta inserida');
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso');
  });
  it('should update an account', () => {
    cy.acessaMenuConta();
    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click();
    cy.get(loc.CONTAS.NOME).clear().type('Conta alterada');
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso');
  });

  it('should not creat an account with same name', () => {
    cy.acessaMenuConta()
   cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
   cy.get(loc.CONTAS.BTN_SALVAR).click();
   cy.get(loc.CONTAS.BTN_SALVAR).click();
   cy.get(loc.MESSAGE).should('contain', 'code 400');
   
  });
  it('Should create a transaction', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click();
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
    cy.get(loc.MOVIMENTACAO.VALOR).type('123')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
    cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')
    cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
    cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
})

// por algum motivo esse teste esta bugando as vezes
  it('should  get balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
    cy.wait(1000)
    cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

  });
  it('should remove a transaction', () => {
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')
  });
});