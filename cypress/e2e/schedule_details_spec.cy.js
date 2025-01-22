describe('Schedule Details Page', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:5000/api/v1/schedules', {
      statusCode: 200,
      fixture: "schedules"
    }).as('getSchedules')

    cy.intercept('http://localhost:5000/api/v1/schedules/74', {
      statusCode: 200,
      fixture: "schedules"
    }).as('getAcousticBliss')

    cy.intercept('http://localhost:5000/api/v1/schedules/74/shows/253', {
      statusCode: 200,
      fixture: "schedules"
    }).as('removeShow')

  cy.visit('http://localhost:3000')
  })

  it('navigates to a schedule details page when a schedule is clicked', () => {
    cy.wait('@getSchedules')
    cy.get('.schedule-card').first().click()
    cy.wait('@getAcousticBliss')
    cy.location('pathname').should('match', /\/74/)
  })

  it('displays show details upon navigation to a schedule details page', () => {
    cy.wait('@getSchedules')
    cy.get('.schedule-card').first().click()
    cy.wait('@getAcousticBliss')
    cy.get('h1').contains('Acoustic Bliss')
    cy.get('h2').contains('Experience the best of ballads with unforgettable performances')
    cy.get('.schedule-details-header-container').find('img').should('have.class', 'schedule-details-background-image')
    cy.get('.schedule-details-header-container').find('img').should('have.attr', 'alt', 'black record on grey background with musical notes')
    cy.get('.schedule-details-header-container').find('img').should('have.attr', 'src', '/static/media/schedulebackground.decce6acec3cf30ca97f.jpg')
    cy.get('.shows-container').find('h3').should('contain', 'Acoustic Bliss Show Details')
    cy.get('.shows').find('div').should('have.class', 'show-card')
    cy.get('.show-card').first().find('img').should('have.attr', 'src', '/static/media/schedules.27dae622dc590b7a3b84.jpg')
    cy.get('.show-card').first().find('img').should('have.attr', 'alt', 'abstract music')
    cy.get('.show-card').last().find('img').should('have.attr', 'src', '/static/media/schedules.27dae622dc590b7a3b84.jpg')
    cy.get('.show-card').last().find('img').should('have.attr', 'alt', 'abstract music')
    cy.get('.show-card').first().find('p').should('contain', 'Artist: Foo Fighters', 'Genre: Country', 'Location: VIP Lounge', 'Start Time:3/14/2025, 3:00:00 PM', 'End Time: 3/14/2025, 5:00:00 PM')
    cy.get('.show-card').last().find('p').should('contain', 'Artist: Cat Stevens', 'Genre: Stage And Screen', 'Location: Amphitheater Stage', 'Start Time: 3/16/2025, 6:30:00 PM', 'End Time: 3/16/2025, 7:00:00 PM)')
    cy.get('.show-card').first().find('button').should('contain', "Remove Show from Schedule")
  })

  it('displays attendee details upon navigation to a schedule details page', () => {
    cy.wait('@getSchedules')
    cy.get('.schedule-card').first().click()
    cy.wait('@getAcousticBliss')
    cy.get('.attendees-container').find('h3').should('contain', 'Acoustic Bliss Attendee Info')
    cy.get('.attendees').find('div').should('have.class', 'attendee-card')
    cy.get('.attendee-card').first().find('img').should('have.attr', 'src', '/static/media/schedules.27dae622dc590b7a3b84.jpg')
    cy.get('.attendee-card').first().find('img').should('have.attr', 'alt', 'abstract music')
    cy.get('.attendee-card').last().find('img').should('have.attr', 'src', '/static/media/schedules.27dae622dc590b7a3b84.jpg')
    cy.get('.attendee-card').last().find('img').should('have.attr', 'alt', 'abstract music')
    cy.get('.attendee-card').first().find('p').should('contain', 'Attendee Name: Felica Breitenberg', 'Attendee Email: waldo_walker@effertz-hagenes.example')
    cy.get('.attendee-card').last().find('p').should('contain', 'Attendee Name: Elden Mayer', 'Attendee Email: michael.ledner@mclaughlin.example')
  })

  it('removes a show from a schedule when button is clicked', () => {
    cy.wait('@getSchedules')
    cy.get('.schedule-card').first().click()
    cy.wait('@getAcousticBliss')
    cy.get('.show-card').first().find('button').click()
    cy.wait('@removeShow')
    cy.get('.show-card').first().find('p').should('contain', 'Artist: Maroon 5', 'Genre: Hip Hop', 'Location: Amphitheater Stage', 'Start Time: 3/16/2025, 1:00:00 PM', 'End Time: 3/16/2025, 2:30:00 PM)')
  })

  it('has a home button', () => {
    cy.wait('@getSchedules')
    cy.get('.schedule-card').first().click()
    cy.wait('@getAcousticBliss')
    cy.get('.home-button').should('have.attr', 'src', '/static/media/homebutton.e40bef209dd936b414a6.png')
    cy.get('.home-button').should('have.attr', 'alt', 'Back to main page')
    cy.get('.home-button').click()
    cy.location('pathname').should('match', /\//)
  })

  describe('sad paths', () => {
    beforeEach(() => {
      cy.intercept('http://localhost:5000/api/v1/schedules', {
        statusCode: 200,
        fixture: "schedules"
      }).as('getSchedules')
  
      cy.intercept('http://localhost:5000/api/v1/schedules/74', {
        forceNetworkError: true
      }).as('getAcousticBlissError')
  
    cy.visit('http://localhost:3000')
    cy.wait('@getSchedules')
    cy.get('.schedule-card').first().click()
    })
  
    it('displays an error message when a schedule/s details cannot be fetched', ()  => {
      cy.wait('@getAcousticBlissError')
      cy.get('h1').should('contain', 'Oops! Something went wrong. Please try again later.')
    })
  })  
})