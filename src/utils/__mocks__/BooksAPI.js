const books = [
  {
    id: 'abc',
    title: 'To Kill a Mockingbird',
    authors: ['Harper Lee'],
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
    },
    shelf: 'currentlyReading',
  },
  {
    id: 'abcd',
    title: 'The Hobbit',
    authors: ['J.R.R. Tolkien'],
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api'
    },
    shelf: 'read',
  },
  {
    id: 'abce',
    title: 'React',
    authors: ['Slash', 'Axl Rose'],
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    shelf: 'wantToRead',
  },
  {
    id: 'abced',
    title: 'React',
    authors: ['Bruce Dickinson', 'Dave Murray'],
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    shelf: 'wantToRead',
  },
  {
    id: 'abcexs',
    title: 'React',
    authors: ['Angus Young', 'Bono Scoth'],
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    shelf: 'wantToRead',
  },
];

export const get = () => Promise.resolve({ book: books[0] });
export const getAll = () => Promise.resolve(books);
export const update = (book, shelf) => {
  const b = Object.assign({}, book);
  b.shelf = shelf;
  return Promise.resolve({ book: b });
};
export const search = (query, maxResults) => {
  if (query === 'error') return Promise.reject();
  if (query === 'javascript') return Promise.resolve({ items: [] });
  const data = books.filter(b => b.title.toUpperCase() === query.toUpperCase());
  return Promise.resolve(data);
};
