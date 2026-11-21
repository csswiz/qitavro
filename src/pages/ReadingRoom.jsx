import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, ArrowRight, Clock, Calendar, User, Bookmark } from 'lucide-react';
import articlesData from '../data/articles.json';
import booksData from '../data/books.json';
import BookCoverImage from '../components/BookCoverImage';

export default function ReadingRoom() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If a specific article slug is provided in URL
  if (slug) {
    const article = articlesData.find((a) => a.slug === slug);
    if (!article) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-black-obsidian text-ivory-light">
          <div className="w-12 h-12 rounded-[5px] p-2 bg-[#181015] border border-burgundy/40 mb-3.5 flex items-center justify-center shadow-md">
            <img src="/logo.svg" alt="QITAVRO Emblem" className="w-full h-full object-contain" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-ivory-light">Article Not Found</h2>
          <Link
            to="/reading-room"
            className="mt-4 px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded border border-burgundy-rose/30"
          >
            Return to The Reading Room
          </Link>
        </div>
      );
    }

    // Related recommended books for this article
    const recommendedBooks = booksData.filter((b) =>
      article.relatedBookIds?.includes(b.id)
    );

    return (
      <div className="bg-black-obsidian min-h-screen pb-24 text-ivory-light">
        {/* Article Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 border-b border-burgundy/25 text-xs font-sans text-ivory/60 flex items-center justify-between">
          <Link
            to="/reading-room"
            className="inline-flex items-center gap-1.5 hover:text-rose-light transition-colors text-ivory-light"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gold" />
            <span>Back to The Reading Room</span>
          </Link>
          <span className="uppercase tracking-widest text-[10px] text-rose-light font-semibold">
            {article.category}
          </span>
        </div>

        {/* Article Header */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold" />
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-rose-light font-semibold">
              QITAVRO EDITORIAL
            </span>
            <span className="w-6 h-[1px] bg-gold" />
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ivory-light leading-[1.15]">
            {article.title}
          </h1>

          <p className="mt-4 font-serif italic text-base sm:text-lg text-ivory/75 leading-relaxed">
            "{article.excerpt}"
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-sans text-ivory/60 border-y border-burgundy/25 py-3">
            <span className="font-serif italic text-gold font-medium">By {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-rose-light">
              <Clock className="w-3 h-3 text-gold" />
              {article.readTime}
            </span>
          </div>
        </header>

        {/* Hero Image for Article */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="aspect-[16/9] rounded overflow-hidden shadow-book border border-burgundy/40">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="font-serif text-lg text-ivory/90 leading-[1.8] space-y-6">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? 'drop-cap' : ''}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Curated Recommendations Mentioned in Article */}
          {recommendedBooks.length > 0 && (
            <div className="mt-16 pt-10 border-t border-burgundy/25">
              <div className="mb-6">
                <span className="text-[10px] font-sans uppercase tracking-widest text-rose-light font-semibold">
                  Companion Reading
                </span>
                <h3 className="font-serif font-bold text-2xl text-ivory-light mt-1">
                  Volumes Discussed in This Piece
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/book/${book.slug}`}
                    className="p-3 bg-[#140D12] rounded border border-burgundy/30 hover:border-burgundy/70 shadow-subtle hover:shadow flex gap-3 group transition-all text-ivory-light"
                  >
                    <div className="w-16 flex-shrink-0">
                      <BookCoverImage
                        src={book.image}
                        alt={book.title}
                        title={book.title}
                        author={book.author}
                        category={book.category}
                      />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[9px] uppercase font-sans text-rose-light font-semibold">
                        {book.category}
                      </span>
                      <h4 className="font-serif font-semibold text-xs text-ivory-light group-hover:text-rose-light truncate">
                        {book.title}
                      </h4>
                      <p className="font-serif italic text-[11px] text-ivory/70 truncate">
                        {book.author}
                      </p>
                      <span className="font-serif font-bold text-gold text-xs mt-1">
                        ₹{book.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Return link */}
          <div className="mt-12 pt-6 border-t border-burgundy/25 text-center">
            <Link
              to="/reading-room"
              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-gold" />
              <span>Back to Editorial Desk</span>
            </Link>
          </div>
        </article>
      </div>
    );
  }

  // Reading Room Index View
  const featuredArticle = articlesData[0];
  const regularArticles = articlesData.slice(1);

  return (
    <div className="bg-black-obsidian min-h-screen pb-24 text-ivory-light">
      {/* Editorial Header */}
      <div className="bg-[#120C10] border-b border-burgundy/25 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-[3px] p-0.5 bg-[#181015] border border-burgundy/40 shadow-xs flex items-center justify-center flex-shrink-0">
                <img src="/logo.svg" alt="QITAVRO" className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
                Literary Magazine
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ivory-light mt-1">
              The Reading Room
            </h1>
            <p className="mt-3 font-serif italic text-base sm:text-lg text-ivory/80 leading-relaxed">
              Essays on unhurried reading, philosophical reflections on personal libraries, and literary criticism for contemplative readers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Featured Magazine Cover Article */}
        {featuredArticle && (
          <div className="bg-[#140D12] rounded-[4px] border border-burgundy/30 overflow-hidden shadow-book text-ivory-light">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-black-obsidian">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-rose-light font-bold">
                    Featured Journal
                  </span>
                  <span className="text-ivory/30">•</span>
                  <span className="text-[10px] font-sans text-ivory/50 uppercase tracking-wider">
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ivory-light leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="font-serif italic text-xs text-gold mt-1">
                  By {featuredArticle.author}
                </p>

                <p className="mt-4 text-xs sm:text-sm font-sans text-ivory/75 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="mt-6 pt-4 border-t border-burgundy/25">
                  <Link
                    to={`/reading-room/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy hover:bg-burgundy-light text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors shadow-subtle border border-burgundy-rose/30"
                  >
                    <span>Read Full Essay</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-sans uppercase tracking-widest text-rose-light font-semibold">
              Essays, Reviews & Lists
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-ivory-light mt-1">
              Curated Literary Chronicles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {regularArticles.map((art) => (
              <article
                key={art.id}
                className="group bg-[#140D12] rounded-[4px] border border-burgundy/30 p-6 flex flex-col justify-between shadow-subtle hover:border-burgundy/70 hover:shadow-[0_12px_30px_-8px_rgba(101,46,60,0.35)] transition-all text-ivory-light"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-widest text-rose-light font-semibold mb-2">
                    <span>{art.category}</span>
                    <span className="text-ivory/40 font-normal">{art.readTime}</span>
                  </div>

                  <Link to={`/reading-room/${art.slug}`}>
                    <h4 className="font-serif font-bold text-xl text-ivory-light group-hover:text-rose-light transition-colors leading-snug">
                      {art.title}
                    </h4>
                  </Link>

                  <p className="font-serif italic text-xs text-gold mt-1">
                    By {art.author} — {art.date}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-ivory/75 font-sans leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-burgundy/25 flex items-center justify-between">
                  <span className="text-[11px] font-sans text-ivory/50">
                    {art.relatedBookIds?.length || 0} Companion Works
                  </span>
                  <Link
                    to={`/reading-room/${art.slug}`}
                    className="text-xs font-sans uppercase tracking-wider font-semibold text-rose-light group-hover:text-ivory-light inline-flex items-center gap-1"
                  >
                    Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-gold" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
