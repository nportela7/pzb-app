const GRAPH_API_VERSION = "v21.0";

export type InstagramPost = {
  id: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
};

type GraphMediaResponse = {
  data: Array<{
    id: string;
    caption?: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
  }>;
};

/**
 * Fetches the latest posts from Pilar's Instagram Business account via the
 * Graph API. Requires INSTAGRAM_ACCESS_TOKEN (long-lived, ~60 day token)
 * and INSTAGRAM_USER_ID env vars — see AGENTS.md / README for the manual
 * setup steps (professional account + Meta app + token generation).
 *
 * Returns an empty array (never throws) if the integration isn't
 * configured or the token has expired, so the page degrades gracefully.
 */
export async function getInstagramFeed(limit = 12): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return [];
  }

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
  const url =
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${userId}/media` +
    `?fields=${fields}&limit=${limit}&access_token=${token}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 6 }, // 6 hours
    });

    if (!res.ok) {
      console.error("Instagram Graph API error:", res.status, await res.text());
      return [];
    }

    const json = (await res.json()) as GraphMediaResponse;

    return json.data
      .filter((item) => item.media_type !== "VIDEO")
      .map((item) => ({
        id: item.id,
        caption: item.caption,
        mediaType: item.media_type,
        mediaUrl: item.media_url,
        thumbnailUrl: item.thumbnail_url,
        permalink: item.permalink,
      }));
  } catch (err) {
    console.error("Failed to fetch Instagram feed:", err);
    return [];
  }
}
