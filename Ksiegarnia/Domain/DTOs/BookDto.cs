﻿using Domain.Entitites;

namespace Domain.DTOs
{
    public class BookDto
    {
        /// <summary>
        ///     Book Id
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        ///     Title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        ///     Genre
        /// </summary>
        public GenreDto Genre { get; set; }

        /// <summary>
        ///     Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        ///     PageNumber
        /// </summary>
        public int PageNumber { get; set; }
        /// <summary>
        /// User simplified data 
        /// </summary>
        public UserDto Author { get; set; }

        /// <summary>
        ///     Book picture / cover
        /// </summary>
        public byte[] Picture { get; set; }
    }

    public static class BookConvert
    {
        public static IEnumerable<BookDto> ToDTOs(this IEnumerable<EBook> eBooks)
        {
            foreach (var book in eBooks)
            {
                yield return book.ToDTO();
            }
        }

        public static BookDto ToDTO(this EBook eBook)
        {
            return new BookDto()
            {
                Genre = eBook.Genre.ToDTO(),
                Title = eBook.Title,
                Description = eBook.Description,
                PageNumber = eBook.PageNumber,
                Author = eBook.Author.ToDTO()
            };
        }
    }
}