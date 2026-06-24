import { flow, makeAutoObservable } from 'mobx';
import type { Api } from '../../../shared/api/api';
import { makeInitialAxiosSolt } from '../../../shared/helpers/apiSolt/makeInitialAxiosSolt';
import type { ReadingBookPreview, ReadingSession, ReadingState } from '../../../shared/types';

const emptyUuid = '00000000-0000-0000-0000-000000000000';

class ReadingStore {
    public readingState: ReadingState | null = null;
    public lastReadingBooks: ReadingBookPreview[] = [];
    public startReadingState = makeInitialAxiosSolt();
    public updateProgressState = makeInitialAxiosSolt();
    public finishReadingState = makeInitialAxiosSolt();
    public closeReadingSessionState = makeInitialAxiosSolt();
    public getLastReadingBooksState = makeInitialAxiosSolt();

    private api: Api;

    private getBookProgress(book: ReadingBookPreview): number {
        const rawBook = book as ReadingBookPreview & {
            progressPercent?: number;
            progress_percent?: number;
        };

        return rawBook.ProgressPercent ?? rawBook.progressPercent ?? rawBook.progress_percent ?? 10;
    }

    private normalizeLastReadingBooks(books: ReadingBookPreview[]): ReadingBookPreview[] {
        return books.map((book) => ({
            ...book,
            ProgressPercent: this.getBookProgress(book),
        }));
    }

    private getReadingProgress(reading: ReadingState): number {
        const rawReading = reading as ReadingState & {
            progressPercent?: number;
            progress_percent?: number;
        };

        return rawReading.ProgressPercent ?? rawReading.progressPercent ?? rawReading.progress_percent ?? 10;
    }

    private calculateProgress(currentPage: number, pagesCount: number): number {
        if (!pagesCount || pagesCount <= 0) {
            return 10;
        }

        const clampedPage = Math.min(Math.max(currentPage, 1), pagesCount);
        return Math.min(100, Math.max(10, Math.floor((clampedPage * 100) / pagesCount)));
    }

    private syncLastReadingBookProgress(bookId: string, progressPercent: number) {
        this.lastReadingBooks = this.lastReadingBooks.map((book) => (
            book.Id === bookId
                ? { ...book, ProgressPercent: progressPercent }
                : book
        ));
    }

    public setLocalReadingProgress(bookId: string, currentPage: number, pagesCount: number) {
        const progressPercent = this.calculateProgress(currentPage, pagesCount);
        const clampedPage = pagesCount > 0 ? Math.min(Math.max(currentPage, 1), pagesCount) : currentPage;

        this.readingState = {
            SessionId: this.readingState?.SessionId || '',
            BookId: bookId,
            Status: progressPercent >= 100 ? 'finished' : 'reading',
            CurrentPage: clampedPage,
            ProgressPercent: progressPercent,
        };
        this.syncLastReadingBookProgress(bookId, progressPercent);
    }

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.startReading = this.startReading.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.finishReading = this.finishReading.bind(this);
        this.closeReadingSession = this.closeReadingSession.bind(this);
        this.getLastReadingBooks = this.getLastReadingBooks.bind(this);
        this.setLocalReadingProgress = this.setLocalReadingProgress.bind(this);
    }

    public startReading = flow(function* (this: ReadingStore, bookId: string)
        : Generator<Promise<ReadingState | string>, ReadingState | null, ReadingState | string> {
        this.startReadingState = { loading: true, error: null };

        try {
            const result = yield this.api.reading.startReading(bookId);

            if (typeof result === 'string') {
                this.startReadingState = { loading: false, error: result };
                return null;
            }

            const progressPercent = this.getReadingProgress(result);
            this.readingState = { ...result, ProgressPercent: progressPercent };
            this.syncLastReadingBookProgress(bookId, progressPercent);
            this.startReadingState = { loading: false, error: null };
            return result;
        } catch (err: any) {
            this.startReadingState = { loading: false, error: err?.message || 'Failed to start reading' };
            return null;
        }
    });

    public updateProgress = flow(function* (this: ReadingStore, bookId: string, currentPage: number)
        : Generator<Promise<ReadingState | string>, ReadingState | null, ReadingState | string> {
        this.updateProgressState = { loading: true, error: null };

        try {
            const result = yield this.api.reading.updateProgress(bookId, currentPage);

            if (typeof result === 'string') {
                this.updateProgressState = { loading: false, error: result };
                return null;
            }

            const sessionId = result.SessionId && result.SessionId !== emptyUuid
                ? result.SessionId
                : this.readingState?.SessionId || '';

            const progressPercent = this.getReadingProgress(result);
            this.readingState = { ...result, SessionId: sessionId, ProgressPercent: progressPercent };
            this.syncLastReadingBookProgress(bookId, progressPercent);
            this.updateProgressState = { loading: false, error: null };
            return this.readingState;
        } catch (err: any) {
            this.updateProgressState = { loading: false, error: err?.message || 'Failed to update reading progress' };
            return null;
        }
    });

    public finishReading = flow(function* (this: ReadingStore, sessionId: string, currentPage: number)
        : Generator<Promise<ReadingState | string>, ReadingState | null, ReadingState | string> {
        this.finishReadingState = { loading: true, error: null };

        try {
            const result = yield this.api.reading.finishReading(sessionId, currentPage);

            if (typeof result === 'string') {
                this.finishReadingState = { loading: false, error: result };
                return null;
            }

            const progressPercent = this.getReadingProgress(result);
            this.readingState = { ...result, ProgressPercent: progressPercent };
            this.syncLastReadingBookProgress(result.BookId, progressPercent);
            this.finishReadingState = { loading: false, error: null };
            return result;
        } catch (err: any) {
            this.finishReadingState = { loading: false, error: err?.message || 'Failed to finish reading' };
            return null;
        }
    });

    public closeReadingSession = flow(function* (this: ReadingStore, sessionId: string)
        : Generator<Promise<ReadingSession | string>, boolean, ReadingSession | string> {
        this.closeReadingSessionState = { loading: true, error: null };

        try {
            const result = yield this.api.readingSessions.closeReadingSession(sessionId);

            if (typeof result === 'string') {
                this.closeReadingSessionState = { loading: false, error: result };
                return false;
            }

            if (this.readingState?.SessionId === sessionId) {
                this.readingState = {
                    ...this.readingState,
                    SessionId: '',
                };
            }

            this.closeReadingSessionState = { loading: false, error: null };
            return true;
        } catch (err: any) {
            this.closeReadingSessionState = { loading: false, error: err?.message || 'Failed to close reading session' };
            return false;
        }
    });

    public getLastReadingBooks = flow(function* (this: ReadingStore, limit = 4)
        : Generator<Promise<ReadingBookPreview[] | string>, void, ReadingBookPreview[] | string> {
        this.getLastReadingBooksState = { loading: true, error: null };

        try {
            const result = yield this.api.readingSessions.getLastReadingBooks(limit);

            if (typeof result === 'string') {
                this.getLastReadingBooksState = { loading: false, error: result || 'Failed to get last reading books' };
                return;
            }

            this.lastReadingBooks = this.normalizeLastReadingBooks(result);
            this.getLastReadingBooksState = { loading: false, error: null };
        } catch (err: any) {
            this.getLastReadingBooksState = { loading: false, error: err?.message || 'Failed to get last reading books' };
        }
    });
}

export { ReadingStore };
