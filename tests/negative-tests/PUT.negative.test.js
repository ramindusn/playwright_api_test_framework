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

test('when the request used an incorrect method - PUT', async ({ request },testInfo) => {
    //Return the response
    const response = await request.put('/cad.api',{});
    //Assert
    expect(response.status()).toBe(405);
    logger.info(await response.json());
});