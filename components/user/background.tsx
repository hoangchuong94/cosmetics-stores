import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BackgroundProps {
    title: string;
    name: string;
    description: string;
    image: StaticImageData;
    fixed?: boolean;
}

export default function Background({
    title,
    description,
    name,
    image,
    fixed,
}: BackgroundProps) {
    return (
        <div className="relative bg-transparent p-8">
            <div className="relative z-10 min-h-96 w-full py-[8%]">
                <div className="flex min-h-[inherit] flex-col items-start justify-center md:w-6/12">
                    <h6 className="mb-6 text-xs uppercase text-white sm:text-sm">
                        {title}
                    </h6>
                    <h3 className="text-2xl text-white sm:text-5xl">{name}</h3>
                    <p className="my-2 text-base text-white sm:my-4 sm:text-2xl">
                        {description}
                    </p>
                    <div className="mt-4 flex sm:mt-8">
                        <Link href={'/store'}>
                            <Button
                                className="mr-2 rounded-sm bg-slate-50 px-4 py-2 font-sans text-black hover:bg-black hover:text-white hover:delay-100 active:bg-slate-300 sm:px-5 sm:py-5"
                                type="button"
                            >
                                SHOP NOW
                            </Button>
                        </Link>
                        <Link href={'/store'}>
                            <Button
                                className="rounded-sm border border-white bg-transparent px-4 py-2 font-sans font-normal text-white hover:bg-white hover:text-black hover:delay-100 active:bg-slate-300 sm:px-5 sm:py-5"
                                type="button"
                            >
                                FIND MORE
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 p-0">
                {fixed ? (
                    <div className="hidden md:block">
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-fixed bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${image.src})`,
                            }}
                        ></div>
                    </div>
                ) : (
                    <div className="absolute inset-0 object-cover">
                        <Image
                            src={image}
                            alt="image background"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={100}
                            placeholder="blur"
                            priority
                        />
                    </div>
                )}
                <div className="absolute inset-0 object-cover md:hidden">
                    <Image
                        src={image}
                        alt="image background"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
                        placeholder="blur"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
