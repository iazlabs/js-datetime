import { JSDate } from '../src';

describe('JSDate Utilities class', () => {
  it('JSDate.create() should returns an instance of javascript date object for valid date inputs', () => {
    expect(JSDate.create('2022-02-17 12:5700')).toBeInstanceOf(Date);
    expect(JSDate.create('I am not a date').toString()).toEqual('Invalid Date');
    expect(JSDate.create()).toEqual(JSDate.now());
  });

  it('JSDate.substract() on 2022-02-17 00:00:00 by 1 week should equals 2022-02-10 00:00:00', () => {
    expect(JSDate.substract('w', JSDate.create('2022-02-17 00:00:00'))).toEqual(
      new Date('2022-02-10T00:00:00')
    );
  });

  it('JSDate.add() on 2022-02-17 00:00:00 by 1 week should equals 2022-02-24 00:00:00', () => {
    expect(JSDate.add('w', JSDate.create('2022-02-17 00:00:00'))).toEqual(
      new Date('2022-02-24T00:00:00')
    );
  });

  it('JSDate.isAfter() on new Date("2022-02-24T00:00:00") and new Date("2022-02-17T00:00:00") to returns true', () => {
    expect(
      JSDate.isAfter(
        new Date('2022-02-24T00:00:00'),
        new Date('2022-02-17T00:00:00')
      )
    ).toEqual(true);

    expect(
      JSDate.isAfter(
        new Date('2022-01-24T00:00:00'),
        new Date('2022-02-17T00:00:00')
      )
    ).toEqual(false);

    expect(
      JSDate.isAfter(
        new Date('2022-02-17T00:00:00'),
        new Date('2022-01-24T00:00:00')
      )
    ).toEqual(true);

    expect(
      JSDate.isAfter(
        new Date('2021-02-17T00:00:00'),
        new Date('2022-01-24T00:00:00')
      )
    ).toEqual(false);

    expect(
      JSDate.isAfter(
        new Date('2022-01-24T00:00:00'),
        new Date('2021-02-17T00:00:00')
      )
    ).toEqual(true);

    expect(
      JSDate.isAfter(
        new Date('2022-01-24T10:00:00'),
        new Date('2022-01-24T15:00:00')
      )
    ).toEqual(false);
  });

  it('JSDate.isBefore() on new Date("2022-02-24T00:00:00") and new Date("2022-02-17T00:00:00") to returns false', () => {
    expect(
      JSDate.isBefore(
        new Date('2022-02-24T00:00:00'),
        new Date('2022-02-17T00:00:00')
      )
    ).toEqual(false);

    expect(
      JSDate.isBefore(
        new Date('2022-01-24T00:00:00'),
        new Date('2022-02-17T00:00:00')
      )
    ).toEqual(true);

    expect(
      JSDate.isBefore(
        new Date('2022-02-17T00:00:00'),
        new Date('2022-01-24T00:00:00')
      )
    ).toEqual(false);

    expect(
      JSDate.isBefore(
        new Date('2021-02-17T00:00:00'),
        new Date('2022-01-24T00:00:00')
      )
    ).toEqual(true);

    expect(
      JSDate.isBefore(
        new Date('2022-01-24T00:00:00'),
        new Date('2021-02-17T00:00:00')
      )
    ).toEqual(false);

    expect(
      JSDate.isBefore(
        new Date('2022-01-24T10:00:00'),
        new Date('2022-01-24T15:00:00')
      )
    ).toEqual(true);
  });

  it('JSDate.isDate() should returns an true for javascript date object and false for invalid dates', () => {
    expect(JSDate.isDate('I am not a date')).toEqual(false);
    expect(JSDate.isDate(new Date())).toEqual(true);
  });

  it('should test returned values when date part methods are called on a date', () => {
    const date = JSDate.create(new Date('2022-02-17T13:24:45'));
    expect(JSDate.getMonth(date)).toEqual(1);
    expect(JSDate.getYear(date)).toEqual(2022);
    expect(JSDate.getDay(date)).toEqual(4);
    expect(JSDate.getDate(date)).toEqual(17);
    expect(JSDate.getHours(date)).toEqual(13);
    expect(JSDate.getMinutes(date)).toEqual(24);
    expect(JSDate.getSeconds(date)).toEqual(45);
  });

  it('should test the computed unit of time difference between 2 dates', () => {
    const date = JSDate.create(new Date('2022-02-17T13:24:45'));
    const date2 = JSDate.create(new Date('2022-02-17T14:24:45'));
    expect(JSDate.diff(date2, date, 'y')).toEqual(0);
    expect(JSDate.diff(date2, date, 'M')).toEqual(0);
    expect(JSDate.diff(date2, date, 'd')).toEqual(0);
    expect(JSDate.diff(date2, date, 'h')).toEqual(1);
    expect(JSDate.diff(date2, date, 'minutes')).toEqual(60);
    expect(JSDate.diff(date2, date, 's')).toEqual(3600);
  });

  it('JSDate.format() should converts a date object to user defined format', () => {
    const date = JSDate.create(new Date('2022-02-17T13:24:45'));
    const format1 = JSDate.format(date, 'L');
    const format2 = JSDate.format(date, 'LTS');
    const format3 = JSDate.format(date, 'LL');
    expect(typeof format1).toEqual('string');
    expect(format1).toEqual('02/17/2022'); //
    expect(format2).toEqual('1:24:45 PM'); //
    expect(format3).toEqual('February 17, 2022');
    JSDate.locale('fr-FR');
    const format4 = JSDate.format(date, 'LL');
    expect(format4).toEqual('17 février 2022');
  });

  it('JSDate.timeSince() should returns true for a difference in ms computation of today and another date', () => {
    expect(JSDate.timeSince(new Date('2022-02-20T13:24:45'))).toEqual(
      Math.floor(JSDate.diff(JSDate.now(), new Date('2022-02-20T13:24:45')))
    );
  });
  it('JSDate.isPast() returns false if a day, a year, month, a minute, a second, an hour, week etc... is addded to current date', () => {
    expect(
      JSDate.isPast(JSDate.add('w', JSDate.create('2022-02-17 00:00:00')))
    ).toEqual(false);
    expect(
      JSDate.isPast(JSDate.substract('w', JSDate.create('2022-02-17 00:00:00')))
    ).toEqual(true);
  });
  it('JSDate.isFuture() returns true if a day, a year, month, a minute, a second, an hour, week etc... is addded to current date', () => {
    expect(
      JSDate.isFuture(JSDate.add('w', JSDate.create('2022-02-17 00:00:00')))
    ).toEqual(true);
    expect(
      JSDate.isFuture(
        JSDate.substract('w', JSDate.create('2022-02-17 00:00:00'))
      )
    ).toEqual(false);
  });
});