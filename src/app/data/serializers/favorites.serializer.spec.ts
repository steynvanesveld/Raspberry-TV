import { TestBed } from '@angular/core/testing';
import { Favorites } from '../models/favorites.model';
import { FavoritesSerializer } from './favorites.serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { RaspberryServiceMock } from '../services/mocks/raspberry.service.mock';

describe('FavoritesSerializer', () => {
    let serializer: FavoritesSerializer;
    const mock = new RaspberryServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [FavoritesSerializer],
        });

        serializer = TestBed.inject(FavoritesSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getFavorites().subscribe((data: Favorites) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.getFavorites().subscribe((data: Favorites) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
