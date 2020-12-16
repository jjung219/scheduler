describe("Appointment", () => {
  beforeEach(() => {
    //resets the db
    cy.request("GET", "/api/debug/reset");
    // 1. Visits the root of our web server, and confirm that the DOM containers the text "Monday"
    cy.visit("/");
    cy.contains("Monday");
   });

  it("should book an interview", () => {
    // 2. Click the Add button on the first empty appointment block
    cy.get("[alt=Add]").first().click();
    // 3. Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // 4. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // 5. Clicks the save button
    cy.get(".button--confirm").click();
    // 6. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("should edit an interview", () => {
    // 2. Click on the Edit button inside Archie Cohen's
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    // 3. Edits their name
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    // 4. Chooses an interviewer
    cy.get("[alt='Tori Malcolm']").click();
    // 5. Clicks the save button
    cy.contains("Save").click();
    // 6. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it.only("should cancel an interview", () => {
    // 2.Click on the delete button that is hidden
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });
    
    //3. clicks the confirm button
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    //4. Sees that the appointment slot is empty
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");

  })
})