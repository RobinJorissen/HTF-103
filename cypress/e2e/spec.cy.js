describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://hackthefuture.bignited.be/')
    cy.get('p').click();
    cy.wait(25000)
    cy.get('#male').click();
    cy.get('#popup button.btn-primary').click();
    cy.wait(1000)
    cy.get('input[placeholder="Enter your name"]').type('Robin');
    cy.get('#whoami input[type="text"]').click();
    cy.get('#whoami input.ng-dirty').type('robin');
    cy.get('#whoami input.ng-pristine').click();
    cy.get('#whoami input.ng-untouched').type('33');
    cy.get('#whoami select.form-control').select('Belgium');
    cy.get('#whoami button.center-button').click();
    cy.get('#letters').click();
    cy.get('#popup span.close').click();
    cy.wait(7500)
    cy.get('#crystal').click();
    cy.get('#image-crystal').click();

    cy.get('#randomValuesScreen .randomValue', { timeout: 20000 }).should('have.length.at.least', 5);
    cy.get('#switches [id^="switch-"]', { timeout: 20000 }).should('have.length.at.least', 5);

    for (let i = 0; i < 5; i++) {
      cy.get(`#randomValue-${i}`, { timeout: 10000 })
    .invoke('text')
    .then(t => t.trim())
    .then(bit => {
      const wanted = bit === '1' ? 'up' : 'down';
      const swSel = `#switch-${i}`;

      let attempts = 0;
      const trySet = () => {
        attempts++;
        cy.get(swSel).then($el => {
          const cls = ($el.attr('class') || '');
          if (cls.includes(wanted)) return;
          if (attempts > 4) {
            throw new Error(`Kreeg ${swSel} niet op "${wanted}" (huidige class: "${cls}")`);
          }

          cy.wrap($el).click().then(trySet);
        });
      };

      trySet();
      cy.get(swSel).should('have.class', wanted);
    });
    }
    cy.get('#button').click();
    cy.get('#submarine').click();

    const keyFromSrc = (src) => {
      const s = src.toLowerCase();
      if (s.includes('right')) return '{rightarrow}';
      if (s.includes('left'))  return '{leftarrow}';
      if (s.includes('up'))    return '{uparrow}';
      return '{downarrow}';
    };

    cy.wrap(Array.from({ length: 10 })).each(() => {
      cy.get('#instruction img.arrow, #instructions img.arrow, img[alt*="Instruction Image"]', { timeout: 10000 })
    .should('be.visible')
    .invoke('attr', 'src')
    .then((src) => cy.get('body').type(keyFromSrc(src)))
    .wait(120);
    });

    cy.wait(10000)
    cy.get('#crashed-submarine circle').click();
    cy.get('div.square').dblclick();
    cy.wait(3000)

cy.get('[id^="square-"]', { timeout: 10000 })
  .should('have.length', 4)
  .each(($el) => {
    cy.wrap($el)
      .should('be.visible')
      .click({ force: true })
      .then($afterClick => {
        if ($afterClick.hasClass('active')) {
          cy.wrap($afterClick).click({ force: true });
        }
      });
  });

    const dragToSlot = ($from, $to) => {
  cy.window().then(win => {
    const dataTransfer = new win.DataTransfer();
    dataTransfer.setData('text/plain', $from.attr('data-letter') || '');

    cy.wrap($from)
      .scrollIntoView()
      .should('be.visible')
      .trigger('mousedown', { which: 1, force: true })
      .trigger('dragstart', { dataTransfer, force: true });

    cy.wrap($to)
      .scrollIntoView()
      .should('be.visible')
      .trigger('dragenter', { dataTransfer, force: true })
      .trigger('dragover',  { dataTransfer, force: true })
      .trigger('drop',      { dataTransfer, force: true });

    cy.wrap($from).trigger('dragend', { dataTransfer, force: true });
  });
};

cy.get('#word-target .target-slot').each(($slot, idx) => {
  const letter = $slot.attr('data-letter');

  if ($slot.find('.draggable-cube').length) {
    cy.log(`Slot ${idx} (${letter}) is al gevuld, skip`);
    return;
  }

  cy.get(`#draggable-cubes-container .draggable-cube[data-letter="${letter}"]`)
    .first()
    .should('exist')
    .then($cube => {
      cy.log(`🧩 Plaats "${letter}" in slot ${idx}`);
      dragToSlot($cube, $slot);
    });

  cy.wait(100);
});

cy.wait(5000);
cy.get('#crystal').click();
cy.get('.crystal-outside').click();
cy.wait(2000);
cy.get('.crystal-inside')
  .trigger('mousedown', { which: 1, force: true });
cy.wait(10000);
cy.get('.crystal-inside')
  .trigger('mouseup', { force: true });
cy.wait(5000);
  cy.get('body').type('{enter}');
    cy.get('body').type('{enter}');

  cy.get('.boss').then($boss => {
  const bossRect = $boss[0].getBoundingClientRect();
  const newLeft = bossRect.left - 5;

  cy.window().then(win => {
    const char = win.document.querySelector('#character');
    char.style.left = `${newLeft}px`;
  });
});
  });
});
