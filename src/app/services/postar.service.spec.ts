import { TestBed } from '@angular/core/testing';

import { PostarService } from './postar.service';

describe('PostarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostarService = TestBed.get(PostarService);
    expect(service).toBeTruthy();
  });
});
