import { ElementRef } from '@angular/core';
import { CesiumDirective } from './cesium.directive';

describe('CesiumDirective', () => {
  it('should create an instance', () => {
    const directive = new CesiumDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });
});
