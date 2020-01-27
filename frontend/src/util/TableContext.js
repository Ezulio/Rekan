import {createContext} from 'react';

const TableContext = createContext({});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default TableContext;
