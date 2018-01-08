import { shallow } from 'enzyme';
import React from 'react';

import BookList from './BookList';
import Book from './Book';

describe('Test 1', () => {
  const defaultProps = {
    addToCart: jest.fn(),
  };
  it('Should test something', () => {
    const bookList = [
      { isbn: '1', title: 'Book 1' },
      { isbn: '2', title: 'Book 2' },
    ];
    const props = {
      ...defaultProps,
      books: bookList,
    };
    const wrapper = shallow(
      <BookList
        {...props}
      />
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find(Book)).toHaveLength(2);
  });
});
