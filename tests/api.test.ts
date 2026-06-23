import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AIChatA } from '../src/shared/api/AIChat/AIChatA';
import { BooksA } from '../src/shared/api/Books/BooksA';
import { CartA } from '../src/shared/api/Cart/Cart';
import { FavsA } from '../src/shared/api/Favs/FavsA';
import { RecommendationA } from '../src/shared/api/Recommendation/RecommendationA';
import type { HttpActions } from '../src/shared/api/httpActions';
import type { BookPreviewT } from '../src/shared/types';

type MockHttpActions = Pick<HttpActions, 'getAccessToken' | 'get' | 'post' | 'patch' | 'delete' | 'deleteWithoutParams'>;

const authConfig = { headers: { Authorization: 'Bearer token' } };

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

const response = <T>(data: T) => Promise.resolve({ data });
const apiError = (message: string) => Promise.reject({ response: { data: { error: message } } });

const createHttp = (): MockHttpActions => ({
  getAccessToken: vi.fn().mockResolvedValue(authConfig),
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  deleteWithoutParams: vi.fn(),
});

describe('BooksA', () => {
  let http: MockHttpActions;

  beforeEach(() => {
    http = createHttp();
  });

  it('loads user books from books/my', async () => {
    vi.mocked(http.get).mockReturnValue(response({ Books: [book] }));

    await expect(new BooksA(http).getMyBooks()).resolves.toEqual([book]);
    expect(http.get).toHaveBeenCalledWith('books/my', authConfig);
  });

  it('filters empty search params before request', async () => {
    vi.mocked(http.get).mockReturnValue(response({ Books: [book] }));

    await new BooksA(http).searchBooks({ query: 'code', genre: '', minPrice: undefined, limit: 5 });

    expect(http.get).toHaveBeenCalledWith('books/search', {
      ...authConfig,
      params: { query: 'code', limit: 5 },
    });
  });

  it('returns backend error message when search request fails', async () => {
    vi.mocked(http.get).mockReturnValue(apiError('search failed'));

    await expect(new BooksA(http).searchBooks({ query: 'code' })).resolves.toBe('search failed');
  });
});

describe('CartA', () => {
  let http: MockHttpActions;

  beforeEach(() => {
    http = createHttp();
  });

  it('creates cart item with physicalBookId payload', async () => {
    vi.mocked(http.post).mockReturnValue(response({ id: 'cart-1' }));

    await expect(new CartA(http).createCartItem('physical-1')).resolves.toEqual({ resultId: 'cart-1' });
    expect(http.post).toHaveBeenCalledWith('ci', { physicalBookId: 'physical-1' }, authConfig);
  });

  it('checks whether physical book is in cart', async () => {
    vi.mocked(http.post).mockReturnValue(response({ isInCart: true }));

    await expect(new CartA(http).isInCartItem('physical-1')).resolves.toEqual({ isInCart: true });
    expect(http.post).toHaveBeenCalledWith('ci/incart', { physicalBookId: 'physical-1' }, authConfig);
  });

  it('deletes selected cart items by ids', async () => {
    vi.mocked(http.delete).mockReturnValue(Promise.resolve({ data: undefined }));

    await expect(new CartA(http).deleteCartItem(['physical-1', 'physical-2'])).resolves.toBeUndefined();
    expect(http.delete).toHaveBeenCalledWith('ci', ['physical-1', 'physical-2'], authConfig);
  });

  it('returns backend error message when cart count fails', async () => {
    vi.mocked(http.get).mockReturnValue(apiError('cart unavailable'));

    await expect(new CartA(http).countCart()).resolves.toBe('cart unavailable');
  });
});

describe('FavsA', () => {
  let http: MockHttpActions;

  beforeEach(() => {
    http = createHttp();
  });

  it('loads favorite items from fi/all', async () => {
    vi.mocked(http.get).mockReturnValue(response({ favItems: [{ ...book, Id: 'fav-1' }] }));

    await expect(new FavsA(http).getFavItems()).resolves.toEqual([{ ...book, Id: 'fav-1' }]);
    expect(http.get).toHaveBeenCalledWith('fi/all', authConfig);
  });

  it('creates favorite item with BookId payload', async () => {
    vi.mocked(http.post).mockReturnValue(response({ id: 'fav-1' }));

    await expect(new FavsA(http).createFavItem('book-1')).resolves.toEqual({ resultId: 'fav-1' });
    expect(http.post).toHaveBeenCalledWith('fi', { BookId: 'book-1' }, authConfig);
  });

  it('deletes favorite items by book ids', async () => {
    vi.mocked(http.delete).mockReturnValue(Promise.resolve({ data: undefined }));

    await new FavsA(http).deleteFavItem(['book-1']);

    expect(http.delete).toHaveBeenCalledWith('fi', ['book-1'], authConfig);
  });

  it('returns backend error message when favorite check fails', async () => {
    vi.mocked(http.post).mockReturnValue(apiError('favorite check failed'));

    await expect(new FavsA(http).isInFavsItem('book-1')).resolves.toBe('favorite check failed');
  });
});

describe('AIChatA', () => {
  let http: MockHttpActions;

  beforeEach(() => {
    http = createHttp();
  });

  it('creates chat and maps id to resultId', async () => {
    vi.mocked(http.post).mockReturnValue(response({ id: 'chat-1' }));

    await expect(new AIChatA(http).createChat({ title: 'BookShop AI' })).resolves.toEqual({ resultId: 'chat-1' });
    expect(http.post).toHaveBeenCalledWith('ai-chats', { title: 'BookShop AI' }, authConfig);
  });

  it('loads messages for selected chat', async () => {
    vi.mocked(http.get).mockReturnValue(response({ messages: [] }));

    await expect(new AIChatA(http).getMessages('chat-1')).resolves.toEqual([]);
    expect(http.get).toHaveBeenCalledWith('ai-chats/chat-1/messages', authConfig);
  });

  it('returns backend error message when ask fails', async () => {
    vi.mocked(http.post).mockReturnValue(apiError('ai failed'));

    await expect(new AIChatA(http).ask('chat-1', 'What should I read?')).resolves.toBe('ai failed');
  });
});

describe('RecommendationA', () => {
  it('adds limit param to recommendations request', async () => {
    const http = createHttp();
    vi.mocked(http.get).mockReturnValue(response({ books: [book] }));

    await expect(new RecommendationA(http).getHomeRecommendations(6)).resolves.toEqual([book]);
    expect(http.get).toHaveBeenCalledWith('recommendations/home', {
      ...authConfig,
      params: { limit: 6 },
    });
  });
});
