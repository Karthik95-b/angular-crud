import { TestBed } from '@angular/core/testing';

import { BehaviourSubjectExampleService } from './behaviour-subject-example.service';

describe('BehaviourSubjectExampleService', () => {
  let service: BehaviourSubjectExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaviourSubjectExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
