#!/bin/bash
mkdir /root/.ssh
npx playwright test
npx playwright show-report