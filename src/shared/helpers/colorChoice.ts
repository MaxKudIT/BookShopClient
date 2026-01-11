import type { Genres } from "../types";


export const ColorChoiceFunc = (genre: Genres): string => {
    switch(genre) {
        case 'Драма': 
            return 'rgba(211, 13, 135, 1)'
        case 'Исторические': 
            return 'rgba(160, 95, 10, 1)'
        case 'Фантастика': 
            return 'rgba(48, 62, 189, 1)'
        case 'Ужасы': 
            return 'rgba(182, 11, 11, 1)'
        case 'Приключения': 
            return 'rgba(15, 163, 102, 1)'
    }
}


export const ColorChoiceFuncForBookInfo = (genre: Genres): string => {
    switch(genre) {
        case 'Драма': 
            return 'rgba(233, 66, 169, 1)'
        case 'Исторические': 
            return 'rgba(218, 145, 51, 1)'
        case 'Фантастика': 
            return 'rgba(43, 125, 233, 1)'
        case 'Ужасы': 
            return 'rgba(224, 48, 48, 1)'
        case 'Приключения': 
            return 'rgba(27, 219, 139, 1)'
    }
}