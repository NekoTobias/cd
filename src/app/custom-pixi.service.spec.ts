import { TestBed } from '@angular/core/testing';

import { CustomPixiService } from './custom-pixi.service';

describe('CustomPixiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomPixiService = TestBed.get(CustomPixiService);
    expect(service).toBeTruthy();
  });
});
