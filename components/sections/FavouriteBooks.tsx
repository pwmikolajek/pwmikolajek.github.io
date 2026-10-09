import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { books } from "@/content/books";

export function FavouriteBooks() {
  return (
    <section id="books" aria-label="Favourite books" className="px-6 sm:px-10 py-28 sm:py-36 border-t hairline">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading eyebrow="On my bookshelf" title="Favourite books." />
        </Reveal>

        <ol className="mt-14 space-y-14">
          {books.map((book, index) => (
            <li key={book.slug}>
              <Reveal>
                <article className="grid gap-8 border-t hairline pt-8 lg:grid-cols-[300px_1fr] lg:gap-20">
                  <div>
                    <div className="mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden />
                      <span>{book.category}</span>
                    </div>
                    <h3 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] tracking-[var(--tracking-display)]">
                      {book.title}
                    </h3>
                    <p className="mt-4 text-[var(--muted)]">{book.author}</p>
                    {book.quote && (
                      <figure className="mt-8 border-l-2 border-[var(--hairline-strong)] pl-5">
                        <blockquote cite={book.quote.source} className="font-display text-xl leading-[1.5] tracking-[var(--tracking-display)]">
                          <p>“{book.quote.text}”</p>
                        </blockquote>
                        <figcaption className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
                          {book.quote.context}
                        </figcaption>
                      </figure>
                    )}
                    <div className="mt-8">
                      <a
                        href={book.shop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Buy ${book.title} at ${book.shop.name} (opens in a new tab)`}
                        className="group inline-flex min-h-11 items-center gap-2 text-sm underline decoration-[var(--hairline-strong)] underline-offset-4 transition-colors hover:decoration-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--fg)]"
                      >
                        Buy at {book.shop.name}
                        <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{book.shop.note}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-5">
                    {book.images.map((image) => (
                      <a key={image.src} href={image.src} target="_blank" rel="noreferrer" aria-label={`${image.alt} (opens full photo in a new tab)`} className="group block overflow-hidden rounded-[var(--radius-card)] bg-[var(--hairline)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--fg)]">
                        <img src={image.src} alt={image.alt} width={1050} height={1400} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
