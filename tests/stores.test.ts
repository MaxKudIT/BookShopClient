import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CartItemStore } from '../src/features/Cart/mobx/CartStore';
import { FavItemStore } from '../src/features/Favs/mobx/FavsStore';
import { MyBooksStore } from '../src/features/MyBooks/mobx/BooksStore';
import { BookRevsStore } from '../src/features/BookRevs/mobx/BookRevsStore';
import { ReadingStore } from '../src/features/Reading/mobx/ReadingStore';
import { StatsStore } from '../src/features/Stats/mobx/StatsStore';
import type { Api } from '../src/shared/api/api';
import type { BookPreviewT, CartItemsPreview, FavItemsPreview, ReadingBookPreview, ReadingState, UserStats } from '../src/shared/types';

const book: BookPreviewT = {
  Id: 'book-1',
  Title: 'Clean Code',
  Genre: 'Драма',
  Price: 500,
  Author: 'Robert Martin',
  ImageUrl: '/clean-code.jpg',
  Discount: 10,
  Rate: 4.5,
};

const cartItem: CartItemsPreview = {
  Id: 'cart-1',
  BookId: 'book-1',
  ImageUrl: '/clean-code.jpg',
  Title: 'Clean Code',
  Author: 'Robert Martin',
  Price: 500,
  Discount: 10,
  Rate: 4.5,
};

const favItem: FavItemsPreview = {
  Id: 'fav-1',
  ImageUrl: '/clean-code.jpg',
  Title: 'Clean Code',
  Author: 'Robert Martin',
  Price: 500,
  Discount: 10,
  Rate: 4.5,
};

const readingState: ReadingState = {
  SessionId: 'session-1',
  BookId: 'book-1',
  Status: 'reading',
  CurrentPage: 12,
  ProgressPercent: 25,
};

const lastReadingBook: ReadingBookPreview = {
  ...book,
  CreatedDate: '2026-06-22T00:00:00.000Z',
  PagesCount: 320,
  LastStartedAt: '2026-06-22T10:00:00.000Z',
};

const stats: UserStats = {
  TotalMinutes: 120,
  ReadBooks: 3,
  AverageRating: 4.5,
  PurchasedBooks: 7,
};

const createApi = (overrides: Partial<Api>): Api => overrides as Api;

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  vi.spyOn(console, 'log').mockImplementation(() => undefined);
});

describe('CartItemStore', () => {
  it('stores loaded cart items and clears loading state', async () => {
    const store = new CartItemStore(createApi({ carts: { getCartItems: vi.fn().mockResolvedValue([cartItem]) } } as Partial<Api>));

    await store.getCartItems();

    expect(store.cartItemsPreview).toEqual([cartItem]);
    expect(store.getCartItemsState).toEqual({ loading: false, error: null });
  });

  it('keeps cart items unchanged when loading returns error string', async () => {
    const store = new CartItemStore(createApi({ carts: { getCartItems: vi.fn().mockResolvedValue('cart error') } } as Partial<Api>));

    await store.getCartItems();

    expect(store.cartItemsPreview).toBeNull();
    expect(store.getCartItemsState).toEqual({ loading: false, error: 'cart error' });
  });

  it('updates cart count from api response', async () => {
    const store = new CartItemStore(createApi({ carts: { countCart: vi.fn().mockResolvedValue({ count: 3 }) } } as Partial<Api>));

    await store.getCountCart();

    expect(store.count).toBe(3);
    expect(store.countCartState).toEqual({ loading: false, error: null });
  });

  it('stores thrown create error message', async () => {
    const store = new CartItemStore(createApi({ carts: { createCartItem: vi.fn().mockRejectedValue(new Error('network down')) } } as Partial<Api>));

    await store.createCartItem('physical-1');

    expect(store.postCartItemsState).toEqual({ loading: false, error: 'network down' });
  });
});

describe('FavItemStore', () => {
  it('stores loaded favorite items', async () => {
    const store = new FavItemStore(createApi({ favs: { getFavItems: vi.fn().mockResolvedValue([favItem]) } } as Partial<Api>));

    await store.getFavItems();

    expect(store.favItemsPreview).toEqual([favItem]);
    expect(store.getFavItemsState).toEqual({ loading: false, error: null });
  });

  it('updates favorite inclusion flag', async () => {
    const store = new FavItemStore(createApi({ favs: { isInFavsItem: vi.fn().mockResolvedValue({ isInFavs: true }) } } as Partial<Api>));

    await store.isInFavsItem('book-1');

    expect(store.isInFavsItems).toBe(true);
    expect(store.postFavItemsState2).toEqual({ loading: false, error: null });
  });

  it('stores favorite count error string', async () => {
    const store = new FavItemStore(createApi({ favs: { countFavs: vi.fn().mockResolvedValue('fav error') } } as Partial<Api>));

    await store.getCountFav();

    expect(store.count).toBe(0);
    expect(store.countFavState).toEqual({ loading: false, error: 'fav error' });
  });
});

