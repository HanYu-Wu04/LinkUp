"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { AiFillApple, AiOutlineLink } from "react-icons/ai";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShuffleHero from "@/components/landing/Hero";
import LandingNav from "@/components/landing/LandingNav";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/landing/Footer";

const ImageGridHero = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <>
      <Nav scrollYProgress={scrollYProgress} />
      <section ref={targetRef} className="h-[350vh] bg-white">
        <div className="sticky top-0 z-0 grid h-screen grid-cols-3 grid-rows-3 gap-4 overflow-hidden p-4">
          <Copy scrollYProgress={scrollYProgress} />
          <Images scrollYProgress={scrollYProgress} />

          <Circles />
        </div>
      </section>

      <div className="flex flex-col  text-white">
        <ShuffleHero />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

const Nav = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const background = useTransform(scrollYProgress, (i: number) => (i === 1 ? "rgb(13,10,9)" : "transparent"));

  return (
    <motion.nav
      style={{ background }}
      className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-4 py-2 transition-colors"
    >
      <div className="flex items-center gap-2 text-lg text-white">
        <AiOutlineLink className="text-xl" />
        <span className="font-bold">LinkUp</span>
      </div>
      <div className="flex justify-between gap-4">
        <Link
          href="/login"
          className="flex items-center gap-1.5 bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-black text-white transition-opacity hover:opacity-90"
        >
          <span>Login</span>
        </Link>
        {/* <Link
          href="/signup"
          className="flex items-center gap-1.5 bg-white px-3 py-1.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          <span>Signup</span>
        </Link> */}
      </div>
    </motion.nav>
  );
};

const Copy = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const copyScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.75], ["0%", "7.5%"]);

  return (
    <motion.div
      style={{
        scale: copyScale,
        opacity: copyOpacity,
        y: copyY,
      }}
      className="absolute z-20 flex h-screen w-full flex-col items-center justify-center px-8"
    >
      <h1 className="max-w-xl text-center text-5xl font-bold text-stone-950 md:text-7xl">Link with your group now</h1>
      <p className="my-6 max-w-xl text-center text-sm text-stone-600 md:text-base">
        Struggling to find people to do things with? No worries - we&apos;re here to link you up with like-minded
        people.
      </p>
      <div className="flex items-center gap-4">
        <Link href="/signup">
          <button className="bg-indigo-500 px-4 py-2 font-medium text-white transition-colors hover:bg-violet-600">
            Join Today
          </button>
        </Link>
        <Link href="#">
          <button className="bg-transparent px-4 py-2 font-medium text-stone-950 transition-colors hover:bg-stone-200">
            Learn about us
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

const Images = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const image1Offset = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  const image2OffsetX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const image2OffsetY = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  const image3OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const image3OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  const image4OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
  const image4OffsetY = useTransform(scrollYProgress, [0, 1], ["-145%", "0%"]);

  const image5OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const image5OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  const image6OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
  const image6OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  return (
    <>
      <motion.div
        className="relative z-10 col-span-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=3107&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image1Offset,
          y: image1Offset,
        }}
      />
      <motion.div
        className="relative z-10 row-span-2"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1664391726094-3a1c3f9adb3a?q=80&w=2981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image2OffsetX,
          y: image2OffsetY,
        }}
      />

      <motion.div
        className="relative z-10 row-span-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image3OffsetX,
          y: image3OffsetY,
        }}
      />
      <motion.div
        className="relative z-10"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1550789813-472d2a9cd237?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image4OffsetX,
          y: image4OffsetY,
        }}
      />

      <motion.div
        className="relative z-10"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image5OffsetX,
          y: image5OffsetY,
        }}
      />
      <motion.div
        className="relative z-10"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?q=80&w=2974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image6OffsetX,
          y: image6OffsetY,
        }}
      />
    </>
  );
};

const Circles = () => (
  <>
    <div className="absolute left-0 top-0 z-0 aspect-square w-3/5 min-w-[400px] max-w-[850px] -translate-x-[50%] -translate-y-[50%] rounded-full border-[8px] border-slate-200" />
    <div className="absolute bottom-0 right-0 z-0 aspect-square w-1/2 min-w-[300px] max-w-[600px] translate-x-[50%] translate-y-[50%] rounded-full border-[8px] border-slate-200" />
  </>
);

export default ImageGridHero;
