import { Favorites } from '../models/favorites.model';

export class FavoritesSerializer {
    public fromJson(json: Favorites): Favorites {
        return new Favorites(json.favorites);
    }

    public toJson(favorites: Favorites): object {
        return {
            favorites: favorites.favorites,
        };
    }
}
