/* eslint-disable cypress/no-unnecessary-waiting */
function checkForElement() {
  cy.get("body").then(($body) => {
    if ($body.find('[data-test="order-number"]').length) {
      cy.get('[data-test="order-number"]').should("exist");
    } else {
      cy.wait(5000);
      checkForElement();
    }
  });
}

describe("Тестирование функицональности BurgerConstructor", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    // Ввести логин и пароль
    cy.get('input[type="email"]').type("maksim@gmail.com");
    cy.get('input[type="password"]').type("maksim123");

    // Нажать на кнопку входа
    cy.get('button[type="submit"]').click();

    // Дождаться перехода на главную страницу конструктора после успешной авторизации
    cy.url().should("include", "/");
  });

  it("allows dragging ingredients and placing an order", () => {
    // Перетаскивание булки в конструктор
    cy.get('[data-test="ingredient-bun"]').first().trigger("dragstart");
    cy.get('[data-test="drop-area"]').trigger("drop");

    // Перетаскивание начинки в конструктор
    cy.get('[data-test="ingredient-sauce"]').first().trigger("dragstart");
    cy.get('[data-test="drop-area"]').trigger("drop");

    // Проверка добавления элементов в конструктор
    cy.get('[data-test="constructor"]').should(
      "contain",
      "Краторная булка N-200i (верх)"
    );
    cy.get('[data-test="constructor"]').should("contain", "Соус Spicy-X");

    // Оформление заказа
    cy.get('[data-test="order-button"]').click();

    // Проверка отображения модального окна
    cy.get('[data-test="modal"]').should("be.visible");

    // Проверка появление номера заказа (появляется не сразу)
    // cy.get('[data-test="order-number"]', { timeout: 30000 }).should("exist");
    checkForElement();

    // Закрытие модального окна
    cy.get('[data-test="modal-close"]').click();
    cy.get('[data-test="modal"]').should("not.exist");
  });
});
