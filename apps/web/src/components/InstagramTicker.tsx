import type { InstagramPost } from "@/lib/instagram";

export function InstagramTicker({ posts }: { posts: InstagramPost[] }) {
  if (posts.length === 0) return null;

  const track = [...posts, ...posts];

  return (
    <div className="-mx-6 sm:-mx-10 overflow-hidden">
      <div className="inline-flex marquee-track" style={{ animationDuration: "60s" }}>
        {track.map((post, i) => (
          <a
            key={`${post.id}-${i}`}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 mx-1.5 rounded-xl overflow-hidden group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnailUrl ?? post.mediaUrl}
              alt={post.caption?.slice(0, 80) ?? "Publicación de Instagram"}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
