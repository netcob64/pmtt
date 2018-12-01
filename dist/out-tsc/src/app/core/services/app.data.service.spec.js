import { TestBed, inject } from '@angular/core/testing';
import { AppDataService } from './app.data.service';
describe('AppDataService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AppDataService]
        });
    });
    it('should be created', inject([AppDataService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=app.data.service.spec.js.map