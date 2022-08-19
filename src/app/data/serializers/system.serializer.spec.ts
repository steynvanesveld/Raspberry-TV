import { TestBed } from '@angular/core/testing';
import { System } from '../models/system.model';
import { SystemSerializer } from './system.serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { RaspberryServiceMock } from '../services/mocks/raspberry.service.mock';

describe('SystemSerializer', () => {
    let serializer: SystemSerializer;
    const mock = new RaspberryServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [SystemSerializer],
        });

        serializer = TestBed.inject(SystemSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getSystem().subscribe((data: System) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.getSystem().subscribe((data: System) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
