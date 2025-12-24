import {createContext,  useContext, useState, type ReactNode} from 'react';
import type { FC } from 'react';
import type { Genres } from '../../shared/types';





export type GenresDropDown = 'Все жанры' | Genres

export const SearchingContext = createContext<{
    searchingValue: string,
    setsearchingValue: (value: string) => void,
    selectedGenre: GenresDropDown,
    setGenre: (type: GenresDropDown) => void,
}
>({
    searchingValue: '',
    setsearchingValue: () => {},
     selectedGenre: 'Все жанры',
     setGenre: () => {}
})


export const MyBooksSearchingContext = createContext<{
    searchingValue: string,
    setsearchingValue: (value: string) => void,
    selectedGenre: GenresDropDown,
    setGenre: (type: GenresDropDown) => void,
}
>({
    searchingValue: '',
    setsearchingValue: () => {},
     selectedGenre: 'Все жанры',
     setGenre: () => {}
});




export const MyBooksSearchingProvider: FC<{children: ReactNode}> = ({children}) => {

    const [searchingValue, setsearchingValue] = useState<string>('')

 

    const [selectedGenre, setGenre] = useState<GenresDropDown>('Все жанры')




    return (
        <MyBooksSearchingContext.Provider value={{searchingValue, setsearchingValue, selectedGenre, setGenre}}>
            {children}
        </MyBooksSearchingContext.Provider>
    );
};




export const SearchingProvider: FC<{children: ReactNode}> = ({children}) => {

    const [searchingValue, setsearchingValue] = useState<string>('')

 

    const [selectedGenre, setGenre] = useState<GenresDropDown>('Все жанры')




    return (
        <SearchingContext.Provider value={{searchingValue, setsearchingValue, selectedGenre, setGenre}}>
            {children}
        </SearchingContext.Provider>
    );
};

export const useSearch = () => useContext(SearchingContext);
export const useMyBooksSearch = () => useContext(MyBooksSearchingContext)