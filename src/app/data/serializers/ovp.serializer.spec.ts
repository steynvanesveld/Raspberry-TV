import { OVP } from '../models/ovp.model';
import { TestBed } from '@angular/core/testing';
import { OVPSerializer } from './ovp.serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { OVPServiceMock } from '../services/mocks/ovp.service.mock';

describe('OVPSerializer', () => {
    let serializer: OVPSerializer;
    const mock = new OVPServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [OVPSerializer],
        });

        serializer = TestBed.inject(OVPSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.searchOVP().subscribe((data: OVP) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.searchOVP().subscribe((data: OVP) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
