
export const formatDateToRussian = (isoDate: string | Date): string => {
   
    const date = typeof isoDate === 'string' ? new Date(isoDate) : isoDate;
    
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }
    
    const day = date.getDate();
    const month = date.getMonth(); 
    const year = date.getFullYear();
    

    const monthsRu = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    return `${day} ${monthsRu[month]} ${year}`;
};


export const getPagesWord = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    let word = 'страниц';
    
    if (lastDigit === 1 && lastTwoDigits !== 11) {
        word = 'страница';
    } else if (lastDigit >= 2 && lastDigit <= 4 && 
               (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
        word = 'страницы';
    }
    
    return `${count} ${word}`;
};

export const getHoursWord = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    let word = 'часов';
    
    if (lastDigit === 1 && lastTwoDigits !== 11) {
        word = 'час';
    } else if (lastDigit >= 2 && lastDigit <= 4 && 
               (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
        word = 'часа';
    }
    
    return `${count} ${word}`;
};


