import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.intefaces";

export class GifMapper{
    static mapGiphyItemtoGif(giphyItem: GiphyItem): Gif{
        return{
            id: giphyItem.id,
            title: giphyItem.title,
            url: giphyItem.images.original.url
        }
    }

    static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
        return items.map(item => this.mapGiphyItemtoGif(item));
    }
}