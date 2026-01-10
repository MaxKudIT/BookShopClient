import { createContext, useContext } from "react";
import { stores, type Stores } from "../stores";

export const StoreContext = createContext<Stores>(stores)


export const useStores = (): Stores => useContext(StoreContext)