import { getQueryParams, getSortObj, dateFormat, sortArray } from './index';
import { get } from 'lodash';
import { describe, expect, it } from '@jest/globals';

describe('test get query params', () => {
  it('get sort and search', () => {
    const location = {
      ...window.location,
      search: '?sort=name-asc&search=test',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });
    expect(getQueryParams().sort).toBe('name-asc');
    expect(getQueryParams().search).toBe('test');
  });
});

describe('test get sort field', () => {
  it('get sort value and sort order', () => {
    expect(getSortObj('name-asc')).toStrictEqual({
      sortVal: 'name',
      sortOrder: 'asc',
    });
  });
});

describe('test date format', () => {
  it('format date dd/mm/yyyy', () => {
    expect(dateFormat('2021-01-01')).toBe('1/1/2021');
  });
});

describe('test sort array', () => {
  const list = [
    {
      application_date: '2018-07-02',
      birth_date: '1997-09-07',
      email: 'cornellbartell@connellyleannon.biz',
      id: 1,
      name: 'Alvin Satterfield',
      position_applied: 'Technician',
      status: 'rejected',
      year_of_experience: 5,
    },
    {
      application_date: '2017-11-18',
      birth_date: '1998-08-03',
      email: 'corinnestark@pacocha.co',
      id: 2,
      name: 'Rosalind Rath DDS',
      position_applied: 'Designer',
      status: 'waiting',
      year_of_experience: 3,
    },
    {
      application_date: '2018-01-31',
      birth_date: '1980-03-28',
      email: 'sandyankunding@marks.io',
      id: 3,
      name: 'Colette Morar',
      position_applied: 'Orchestrator',
      status: 'approved',
      year_of_experience: 15,
    },
  ];
  it('sort number by year_of_experience', () => {
    const sortAscYearExp = sortArray(list, 'asc', 'year_of_experience');
    expect(get(sortAscYearExp, '[0].year_of_experience')).toBe(3);
    expect(
      get(sortAscYearExp, `[${sortAscYearExp.length - 1}].year_of_experience`)
    ).toBe(15);

    const sortDescYearExp = sortArray(list, 'desc', 'year_of_experience');
    expect(get(sortDescYearExp, '[0].year_of_experience')).toBe(15);
    expect(
      get(sortDescYearExp, `[${sortDescYearExp.length - 1}].year_of_experience`)
    ).toBe(3);
  });

  it('sort string by name', () => {
    const sortAscName = sortArray(list, 'asc', 'name');
    expect(get(sortAscName, '[0].name')).toBe('Alvin Satterfield');
    expect(get(sortAscName, `[${sortAscName.length - 1}].name`)).toBe(
      'Rosalind Rath DDS'
    );

    const sortDescName = sortArray(list, 'desc', 'name');
    expect(get(sortDescName, '[0].name')).toBe('Rosalind Rath DDS');
    expect(get(sortDescName, `[${sortDescName.length - 1}].name`)).toBe(
      'Alvin Satterfield'
    );
  });

  it('sort date by applied', () => {
    const sortAscName = sortArray(list, 'asc', 'application_date');
    expect(get(sortAscName, '[0].application_date')).toBe('2017-11-18');
    expect(
      get(sortAscName, `[${sortAscName.length - 1}].application_date`)
    ).toBe('2018-07-02');

    const sortDescName = sortArray(list, 'desc', 'application_date');
    expect(get(sortDescName, '[0].application_date')).toBe('2018-07-02');
    expect(
      get(sortDescName, `[${sortDescName.length - 1}].application_date`)
    ).toBe('2017-11-18');
  });
});
