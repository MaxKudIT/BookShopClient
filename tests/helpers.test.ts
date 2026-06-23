import { describe, expect, it } from 'vitest';
import { makeInitialAxiosSolt } from '../src/shared/helpers/apiSolt/makeInitialAxiosSolt';
import { ReturnRateInteger } from '../src/shared/helpers/checkIsInteger';
import { ColorChoiceFunc, ColorChoiceFuncForBookInfo } from '../src/shared/helpers/colorChoice';
import { formatDateToRussian, getHoursWord, getMinutesWord, getPagesWord } from '../src/shared/helpers/format';
import { searchByPartial } from '../src/shared/helpers/searchByPartial';
import { validateEmail, validateLogin, validatePassword } from '../src/shared/helpers/validateForm';
import type { Genres } from '../src/shared/types';

describe('form validators', () => {
  it('requires login', () => {
    expect(validateLogin('   ')).toBe('Логин обязателен');
  });

  it('rejects short login', () => {
    expect(validateLogin('ab')).toBe('Минимум 3 символа');
  });

  it('rejects long login', () => {
    expect(validateLogin('a'.repeat(21))).toBe('Максимум 20 символов');
  });

  it('rejects login with unsupported characters', () => {
    expect(validateLogin('user-name')).toBe('Только латинские буквы, цифры и _');
  });

  it('accepts valid login', () => {
    expect(validateLogin('reader_007')).toBe('');
  });

  it('requires email', () => {
    expect(validateEmail('')).toBe('Email обязателен');
  });

  it('rejects malformed email', () => {
    expect(validateEmail('reader@bookshop')).toBe('Некорректный email');
  });

  it('accepts valid email', () => {
    expect(validateEmail('reader@bookshop.test')).toBe('');
  });

  it('requires password', () => {
    expect(validatePassword('  ')).toBe('Пароль обязателен');
  });

  it('rejects short password', () => {
    expect(validatePassword('a1b2')).toBe('Минимум 6 символов');
  });

  it('requires letters and digits in password', () => {
    expect(validatePassword('abcdef')).toBe('Должны быть буквы и цифры');
  });

  it('accepts valid password', () => {
    expect(validatePassword('secret1')).toBe('');
  });
});

describe('text and number helpers', () => {
  it('searches by partial string case-insensitively', () => {
    expect(searchByPartial('book', 'BookShop')).toBe(true);
  });

  it('formats integer rates with one decimal place', () => {
    expect(ReturnRateInteger(5)).toBe('5.0');
  });

  it('keeps non-integer rates unchanged', () => {
    expect(ReturnRateInteger(4.75)).toBe('4.75');
  });

  it('formats ISO date to Russian date', () => {
    expect(formatDateToRussian('2026-06-22T10:00:00.000Z')).toBe('22 июня 2026');
  });

  it('throws on invalid date', () => {
    expect(() => formatDateToRussian('not-a-date')).toThrow('Invalid date format');
  });
});

describe('Russian pluralization helpers', () => {
  it('uses singular page form', () => {
    expect(getPagesWord(1)).toBe('1 страница');
  });

  it('uses few pages form', () => {
    expect(getPagesWord(22)).toBe('22 страницы');
  });

  it('uses many pages form for teen values', () => {
    expect(getPagesWord(11)).toBe('11 страниц');
  });

  it('uses singular hour form', () => {
    expect(getHoursWord(21)).toBe('21 час');
  });

  it('uses many hours form', () => {
    expect(getHoursWord(15)).toBe('15 часов');
  });

  it('uses few minutes form', () => {
    expect(getMinutesWord(34)).toBe('34 минуты');
  });

});

describe('color and initial state helpers', () => {
  it('maps genres to preview colors', () => {
    const expectedColors: Record<Genres, string> = {
      'Драма': 'rgba(211, 13, 135, 1)',
      'Исторические': 'rgba(160, 95, 10, 1)',
      'Фантастика': 'rgba(48, 62, 189, 1)',
      'Ужасы': 'rgba(182, 11, 11, 1)',
      'Приключения': 'rgba(15, 163, 102, 1)',
    };

    expect(Object.fromEntries(
      Object.keys(expectedColors).map(genre => [genre, ColorChoiceFunc(genre as Genres)])
    )).toEqual(expectedColors);
  });

  it('maps genres to book info colors', () => {
    const expectedColors: Record<Genres, string> = {
      'Драма': 'rgba(233, 66, 169, 1)',
      'Исторические': 'rgba(218, 145, 51, 1)',
      'Фантастика': 'rgba(43, 125, 233, 1)',
      'Ужасы': 'rgba(224, 48, 48, 1)',
      'Приключения': 'rgba(27, 219, 139, 1)',
    };

    expect(Object.fromEntries(
      Object.keys(expectedColors).map(genre => [genre, ColorChoiceFuncForBookInfo(genre as Genres)])
    )).toEqual(expectedColors);
  });

  it('creates clean axios state each time', () => {
    const first = makeInitialAxiosSolt();
    const second = makeInitialAxiosSolt();

    first.error = 'changed';

    expect(first).toEqual({ loading: false, error: 'changed' });
    expect(second).toEqual({ loading: false, error: null });
  });
});
