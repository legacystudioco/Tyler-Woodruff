// Every tracked link is listed here, so /go can't be used to redirect anywhere else.
export const RESUME_FILE = "/Tyler_Woodruff_Resume_2026.pdf";
export const RESUME_DOWNLOAD_SLUG = "resume";

type TrackedLink = { label: string; target: string };

export const TRACKED_LINKS: Record<string, TrackedLink> = {
  [RESUME_DOWNLOAD_SLUG]: { label: "Resume download", target: RESUME_FILE },
  portfolio: { label: "Portfolio", target: "/" },
  kingdom: { label: "Kingdom Conference", target: "/work/kingdom-conference" },
  river: { label: "River of Life", target: "/work/river-of-life" },
  "3d-sports": { label: "3D Sports Displays", target: "https://3dsportsdisplays.com" },
  elite: { label: "Elite Home Sources", target: "https://www.elitehomesources.com" },
  ministry: { label: "Ministry Linker", target: "https://www.ministrylinker.com" },
  hivibe: { label: "HI-VIBE", target: "https://hi-vibe.com" },
};

// Labels which copy of the resume a click came from, e.g. /go/portfolio?s=acme.
export const SOURCE_PATTERN = /^[a-z0-9-]{1,40}$/;
