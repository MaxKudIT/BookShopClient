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
            return 'rgba(12, 168, 25, 1)'
    }
}