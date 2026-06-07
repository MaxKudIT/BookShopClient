import type { Api } from "../../../shared/api/api";
import { makeInitialAxiosSolt } from "../../../shared/helpers/apiSolt/makeInitialAxiosSolt";
import type { ErrorResponse, PageInfoT } from "../../../shared/types";
import { makeAutoObservable, flow } from 'mobx';
class BookPageStore {
    public page: PageInfoT | null = null;
    public getPageState = makeInitialAxiosSolt();

    public pagesCount: number = 0
    public getPagesCountState = makeInitialAxiosSolt();
    


    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getPageById = this.getPageById.bind(this)
        this.getPagesCount = this.getPagesCount.bind(this)
        
    }

    public getPageById = flow(function* (this: BookPageStore, bookId: string, pageNumber: string)
        : Generator<Promise<PageInfoT | ErrorResponse>, void, PageInfoT | ErrorResponse> {
        this.getPageState = { loading: true, error: null }
        try {
            const res = yield this.api.pages.getPageById(bookId, pageNumber);
            if (typeof res === 'string') {
                this.getPageState = { loading: false, error: res }
            } else {
                
                this.page = res
                
                this.getPageState = { loading: false, error: null }
            }
           

        }
        catch (err: any) {
            this.getPageState = {loading: false, error: err}
            console.error(err)
        }
    })

     public getPagesCount = flow(function* (this: BookPageStore, bookId: string)
        : Generator<Promise<number | ErrorResponse>, void, number | ErrorResponse> {
        this.getPagesCountState = { loading: true, error: null }
        try {
            const res = yield this.api.pages.getPagesCount(bookId)
            if (typeof res === 'string') {
                this.getPagesCountState = { loading: false, error: res }
            } else {
                
                this.pagesCount = res;
                
                this.getPagesCountState = { loading: false, error: null }
            }
           

        }
        catch (err: any) {
            this.getPagesCountState = {loading: false, error: err}
            console.error(err)
        }
    })


}

export {BookPageStore}
