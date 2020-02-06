import {createContext} from 'react';

const CompanyContext = createContext({})

export const CompanyProvider = CompanyContext.Provider;
export const CompanyConsumer = CompanyContext.Consumer;

export default CompanyContext;