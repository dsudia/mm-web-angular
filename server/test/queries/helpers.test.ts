import { DatabaseTranslator } from '../../interfaces';
import { translate } from '../../queries/helpers';

describe('Helpers', () => {
  describe('translate', () => {
    describe('boolean', () => {
      interface Tester {
        _b: boolean;
        _s: string;
        _n: number;
        _x: any;
      }
      let result;

      beforeAll(() => {
        const databaseTranslator: DatabaseTranslator<Tester> = {
          _b: true,
          _s: true,
          _n: true,
          _u: true,
        }
        const tester: Tester = {
          _b: false,
          _s: 'some string',
          _n: 0,
          _x: {},
        }
        result = translate(tester, databaseTranslator);
      });

      it('keeps the boolean value', () => {
        expect(result._b).toEqual(false);
      });

      it('keeps the string value', () => {
        expect(result._s).toEqual('some string');
      });

      it('keeps the number value', () => {
        expect(result._n).toEqual(0);
      });

      it('does not include anything not in tester', () => {
        expect(Reflect.ownKeys(result)).not.toContain('_u');
      });

      it('removes anything not in translator', () => {
        expect(result._x).toBeUndefined();
      });
    });

    describe('key remapping', () => {
      interface Tester {
        b: boolean;
        s: string;
        n: number;
        u?: any;
        x: any;
      }
      let result;
      beforeAll(() => {
        const databaseTranslator: DatabaseTranslator<Tester> = {
          _b: 'b',
          _s: 's',
          _n: 'n',
          _u: 'u',
        }
        const tester: Tester = {
          b: false,
          s: 'some string',
          n: 0,
          x: {},
        }
        result = translate(tester, databaseTranslator);
      });

      it('keeps the boolean value', () => {
        expect(result._b).toEqual(false);
      });

      it('keeps the string value', () => {
        expect(result._s).toEqual('some string');
      });

      it('keeps the number value', () => {
        expect(result._n).toEqual(0);
      });

      it('does not include anything not in tester', () => {
        expect(Reflect.ownKeys(result)).not.toContain('_u');
      });

      it('removes anything not in database translator', () => {
        expect(result._x).toBeUndefined();
      });
    });

    describe('check() and value() (check returns true)', () => {
      interface Tester {
        _b: boolean;
        _s: string;
        _n: number;
        _u?: any;
        _x: any;
      }
      let result;
      beforeAll(() => {
        const databaseTranslator: DatabaseTranslator<Tester> = {
          _b: { check(s) { return !s._b}, value(s) { return !s._b } },
          _s: { check(s) { return s._s === 'some string' }, value(s) { return `added to ${s._s}`} },
          _n: { check(s) { return s._n === 0 }, value(s) { return s._n + 10 } },
          _u: { check(s) { return true }, value(s) { return undefined } },
        }
        const tester: Tester = {
          _b: false,
          _s: 'some string',
          _n: 0,
          _x: {},
        }
        result = translate(tester, databaseTranslator);
      });

      it('keeps the boolean value', () => {
        expect(result._b).toEqual(true);
      });

      it('keeps the string value', () => {
        expect(result._s).toEqual('added to some string');
      });

      it('keeps the number value', () => {
        expect(result._n).toEqual(10);
      });

      it('does not include anything not in tester', () => {
        expect(Reflect.ownKeys(result)).not.toContain('_u');
      });

      it('removes anything not in tester', () => {
        expect(result._x).toBeUndefined();
      });
    });
  });

  describe('check() and value() (check returns false)', () => {
    interface Tester {
      _b: boolean;
      _s: string;
      _n: number;
      x: any;
    }
    let result;
    beforeAll(() => {
      const databaseTranslator: DatabaseTranslator<Tester> = {
        _b: { check(s) { return s._b}, value(s) { return !s._b } },
        _s: { check(s) { return s._s !== 'some string' }, value(s) { return `added to ${s._s}`} },
        _n: { check(s) { return s._n !== 0 }, value(s) { return s._n + 10 } },
      }
      const tester: Tester = {
        _b: false,
        _s: 'some string',
        _n: 0,
        x: {},
      }
      result = translate(tester, databaseTranslator);
    });

    it('has nothing in it', () => {
      expect(result).toEqual({});
    });
  });
});
