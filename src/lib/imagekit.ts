import ImageKit from "imagekit-javascript";

if (!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not defined');
}

export const imageKitLoader = new ImageKit({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || ''
}); 