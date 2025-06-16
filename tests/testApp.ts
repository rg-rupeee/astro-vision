// tests/testApp.ts

import 'reflect-metadata';
import App from '../src/app';
import Container from 'typedi';

const appInstance = Container.get(App);

export default appInstance.app;
