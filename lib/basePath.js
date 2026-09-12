// Prefix for files served straight out of /public. next/link and next/image
// apply basePath themselves; plain <img>/<video>/CSS url() do not.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path) => `${BASE_PATH}${path}`;
