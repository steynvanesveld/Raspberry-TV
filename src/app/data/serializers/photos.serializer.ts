import { Photos } from 'src/app/data/models/photos.model';

export class PhotosSerializer {
    public fromJson(json: Photos): Photos {
        return new Photos(
            json.total_results,
            json.page,
            json.per_page,
            json.photos,
            json.next_page,
        );
    }

    public toJson(photos: Photos): object {
        return {
            total_results: photos.total_results,
            page: photos.page,
            per_page: photos.per_page,
            photos: photos.photos,
            next_page: photos.next_page,
        };
    }
}
