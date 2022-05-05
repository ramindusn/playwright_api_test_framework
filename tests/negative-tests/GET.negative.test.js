// @ts-check
const { test, expect } = require('@playwright/test');
const logger = require('../../logger/logger');

test.beforeEach(async ({}, testInfo) => {
    logger.info(`Worker ${testInfo.workerIndex} - Running ${testInfo.title}`);
});

test.afterEach(async ({ page }, testInfo) => {
    logger.info(`Worker ${testInfo.workerIndex} - Finished ${testInfo.title} with status ${testInfo.status}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
        logger.info(`Worker ${testInfo.workerIndex} - Did not run as expected, ended up at ${page.url()}`);

    if(testInfo.config.workers==1)    
        logger.info("-------------------------------------------------------"); 
});

test('when send a bad request - GET', async ({ request }) => {
    const des = 433;
    // @ts-ignore
    const dateMin = new Date(1900, 01 ,01).toISOString().slice(0, 10);
    // @ts-ignore
    const dateMax = new Date(2100, 01 ,01).toISOString().slice(0, 10);
    const distMax = 'W';
    
    //Return the response
    const response = await request.get(`/cad.api?des=${des}&date-min=${dateMin}&date-max=${dateMax}&dist-max=${distMax}`,{});
    
    //Assert
    expect(response.status()).toBe(400);
});