describe('MyBooksStore', () => {
  it('stores user books', async () => {
    const store = new MyBooksStore(createApi({ myBooks: { getMyBooks: vi.fn().mockResolvedValue([book]) } } as Partial<Api>));

    await store.getMyBooks();

    expect(store.books).toEqual([book]);
    expect(store.getMyBooksState).toEqual({ loading: false, error: null });
  });

  it('stores not-my-books error string', async () => {
    const store = new MyBooksStore(createApi({ myBooks: { getNotMyBooks: vi.fn().mockResolvedValue('books error') } } as Partial<Api>));

    await store.getNotMyBooks();

    expect(store.notmybooks).toEqual([]);
    expect(store.getNotMyBooksState).toEqual({ loading: false, error: 'books error' });
  });

  it('clears books and request states', () => {
    const store = new MyBooksStore(createApi({} as Partial<Api>));

    store.books = [book];
    store.notmybooks = [book];
    store.getMyBooksState = { loading: true, error: 'old' };

    store.clear();

    expect(store.books).toEqual([]);
    expect(store.notmybooks).toEqual([]);
    expect(store.getMyBooksState).toEqual({ loading: false, error: null });
    expect(store.getNotMyBooksState).toEqual({ loading: false, error: null });
  });
});

describe('ReadingStore', () => {
  it('starts reading and stores reading state', async () => {
    const store = new ReadingStore(createApi({ reading: { startReading: vi.fn().mockResolvedValue(readingState) } } as Partial<Api>));

    await expect(store.startReading('book-1')).resolves.toEqual(readingState);
    expect(store.readingState).toEqual(readingState);
    expect(store.startReadingState).toEqual({ loading: false, error: null });
  });

  it('preserves previous session id when progress response contains empty uuid', async () => {
    const store = new ReadingStore(createApi({
      reading: {
        updateProgress: vi.fn().mockResolvedValue({
          ...readingState,
          SessionId: '00000000-0000-0000-0000-000000000000',
          CurrentPage: 40,
        }),
      },
    } as Partial<Api>));
    store.readingState = readingState;

    await store.updateProgress('book-1', 40);

    expect(store.readingState?.SessionId).toBe('session-1');
    expect(store.readingState?.CurrentPage).toBe(40);
  });

  it('clears active session id when closing current reading session', async () => {
    const store = new ReadingStore(createApi({
      readingSessions: {
        closeReadingSession: vi.fn().mockResolvedValue({
          Id: 'session-1',
          UserId: 'user-1',
          BookId: 'book-1',
          StartedAt: '',
          EndedAt: '',
          Minutes: 10,
        }),
      },
    } as Partial<Api>));
    store.readingState = readingState;

    await expect(store.closeReadingSession('session-1')).resolves.toBe(true);
    expect(store.readingState?.SessionId).toBe('');
    expect(store.closeReadingSessionState).toEqual({ loading: false, error: null });
  });

  it('stores last reading books error string', async () => {
    const store = new ReadingStore(createApi({ readingSessions: { getLastReadingBooks: vi.fn().mockResolvedValue('history error') } } as Partial<Api>));

    await store.getLastReadingBooks();

    expect(store.lastReadingBooks).toEqual([]);
    expect(store.getLastReadingBooksState).toEqual({ loading: false, error: 'history error' });
  });

  it('stores last reading books on success', async () => {
    const store = new ReadingStore(createApi({ readingSessions: { getLastReadingBooks: vi.fn().mockResolvedValue([lastReadingBook]) } } as Partial<Api>));

    await store.getLastReadingBooks(1);

    expect(store.lastReadingBooks).toEqual([lastReadingBook]);
    expect(store.getLastReadingBooksState).toEqual({ loading: false, error: null });
  });
});

describe('StatsStore and BookRevsStore', () => {
  it('stores user stats', async () => {
    const store = new StatsStore(createApi({ stats: { getUserStats: vi.fn().mockResolvedValue(stats) } } as Partial<Api>));

    await store.getUserStats();

    expect(store.userStats).toEqual(stats);
    expect(store.getUserStatsState).toEqual({ loading: false, error: null });
  });

  it('returns true when book review is created', async () => {
    const store = new BookRevsStore(createApi({ bookRevs: { createBookReview: vi.fn().mockResolvedValue({ resultId: 'review-1' }) } } as Partial<Api>));

    await expect(store.createBookReview('book-1', 5)).resolves.toBe(true);
    expect(store.createBookReviewState).toEqual({ loading: false, error: null });
  });
});
