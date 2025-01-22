describe('Main Page', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:5000/api/v1/schedules', {
      statusCode: 200,
      fixture: "schedules"
    }).as('getSchedules')

  cy.visit('http://localhost:3000')
  })

  it('displays title, festival name, schedule header, and background image on page load', () => {
    cy.wait('@getSchedules')
    cy.get('h1').contains('Festify')
    cy.get('h2').contains('Sunset Soundscape 2025')
    cy.get('h3').contains('Sunset Soundscape Schedules')
    cy.get('.header-container').find('img').should('have.class', 'background-image')
    cy.get('.background-image').should('have.attr', 'alt', 'colorful musical notes streaming across black background')
    cy.get('.background-image').should('have.attr', 'src', '/static/media/background.2db0ac52a3c312ebda13.jpg')
  })

  it('displays a search bar on page load', ()  => {
    cy.wait('@getSchedules')
    cy.get('input').should('have.class', 'search-bar')
    cy.get('.search-bar').should('have.attr', 'type', 'text')
    cy.get('.search-bar').should('have.attr', 'placeholder', 'Search schedules by artist name')
    cy.get('.search-bar').type('Foo').should('have.attr', 'value', 'Foo')
  })

  it('displays schedule cards on page load', () => {
    cy.wait('@getSchedules')
    cy.get('.schedules').find('div').should('have.class', 'schedule-card')
    cy.get('.schedules').find('div').should('have.length', 10)
    cy.get('.schedule-card').first().find('img').should('have.attr', 'alt', "abstract music")
    cy.get('.schedule-card').first().find('img').should('have.attr', 'src', "/static/media/schedules.27dae622dc590b7a3b84.jpg")
    cy.get('.schedule-card').first().find('p').should('contain', 'Acoustic Bliss')
    cy.get('.schedule-card').last().find('p').should('contain', 'Global Groove')
    cy.get('.schedule-card').last().find('img').should('have.attr', 'alt', "abstract music")
    cy.get('.schedule-card').last().find('img').should('have.attr', 'src', "/static/media/schedules.27dae622dc590b7a3b84.jpg")
  })

  it('filters schedules when a user searches for an artist', () => {
    cy.wait('@getSchedules')
    cy.get('.search-bar').type('Foo').should('have.attr', 'value', 'Foo')
    cy.get('.schedules').find('div').should('have.length', 2)
    cy.get('.schedule-card').first().find('img').should('have.attr', 'alt', "abstract music")
    cy.get('.schedule-card').first().find('img').should('have.attr', 'src', "/static/media/schedules.27dae622dc590b7a3b84.jpg")
    cy.get('.schedule-card').first().find('p').should('contain', 'Acoustic Bliss')
    cy.get('.schedule-card').last().find('p').should('contain', 'Legendary Rock')
    cy.get('.schedule-card').last().find('img').should('have.attr', 'alt', "abstract music")
    cy.get('.schedule-card').last().find('img').should('have.attr', 'src', "/static/media/schedules.27dae622dc590b7a3b84.jpg")
  })

  describe('sad paths', () => {
    beforeEach(() => {
      cy.intercept('http://localhost:5000/api/v1/schedules', {
        forceNetworkError: true
      }).as('getSchedulesError')

      cy.visit('http://localhost:3000')
    })

    it('displays an error message when the schedules cannot be fetched', ()  => {
      cy.wait('@getSchedulesError')
      cy.get('h1').should('contain', 'Oops! Something went wrong. Please try again later.')
    })
  })
})