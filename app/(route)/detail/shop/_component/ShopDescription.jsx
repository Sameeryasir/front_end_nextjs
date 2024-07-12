import React from 'react'
import Image from 'next/image'

export default function ShopDescription({ shop }) {
  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      {shop?.Description && (
        <>
          <h2 className='font-bold text-[25px]'>Description</h2>
          <p className='mt-4 text-lg text-gray-600'>{shop.Description}</p>
        </>
      )}

      <div className="mt-8">
        <h2 className='font-bold text-[25px]'>Follow Us</h2>
        <div className="flex gap-4 mt-4">
          {shop?.socialMedia?.Facebook && (
            <a
              href={shop.socialMedia.Facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition duration-200"
            >
              <Image
                src="/facebook.png"
                width={24}
                height={24}
                alt="Facebook"
                className="h-6 w-6 md:h-8 md:w-8"
              />
            </a>
          )}
          {shop?.socialMedia?.Instagram && (
            <a
              href={shop.socialMedia.Instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition duration-200"
            >
              <Image
                src="/instagram.png"
                width={24}
                height={24}
                alt="Instagram"
                className="h-6 w-6 md:h-8 md:w-8"
              />
            </a>
          )}
          {shop?.socialMedia?.Tiktok && (
            <a
              href={shop.socialMedia.Tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition duration-200"
            >
              <Image
                src="/tiktok.png"
                width={24}
                height={24}
                alt="Tiktok"
                className="h-6 w-6 md:h-8 md:w-8"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
