import '@testing-library/jest-dom';
import {beforeEach, vi} from 'vitest';

beforeEach(()=>{

  const matchMediaMock=vi.fn().mockImplementation((query) => ({
  
  matches: false,
  media: query,
  onchange: null, 
  addListener: vi.fn(), // Deprecated
  removeListener: vi.fn(), // Deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
  
  }));

  vi.stubGlobal('matchMedia', matchMediaMock);
  vi.stubGlobal('getComputedStyle',  () => ({   //I changed this line because it was not working with sir's code;
    getPropertyValue: () => '', // Return an empty string or mock necessary values
  }));
});