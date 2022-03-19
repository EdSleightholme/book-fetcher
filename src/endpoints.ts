
export interface BookData {
  title: string;
  numberOfPages:number;
  publishedYear:number;
  authorName:string;
}

export const fetchBooks = async (searchTerm: string): Promise<BookData[]> => {
  const returnData = await fetch(
    "http://openlibrary.org/search.json?title=" + searchTerm
  );
  const returnDataJson = await returnData.json();
  const returnDataJsonFirst10 = returnDataJson.docs.slice(0, 10);
  return returnDataJsonFirst10.map((unformattedBookData: any) => {
    return {
      title: unformattedBookData.title,
      numberOfPages: unformattedBookData.number_of_pages_median,
      publishedYear: unformattedBookData.first_publish_year,
      authorName: unformattedBookData.author_name[0],
    };
  });
};
